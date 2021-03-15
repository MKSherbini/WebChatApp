var wSocket;
var onlineListContainer = document.querySelector("#onlineUsers");

function connect() {
    wSocket = new WebSocket("ws://localhost:9595/chatApp/receiveMsg")
    wSocket.onmessage = receiveNewUsers;

}

function receiveNewUsers(event) {
    var msg = JSON.parse(evt.data);
    onlineListContainer.innerHTML = "";
    msg.forEach(function (e) {
        onlineListContainer.innerHTML +=
            '                    <li class="active">' +
            '                        <div class="d-flex bd-highlight">' +
            '                            <div class="img_cont">' +
            '                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">\n' +
            '                                <span class="online_icon"></span>' +
            '                            </div>\n' +
            '                            <div class="user_info">' +
            '                                <span>'+e+'</span>' +
            '                                <p>'+e+' is online</p>' +
            '                            </div>' +
            '                        </div>' +
            '                    </li>' +
            '                    '
    })
};



$(document).ready(function () {
    connect();
})