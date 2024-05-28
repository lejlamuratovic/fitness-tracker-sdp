import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { ExerciseService } from "src/services";
import { Exercise } from "src/utils/types";

// get exercise details by id
const useExercise = (id: string) => {
  return useQuery<Exercise, AxiosError>(
    ["exercise", id],
    () => ExerciseService.getExerciseById(id),
    { refetchOnWindowFocus: false }
  );
};

export default useExercise;
