import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { useDeleteExercise } from "src/hooks";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  exerciseName: string;
  exerciseId: string;
};

const DeleteExerciseDialog = ({
  open,
  onClose,
  onConfirm,
  exerciseName,
  exerciseId,
}: Props) => {
  const deleteExercise = useDeleteExercise();

  const handleConfirm = () => {
    deleteExercise.mutate({ id: exerciseId });
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
    >
      <DialogTitle id='delete-dialog-title'>{"Confirm Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id='delete-dialog-description'>
          Are you sure you want to delete the routine for {exerciseName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExerciseDialog;
