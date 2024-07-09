package ba.edu.ibu.fitnesstracker.core.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document
public class ScheduledRoutine {
    @Id
    private String id;
    private String userId;
    private String routineId;
    private LocalDateTime scheduledAt;

    public ScheduledRoutine() {
    }

    public ScheduledRoutine(String id, String userId, String routineId, LocalDateTime scheduledAt) {
        this.id = id;
        this.userId = userId;
        this.routineId = routineId;
        this.scheduledAt = scheduledAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoutineId() {
        return routineId;
    }

    public void setRoutineId(String routineId) {
        this.routineId = routineId;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }
}
