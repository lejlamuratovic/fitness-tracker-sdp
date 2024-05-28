package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.service.ScheduledRoutineService;
import ba.edu.ibu.fitnesstracker.rest.dto.ScheduledRoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.ScheduledRoutineRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/scheduled-routines")
@SecurityRequirement(name = "JWT Security")
public class ScheduledRoutinesController {
    private ScheduledRoutineService scheduledRoutinesService;

    public ScheduledRoutinesController(ScheduledRoutineService scheduledRoutinesService) {
        this.scheduledRoutinesService = scheduledRoutinesService;
    }

    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/")
    public ScheduledRoutineDTO addScheduledRoutine(@RequestBody ScheduledRoutineRequestDTO payload) {
        return this.scheduledRoutinesService.addScheduledRoutine(payload);
    }
}
