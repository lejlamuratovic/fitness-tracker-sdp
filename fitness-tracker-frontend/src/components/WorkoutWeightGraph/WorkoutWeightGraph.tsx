import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Container, Typography, TextField } from "@mui/material";

import { useLogsByUser } from "src/hooks";
import { RootState } from "src/store";

const formatDateForDisplay = (isoDate: string) => {
  return isoDate.split("T")[0]; // removing the time portion of the date string
};

const WorkoutWeightGraph = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const { data: workoutLogsList } = useLogsByUser(userId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<{ date: string; totalWeight: number }[]>([]);

  useEffect(() => {
    const sortedLogs = [...(workoutLogsList ?? [])].sort(
      (a, b) =>
        new Date(b.dateCompleted).getTime() -
        new Date(a.dateCompleted).getTime()
    );

    const relevantLogs = sortedLogs
      .filter((log) => {
        if (!startDate || !endDate) return true;
        const logDate = new Date(log.dateCompleted);
        return logDate >= startDate && logDate <= endDate;
      })
      .slice(0, 5);

    const chartData = relevantLogs.map((log) => {
      const totalWeight = log.exercises.reduce(
        (acc, curr) => acc + curr.weight,
        0
      );
      return { date: formatDateForDisplay(log.dateCompleted), totalWeight };
    });

    setData(chartData);
  }, [startDate, endDate, workoutLogsList]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant='h5'
        color='text.secondary'
        sx={{ mb: 2, textAlign: "center" }}
      >
        Total Weight Lifted
      </Typography>
      <ResponsiveContainer width='100%' aspect={6.0 / 4.0}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalWeight' fill='#1769aa' barSize={35} />
        </BarChart>
      </ResponsiveContainer>

      <Container
        sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          label='Start Date'
          type='date'
          onChange={(e) =>
            setStartDate(e.target.value ? new Date(e.target.value) : null)
          }
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
        <TextField
          label='End Date'
          type='date'
          onChange={(e) =>
            setEndDate(e.target.value ? new Date(e.target.value) : null)
          }
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
      </Container>
    </Box>
  );
};

export default WorkoutWeightGraph;
