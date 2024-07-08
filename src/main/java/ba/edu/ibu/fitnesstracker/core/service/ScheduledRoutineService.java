package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.model.ScheduledRoutine;
import ba.edu.ibu.fitnesstracker.core.repository.ScheduledRoutineRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.ScheduledRoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.ScheduledRoutineRequestDTO;
import org.springframework.stereotype.Service;

@Service
public class ScheduledRoutineService {
    private final ScheduledRoutineRepository scheduledRoutineRepository;

    public ScheduledRoutineService(ScheduledRoutineRepository scheduledRoutinesRepository) {
        this.scheduledRoutineRepository = scheduledRoutinesRepository;
    }

    public ScheduledRoutineDTO addScheduledRoutine(final ScheduledRoutineRequestDTO payload) {
        ScheduledRoutine scheduledRoutine = this.scheduledRoutineRepository.save(payload.toEntity());

        return new ScheduledRoutineDTO(scheduledRoutine);
    }
}
