import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WorkoutCard from "src/components/WorkoutCard";
import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";

import {
  Container,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

import { useLogsByUser } from "src/hooks";
import { RootState } from "src/store";

const WorkoutList = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const {
    data: workoutLogsList,
    isLoading,
    isError,
    error,
  } = useLogsByUser(userId);

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredWorkoutLogs, setFilteredWorkoutLogs] =
    useState(workoutLogsList);

  useEffect(() => {
    if (!workoutLogsList) {
      return;
    }

    // convert date strings to timestamps for comparison
    const sortedWorkoutLogs = [...workoutLogsList].sort((a, b) => {
      // sort by date completed in descending order
      return (
        new Date(b.dateCompleted).getTime() -
        new Date(a.dateCompleted).getTime()
      );
    });

    let filteredLogs = sortedWorkoutLogs;

    if (startDate || endDate) {
      filteredLogs = sortedWorkoutLogs.filter((log) => {
        const logDate = new Date(log.dateCompleted);
        const start = startDate ? new Date(startDate) : new Date("1970-01-01");
        const end = endDate ? new Date(endDate) : new Date("2999-12-31");
        return logDate >= start && logDate <= end;
      });
    }

    setFilteredWorkoutLogs(filteredLogs);
    setPage(1); // reset to the first page after filtering
  }, [startDate, endDate, workoutLogsList]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWorkoutLogs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Container>
      <Typography variant='h5' color='text.secondary' sx={{ marginBottom: 2 }}>
        Workout History
      </Typography>

      {/* to filter workouts by date */}
      <TextField
        label='Start Date'
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ m: 2 }}
      />
      <TextField
        label='End Date'
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ m: 2 }}
      />

      {isLoading && <Loading />}

      {isError && <ErrorAlert message={error.message} />}

      {/* workout list */}
      {workoutLogsList && currentItems && currentItems.length > 0 ? (
        <Grid
          container
          spacing={4}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {currentItems.map((workoutLog, i) => (
            <Grid item xs={12} sm={6} md={3} lg={4} key={i}>
              <WorkoutCard userId={userId} workoutLog={workoutLog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          color='text.secondary'
          variant='body1'
          sx={{ fontSize: "20px" }}
        >
          No workouts found for the selected dates.
        </Typography>
      )}

      {/* pagination */}
      <Pagination
        count={Math.ceil((filteredWorkoutLogs?.length ?? 0) / itemsPerPage)}
        page={page}
        onChange={(_, newPage) => handleChangePage(newPage)}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default WorkoutList;
