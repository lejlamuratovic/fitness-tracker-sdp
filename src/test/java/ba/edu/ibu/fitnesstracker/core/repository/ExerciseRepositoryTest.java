package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.Exercise;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class ExerciseRepositoryTest {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Test
    public void shouldReturnAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAll();

        assertEquals(4, exercises.size());
        assertEquals("Bicep Curl", exercises.get(0).getName());
    }

    @Test
    public void shouldFindExerciseById() {
        Optional<Exercise> exercise = exerciseRepository.findById("653537c3c284210ab5b9e620");
        assertNotNull(exercise.orElse(null));
    }
}
