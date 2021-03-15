package endPoints;
import beans.Message;
import com.google.gson.Gson;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;

@ServerEndpoint("/receiveMsg")
public class endPoint {
    @OnOpen
    public void onOpen(Session session){

    }
    @OnMessage
    public void onMessage(String message, Session session){
//        System.out.println(message);
//      Message message1=  new Gson().fromJson(message, Message.class);
//        System.out.println(message1);
        session.getOpenSessions().stream().forEach((e)->{
            try {
                e.getBasicRemote().sendText(message);
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
    }
}
