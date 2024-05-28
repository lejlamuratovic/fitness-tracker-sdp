package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.service.RoutineService;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.WorkoutLogDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/routines")
@SecurityRequirement(name = "JWT Security")
public class RoutineController {

    private final RoutineService routineService;

    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public ResponseEntity<List<RoutineDTO>> getRoutines() {
        return ResponseEntity.ok(routineService.getRoutines());
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/")
    public ResponseEntity<RoutineDTO> addRoutine(@RequestBody RoutineRequestDTO routine) {
        return ResponseEntity.ok(routineService.addRoutine(routine));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<RoutineDTO> getRoutineById(@PathVariable String id) {
        return ResponseEntity.ok(routineService.getRoutineById(id));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public ResponseEntity<RoutineDTO> updateRoutine(@PathVariable String id, @RequestBody RoutineRequestDTO routine) {
        return ResponseEntity.ok(routineService.updateRoutine(id, routine));
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable String id) {
        routineService.deleteRoutine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // to transfer array of exercises from routine to workout log
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/{id}/complete/{userId}")
    public ResponseEntity<WorkoutLogDTO> markRoutineAsDone(@PathVariable String id,
            @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX") @RequestBody Date dateCompleted, @PathVariable String userId) {
        return ResponseEntity.ok(routineService.markRoutineAsDone(id, dateCompleted, userId));
    }

    // to append a certain exercise to a given routine
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/{id}/exercises")
    public ResponseEntity<RoutineDTO> addExerciseToRoutine(@PathVariable String id,
            @RequestBody Routine.ExerciseDetail exerciseDetail) {
        return ResponseEntity.ok(routineService.addExerciseToRoutine(id, exerciseDetail));
    }

    // to get a list of routines per user
    @PreAuthorize("hasAuthority('MEMBER')")
    @RequestMapping(method = RequestMethod.GET, path = "/user/{userId}")
    public ResponseEntity<List<RoutineDTO>> getRoutinesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(routineService.getRoutinesByUserId(userId));
    }

    // to update specific exercise detail inside a routine
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, path = "/{routineId}/exercises/{exerciseDetailId}")
    public ResponseEntity<RoutineDTO> updateExerciseInRoutine(@PathVariable String routineId,
            @PathVariable String exerciseDetailId, @RequestBody Routine.ExerciseDetail updatedExerciseDetail) {
        return ResponseEntity
                .ok(routineService.updateExerciseInRoutine(routineId, exerciseDetailId, updatedExerciseDetail));
    }

    // to delete a specific exercise detail inside a routine
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{routineId}/exercises/{exerciseDetailId}")
    public ResponseEntity<RoutineDTO> deleteExerciseInRoutine(@PathVariable String routineId,
            @PathVariable String exerciseDetailId) {
        return ResponseEntity.ok(routineService.deleteExerciseInRoutine(routineId, exerciseDetailId));
    }

    // to list all exercises per routine
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/{routineId}/exercises")
    public ResponseEntity<List<Routine.ExerciseDetail>> getExercisesInRoutine(@PathVariable String routineId) {
        return ResponseEntity.ok(routineService.getExercisesInRoutine(routineId));
    }

    // to get a list of all public routines

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path="/public")
    public ResponseEntity<List<RoutineDTO>> getPublicRoutines() {
        return ResponseEntity.ok(routineService.getPublicRoutines());
    }
}
