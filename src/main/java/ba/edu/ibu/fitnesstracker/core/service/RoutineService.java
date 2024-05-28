package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.repository.RoutineRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogRequestDTO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final WorkoutLogService workoutLogService;

    public RoutineService(RoutineRepository routineRepository, WorkoutLogService workoutLogService) {
        this.routineRepository = routineRepository;
        this.workoutLogService = workoutLogService;
    }

    public List<RoutineDTO> getRoutines() {
        List<Routine> routines = routineRepository.findAll();

        return routines
                .stream()
                .map(RoutineDTO::new)
                .collect(toList());
    }

    public RoutineDTO addRoutine(RoutineRequestDTO payload) {
        Routine routine = routineRepository.save(payload.toEntity());
        return new RoutineDTO(routine);
    }

    public RoutineDTO getRoutineById(String id) {
        Optional<Routine> routine = routineRepository.findById(id);

        if (routine.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        return new RoutineDTO(routine.get());
    }

    public RoutineDTO updateRoutine(String id, RoutineRequestDTO payload) {
        Optional<Routine> routine = routineRepository.findById(id);

        if (routine.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        Routine updatedRoutine = payload.toEntity();
        updatedRoutine.setId(routine.get().getId());
        updatedRoutine = routineRepository.save(updatedRoutine);
        return new RoutineDTO(updatedRoutine);
    }

    public void deleteRoutine(String id) {
        Optional<Routine> routine = routineRepository.findById(id);
        routine.ifPresent(routineRepository::delete);
    }

    public WorkoutLogDTO markRoutineAsDone(String routineId, Date dateCompleted, String userId) {
        RoutineDTO routine = getRoutineById(routineId);

        WorkoutLogRequestDTO logRequest = new WorkoutLogRequestDTO();
        logRequest.setExercises(routine.getExercises());
        logRequest.setUserId(userId);
        logRequest.setDateCompleted(dateCompleted);

        return workoutLogService.addWorkoutLog(logRequest);
    }

    public RoutineDTO addExerciseToRoutine(String routineId, Routine.ExerciseDetail exerciseDetail) {
        Optional<Routine> routineOptional = routineRepository.findById(routineId);
        if (routineOptional.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        Routine routine = routineOptional.get();
        // initialize the exercises list if it's null
        List<Routine.ExerciseDetail> currentExercises = (routine.getExercises() == null) ? new ArrayList<>() : routine.getExercises();
        currentExercises.add(exerciseDetail); // append the new exercise
        routine.setExercises(currentExercises); // set the updated list
        Routine updatedRoutine = routineRepository.save(routine); // save the updated routine
        return new RoutineDTO(updatedRoutine);
    }


    public List<RoutineDTO> getRoutinesByUserId(String userId) {
        List<Routine> routines = routineRepository.findRoutinesByUserId(userId);
        return routines.
                stream().
                map(RoutineDTO::new).
                collect(toList());
    }

    public RoutineDTO updateExerciseInRoutine(String routineId, String exerciseDetailId, Routine.ExerciseDetail updatedExerciseDetail) {
        Optional<Routine> routineOptional = routineRepository.findById(routineId);

        if (routineOptional.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        Routine routine = routineOptional.get();
        List<Routine.ExerciseDetail> currentExercises = routine.getExercises();

        // find the index of the exercise detail with the given ID
        int indexOfExerciseDetail = findIndexOfExerciseDetails(exerciseDetailId, currentExercises);

        // update the founded exercise detail
        currentExercises.set(indexOfExerciseDetail, updatedExerciseDetail);

        routine.setExercises(currentExercises);
        Routine updatedRoutine = routineRepository.save(routine);

        return new RoutineDTO(updatedRoutine);
    }

    public RoutineDTO deleteExerciseInRoutine(String routineId, String exerciseDetailId) {
        Optional<Routine> routineOptional = routineRepository.findById(routineId);

        if (routineOptional.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        Routine routine = routineOptional.get();
        List<Routine.ExerciseDetail> currentExercises = routine.getExercises();

        // find the index of the exercise detail with the given ID
        int indexOfExerciseDetail = findIndexOfExerciseDetails(exerciseDetailId, currentExercises);

        // update the founded exercise detail
        currentExercises.remove(indexOfExerciseDetail);

        routine.setExercises(currentExercises);
        Routine updatedRoutine = routineRepository.save(routine);

        return new RoutineDTO(updatedRoutine);
    }

    // helper method to find the index of the exercise detail with the given ID
    private int findIndexOfExerciseDetails(String exerciseDetailId, List<Routine.ExerciseDetail> currentExercises) {
        int indexOfExerciseDetail = -1;

        for (int i = 0; i < currentExercises.size(); i++) {
            if (currentExercises.get(i).getDetailId().equals(exerciseDetailId)) {
                indexOfExerciseDetail = i;
                break;
            }
        }

        if (indexOfExerciseDetail == -1) {
            throw new ResourceNotFoundException("Exercise detail with the given ID not found in the routine.");
        }

        return indexOfExerciseDetail;
    }

    public List<Routine.ExerciseDetail> getExercisesInRoutine(String routineId) {
        Optional<Routine> routineOptional = routineRepository.findById(routineId);

        if (routineOptional.isEmpty()) {
            throw new ResourceNotFoundException("Routine with the given ID does not exist.");
        }

        Routine routine = routineOptional.get();
        return routine.getExercises();
    }

    public List<RoutineDTO> getPublicRoutines() {
        List<Routine> routines = routineRepository.findByIsPrivateFalse();

        return routines
                .stream()
                .map(RoutineDTO::new)
                .collect(toList());
    }
}
