package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class RoutineRepositoryTest {
    @Autowired
    private RoutineRepository routineRepository;

    /*
    @Order(1)
    @Test
    public void shouldSaveAndRetrieveRoutine() {
        Routine newRoutine =
                new Routine(
                "someId",
                "pull day",
                List.of(
                        new Routine.ExerciseDetail("detailID", "exerciseID", 50, 12, 12),
                        new Routine.ExerciseDetail("detailID", "exerciseID", 50, 12, 12)
                ),
                "someUserId",
                new Date(),
                        true,
                        likes);

        routineRepository.save(newRoutine);

        Optional<Routine> retrievedRoutine = routineRepository.findById(newRoutine.getId());
        assertTrue(retrievedRoutine.isPresent());
        assertEquals(newRoutine.getName(), retrievedRoutine.get().getName());
    }

    @Order(2)
    @Test
    public void shouldDeleteRoutine() {
        String routineIdToDelete = "someId";
        routineRepository.deleteById(routineIdToDelete);

        Optional<Routine> deletedExercise = routineRepository.findById(routineIdToDelete);
        assertFalse(deletedExercise.isPresent());
    }
*/
}
