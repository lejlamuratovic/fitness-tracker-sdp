package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.repository.UserRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserDTO signUp(UserRequestDTO userRequestDTO) {
        // check if user already exists with the given email
        userRepository.findByEmail(userRequestDTO.getEmail())
                .ifPresent(u -> {
                    throw new IllegalStateException("Email already in use");
                });

        // create new user if not
        userRequestDTO.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        User user = userRequestDTO.toEntity();

        // set confirmation token and active status
        String token = UUID.randomUUID().toString();
        user.setConfirmationToken(token);
        user.setActive(false);

        // save user to repository
        userRepository.save(user);

        // log the saved user
        logger.info("User saved with id: {}, token: {}", user.getId(), user.getConfirmationToken());

        // send confirmation email
        emailService.sendConfirmationEmail(user);

        return new UserDTO(user);
    }

    public LoginDTO signIn(LoginRequestDTO loginRequestDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
        );
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("This user does not exist."));

        String jwt = jwtService.generateToken(user, user.getId(), user.getUserType()); // passing the user ID and usertype

        return new LoginDTO(jwt);
    }

    public boolean updateUserPassword(String id, PasswordRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalStateException("Old password does not match");
        }

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new IllegalStateException("New password cannot be the same as the old password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return true;
    }

    public User confirmUser(String token) {
        User user = userRepository.findByConfirmationToken(token);

        if (user != null) {
            user.setActive(true);
            user.setConfirmationToken(null);
            userRepository.save(user);
        }

        return user;
    }
}