package ba.edu.ibu.fitnesstracker.rest.websockets;

import ba.edu.ibu.fitnesstracker.core.exceptions.GeneralException;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.service.JwtService;
import ba.edu.ibu.fitnesstracker.core.service.UserService;
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

    public MainSocketHandler(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("WebSocket connection established with session ID: " + session.getId()); // Debugging
        User user = getUser(session);
        if (user == null) {
            System.out.println("User not found or token invalid for session ID: " + session.getId()); // Debugging
            return;
        }

        sessions.put(user.getId(), session);
        System.out.println(
                "Session created for the user " + user.getId() + " where the session id is " + session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.out.println("Transport error for session " + session.getId() + ": " + exception.getMessage()); // Debugging
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        System.out.println("Connection closed for session " + session.getId() + ". Close status: " + closeStatus); // Debugging
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String messageReceived = (String) message.getPayload();
        System.out.println("Message received: " + messageReceived + " from session ID: " + session.getId()); // Debugging
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

    public void sendMessage(String userId, String message) {
        WebSocketSession session = sessions.get(userId);
        if (session == null) {
            System.out.println("Session not found for user ID: " + userId); // Debugging
            return;
        }

        try {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            } else {
                System.out.println("Cannot send message. Session closed for user ID: " + userId); // Debugging
            }
        } catch (IOException e) {
            System.out.println("Error sending message to user ID: " + userId + ": " + e.getMessage()); // Debugging
            throw new GeneralException(e);
        }
    }

    /*
     * private User getUser(WebSocketSession session) throws IOException {
     * List<String> headers =
     * session.getHandshakeHeaders().getOrEmpty("authorization");
     * 
     * if (headers.isEmpty()) {
     * System.out.println("Authorization header missing in session ID: " +
     * session.getId()); // Debugging
     * session.close();
     * return null;
     * }
     * 
     * String jwt = headers.get(0).substring(7);
     * String userEmail = jwtService.extractUserName(jwt);
     * 
     * UserDetails userDetails =
     * userService.userDetailsService().loadUserByUsername(userEmail);
     * if (userDetails == null) {
     * System.out.println("User details not found for JWT: " + jwt); // Debugging
     * session.close();
     * return null;
     * }
     * 
     * return (User) userDetails;
     * }
     */

    private User getUser(WebSocketSession session) throws IOException {
        URI uri = session.getUri();
        if (uri == null) {
            System.out.println("URI is null in session ID: " + session.getId());
            session.close();
            return null;
        }

        String query = uri.getQuery();
        String[] params = query.split("&");
        String token = null;
        for (String param : params) {
            if (param.startsWith("token=")) {
                token = param.split("=")[1];
                break;
            }
        }

        if (token == null) {
            System.out.println("Token not found in URI query for session ID: " + session.getId());
            session.close();
            return null;
        }

        String userEmail = jwtService.extractUserName(token);
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
        if (userDetails == null) {
            System.out.println("User details not found for JWT: " + token);
            session.close();
            return null;
        }

        return (User) userDetails;
    }

}
