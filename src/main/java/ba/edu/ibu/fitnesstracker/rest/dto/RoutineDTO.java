package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.Routine;

import java.util.Date;
import java.util.List;

public class RoutineDTO {
    private String id;
    private String name;
    private List<Routine.ExerciseDetail> exercises;
    private Date creationDate;
    private String userId;
    private Boolean isPrivate;
    private int likes;

    public RoutineDTO(Routine routine) {
        this.id = routine.getId();
        this.name = routine.getName();
        this.exercises = routine.getExercises();
        this.creationDate = routine.getCreationDate();
        this.userId = routine.getUserId();
        this.isPrivate = routine.getIsPrivate();
        this.likes = routine.getLikes();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
