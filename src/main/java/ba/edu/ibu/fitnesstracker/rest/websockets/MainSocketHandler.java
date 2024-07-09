package ba.edu.ibu.fitnesstracker.rest.websockets;

import ba.edu.ibu.fitnesstracker.core.exceptions.GeneralException;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.service.JwtService;
import ba.edu.ibu.fitnesstracker.core.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Component
public class MainSocketHandler implements WebSocketHandler {
    private final JwtService jwtService;
    private final UserService userService;
    public Map<String, WebSocketSession> sessions = new HashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(MainSocketHandler.class);

    public MainSocketHandler(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = extractUserIdFromUrl(session);

        if (userId!=null) {
            if(sessions.containsKey(userId)) {
                logger.warn("A WebSocket session for userId: " + userId + " already exists.");

                session.close();
            } else {
                sessions.put(userId, session);

                logger.info("WebSocket session established for userId: " + userId);
            }
        }
    }

    @Override
    public void afterConnectionClosed(final WebSocketSession session, final CloseStatus closeStatus) throws Exception {
        final String userId = extractUserIdFromUrl(session);

        if (userId != null) {
            sessions.remove(userId);

            logger.info("WebSocket session closed for userId: " + userId);
        }
    }

    @Override
    public void handleTransportError(final WebSocketSession session, Throwable exception) throws Exception {
        logger.error("Error happened" + session.getId() + "with reason###" + exception.getMessage());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    public void broadcastMessage(String message) throws IOException {
        sessions.forEach((key, session) -> {
            try {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                } else {
                    System.out.println("Skipping closed session ID: " + session.getId()); // Debugging
                }
            } catch (IOException e) {
                System.out.println("Error sending message to session ID: " + session.getId() + ": " + e.getMessage()); // Debugging
                throw new RuntimeException(e);
            }
        });
    }

    @Override
    public void handleMessage(final WebSocketSession session, final WebSocketMessage<?> message)
            throws Exception {
        final String messageReceived = (String) message.getPayload();
    }

    public void sendMessage(final String userId, String message) {
        final WebSocketSession session = sessions.get(userId);

        if (session == null) {
            return;
        }

        try {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            } else {
                logger.warn("Cannot send message. Session closed for user ID: " + userId);
            }
        } catch (IOException e) {
            throw new GeneralException(e);
        }
    }

    private String extractUserIdFromUrl(final WebSocketSession session) throws IOException {
        final URI uri = session.getUri();

        if (uri == null) {
            logger.error("URI is null in session ID: " + session.getId());

            session.close();
            return null;
        }

        final String query = uri.getQuery();
        String userId = null;

        if (query != null && query.startsWith("userId=")) {
            userId = query.substring("userId=".length());
        }

        logger.info("User ID is:" + userId);

        return userId;
    }

}
