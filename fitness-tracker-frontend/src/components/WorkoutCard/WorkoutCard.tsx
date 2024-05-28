import { useState } from "react";

import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";
import UserAvatar from "src/components/UserAvatar";

import {
  Box,
  Card,
  Divider,
  Typography,
  Container,
  Modal,
  Button,
} from "@mui/material";

import { WorkoutLog } from "src/utils/types";

import { useUser } from "src/hooks";

type Props = {
  userId: string;
  workoutLog: WorkoutLog;
};

const WorkoutCard = ({ userId, workoutLog }: Props) => {
  const { data: user, isLoading, isError, error } = useUser(userId);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const parseDate = (dateString: string) => {
    // parse the date
    const parsedDate = new Date(dateString);

    // check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date string: ", dateString);
      return null;
    }

    return parsedDate;
  };

  const getDayOfWeek = (dateString: string) => {
    const date = parseDate(dateString);
    if (!date) return "Invalid Date";

    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDate = (dateString: string) => {
    const date = parseDate(dateString);
    if (!date) return "Invalid Date";

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2 }}>
        {isLoading && <Loading />}
        {isError && <ErrorAlert message={error.message} />}
        {user && (
          <Container sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {user && (
              <UserAvatar firstName={user.firstName} lastName={user.lastName} />
            )}
            <Box sx={{ ml: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                {user?.firstName ?? ""}
              </Typography>
              <Typography variant='body2'>
                {getDayOfWeek(workoutLog.dateCompleted)},{" "}
                {formatDate(workoutLog.dateCompleted)}
              </Typography>
            </Box>
          </Container>
        )}
        <Divider sx={{ borderColor: "black", opacity: 0.5 }} />
        <Box sx={{ mt: 1 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: "bold" }}>
            Workout
          </Typography>
          <Box
            sx={{
              maxHeight: "4em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 2,
            }}
          >
            {workoutLog.exercises.slice(0, 3).map((exercise, index) => (
              <Typography key={index} variant='body2'>
                {exercise.exerciseName} | {exercise.sets} sets x {exercise.reps}{" "}
                reps, {exercise.weight} kg
              </Typography>
            ))}
          </Box>
          {workoutLog.exercises.length > 3 && (
            <Button onClick={handleOpen} variant='text' size='small'>
              See More
            </Button>
          )}
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "background.paper", p: 4 }}>
          {workoutLog.exercises.map((exercise, index) => (
            <Typography key={index} variant='body2' color='text.primary'>
              {exercise.exerciseName} | {exercise.sets} sets x {exercise.reps}{" "}
              reps, {exercise.weight} kg
            </Typography>
          ))}
        </Box>
      </Modal>
    </Card>
  );
};

export default WorkoutCard;
