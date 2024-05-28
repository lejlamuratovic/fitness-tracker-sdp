import { Link } from "react-router-dom";

import { Button, Typography } from "@mui/material";

import NotFound from "src/assets/404.png";

const NotFoundPage = () => {
  return (
    <>
      <Typography variant='h3' color='text.secondary'>
        404 Not Found
      </Typography>
      <img src={NotFound} alt='404 Not Found' style={{ width: "300px" }} />
      <Typography variant='h5' color='text.secondary'>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        size='large'
        sx={{
          width: "300px",
          height: "50px",
          backgroundColor: "#72A1BF",
          marginTop: "20px",
          "&:hover": {
            color: "white",
          },
        }}
        component={Link}
        to='/'
      >
        Go Back to Homepage
      </Button>
    </>
  );
};

export default NotFoundPage;
