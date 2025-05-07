document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const userInput = this.value;
        if (!userInput.trim()) return;

        addMessage('You', userInput);
        this.value = '';

        setTimeout(() => {
            addMessage('Customer Serivce', getGenericResponse(userInput));
        }, 500);
    }
});

function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.textContent = `${sender}: ${text}`;
    document.getElementById('chat-body').appendChild(msg);
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
}

function getGenericResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
        return 'Hello! How can I help you today?';
    } else if (lower.includes('price')) {
        return 'Prices vary depending on the service. Could you be more specific?';
    } else {
        return 'Thanks for reaching out! We’ll get back to you shortly.';
    }
}
