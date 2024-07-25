import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ExerciseDetailList from "src/components/ExerciseDetailList";
import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";
import SuccessAlert from "src/components/SuccessAlert";
import CustomDialog from "src/components/CustomDialog";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Container, TextField, Typography, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

import { ExerciseDetail, Routine } from "src/utils/types";
import { useRoutine, useUpdateRoutine, useMarkRoutineDone, useAddScheduledRoutines } from "src/hooks";
import { RootState } from "src/store";

const RoutineDetails = () => {
  const { id } = useParams();

  const validId = id ?? ""; // empty string if id undefined, bc ts null checks
  const { data, isLoading, isError, error } = useRoutine(validId);

  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [deletedExercises, setDeletedExercises] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [alertKey, setAlertKey] = useState("");
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [openCompletionDialog, setOpenCompletionDialog] = useState(false);

  const currentUserID = useSelector((state: RootState) => state.auth.userId);

  const updateRoutine = useUpdateRoutine();
  const markDone = useMarkRoutineDone();
  const addScheduledRoutine = useAddScheduledRoutines();

  useEffect(() => {
    if (data) setRoutine(data);
  }, [data]);

  const handleExerciseDetailsChange = (updatedList: ExerciseDetail[]) => {
    setRoutine((routine) =>
      routine ? { ...routine, exercises: updatedList } : null
    );
    setIsChanged(true);
  };

  const handleRoutineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutine((routine) =>
      routine ? { ...routine, name: event.target.value } : null
    );
    setIsChanged(true);
  };

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    setAlertKey(`${Date.now()}-${Math.random()}`);
  };

  const handleSaveChanges = () => {
    if (routine && id && routine.exercises) {
      const updatedExercises = routine.exercises.filter(
        (exercise) => !deletedExercises.includes(exercise.detailId ?? "")
      );

      const updatedRoutine = { ...routine, exercises: updatedExercises };

      updateRoutine.mutate({ id, data: updatedRoutine });
    }
    setIsChanged(false);
  };

  const handleCompleteRoutine = () => {
    setOpenCompletionDialog(true);
  };

  const handleScheduleRoutine = () => {
    setOpenScheduleDialog(true);
  };

  const handleCloseScheduleDialog = () => setOpenScheduleDialog(false);
  const handleCloseCompletionDialog = () => setOpenCompletionDialog(false);

  const handleConfirmCompletion = () => {
    const formattedDate = new Date(selectedDate).toISOString();

    if (!id || !currentUserID) return;
    markDone.mutate(
      { id: id, dateCompleted: formattedDate, userId: currentUserID },
      {
        onSuccess: () => {
          handleSuccess("Successfully marked as completed!");
        },
      }
    );
    setOpenCompletionDialog(false);
  };

  const handleConfirmSchedule = async () => {
    const utcDate = new Date(selectedDate).toISOString();
  
    if (!id || !currentUserID) {
      return;
    }

    addScheduledRoutine.mutate(
      { routine: { userId: currentUserID, routineId: id, scheduledAt: utcDate } },
      {
        onSuccess: () => {
          handleSuccess("Routine successfully scheduled!");
          setOpenScheduleDialog(false);
        },
        onError: (error) => {
          alert("Failed to schedule the routine. Please check your connection and try again.");
        }
      }
    );
  };

  const handleDateChange = (event: any) => {
    // keep the time constant and change only the date
    const newDateTime = new Date(selectedDate);
    const newSelectedDate = new Date(event.target.value + "T00:00:00");

    newDateTime.setFullYear(
      newSelectedDate.getFullYear(),
      newSelectedDate.getMonth(),
      newSelectedDate.getDate()
    );
    setSelectedDate(newDateTime.toISOString());
  };

  const handleDeleteExercise = (exerciseDetailId: string) => {
    setDeletedExercises((prev) => [...prev, exerciseDetailId]);
    setIsChanged(true);
  };

  // determine if the current user is the owner of the routine
  const isOwner = routine && currentUserID === routine.userId;

  return (
    <>
      <Container
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ fontWeight: "bold", letterSpacing: "2px" }}
        >
          Workout Plan
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            fontWeight: "semibold",
            textTransform: "uppercase",
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          {routine?.isPrivate ? "Private" : "Public"}
        </Typography>

        {successMessage && (
          <SuccessAlert
            message={successMessage}
            alertKey={alertKey}
          />
        )}

        {isLoading && <Loading />}

        {isError && <ErrorAlert message={error?.message} />}

        {/* name of routine */}
        {routine && (
          <Box>
            {isOwner ? (
              <>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2, fontSize: "25px" }}
                >
                  Name
                </Typography>
                <TextField
                  type="text"
                  value={routine.name}
                  onChange={handleRoutineChange}
                  variant="outlined"
                  size="medium"
                  InputProps={{ style: { color: "text.secondary" } }}
                  sx={{ minWidth: "300px", backgroundColor: "white" }}
                />
              </>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 2,
                  fontSize: "25px",
                  padding: "10px",
                  minWidth: "300px",
                }}
              >
                {routine.name}
              </Typography>
            )}

            {/* exercises */}
            <Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, fontSize: "25px" }}
              >
                Exercises
              </Typography>
              <ExerciseDetailList
                exerciseDetailList={routine.exercises ?? []}
                onExerciseDetailsChange={handleExerciseDetailsChange}
                onDeleteExercise={handleDeleteExercise}
                isOwner={isOwner || false}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            mt: 2,
            mb: 5,
            display: "flex",
            width: "70%",
            justifyContent: "space-between",
            "@media (max-width: 600px)": { width: "100%" },
          }}
        >
          {isOwner && (
            <Button
              variant="contained"
              disabled={!isChanged}
              color="success"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              "@media (max-width: 600px)": { flexDirection: "column" },
            }}
          >
          <Button
            variant="contained"
            color="success"
            onClick={ handleCompleteRoutine }
          >
            Complete Routine
          </Button>
          <Button 
            variant="contained"
            color="info"
            onClick={ handleScheduleRoutine }
          >
            Schedule Routine
          </Button>
          </Box>
        </Box>
      </Container>

      {/* CustomDialog for scheduling routine */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomDialog
          open={openScheduleDialog}
          onClose={handleCloseScheduleDialog}
          title="Schedule Routine"
          actions={[
            {
              label: "Cancel",
              handler: handleCloseScheduleDialog,
              color: "inherit",
            },
            {
              label: "Confirm",
              handler: handleConfirmSchedule, 
              color: "primary",
            },
          ]}
        >
          <DialogContent>
            <DateTimePicker
              label="Schedule Date and Time"
              onChange={(newValue) => {
                if (newValue) setSelectedDate(newValue.toISOString());
              }}
              ampm={true} 
              views={["year", "month", "day", "hours", "minutes"]} 
              sx={{ width: "100%" }}
            />
          </DialogContent>
        </CustomDialog>
      </LocalizationProvider>

      {/* CustomDialog for completing routine */}
      <CustomDialog
        open={openCompletionDialog}
        onClose={handleCloseCompletionDialog}
        title="Complete Routine"
        actions={[
          {
            label: "Cancel",
            handler: handleCloseCompletionDialog,
            color: "inherit",
          },
          {
            label: "Confirm",
            handler: handleConfirmCompletion, 
            color: "primary",
          },
        ]}
      >
        <DialogContent>
          <TextField
            label="Completion Date"
            type="date"
            value={selectedDate.split("T")[0]} // extract only the date part for this field
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            fullWidth
          />
        </DialogContent>
      </CustomDialog>
    </>
  );
};

export default RoutineDetails;
