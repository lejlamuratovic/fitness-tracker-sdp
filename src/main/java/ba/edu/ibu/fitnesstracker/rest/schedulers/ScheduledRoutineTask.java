package ba.edu.ibu.fitnesstracker.rest.schedulers;

import ba.edu.ibu.fitnesstracker.core.model.ScheduledRoutine;
import ba.edu.ibu.fitnesstracker.core.repository.ScheduledRoutineRepository;
import ba.edu.ibu.fitnesstracker.core.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class ScheduledRoutineTask {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledRoutineTask.class);
    private final ScheduledRoutineRepository scheduledRoutineRepository;
    private final NotificationService notificationService;

    public ScheduledRoutineTask(ScheduledRoutineRepository scheduledRoutineRepository, NotificationService notificationService) {
        this.scheduledRoutineRepository = scheduledRoutineRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 * * * * *", zone = "UTC")
    public void getScheduledRoutines() {
        LocalDateTime now = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime oneMinuteLater = now.plusMinutes(1);

        List<ScheduledRoutine> routines = this.scheduledRoutineRepository.findRoutinesWithinMinute(now, oneMinuteLater);

        logger.info("Detected {} scheduled routines that are scheduled within the minute starting at {}", routines.size(), now);

        for (ScheduledRoutine routine : routines) {
            logger.info("Processing routine: {}", routine);
            notificationService.sendMessage(routine.getUserId(),
                    "Reminder: you have a routine scheduled");
        }
    }
}
