package manager;

import jakarta.websocket.Session;
import models.User;

import java.util.HashMap;
import java.util.Map;

public class ChatManager {
    private static final ChatManager instance = new ChatManager();
    private final Map<Session, User> usersMap = new HashMap<>();

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
}
