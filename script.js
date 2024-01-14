function scrollChatToBottom() {
    var chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    var chatBox = document.getElementById('chat-box');

    chatBox.innerHTML += '<p><strong>Вы:</strong> ' + userInput + '</p>';

    fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender: 'user',
            message: userInput,
        }),
    })
    .then(response => response.json())
    .then(data => {
        var botResponse = data[0].text;
        chatBox.innerHTML += '<p><strong>Виртуальный врач:</strong> ' + botResponse + '</p>';

        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error('Ошибка:', error));

    document.getElementById('user-input').value = '';
}

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Отменить стандартное поведение перехода на новую строку
        sendMessage();
    }
});

document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});
