package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.model.Exercise;
import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import ba.edu.ibu.fitnesstracker.core.repository.ExerciseRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.ExerciseDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.ExerciseRequestDTO;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureMockMvc
@SpringBootTest
public class ExerciseServiceTest {

    @MockBean
    ExerciseRepository exerciseRepository;

    @Autowired
    ExerciseService exerciseService;

    @Test
    public void shouldReturnExerciseById() {
        Exercise exercise = new Exercise();

        exercise.setId("someId");
        exercise.setName("Bicep curl");
        exercise.setDescription("Some description");
        exercise.setMuscleGroup(ExerciseGroup.BICEPS);

        Mockito.when(exerciseRepository.findById("someId")).thenReturn(Optional.of(exercise));

        ExerciseDTO foundExercise = exerciseService.getExerciseById("someId");
        Assertions.assertThat(foundExercise.getName()).isEqualTo("Bicep curl");
    }

    @Test
    public void shouldUpdateExercise() {
        Exercise exercise = new Exercise();
        exercise.setId("someId");
        exercise.setName("Bicep curl");
        exercise.setDescription("Some description");
        exercise.setMuscleGroup(ExerciseGroup.BICEPS);

        Mockito.when(exerciseRepository.findById("someId")).thenReturn(Optional.of(exercise));

        ExerciseRequestDTO updatedExerciseRequest = new ExerciseRequestDTO();
        updatedExerciseRequest.setName("Updated Bicep curl");
        updatedExerciseRequest.setDescription("Updated description");

        Exercise updatedExerciseEntity = new Exercise();
        updatedExerciseEntity.setId("someId");
        updatedExerciseEntity.setName(updatedExerciseRequest.getName());
        updatedExerciseEntity.setDescription(updatedExerciseRequest.getDescription());
        updatedExerciseEntity.setMuscleGroup(ExerciseGroup.TRICEPS);

        Mockito.when(exerciseRepository.save(ArgumentMatchers.any(Exercise.class))).thenReturn(updatedExerciseEntity);

        ExerciseDTO updatedExercise = exerciseService.updateExercise("someId", updatedExerciseRequest);

        assertThat(updatedExercise.getName()).isEqualTo("Updated Bicep curl");
        assertThat(updatedExercise.getDescription()).isEqualTo("Updated description");
    }
}
