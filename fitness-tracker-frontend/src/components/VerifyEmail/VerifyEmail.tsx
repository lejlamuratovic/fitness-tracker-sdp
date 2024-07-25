import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, Paper } from "@mui/material";

import email from "src/assets/email.png";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "500px", padding: 3, mx: "auto", mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Verify Your Email
        </Typography>
        <img src={ email } alt="Verification" style={{ width: "150px", height: "150px" }} />
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please check your email and click on the verification link sent to you to activate your account.
        </Typography>
        <Button variant="contained" onClick={handleLoginRedirect} sx={{ backgroundColor: "#72A1BF" }}>
          Go to Login
        </Button>
      </Box>
    </Paper>
  );
};

export default VerifyEmail;
