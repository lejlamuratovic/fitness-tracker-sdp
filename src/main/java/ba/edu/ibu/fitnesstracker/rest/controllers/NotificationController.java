package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.service.NotificationService;
import ba.edu.ibu.fitnesstracker.rest.dto.MessageDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path = "/api/notifications")
@SecurityRequirement(name = "JWT Security")
public class NotificationController {
    private final NotificationService notificationService;


    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @RequestMapping(path = "/broadcast", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> sendBroadcastMessage(@RequestBody MessageDTO message) throws IOException {
        System.out.println("Message: " + message.getMessage());
        notificationService.broadcastMessage(message.getMessage());
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }


    @RequestMapping(path = "/send-to/{userId}", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> sendChatMessage(@PathVariable String userId, @RequestBody MessageDTO message) throws IOException {
        System.out.println("Message: " + message.getMessage());
        notificationService.sendMessage(userId, message.getMessage());
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
