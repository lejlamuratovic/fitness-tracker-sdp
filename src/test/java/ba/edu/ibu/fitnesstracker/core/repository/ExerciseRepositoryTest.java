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
    public void shouldFindExerciseById() {
        Optional<Exercise> exercise = exerciseRepository.findById("6626bb6c2262de35b6a9d20d");
        assertNotNull(exercise.orElse(null));
    }
}
