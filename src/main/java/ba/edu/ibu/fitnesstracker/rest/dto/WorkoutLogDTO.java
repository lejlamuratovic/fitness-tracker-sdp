package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.model.WorkoutLog;

import java.util.Date;
import java.util.List;

public class WorkoutLogDTO {

    private String id;

    private Date dateCompleted;

    private List<Routine.ExerciseDetail> exercises;

    private String userId;

    public WorkoutLogDTO(WorkoutLog workoutLog) {
        this.id = workoutLog.getId();
        this.dateCompleted = workoutLog.getDateCompleted();
        this.exercises = workoutLog.getExercises();
        this.userId = workoutLog.getUserId();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(Date dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public List<Routine.ExerciseDetail> getExercises() {
        return exercises;
    }

    public void setExercises(List<Routine.ExerciseDetail> exercises) {
        this.exercises = exercises;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
