var wSocket2;
var onlineListContainer2 = document.querySelector("#onlineUsers");

function connect2() {
    wSocket2 = new WebSocket("ws://localhost:9090/chatApp/online")
    wSocket2.onmessage = receiveNewUsers2;

}

function receiveNewUsers2(evt) {
    var msg = JSON.parse(evt.data);
    onlineListContainer2.innerHTML = "";
    msg.forEach(function (e) {
        onlineListContainer2.innerHTML +=
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
    connect2();
})