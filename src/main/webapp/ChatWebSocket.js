var wSocket;
var messagesContainer = document.querySelector("#messagesContainer");

function connect() {
    wSocket = new WebSocket("ws://localhost:9090/chatApp/echo")
    wSocket.onmessage = receiveMessage;
    wSocket.onopen = onOpen;


}

function sendMessage() {
    var message = {
        sender: $("#usernames").html(),
        content: $("#textBox").val(),
        date: new Date(),
        orientation: "Right",
        isMsg: true
    }
    $("#textBox").val("");
    console.log("#sender" + message.sender)
    console.log("#orienation" + message.orientation)
    console.log("sender" + message.sender)
    // wSocket.send($("#textBox").val())

    wSocket.send(JSON.stringify(message));
}

function sendName() {
    var message = {
        sender: $("#usernames").text(),
        content: "hi i am ahmed",
        date: new Date(),
        orientation: "Right",
        isMsg: false
    }
    console.log("sender" + message.sender)
    // wSocket.send($("#textBox").val())

    wSocket.send(JSON.stringify(message));
}

$(document).ready(function () {
    connect();
    console.log("connecting echo")
})

function receiveMessage(evt) {
    var msg = JSON.parse(evt.data);

    if (msg.orientation == 'Right') {
        let img = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
        if (msg.gender == "Female")
            img = "https://data.whicdn.com/images/295658437/original.jpg";
        messagesContainer.innerHTML += '\n' +
            '                    <div class="d-flex justify-content-end mb-4">\n' +
            '                        <div class="msg_cotainer_send">\n' +
            msg.content +
            '                            <span class="msg_time_send">' + msg.date + '</span>\n' +
            '                        </div>\n' +
            '                        <div class="img_cont_msg">\n' +
            '                            <img id="UserPhoto" src="'+img+'" class="rounded-circle user_img_msg">\n' +
            '                              <label class="sender">' + msg.sender + '</label>' +
            '                        </div>\n' +
            '                    </div>\n'
        console.log('send' + msg.sender)
    } else {
        messagesContainer.innerHTML += '   <div class="d-flex justify-content-start mb-4">\n' +
            '                        <div class="img_cont_msg">\n' +
            '                            <img src="'+img+'" class="rounded-circle user_img_msg">\n' +
            '                              <label class="sender">' + msg.sender + '</label>' +
            '                        </div>\n' +
            '                        <div class="msg_cotainer">\n' +
            msg.content +
            '                            <span class="msg_time">' + msg.date + '</span>\n' +
            '                        </div>\n' +
            '                   </div>\n'
        console.log('receive' + msg.sender)
    }

}

function onOpen() {
    console.log("Connection Established")
    sendName();
}

$("#textBox").on('keypress', function (e) {
    if (e.which == 13) {
        sendMessage();
    }
});

