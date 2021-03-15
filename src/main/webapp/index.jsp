<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<html>

<head>
</head>

<header>
</header>
<body>
<a href="signin.jsp"
   class="btn btn-primary">Sign in</a>

<input value="send" type="button" onclick="sendMsg()">
<footer>
    <script>
        let wsocket;

        function openConnection() {
            wsocket = new WebSocket("ws://localhost:9090/Lab2_war_exploded/echo")
            wsocket.onopen = onOpen;
            wsocket.onmessage = onMessage;
        }

        openConnection();

        function sendMsg(msg) {
            msg = "dummyMsg";
            wsocket.send(msg);
        }

        function onMessage(evt) {
            console.log("received: " + evt.data);
        }

        function onOpen() {
            console.log("Connection opened");
        }

    </script>
</footer>
</body>
</html>