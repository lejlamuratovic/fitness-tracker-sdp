package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    User findByConfirmationToken(String confirmationToken);
}
