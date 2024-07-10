package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.ActionLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionLogRepository extends MongoRepository<ActionLog, String> {
}
