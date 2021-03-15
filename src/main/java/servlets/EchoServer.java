package servlets;


import com.google.gson.Gson;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import manager.ChatManager;
import models.Message;
import models.User;

import java.io.IOException;

@ServerEndpoint("/echo")
public class EchoServer {
    static int i = 1;

    @OnOpen
    public void onOpen(Session session) {
        System.out.println(session.getId() + " has opened a connection");
        ChatManager.getInstance().add(session, new User("user" + EchoServer.i, "gender" + EchoServer.i));
        EchoServer.i++;
        ChatManager.getInstance().notifyWithOnline();
        ChatManager.getInstance().notifyWithMsgs();
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Message from " + session.getId() + " : " + message);
//        User currentUser = ChatManager.getInstance().getUsersMap().get(session);
        Message receivedMsg = new Gson().fromJson(message, Message.class);
        if (receivedMsg.isMsg()) {
            ChatManager.getInstance().addMsg(receivedMsg);
            ChatManager.getInstance().getUsersMap().forEach((otherSession, user) -> {
                try {
                    if (otherSession != session) {
                        receivedMsg.setOrientation("left");
                    } else {
                        receivedMsg.setOrientation("right");
                    }
                    otherSession.getBasicRemote().sendText(new Gson().toJson(receivedMsg));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        } else {
            ChatManager.getInstance().getUsersMap().get(session).setName(receivedMsg.getSender());
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println(session.getId() + " has closed a connection");
        ChatManager.getInstance().getUsersMap().remove(session);
        ChatManager.getInstance().notifyWithOnline();
    }

}