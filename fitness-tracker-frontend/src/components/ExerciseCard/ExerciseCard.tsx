import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AddToRoutineDialog from "src/components/AddToRoutineDialog";
import DeleteExerciseDialog from "src/components/DeleteExerciseDialog";
import EditExerciseModal from "src/components/EditExerciseModal";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { Exercise } from "src/utils/types";
import { RootState } from "src/store";

type Props = {
  exercise: Exercise;
  onSuccess: () => void;
};

const ExerciseCard = ({ exercise, onSuccess }: Props) => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    handleCloseDeleteDialog();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        minWidth: 250,
        display: "block",
        margin: "auto",
        mt: 3,
      }}
    >
      <CardMedia
        sx={{ margin: "auto", height: 160, width: 180, p: 1, mt: 1 }}
        image={exercise.imageUrl}
        title={exercise.name}
      />
      <CardContent sx={{ height: "80px" }}>
        <Typography
          gutterBottom
          variant='subtitle1'
          component='div'
          color='text.secondary'
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            lineHeight: "1",
            mb: 2,
          }}
        >
          {exercise.name}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          {exercise.muscleGroup}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {exercise.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {userType === "ADMIN" ? (
          <Button size='large' onClick={handleOpenDeleteDialog}>
            Delete
          </Button>
        ) : (
          <Button size='small' onClick={handleOpenAddDialog}>
            Add to Routine
          </Button>
        )}
        {userType === "ADMIN" ? (
          <Button size='large' onClick={handleOpenEditModal}>
            Edit
          </Button>
        ) : (
          <Button
            size='small'
            component={Link}
            to={`/exercises/${exercise.id}`}
          >
            See More
          </Button>
        )}
      </CardActions>
      <AddToRoutineDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        exerciseName={exercise.name}
        exerciseId={exercise.id}
        onSuccess={onSuccess}
      />
      <DeleteExerciseDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        exerciseName={exercise.name}
        exerciseId={exercise.id}
      />
      <EditExerciseModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        exercise={exercise}
      />
    </Card>
  );
};

export default ExerciseCard;
