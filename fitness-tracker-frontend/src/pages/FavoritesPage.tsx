import { useSelector } from "react-redux";

import RoutineList from "src/components/RoutineList";

import { Box, Container, Typography } from "@mui/material";

import { RootState } from "src/store";
import { useFavoriteRoutines } from "src/hooks";

const FavoritesPage = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return (
      <Container sx={{ display: "block", margin: "0 auto" }}>
        <Typography
          variant='h4'
          color='text.secondary'
          sx={{ fontWeight: "bold", letterSpacing: "2px" }}
        >
          Please log in to view your favorite routines
        </Typography>
      </Container>
    );
  }

  const {
    data: favoriteRoutines,
    isLoading,
    isError,
    error,
  } = useFavoriteRoutines(userId);

  return (
    <>
      <Container
        sx={{
          display: "block",
          margin: "0 auto",
          "@media screen and (max-width: 535px)": {
            pt: "100px",
          },
        }}
      >
        <Typography
          variant='h4'
          color='text.secondary'
          sx={{ fontWeight: "bold", letterSpacing: "2px" }}
        >
          Your Favorite Routines
        </Typography>
        <Box sx={{ mt: 3 }}>
          <RoutineList
            routines={favoriteRoutines}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEditable={false}
          />
        </Box>
      </Container>
    </>
  );
};

export default FavoritesPage;
