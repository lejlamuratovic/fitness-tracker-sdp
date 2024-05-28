import { useSelector } from "react-redux";

import ExerciseList from "src/components/ExerciseList";
import ExerciseModal from "src/components/ExerciseModal";

import { Box, Container } from "@mui/material";

import { RootState } from "src/store";

const ExplorePage = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <ExerciseList />
      </Container>
      <Box
        sx={{
          height: "100px",
          width: "100px",
          position: "fixed",
          right: 15,
          bottom: 5,
        }}
      >
        {userType === "ADMIN" && <ExerciseModal />}
      </Box>
    </>
  );
};

export default ExplorePage;
