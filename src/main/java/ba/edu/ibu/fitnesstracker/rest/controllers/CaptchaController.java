package ba.edu.ibu.fitnesstracker.rest.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/captcha")
public class CaptchaController {
    @Value("${captcha.secretKey}")
    private String SECRET_KEY;

    @RequestMapping(method = RequestMethod.POST, path = "/verify-captcha")
    public ResponseEntity<?> verifyCaptcha(@RequestBody Map<String, String> captchaResponse) {
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=" + SECRET_KEY + "&response=" + captchaResponse.get("token");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url + params, null, String.class);

        // check if response is success
        if (Objects.requireNonNull(response.getBody()).contains("\"success\": true")) {
            return ResponseEntity.ok().body("Captcha verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Captcha verification failed");
        }
    }
}
