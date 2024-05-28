package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.ScheduledRoutine;

import java.time.LocalDateTime;

public class ScheduledRoutineRequestDTO {
    private String id;
    private String userId;
    private String routineId;
    private LocalDateTime scheduledAt;

    public ScheduledRoutineRequestDTO() { }

    public ScheduledRoutineRequestDTO(ScheduledRoutine routine) {
        this.id = routine.getId();
        this.userId = routine.getUserId();
        this.routineId = routine.getRoutineId();
        this.scheduledAt = routine.getScheduledAt();
    }

    public ScheduledRoutine toEntity() {
        ScheduledRoutine routine = new ScheduledRoutine();

        routine.setUserId(userId);
        routine.setRoutineId(routineId);
        routine.setScheduledAt(scheduledAt);

        return routine;
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
