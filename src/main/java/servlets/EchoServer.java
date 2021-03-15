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
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Message from " + session.getId() + " : " + message);
        User currentUser = ChatManager.getInstance().getUsersMap().get(session);
        ChatManager.getInstance().getUsersMap().forEach((otherSession, user) -> {
            try {
                if (otherSession != session) {
                    Message receivedMsg = new Gson().fromJson(message, Message.class);

                    otherSession.getBasicRemote().sendText(message + " from " + currentUser.getName());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println(session.getId() + " has closed a connection");
        ChatManager.getInstance().getUsersMap().remove(session);
        ChatManager.getInstance().notifyWithOnline();
    }

}