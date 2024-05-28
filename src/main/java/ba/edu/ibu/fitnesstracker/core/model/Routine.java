package ba.edu.ibu.fitnesstracker.core.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.UUID;

import java.util.Date;
import java.util.List;

@Document
public class Routine {

    @Id
    private String id;
    private String name;
    private List<ExerciseDetail> exercises;
    private String userId;
    private Date creationDate;

    private Boolean isPrivate;

    private int likes;

    public Routine() {
    }

    public Routine(String id, String name, List<ExerciseDetail> exercises, String userId, Date creationDate, Boolean isPrivate, int likes) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
        this.userId = userId;
        this.creationDate = creationDate;
        this.isPrivate = isPrivate;
        this.likes = likes;
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

    public List<ExerciseDetail> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDetail> exercises) {
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

    // nested static class for array of exercises in the routine and their details
    /*
     * {
     * "_id": "RoutineID",
     * "name": "Upper Body Routine",
     * "userId": "userID",
     * "exercises": [
     * {
     * "exerciseId": "excerciseID",
     * "weight": 50,
     * "sets": 4,
     * "reps": 8
     * },
     * {
     * "exerciseId": "excerciseID",
     * "weight": 60,
     * "sets": 3,
     * "reps": 10
     * }
     * ],
     * "creationDate": "2023-10-21T10:30:45Z"
     * }
     */

    public static class ExerciseDetail {
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        private String detailId; // uniquely identify the exercise detail
        private String exerciseId;
        private String exerciseName;
        private double weight;
        private int sets;
        private int reps;

        // ??
        public ExerciseDetail() {
            this.detailId = UUID.randomUUID().toString(); // generate a random unique identifier
        }

        public ExerciseDetail(String detailId, String exerciseId, double weight, int sets, int reps) {
            this.detailId = detailId;
            this.exerciseId = exerciseId;
            this.weight = weight;
            this.sets = sets;
            this.reps = reps;
        }

        public String getExerciseId() {
            return exerciseId;
        }

        public void setExerciseId(String exerciseId) {
            this.exerciseId = exerciseId;
        }

        public double getWeight() {
            return weight;
        }

        public void setWeight(double weight) {
            this.weight = weight;
        }

        public int getSets() {
            return sets;
        }

        public void setSets(int sets) {
            this.sets = sets;
        }

        public int getReps() {
            return reps;
        }

        public void setReps(int reps) {
            this.reps = reps;
        }

        public String getDetailId() {
            return detailId;
        }

        public void setDetailId(String detailId) {
            this.detailId = detailId;
        }

        public String getExerciseName() {
            return exerciseName;
        }

        public void setExerciseName(String exerciseName) {
            this.exerciseName = exerciseName;
        }
    }
}
