package ba.edu.ibu.fitnesstracker.api.impl.mailsender;

import ba.edu.ibu.fitnesstracker.core.api.mailsender.MailSender;
import ba.edu.ibu.fitnesstracker.core.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SendgridSender implements MailSender {
    @Override
    public String send(List<User> users, String message) {
        for (User user: users) {
            System.out.println("Message sent to: " + user.getEmail());
        }
        return "Message: " + message + " | Sent via Sendgrid.";
    }
}
