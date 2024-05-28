import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";

import { RootState } from "src/store";
import { useAddExerciseToRoutine, useRoutines } from "src/hooks";

import { ExerciseDetail } from "src/utils/types";

type Props = {
  open: boolean;
  onClose: () => void;
  exerciseName: string;
  exerciseId: string;
  onSuccess: () => void;
};

const AddToRoutineDialog = ({
  open,
  onClose,
  exerciseName,
  exerciseId,
  onSuccess,
}: Props) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const { data: routines, isLoading, isError, error } = useRoutines(userId);
  const addToRoutine = useAddExerciseToRoutine();

  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [selectedRoutine, setSelectedRoutine] = useState("");

  const handleSubmit = async () => {
    // new exercise details to be added to routine
    let exerciseDetail: ExerciseDetail = {
      exerciseId: exerciseId,
      exerciseName: exerciseName,
      weight: weight,
      sets: sets,
      reps: reps,
    };

    addToRoutine.mutate(
      { id: selectedRoutine, exercise: exerciseDetail },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add {exerciseName} to Routine</DialogTitle>
      <DialogContent>
        {/* set exercise details */}
        <TextField
          label='Weight (kg)'
          type='number'
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Sets'
          type='number'
          value={sets}
          onChange={(e) => setSets(parseInt(e.target.value) || 0)}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Reps'
          type='number'
          value={reps}
          onChange={(e) => setReps(parseInt(e.target.value) || 0)}
          fullWidth
          margin='dense'
        />

        {/* select from available routines */}
        <FormControl fullWidth margin='dense'>
          <InputLabel id='routine-select-label'>Select Routine</InputLabel>

          {isLoading && <Loading />}

          {isError && <ErrorAlert message={error?.message} />}

          {routines && (
            <Select
              labelId='routine-select-label'
              value={selectedRoutine}
              label='Select Routine'
              onChange={(e) => setSelectedRoutine(e.target.value)}
            >
              {routines.map((routine) => (
                <MenuItem key={routine.id} value={routine.id}>
                  {routine.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToRoutineDialog;
