package ba.edu.ibu.fitnesstracker.core.model;

import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Exercise {

    @Id
    private String id;
    private String name;
    private ExerciseGroup muscleGroup;
    private String description;
    private String imageUrl;

    public Exercise() { }

    public Exercise(String id, String name, ExerciseGroup muscleGroup, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.description = description;
        this.imageUrl = imageUrl;
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

    public ExerciseGroup getMuscleGroup() {
        return muscleGroup;
    }

    public void setMuscleGroup(ExerciseGroup muscleGroup) {
        this.muscleGroup = muscleGroup;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
