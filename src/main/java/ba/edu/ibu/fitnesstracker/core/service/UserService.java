package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.repository.UserRepository;
import ba.edu.ibu.fitnesstracker.core.repository.RoutineRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.Collections;
import java.util.ArrayList;

import static java.util.stream.Collectors.toList;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoutineRepository routineRepository;

    public UserService(UserRepository userRepository, RoutineRepository routineRepository) {
        this.userRepository = userRepository;
        this.routineRepository = routineRepository;
    }

    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();

        return users
                .stream()
                .map(UserDTO::new)
                .collect(toList());
    }

    public UserDTO getUserById(String id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User with the given ID does not exist.");
        }

        return new UserDTO(user.get());
    }

    public UserDTO addUser(UserRequestDTO payload) {
        User user = userRepository.save(payload.toEntity());
        return new UserDTO(user);
    }

    public UserDTO updateUser(String id, UserRequestDTO payload) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isEmpty()) {
            throw new ResourceNotFoundException("User with the given ID does not exist.");
        }

        User existingUser = existingUserOpt.get();

        // update only fields that are present in the payload (in this case name)
        if (payload.getFirstName() != null) {
            existingUser.setFirstName(payload.getFirstName());
        }
        if (payload.getLastName() != null) {
            existingUser.setLastName(payload.getLastName());
        }

        // save the updated user
        User updatedUser = userRepository.save(existingUser);
        return new UserDTO(updatedUser);
    }

    public void deleteUser(String id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(userRepository::delete);
    }

    public List<RoutineDTO> getFavoriteRoutines(String userId) {
        Optional<User> user = userRepository.findById(userId);

        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User with the given ID does not exist.");
        }

        List<Routine> favoriteRoutines = user.get().getFavoriteRoutines();

        if (favoriteRoutines == null) {
            return Collections.emptyList();
        }

        return favoriteRoutines.stream()
                .map(RoutineDTO::new)
                .collect(toList());
    }

    public void addRoutineToFavorites(String userId, String routineId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<Routine> favorites = user.getFavoriteRoutines();

        if (favorites == null) {
            favorites = new ArrayList<>();
            user.setFavoriteRoutines(favorites);
        }

        boolean routineAlreadyFavorited = favorites.stream()
                .anyMatch(routine -> routine.getId().equals(routineId));

        if (!routineAlreadyFavorited) {
            Routine routine = routineRepository.findById(routineId)
                    .orElseThrow(() -> new ResourceNotFoundException("Routine not found with id: " + routineId));
            favorites.add(routine);
            userRepository.save(user);
        } else {
            throw new IllegalStateException("Routine is already in the list of favorites.");
        }
    }


    public void removeRoutineFromFavorites(String userId, String routineId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(("User not found with id: " + userId)));

        List<Routine> favorites = user.getFavoriteRoutines();

        Optional<Routine> routineToRemove = favorites.stream()
                .filter(routine -> routine.getId().equals(routineId))
                .findFirst();

        if (routineToRemove.isPresent()) {
            favorites.remove(routineToRemove.get());
            userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("Routine is not in favorites list.");
        }
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                return userRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }
}
