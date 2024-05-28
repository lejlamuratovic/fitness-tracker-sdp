package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.exceptions.repository.NotificationException;
import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.api.impl.external.AmazonClient;
import ba.edu.ibu.fitnesstracker.core.model.Exercise;
import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import ba.edu.ibu.fitnesstracker.core.repository.ExerciseRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.ExerciseDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.ExerciseRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final NotificationService notificationService;
    private final AmazonClient amazonClient;

    public ExerciseService(ExerciseRepository exerciseRepository, NotificationService notificationService, AmazonClient amazonClient) {
        this.exerciseRepository = exerciseRepository;
        this.notificationService = notificationService;
        this.amazonClient = amazonClient;
    }

    public List<ExerciseDTO> getExercises() {
        List<Exercise> users = exerciseRepository.findAll();

        return users
                .stream()
                .map(ExerciseDTO::new)
                .collect(toList());
    }

    public ExerciseDTO getExerciseById(String id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);

        if (exercise.isEmpty()) {
            throw new ResourceNotFoundException("Exercise with the given ID does not exist.");
        }

        return new ExerciseDTO(exercise.get());
    }

    public ExerciseDTO addExercise(ExerciseRequestDTO payload) {
        Exercise exercise = payload.toEntity();

        MultipartFile imageFile = payload.getImage();

        try {
            String imageUrl = amazonClient.uploadFile(imageFile);
            exercise.setImageUrl(imageUrl);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        try {
            notificationService.broadcastMessage("New exercise added: " + exercise.getName());
        } catch (Exception e) {
            throw new NotificationException("Failed to broadcast message for new exercise", e);
        }

        Exercise savedExercise = exerciseRepository.save(exercise);

        return new ExerciseDTO(savedExercise);
    }

    public ExerciseDTO updateExercise(String id, ExerciseRequestDTO payload) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);

        if (exercise.isEmpty()) {
            throw new ResourceNotFoundException("Exercise with the given ID does not exist.");
        }

        Exercise existingExercise = exercise.get();

        existingExercise.setName(payload.getName());
        existingExercise.setMuscleGroup(payload.getMuscleGroup());
        existingExercise.setDescription(payload.getDescription());

        MultipartFile newImageFile = payload.getImage();
        if (newImageFile != null && !newImageFile.isEmpty()) {
            try {
                String imageUrl = amazonClient.uploadFile(newImageFile);
                existingExercise.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload the new image to AWS S3.", e);
            }
        }

        Exercise updatedExercise = exerciseRepository.save(existingExercise);
        return new ExerciseDTO(updatedExercise);
    }


    public void deleteExercise(String id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        exercise.ifPresent(exerciseRepository::delete);
    }

    public List<ExerciseDTO> findByMuscleGroup(ExerciseGroup group) {
        List<Exercise> exercises = exerciseRepository.findExercisesByMuscleGroup(group);

        return exercises
                .stream()
                .map(ExerciseDTO::new)
                .collect(toList());
    }

    public String findExerciseNameById(String exerciseId) {
        Optional<Exercise> exerciseOptional = exerciseRepository.findById(exerciseId);

        if (exerciseOptional.isEmpty()) {
            throw new ResourceNotFoundException("Exercise with the given ID does not exist.");
        }

        ExerciseDTO exerciseDto = new ExerciseDTO(exerciseOptional.get());
        return exerciseDto.getName();
    }
}
