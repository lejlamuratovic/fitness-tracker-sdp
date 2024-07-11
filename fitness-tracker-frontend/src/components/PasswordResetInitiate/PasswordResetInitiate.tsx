import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, Paper, TextField } from "@mui/material";
import PasswordResetForm from "src/components/PasswordResetForm";
import emailIcon from "src/assets/email.png";
import { useInitiatePasswordReset, useVerifyToken } from "src/hooks";

const PasswordResetInitiate = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const {
    mutate: initiateReset,
    isError: isInitiateError,
    error: initiateError, 
  } = useInitiatePasswordReset();

  const {
    mutate: verifyToken,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyToken();

  const [emailSent, setEmailSent] = useState(false);
  const [tokenReceived, setTokenReceived] = useState(false);
  const [email, setEmail] = useState<string>("");

  const onSubmitEmail = (data: any) => {
    initiateReset(data.email, {
      onSuccess: () => {
        setEmailSent(true);
        setEmail(data.email);
        reset();  // Reset the form fields upon successful email submission
      }
    });
  };

  const onSubmitToken = (data: any) => {
    verifyToken([data.token, email], {
      onSuccess: () => {
        setTokenReceived(true);
      }
    });
  };

  if (tokenReceived) {
    return <PasswordResetForm email={email}/>;
  }

  const getErrorMessage = (error: any): string => {
    if (error?.response?.data) {
      return typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
    }
    return "An unexpected error occurred";
  };

  const errorMessage = isInitiateError ? getErrorMessage(initiateError) : isVerifyError ? getErrorMessage(verifyError) : null;

  return (
    <Paper elevation={3} sx={{ maxWidth: "400px", padding: 3, mx: "auto" }}>
      {(isInitiateError || isVerifyError) && (
        <Typography variant="body1" sx={{ color: "red", mb: 0 }}>
         {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit(emailSent ? onSubmitToken : onSubmitEmail)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {emailSent ? "Enter Your Token" : "Send Password Reset Email"}
          </Typography>
          {!emailSent && <img src={emailIcon} alt="Verification" style={{ width: "150px", height: "150px" }} />}
          {!emailSent ? (
            <>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please enter the email address you used to sign up, and we will send you a link to reset your password.
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Entered value does not match email format"
                  }
                })}
                error={Boolean(errors.email)}
              />
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please enter the token you received in your email to proceed.
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                id="token"
                label="Token"
                autoFocus
                {...register("token", {
                  required: "Token is required"
                })}
                error={Boolean(errors.token)}
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#72A1BF", color: "white" }}
          >
            {emailSent ? "Submit Token" : "Send Email"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PasswordResetInitiate;
