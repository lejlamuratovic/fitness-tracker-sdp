package ba.edu.ibu.fitnesstracker.core.service;

import ba.edu.ibu.fitnesstracker.core.model.User;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine htmlTemplateEngine;

    @Autowired
    private Environment environment;

    @Value("${base.url}")
    private String BASE_URL;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendConfirmationEmail(User user) {
        try {
            String mailFrom = environment.getProperty("spring.mail.properties.mail.smtp.from");
            String mailFromName = environment.getProperty("mail.from.name", "Identity");
            String confirmationUrl = BASE_URL + "/api/auth/confirm?token=" + user.getConfirmationToken();

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper email = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            email.setTo(user.getEmail());
            email.setSubject("Registration Confirmation");
            email.setFrom(new InternetAddress(mailFrom, mailFromName));

            Context ctx = new Context(LocaleContextHolder.getLocale());
            ctx.setVariable("email", user.getEmail());
            ctx.setVariable("name", user.getFirstName());
            ctx.setVariable("url", confirmationUrl);

            String htmlContent = htmlTemplateEngine.process("registration", ctx);
            email.setText(htmlContent, true);

            logger.info("Sending email to {}", user.getEmail());
            mailSender.send(mimeMessage);
            logger.info("Email sent successfully to {}", user.getEmail());
        } catch (MessagingException | UnsupportedEncodingException | MailException e) {
            logger.error("Failed to send email to {}: {}", user.getEmail(), e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error occurred when sending email to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    public void sendRoutineReminder(String email, String name, LocalDateTime scheduledTime) {
        try {
            logger.info("Attempting to send routine reminder to: {}", email);

            String mailFrom = environment.getProperty("spring.mail.properties.mail.smtp.from");
            String mailFromName = environment.getProperty("mail.from.name", "Fitness Tracker");

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper emailHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            emailHelper.setTo(email);
            emailHelper.setSubject("Routine Reminder");
            emailHelper.setFrom(new InternetAddress(mailFrom, mailFromName));

            String formattedTime = scheduledTime.format(DateTimeFormatter.ofPattern("HH:mm"));

            Context ctx = new Context(LocaleContextHolder.getLocale());
            ctx.setVariable("name", name);
            ctx.setVariable("scheduledTime", formattedTime);

            String htmlContent = htmlTemplateEngine.process("scheduled_routine", ctx);
            emailHelper.setText(htmlContent, true);

            logger.info("Sending routine reminder to {}", email);
            mailSender.send(mimeMessage);
            logger.info("Routine reminder sent successfully to {}", email);
        } catch (MessagingException | UnsupportedEncodingException | MailException e) {
            logger.error("Failed to send routine reminder to {}: {}", email, e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error occurred when sending routine reminder to {}: {}", email, e.getMessage());
        }
    }
}
