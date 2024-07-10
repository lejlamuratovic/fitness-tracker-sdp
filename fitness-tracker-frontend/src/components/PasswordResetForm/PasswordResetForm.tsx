import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Paper, Typography } from "@mui/material";

import { useResetPassword } from "src/hooks";

interface PasswordResetFormProps {
  email: string;
}

const PasswordResetForm = ({ email }: PasswordResetFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const {
    mutate: resetPassword,
    error: resetError
  } = useResetPassword();

  const onSubmitNewPassword = (data: any) => {
    resetPassword([email, data.newPassword], {
      onSuccess: () => {
        navigate("/login");
      }
    });
  };

  const getErrorMessage = (error: any): string => {
    if (error?.response?.data) {
      return typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
    }
    return "An unexpected error occurred";
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "400px", minWidth: "350px", padding: 3, mx: "auto" }}>
      {resetError && ( 
        <Typography variant="body1" sx={{ color: "red", mb: 0 }}>
          {getErrorMessage(resetError)}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmitNewPassword)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2
          }}
        >
            <Typography variant="h5" sx={{ mb: 2 }}>
                Reset Your Password
            </Typography>
            <TextField
                margin="normal"
                fullWidth
                label="New Password"
                type="password"
                {...register("newPassword", {
                required: "New password is required",
                minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                },
                })}
                error={Boolean(errors.newPassword)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#72A1BF", color: "white" }}
            >
                Reset Password
            </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PasswordResetForm;
