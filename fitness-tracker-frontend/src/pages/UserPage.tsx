import { Container, Box, Divider } from "@mui/material";

import UserInfo from "src/components/UserInfo";
import MuscleGroupChart from "src/components/MuscleGroupChart";
import WorkoutWeightGraph from "src/components/WorkoutWeightGraph";
import WorkoutList from "src/components/WorkoutList";

const UserPage = () => {
  return (
    <>
      <Container sx={{ display: "block", margin: "0 auto" }}>
        <Box sx={{ pt: 5 }}>
          <UserInfo />
        </Box>
        <Divider
          sx={{
            width: "90%",
            display: "block",
            ml: "auto",
            mr: "auto",
            mt: 3,
            mb: 3,
            backgroundColor: "gray",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <MuscleGroupChart />
          <WorkoutWeightGraph />
        </Box>
        <Divider
          sx={{
            width: "80%",
            display: "block",
            ml: "auto",
            mr: "auto",
            mt: 3,
            mb: 3,
            backgroundColor: "gray",
          }}
        />
        <Box sx={{}}>
          <WorkoutList />
        </Box>
      </Container>
    </>
  );
};

export default UserPage;
