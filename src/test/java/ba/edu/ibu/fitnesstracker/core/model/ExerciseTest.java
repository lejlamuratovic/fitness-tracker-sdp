package ba.edu.ibu.fitnesstracker.core.model;

import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExerciseTest {
    @Test
    void shouldCreateNewExercise() {
        Exercise exercise = new Exercise(
             "idExample",
             "Lat pulldown",
             ExerciseGroup.LATS,
                "Some Description",
                "imageUrl");

        assertEquals("Lat pulldown", exercise.getName());
        assertEquals(ExerciseGroup.LATS, exercise.getMuscleGroup());
    }

    @Test
    void shouldCompareTwoExercises() {
        Exercise exercise1 = new Exercise(
                "idExample",
                "Lat pulldown",
                ExerciseGroup.LATS,
                "Some Description",
                "imageUrl");

        Exercise exercise2 = new Exercise(
                "idExample",
                "Lat pulldown",
                ExerciseGroup.LATS,
                "Some Description",
                "imageUrl");

        assertThat(exercise1)
                .usingRecursiveComparison()
                .isEqualTo(exercise2);
    }

    @Test
    void shouldCreateNewExerciseWithAssetJ() {
        Exercise exercise = new Exercise(
                "idExample",
                "Lat pulldown",
                ExerciseGroup.LATS,
                "Some Description",
                "imageUrl");

        assertThat(exercise.getName()).startsWith("L").endsWith("n").contains("do").isEqualTo("Lat pulldown").isEqualToIgnoringCase("lAt pUlldown");
    }
}
