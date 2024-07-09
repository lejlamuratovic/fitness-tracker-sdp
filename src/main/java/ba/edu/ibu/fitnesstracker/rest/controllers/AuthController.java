package ba.edu.ibu.fitnesstracker.rest.controllers;


import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.service.AuthService;
import ba.edu.ibu.fitnesstracker.rest.dto.LoginDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.LoginRequestDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserDTO;
import ba.edu.ibu.fitnesstracker.rest.dto.UserRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<UserDTO> register(@RequestBody UserRequestDTO user) {
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

}