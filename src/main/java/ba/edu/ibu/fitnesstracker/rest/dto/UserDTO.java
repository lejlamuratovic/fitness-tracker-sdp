package ba.edu.ibu.fitnesstracker.rest.dto;

import ba.edu.ibu.fitnesstracker.core.model.Routine;
import ba.edu.ibu.fitnesstracker.core.model.User;
import ba.edu.ibu.fitnesstracker.core.model.enums.UserType;

import java.util.Date;
import java.util.List;

public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private UserType userType;
    private String email;
    private Date creationDate;
    private List<Routine> favoriteRoutines;
    private String confirmationToken;

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.userType = user.getUserType();
        this.email = user.getEmail();
        this.creationDate = user.getCreationDate();
        this.favoriteRoutines = user.getFavoriteRoutines();
        this.confirmationToken = user.getConfirmationToken();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<Routine> getFavoriteRoutines() {
        return favoriteRoutines;
    }

    public void setFavoriteRoutines(List<Routine> favoriteRoutines) {
        this.favoriteRoutines = favoriteRoutines;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }
}
