document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') { // check if the key pressed is enter
        const userInput = this.value;
        if (!userInput.trim()) return; // ignore empty input

        addMessage('You', userInput); // add user message to chat
        this.value = ''; // clear the input field

        setTimeout(() => {
            addMessage('Customer Serivce', getGenericResponse(userInput)); // simulate response after delay
        }, 500);
    }
});

function addMessage(sender, text) {
    const msg = document.createElement('div'); // create new message element
    msg.textContent = `${sender}: ${text}`;// set text content
    document.getElementById('chat-body').appendChild(msg); // add message to chat body
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight; // scroll to bottom
}

function getGenericResponse(userMessage) {
    const lower = userMessage.toLowerCase(); // convert message to lowercase
    if (lower.includes('hello') || lower.includes('hi')) { // check for greeting
        return 'Hello! How can I help you today?';
    } else if (lower.includes('price')) { // check for pricing question
        return 'Prices vary depending on the service. Could you be more specific?';
    } else {
        return 'Thanks for reaching out! We’ll get back to you shortly.'; // default response
    }
}
