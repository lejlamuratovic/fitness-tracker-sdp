package ba.edu.ibu.fitnesstracker.rest.dto;

public class LoginDTO {
    private String jwt;

    private boolean isActive;

    public LoginDTO(String jwt, boolean isActive) {
        this.jwt = jwt;
        this.isActive = isActive;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public boolean isActive() {
        return this.isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
