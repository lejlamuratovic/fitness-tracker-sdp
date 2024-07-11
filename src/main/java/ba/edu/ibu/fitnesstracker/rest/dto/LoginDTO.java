package ba.edu.ibu.fitnesstracker.rest.dto;

public class LoginDTO {
    private String jwt;
    private boolean isActive;
    private boolean captchaRequired;

    public LoginDTO(String jwt, boolean isActive, boolean captchaRequired) {
        this.jwt = jwt;
        this.isActive = isActive;
        this.captchaRequired = captchaRequired;
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

    public boolean isCaptchaRequired() {
        return captchaRequired;
    }

    public void setCaptchaRequired(boolean captchaRequired) {
        this.captchaRequired = captchaRequired;
    }
}
