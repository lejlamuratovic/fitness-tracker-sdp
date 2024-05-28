package ba.edu.ibu.fitnesstracker.core.repository;

import ba.edu.ibu.fitnesstracker.core.model.Exercise;
import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findExercisesByMuscleGroup(ExerciseGroup group);
}
