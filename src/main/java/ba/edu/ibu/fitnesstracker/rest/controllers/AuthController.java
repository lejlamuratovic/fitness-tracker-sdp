package ba.edu.ibu.fitnesstracker.rest.controllers;


import ba.edu.ibu.fitnesstracker.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.service.AuthService;
import ba.edu.ibu.fitnesstracker.rest.dto.LoginDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.LoginRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.PasswordResetRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserRequestDTO;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthService authService;

    @Value("${base.frontendUrl}")
    private String BASE_FRONTEND_URL;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserRequestDTO user) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(authService.signUp(user));
    }

    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public ResponseEntity<LoginDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.signIn(loginRequest));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/confirm")
    public ResponseEntity<?> confirmRegistration(@RequestParam("token") String token) {
        boolean isConfirmed = authService.confirmUser(token);

        if (isConfirmed) {
            String redirectUrl = BASE_FRONTEND_URL + "/login";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", redirectUrl);

            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        }

        return ResponseEntity.badRequest().body("Invalid or expired token.");
    }

    @RequestMapping(method = RequestMethod.GET, path = "/initiate-password-reset")
    public ResponseEntity<?> initiatePasswordReset(@RequestParam("email") String email) {
        try {
            String token = authService.initiatePasswordReset(email);

            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unable to process password reset.");
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/verify-token")
    public ResponseEntity<?> verifyResetToken(@RequestParam("token") String token, @RequestParam("email") String email) {
        if (!authService.verifyResetToken(email, token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequestDTO request) {
        authService.updatePassword(request.getEmail(), request.getNewPassword());

        return ResponseEntity.ok().build();
    }
}