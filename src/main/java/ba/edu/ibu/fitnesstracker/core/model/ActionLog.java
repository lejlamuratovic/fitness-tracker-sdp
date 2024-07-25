package ba.edu.ibu.fitnesstracker.core.model;

import ba.edu.ibu.fitnesstracker.core.model.enums.ActionType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public class ActionLog {

    @Id
    private String id;
    private String userEmail;
    private ActionType action;
    private LocalDateTime timestamp;
    private String ipAddress;

    public ActionLog(String userEmail, ActionType action, LocalDateTime timestamp, String ipAddress) {
        this.userEmail = userEmail;
        this.action = action;
        this.timestamp = timestamp;
        this.ipAddress = ipAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public ActionType getAction() {
        return action;
    }

    public void setAction(ActionType action) {
        this.action = action;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}
