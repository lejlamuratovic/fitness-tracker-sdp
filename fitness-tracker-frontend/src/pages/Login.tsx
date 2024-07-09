import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Paper,
  Grid,
} from "@mui/material";

import { AppDispatch, RootState } from "src/store";
import { login } from "src/store/authSlice";

export type LoginFormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const { loading, userToken, error } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "360px", padding: 3, mx: "auto" }}>
      {error && (
        <Typography
          color="error"
          variant="body1"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant='h5'>Sign in</Typography>
        <Box
          component='form'
          sx={{ mt: "5px", width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin='normal'
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, backgroundColor: "#72A1BF" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Login"}
          </Button>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
