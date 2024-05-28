package ba.edu.ibu.fitnesstracker.rest.controllers;

import ba.edu.ibu.fitnesstracker.core.model.Exercise;
import ba.edu.ibu.fitnesstracker.core.model.enums.ExerciseGroup;
import ba.edu.ibu.fitnesstracker.core.service.ExerciseService;
import ba.edu.ibu.fitnesstracker.core.service.JwtService;
import ba.edu.ibu.fitnesstracker.core.service.UserService;
import ba.edu.ibu.fitnesstracker.rest.configuration.SecurityConfiguration;
import ba.edu.ibu.fitnesstracker.rest.dto.ExerciseDTO;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@AutoConfigureMockMvc
@WebMvcTest(ExerciseController.class)
@Import(SecurityConfiguration.class)
public class ExerciseControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ExerciseService exerciseService;

    @MockBean
    UserService userService;

    @MockBean
    JwtService jwtService;

    @MockBean
    AuthenticationProvider authenticationProvider;

    @Test
    void shouldReturnAllExercises() throws Exception {
        Exercise exercise = new Exercise();
        exercise.setId("someId");
        exercise.setName("Bicep curl");
        exercise.setDescription("Some description");
        exercise.setMuscleGroup(ExerciseGroup.BICEPS);

        ExerciseDTO exerciseDTO = new ExerciseDTO(exercise);

        Mockito.when(exerciseService.getExercises()).thenReturn(List.of(exerciseDTO));

        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/api/exercise/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String response = result.getResponse().getContentAsString();
        assertEquals(1, (Integer) JsonPath.read(response, "$.length()"));
        assertEquals("Bicep curl", JsonPath.read(response, "$.[0].name"));
        assertEquals("someId", JsonPath.read(response, "$.[0].id"));
        assertEquals("Some description", JsonPath.read(response, "$.[0].description"));
    }
}
