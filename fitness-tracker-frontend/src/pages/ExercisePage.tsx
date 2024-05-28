import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import SuccessAlert from "src/components/SuccessAlert";
import AddToRoutineDialog from "src/components/AddToRoutineDialog";

import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

import { useExercise } from "src/hooks";

const ExercisePage = () => {
  const { id } = useParams();

  const validId = id ?? ""; // empty string if id undefined, bc ts null checks
  const { data: exercise, isLoading, isError, error } = useExercise(validId);

  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [alertKey, setAlertKey] = useState("");

  const handleSuccess = () => {
    setSuccessMessage(true);
    setAlertKey(`${Date.now()}-${Math.random()}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {successMessage && (
        <SuccessAlert
          message='Exercise added to routine successfully'
          alertKey={alertKey}
        />
      )}

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p>Loading...</p>
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p>Error fetching routine details</p>
          <p> {error?.message} </p>
        </Box>
      )}

      {exercise && (
        <Container sx={{ mb: 5 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant='h5'
                  gutterBottom
                  color='#72A1BF'
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    textAlign: "center",
                    textShadow: "1px 1px 1px gray",
                    fontSize: "30px",
                  }}
                >
                  {exercise.name}
                </Typography>

                <Typography
                  variant='body1'
                  gutterBottom
                  color='text.secondary'
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  {exercise.muscleGroup}
                </Typography>

                <Typography
                  variant='body1'
                  paragraph
                  sx={{ textAlign: "justify", mt: 3 }}
                >
                  {exercise.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: "2rem",
                    width: "100%",
                  }}
                >
                  <Button
                    variant='text'
                    size='medium'
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "#72A1BF",
                      },
                    }}
                    component={Link}
                    to={`/explore`}
                  >
                    <InputAdornment position='start'>
                      <ArrowBackIos sx={{ fontSize: "20px" }} />
                    </InputAdornment>
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    size='medium'
                    sx={{ backgroundColor: "#72A1BF" }}
                    onClick={handleOpenDialog}
                  >
                    Add to Routine
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  component='img'
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                  alt={exercise.name}
                  src={exercise.imageUrl}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}

      {exercise && (
        <AddToRoutineDialog
          open={openDialog}
          onClose={handleCloseDialog}
          exerciseName={exercise.name}
          exerciseId={exercise.id}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default ExercisePage;
