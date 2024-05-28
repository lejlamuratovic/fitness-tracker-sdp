package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.core.repository.WorkoutLogRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogRequestDTO;
import org.springframework.stereotype.Service;
import ba.edu.ibu.fitnesstracker.core.model.WorkoutLog;

import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
public class WorkoutLogService {

    private final WorkoutLogRepository workoutLogRepository;

    public WorkoutLogService(WorkoutLogRepository workoutLogRepository) {
        this.workoutLogRepository = workoutLogRepository;
    }

    public List<WorkoutLogDTO> getWorkoutLogs() {
        List<WorkoutLog> workoutLogs = workoutLogRepository.findAll();

        return workoutLogs
                .stream()
                .map(WorkoutLogDTO::new)
                .collect(toList());
    }

    public WorkoutLogDTO getWorkoutLogById(String id) {
        Optional<WorkoutLog> workoutLog = workoutLogRepository.findById(id);

        if (workoutLog.isEmpty()) {
            throw new ResourceNotFoundException("Workout Log with the given ID does not exist.");
        }

        return new WorkoutLogDTO(workoutLog.get());
    }

    public WorkoutLogDTO addWorkoutLog(WorkoutLogRequestDTO payload) {
        WorkoutLog workoutLog = workoutLogRepository.save(payload.toEntity());
        return new WorkoutLogDTO(workoutLog);
    }

    public WorkoutLogDTO updateWorkoutLog(String id, WorkoutLogRequestDTO payload) {
        Optional<WorkoutLog> workoutLog = workoutLogRepository.findById(id);

        if (workoutLog.isEmpty()) {
            throw new ResourceNotFoundException("Workout Log with the given ID does not exist.");
        }

        WorkoutLog updatedWorkoutLog = payload.toEntity();
        updatedWorkoutLog.setId(workoutLog.get().getId());
        updatedWorkoutLog = workoutLogRepository.save(updatedWorkoutLog);
        return new WorkoutLogDTO(updatedWorkoutLog);
    }

    public void deleteWorkoutLog(String id) {
        Optional<WorkoutLog> workoutLog = workoutLogRepository.findById(id);
        workoutLog.ifPresent(workoutLogRepository::delete);
    }

    public List<WorkoutLogDTO> getWorkoutLogsByUserId(String userId) {
        List<WorkoutLog> workoutLogs = workoutLogRepository.findWorkoutLogsByUserId(userId);
        return workoutLogs.stream().map(WorkoutLogDTO::new).collect(toList());
    }
}
