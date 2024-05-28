package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.service.WorkoutLogService;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/workoutlogs")
@SecurityRequirement(name = "JWT Security")
public class WorkoutLogController {

    private final WorkoutLogService workoutLogService;

    public WorkoutLogController(WorkoutLogService workoutLogService) {
        this.workoutLogService = workoutLogService;
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public ResponseEntity<List<WorkoutLogDTO>> getWorkoutLogs() {
        return ResponseEntity.ok(workoutLogService.getWorkoutLogs());
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/")
    public ResponseEntity<WorkoutLogDTO> register(@RequestBody WorkoutLogRequestDTO WorkoutLog) {
        return ResponseEntity.ok(workoutLogService.addWorkoutLog(WorkoutLog));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<WorkoutLogDTO> getWorkoutLogById(@PathVariable String id) {
        return ResponseEntity.ok(workoutLogService.getWorkoutLogById(id));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public ResponseEntity<WorkoutLogDTO> updateWorkoutLog(@PathVariable String id,
            @RequestBody WorkoutLogRequestDTO WorkoutLog) {
        return ResponseEntity.ok(workoutLogService.updateWorkoutLog(id, WorkoutLog));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public ResponseEntity<Void> deleteWorkoutLog(@PathVariable String id) {
        workoutLogService.deleteWorkoutLog(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // to get a list of workout logs per user

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/user/{userId}")
    public ResponseEntity<List<WorkoutLogDTO>> getWorkoutLogsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(workoutLogService.getWorkoutLogsByUserId(userId));
    }
}
