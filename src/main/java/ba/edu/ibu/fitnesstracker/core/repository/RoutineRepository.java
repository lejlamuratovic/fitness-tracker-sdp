package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoutineRepository extends MongoRepository<Routine, String> {
    List<Routine> findRoutinesByUserId(String userId);
    List<Routine> findByIsPrivateFalse();
}
