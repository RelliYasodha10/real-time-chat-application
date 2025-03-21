const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Get username from localStorage
const username = localStorage.getItem("username");
if (!username) {
    window.location.href = "login.html"; // Redirect if no username
} else {
    document.getElementById("welcome-message").innerText = `Welcome, ${username}!`;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
        const chatMessage = { user: username, text: message };
        appendMessage(`You: ${message}`, "sent");
        socket.emit("chat message", chatMessage);
        messageInput.value = "";
    }
}

function appendMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message when clicking the button
sendButton.addEventListener("click", sendMessage);

// Send message when pressing Enter
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents line break in input field
        sendMessage();
    }
});
