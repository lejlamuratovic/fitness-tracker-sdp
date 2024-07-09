package ba.edu.ibu.fitnesstracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication(exclude = { ThymeleafAutoConfiguration.class })
public class FitnessTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessTrackerApplication.class, args);
	}

}
