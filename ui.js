document.getElementById('chat-tab').addEventListener('click', () => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
});
// display the chat window when it is clicked