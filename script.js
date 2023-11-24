const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Append user message to chat
    appendMessage('user', userMessage);

    // Send user message to the chatbot API
    fetchChatbotResponse(userMessage);

    // Clear the user input field
    userInput.value = '';
}

function fetchChatbotResponse(userMessage) {
    // Replace 'YOUR_API_KEY' with your OpenAI GPT-3 API key
    const apiKey = 'YOUR_API_KEY';

    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 100,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.choices[0].text.trim();

        // Append chatbot response to chat
        appendMessage('bot', botResponse);
    })
    .catch(error => console.error('Error fetching chatbot response:', error));
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBody.appendChild(messageElement);

    // Scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;
}
