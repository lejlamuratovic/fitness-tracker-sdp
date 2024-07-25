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

    @Value("${base.frontendUrl}")
    private String BASE_FRONTEND_URL;

    @Value("${base.url}")
    private String BASE_URL;


    private final String mailFrom;
    private final String mailFromName;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public EmailService(Environment environment) {
        this.mailFrom = environment.getProperty("spring.mail.properties.mail.smtp.from");
        this.mailFromName = environment.getProperty("mail.from.name", "Fitness Tracker");
    }

    private void sendEmail(String to, String subject, String templateName, Context context) throws MessagingException, UnsupportedEncodingException, jakarta.mail.MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom(new InternetAddress(mailFrom, mailFromName));

        String htmlContent = htmlTemplateEngine.process(templateName, context);
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
        logger.info("Email sent successfully to {}", to);
    }

    public void sendConfirmationEmail(User user) throws MessagingException, UnsupportedEncodingException, jakarta.mail.MessagingException {
        Context ctx = new Context(LocaleContextHolder.getLocale());
        ctx.setVariable("email", user.getEmail());
        ctx.setVariable("name", user.getFirstName());
        ctx.setVariable("url", BASE_URL + "/api/auth/confirm?token=" + user.getConfirmationToken());

        sendEmail(user.getEmail(), "Registration Confirmation", "registration", ctx);
    }

    public void sendRoutineReminder(String email, String name, LocalDateTime scheduledTime) throws MessagingException, UnsupportedEncodingException, jakarta.mail.MessagingException {
        Context ctx = new Context(LocaleContextHolder.getLocale());
        ctx.setVariable("name", name);
        ctx.setVariable("scheduledTime", scheduledTime.format(DateTimeFormatter.ofPattern("HH:mm")));

        sendEmail(email, "Routine Reminder", "scheduled_routine", ctx);
    }

    public void sendPasswordResetEmail(User user, String token) throws MessagingException, UnsupportedEncodingException, jakarta.mail.MessagingException {
        Context context = new Context(LocaleContextHolder.getLocale());
        context.setVariable("name", user.getFirstName());
        context.setVariable("resetToken", token);

        sendEmail(user.getEmail(), "Password Reset Request", "password_reset", context);
    }
}
