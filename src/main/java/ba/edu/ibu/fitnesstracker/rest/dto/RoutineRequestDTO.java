package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import java.util.Date;
import java.util.List;

public class RoutineRequestDTO {

    private String name;
    private List<Routine.ExerciseDetail> exercises;
    private String userId;

    private Boolean isPrivate;

    public RoutineRequestDTO() { }

    public RoutineRequestDTO(Routine routine) {
        this.name = routine.getName();
        this.exercises = routine.getExercises();
        this.userId = routine.getUserId();
        this.isPrivate = routine.getIsPrivate();
    }

    public Routine toEntity() {
        Routine routine = new Routine();
        routine.setName(name);
        routine.setExercises(exercises);
        routine.setUserId(userId);
        routine.setCreationDate(new Date());
        routine.setIsPrivate(isPrivate);
        return routine;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
