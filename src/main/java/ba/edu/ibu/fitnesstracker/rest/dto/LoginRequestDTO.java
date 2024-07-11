package ba.edu.ibu.fitnesstracker.rest.dto;

public class LoginRequestDTO {
    private String email;
    private String password;
    private String captchaResponse;

    public LoginRequestDTO(String email, String password, String captchaResponse) {
        this.email = email;
        this.password = password;
        this.captchaResponse = captchaResponse;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCaptchaResponse() {
        return captchaResponse;
    }

    public void setCaptchaResponse(String captchaResponse) {
        this.captchaResponse = captchaResponse;
    }
}