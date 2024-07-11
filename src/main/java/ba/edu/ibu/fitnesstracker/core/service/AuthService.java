package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.core.model.ActionLog;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.model.enums.ActionType;
import ba.edu.ibu.fitnesstracker.core.repository.ActionLogRepository;
import ba.edu.ibu.fitnesstracker.core.repository.UserRepository;
import ba.edu.ibu.fitnesstracker.rest.dto.*;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final ActionLogRepository actionLogRepository;

    @Value("${captcha.secretKey}")
    private String SECRET_KEY;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private static final int MAX_ATTEMPT = 3;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserRepository userRepository, ActionLogRepository actionLogRepository) {
        this.userRepository = userRepository;
        this.actionLogRepository = actionLogRepository;
    }

    public UserDTO signUp(UserRequestDTO userRequestDTO) throws MessagingException, UnsupportedEncodingException {
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

    public LoginDTO signIn(LoginRequestDTO loginRequestDTO, String ipAddress) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );

            User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("This user does not exist"));

            String jwt = jwtService.generateToken(user, user.getId(), user.getUserType(), user.isActive());

            // reset failed login attempts upon successful login
            resetLoginAttempts(ipAddress, loginRequestDTO.getEmail());

            return new LoginDTO(jwt, user.isActive(), false);
        } catch (Exception e) {
            logAction(loginRequestDTO.getEmail(), ActionType.FAILED_LOGIN, ipAddress);
            throw new Exception("Authentication failed", e);
        }
    }

    public boolean isBlocked(String ip, String email) {
        long count = actionLogRepository.countActionLogsByIpAddressAndActionAndUserEmail(ip, ActionType.FAILED_LOGIN, email);
        logger.info("Count of failed attempts for IP {} and email {}: {}", ip, email, count);
        return count >= MAX_ATTEMPT;
    }

    public void updateUserPassword(String id, PasswordRequestDTO request) {
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
    }

    public boolean confirmUser(String token) {
        User user = userRepository.findByConfirmationToken(token);

        if (user != null) {
            user.setActive(true);
            user.setConfirmationToken(null);
            userRepository.save(user);

            return true;
        }

        return false;
    }

    public void logAction(String email, ActionType action, String ipAddress) {
        actionLogRepository.save(new ActionLog(email, action, LocalDateTime.now(), ipAddress));
    }

    public String initiatePasswordReset(String email, String ipAddress) throws MessagingException, UnsupportedEncodingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = generateFiveDigitToken();

        user.setPasswordResetToken(token);
        user.setPasswordResetTokenCreationTime(new Date());

        userRepository.save(user);
        emailService.sendPasswordResetEmail(user, token);

        logAction(email, ActionType.PASSWORD_RESET, ipAddress);
        return token;
    }

    private String generateFiveDigitToken() {
        SecureRandom random = new SecureRandom();

        int num = random.nextInt(100000);

        return String.format("%05d", num);
    }

    public boolean verifyResetToken(String email, String token) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (token.equals(user.getPasswordResetToken())) {
            long tokenAge = new Date().getTime() - user.getPasswordResetTokenCreationTime().getTime();
            long tokenAgeInMinutes = tokenAge / 60000;

            return tokenAgeInMinutes <= 5;
        }

        return false;
    }

    public boolean verifyCaptcha(String captchaResponse) {
        String url = "https://hcaptcha.com/siteverify";

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();

        requestMap.add("secret", SECRET_KEY);
        requestMap.add("response", captchaResponse);

        Map<String, Object> response = restTemplate.postForObject(url, requestMap, Map.class);

        assert response != null;
        return (Boolean) response.get("success");
    }

    public void updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenCreationTime(null);

        userRepository.save(user);
    }

    public void resetLoginAttempts(String ip, String email) {
        actionLogRepository.deleteActionLogsByIpAddressAndActionAndUserEmail(ip, ActionType.FAILED_LOGIN, email);
    }
}