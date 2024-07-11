package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.ActionLog;
import ba.edu.ibu.fitnesstracker.core.model.enums.ActionType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionLogRepository extends MongoRepository<ActionLog, String> {
    public int countActionLogsByIpAddressAndActionAndUserEmail(String count, ActionType action, String email);
    public void deleteActionLogsByIpAddressAndActionAndUserEmail(String count, ActionType action, String email);
}
