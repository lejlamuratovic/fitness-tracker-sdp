import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserAvatar from "src/components/UserAvatar";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Divider,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite"; // filled heart
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; // outline heart
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Routine } from "src/utils/types";
import {
  useUser,
  useDeleteRoutine,
  useAddRoutineToFavorites,
  useRemoveFavoriteRoutine,
} from "src/hooks";
import { RootState } from "src/store";

type Props = {
  routine: Routine;
  isEditable?: boolean; // if called from user's routines, show edit and delete buttons
  favoriteIds?: string[]; // favorite routines ids of the current user
};

const RoutineCard = ({ routine, isEditable, favoriteIds }: Props) => {
  const { data: user } = useUser(routine.userId); // get the user who created the routine

  const userId = useSelector((state: RootState) => state.auth.userId); // current user id

  if (!userId) {
    return null;
  }

  const displayedExercises = routine.exercises
    ?.map((exercise) => exercise.exerciseName)
    .join(", ");
  const deleteRoutine = useDeleteRoutine();
  const addToFavorites = useAddRoutineToFavorites();
  const removeFromFavorites = useRemoveFavoriteRoutine();

  if (!routine.id) return null;
  const isFavorite = favoriteIds?.includes(routine.id);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (routine.id) {
    }
    navigate(`/routines/${routine.id}`);

    handleClose();
  };

  const handleDelete = () => {
    if (!routine.id) return;
    deleteRoutine.mutate({ id: routine.id });
    handleClose();
  };

  const handleToggleFavorite = () => {
    if (!userId || !routine.id) return;

    if (isFavorite) {
      removeFromFavorites.mutate({ userId: userId, routineId: routine.id });
      console.log("remove from favorites");
    } else {
      addToFavorites.mutate({ userId: userId, routineId: routine.id });
      console.log("add to favorites");
    }
  };

  return (
    <Card
      sx={{ minWidth: 275, minHeight: 140, padding: 1, position: "relative" }}
    >
      {isEditable && (
        <>
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}

      <CardContent>
        {!isEditable && user != undefined && (
          <>
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 1,
              }}
            >
              <UserAvatar firstName={user.firstName} lastName={user.lastName} />
              <Typography variant='subtitle1' sx={{ pl: 2 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <IconButton
                onClick={handleToggleFavorite}
                sx={{ color: isFavorite ? "red" : "text.secondary" }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Container>

            <Divider sx={{ borderColor: "black", opacity: 0.5, mb: 2 }} />
          </>
        )}
        <Typography variant='h6' component='div' sx={{ fontWeight: "bold" }}>
          {routine.name}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {routine.exercises?.length === 0
            ? "No exercises added yet"
            : displayedExercises}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size='medium'
          variant='contained'
          sx={{
            margin: "auto",
            backgroundColor: "#72A1BF",
            "&:hover": {
              color: "white",
            },
          }}
          component={Link}
          to={`/routines/${routine.id}`}
        >
          Open Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoutineCard;
