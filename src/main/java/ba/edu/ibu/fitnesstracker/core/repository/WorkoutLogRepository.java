package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.WorkoutLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface WorkoutLogRepository extends MongoRepository<WorkoutLog, String> {
    List<WorkoutLog> findWorkoutLogsByUserId(String userId);

    // find the workout logs within a date range
    @Query("{ 'userId': ?0, 'dateCompleted': { $gte: ?1, $lte: ?2 } }")
    List<WorkoutLog> findWorkoutLogsByUserIdAndDateRange(String userId, Date startDate, Date endDate);
}
