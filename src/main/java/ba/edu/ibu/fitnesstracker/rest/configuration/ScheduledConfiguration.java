package ba.edu.ibu.fitnesstracker.rest.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.util.TimeZone;

@Configuration
public class ScheduledConfiguration {
    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC")); // setting timezone to UTC
    }
}
