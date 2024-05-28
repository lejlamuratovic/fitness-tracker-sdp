import { useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box } from "@mui/material";

import { RootState } from "src/store";
import { useLogsByUser, useExercises } from "src/hooks";
import { WorkoutLog, Exercise } from "src/utils/types";

interface ChartData {
  name: string;
  value: number;
}

const MuscleGroupChart = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const { data: exerciseList } = useExercises();
  const { data: workoutLogsList } = useLogsByUser(userId);

  // to hold muscle group counts
  const muscleGroupCounts: Record<string, number> = {};

  // for now this works by matching exercise names, will work with ids when connected to backend
  workoutLogsList?.forEach((log: WorkoutLog) => {
    log.exercises.forEach((exercise) => {
      const muscleGroup = exerciseList?.find(
        (e: Exercise) => e.name === exercise.exerciseName
      )?.muscleGroup;
      console.log(
        `Exercise: ${exercise.exerciseName}, Muscle Group: ${muscleGroup}`
      ); // debugging
      if (muscleGroup) {
        muscleGroupCounts[muscleGroup] =
          (muscleGroupCounts[muscleGroup] || 0) + 1;
      }
    });
  });

  console.log("Muscle Group Counts:", muscleGroupCounts); // debugging

  // to calculate total number of exercises
  const totalExercises = Object.values(muscleGroupCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  console.log("Total Exercises:", totalExercises); // debugging

  // convert counts to percentages
  const data: ChartData[] = Object.entries(muscleGroupCounts).map(
    ([muscleGroup, count]) => ({
      name: muscleGroup,
      value: (count / totalExercises) * 100,
    })
  );

  console.log("Chart Data:", data); // debugging

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A4DE6C",
    "#D075DE",
  ];

  return (
    <Box sx={{ p: 2, mb: 2 }}>
      <Typography
        variant='h5'
        color='text.secondary'
        sx={{ mb: 2, textAlign: "center" }}
      >
        Muscle Group Distribution
      </Typography>
      <ResponsiveContainer width='100%' height='100%' aspect={10.0 / 11.0}>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={120}
            fill='#8884d8'
            paddingAngle={0}
            dataKey='value'
            labelLine={false}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend align='center' verticalAlign='bottom' iconType='circle' />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MuscleGroupChart;
