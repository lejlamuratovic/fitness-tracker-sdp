import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Container, Typography } from "@mui/material";

import { RootState } from "src/store";

import Background from "src/assets/background.jpeg";

const backgroundStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const HomePage = () => {
  const userToken = useSelector((state: RootState) => state.auth.userToken);

  return (
    <Container maxWidth='xl' sx={backgroundStyle}>
      <Typography
        variant='h2'
        color='white'
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: "5px",
          textShadow: "2px 2px 2px black",
        }}
      >
        Fitness Tracker
      </Typography>
      <Typography
        variant='h6'
        color='white'
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: "5px",
          textShadow: "1px 1px 1px black",
        }}
      >
        Track your fitness goals
      </Typography>

      {/* if token exists, redirect to explore, if not redirect to register */}
      <Button
        variant='contained'
        color='primary'
        size='large'
        sx={{
          width: "300px",
          height: "50px",
          backgroundColor: "#72A1BF",
          marginTop: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          "&:hover": {
            color: "white",
          },
        }}
        component={Link}
        to={userToken ? "/explore" : "/register"}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default HomePage;
