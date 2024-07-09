package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.service.AuthService;
import ba.edu.ibu.fitnesstracker.core.service.UserService;
import ba.edu.ibu.fitnesstracker.rest.dto.PasswordRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.RoutineDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@SecurityRequirement(name = "JWT Security")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, path = "/")
    public ResponseEntity<UserDTO> register(@RequestBody UserRequestDTO user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @RequestBody UserRequestDTO user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/password/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable String id, @RequestBody PasswordRequestDTO passwordUpdateRequest) {
        try {
            authService.updateUserPassword(id, passwordUpdateRequest);
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    @RequestMapping(method = RequestMethod.GET, path="/{id}/favorite-routines")
    public ResponseEntity<List<RoutineDTO>> getFavoriteRoutines(@PathVariable String id) {
        return ResponseEntity.ok(userService.getFavoriteRoutines(id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    @RequestMapping(method = RequestMethod.PUT, path="/{userId}/add-favorite/{routineId}")
    public ResponseEntity<Void> addRoutineToFavorites(@PathVariable String userId, @PathVariable String routineId) {
        userService.addRoutineToFavorites(userId, routineId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    @RequestMapping(method = RequestMethod.PUT, path="/{userId}/remove-favorite/{routineId}")
    public ResponseEntity<Void> removeRoutineFromFavorites(@PathVariable String userId, @PathVariable String routineId) {
        userService.removeRoutineFromFavorites(userId, routineId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}