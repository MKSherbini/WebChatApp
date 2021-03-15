var wSocket;
var messagesContainer=  document.querySelector("#messagesContainer");
function connect (){
    wSocket= new WebSocket("ws://localhost:9595/chatApp/receiveMsg")
    wSocket.onmessage=receiveMessage;
    wSocket.onopen=onOpen;
}
function sendMessage(){
    var message = {
        sender:"ahmed",
        content:"hi i am ahmed",
        date: new Date(),
        orientation:"Right"
    }
    // wSocket.send($("#textBox").val())

    wSocket.send(JSON.stringify(message));
}
$(document).ready(function () {
    connect();
})
function receiveMessage(evt){
    var msg = JSON.parse(evt.data);
    if (msg.orientation=='right'){
    messagesContainer.innerHTML += '  <div class="d-flex justify-content-start mb-4">' +
        '                        <div class="msg_cotainer_send">' +
        '                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">\n' +
       +' <label style="color: white" htmlFor>'+ msg.sender+' </label>'+
        '                        </div>' +
        '                        <div class="msg_cotainer">' +msg.content+
        '                            <span class="msg_time">'+msg.time+'</span>' +
        '                        </div>' +
        '                    </div>'
    }else {
        messagesContainer.innerHTML += '  <div class="d-flex justify-content-start mb-4">' +
            '                        <div class="img_cont_msg">' +
            '                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">\n' +
            +' <label style="color: white" htmlFor>'+ msg.sender+' </label>'+
            '                        </div>' +
            '                        <div class="msg_cotainer">' +msg.content+
            '                            <span class="msg_time">'+msg.time+'</span>' +
            '                        </div>' +
            '                    </div>'
    }

}
function  onOpen(){
    console.log("Connection Established")
}

