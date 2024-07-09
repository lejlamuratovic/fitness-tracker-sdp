package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.ScheduledRoutine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduledRoutineRepository extends MongoRepository<ScheduledRoutine, String> {
        @Query("{ 'scheduledAt' : { $gte: ?0, $lt: ?1 } }")
        List<ScheduledRoutine> findRoutinesWithinMinute(LocalDateTime start, LocalDateTime end);
}
