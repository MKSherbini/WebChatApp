package manager;

import com.google.gson.Gson;
import jakarta.websocket.Session;
import models.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChatManager {
    private static final ChatManager instance = new ChatManager();
    private final Map<Session, User> usersMap = new HashMap<>();
    private final List<Session> onlineListeners = new ArrayList<>();

    private ChatManager() {
    }

    public static ChatManager getInstance() {
        return instance;
    }

    public Map<Session, User> getUsersMap() {
        return usersMap;
    }

    public void add(Session session, User user) {
        usersMap.put(session, user);
    }


    public void addListen(Session session) {
        onlineListeners.add(session);
    }

    public void notifyWithOnline() {
        onlineListeners.forEach(session -> {
            try {
                var arr = new Gson().toJson(usersMap.values().stream().map(User::getName).toArray());
                System.out.println("arr = " + arr);
                session.getBasicRemote().sendText(arr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    public List<Session> getOnlineListeners() {
        return onlineListeners;
    }
}
