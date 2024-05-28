package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.ScheduledRoutine;

import java.time.LocalDateTime;

public class ScheduledRoutineDTO {
    private String id;
    private String userId;
    private String routineId;
    private LocalDateTime scheduledAt;

    public ScheduledRoutineDTO(String id, String userId, String routineId, LocalDateTime scheduledAt) {
        this.id = id;
        this.userId = userId;
        this.routineId = routineId;
        this.scheduledAt = scheduledAt;
    }

    public ScheduledRoutineDTO(ScheduledRoutine routine) {
        this.id = routine.getId();
        this.routineId = routine.getRoutineId();
        this.userId = routine.getUserId();
        this.scheduledAt = routine.getScheduledAt();
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
