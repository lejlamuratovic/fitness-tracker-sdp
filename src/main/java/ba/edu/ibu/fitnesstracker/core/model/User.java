package ba.edu.ibu.fitnesstracker.core.model;

import ba.edu.ibu.fitnesstracker.core.model.enums.UserType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document
public class User implements UserDetails {

    @Id
    private String id;
    private UserType userType;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date creationDate;
    private List<Routine> favoriteRoutines;
    private boolean isActive;
    private String confirmationToken;
    private String passwordResetToken;
    private Date passwordResetTokenCreationTime;


    public User() {
    }

    public User(String id, UserType userType, String firstName, String lastName, String email, String password,
                Date creationDate, List<Routine> favouriteRoutines, boolean isActive, String confirmationToken, String passwordResetToken, Date passwordResetTokenCreationTime) {
        this.id = id;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.creationDate = creationDate;
        this.favoriteRoutines = favouriteRoutines;
        this.isActive = isActive;
        this.confirmationToken = confirmationToken;
        this.passwordResetToken = passwordResetToken;
        this.passwordResetTokenCreationTime = passwordResetTokenCreationTime;
    }

    public User(User entity) {
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

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public List<Routine> getFavoriteRoutines() {
        return favoriteRoutines;
    }

    public void setFavoriteRoutines(List<Routine> favoriteRoutines) {
        this.favoriteRoutines = favoriteRoutines;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.name()));
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return this.isActive;
    }

    public void setActive(boolean active) {
        this.isActive = active;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public Date getPasswordResetTokenCreationTime() {
        return passwordResetTokenCreationTime;
    }

    public void setPasswordResetTokenCreationTime(Date passwordResetTokenCreationTime) {
        this.passwordResetTokenCreationTime = passwordResetTokenCreationTime;
    }
}
