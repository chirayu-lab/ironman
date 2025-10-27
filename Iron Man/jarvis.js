const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Add user's message
  chatBox.innerHTML += `<p class="user-msg"><b>You:</b> ${userMessage}</p>`;
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Display typing indicator
  const thinking = document.createElement("p");
  thinking.classList.add("ai-msg");
  thinking.textContent = "J.A.R.V.I.S is processing...";
  chatBox.appendChild(thinking);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are J.A.R.V.I.S, Tony Stark’s intelligent assistant. Speak like a futuristic AI." },
                   { role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    thinking.remove();

    const aiMessage = data.choices[0].message.content;
    chatBox.innerHTML += `<p class="ai-msg"><b>J.A.R.V.I.S:</b> ${aiMessage}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    thinking.remove();
    chatBox.innerHTML += `<p class="ai-msg"><b>J.A.R.V.I.S:</b> Sorry, I encountered an error connecting to Stark servers.</p>`;
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
