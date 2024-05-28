import { Box, Container, Typography } from "@mui/material";

import RoutineList from "src/components/RoutineList";
import AddRoutineModal from "src/components/AddRoutineModal";

import { usePublicRoutines } from "src/hooks";

const CommunityPage = () => {
  const { data: routines, isLoading, isError, error } = usePublicRoutines();

  return (
    <>
      <Container
        sx={{
          pt: "50px",
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
          Explore Public Routines
        </Typography>
        <Box sx={{ mt: 3 }}>
          <RoutineList
            routines={routines}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEditable={false}
          />
        </Box>
        <Box
          sx={{
            height: "100px",
            width: "100px",
            position: "fixed",
            right: 15,
            bottom: 5,
          }}
        >
          <AddRoutineModal />
        </Box>
      </Container>
    </>
  );
};

export default CommunityPage;
