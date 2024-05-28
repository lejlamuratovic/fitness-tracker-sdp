import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { ExerciseService } from "src/services";
import { Exercise } from "src/utils/types";

const useExercises = () => {
  return useQuery<Exercise[], AxiosError>(
    "exercises",
    () => ExerciseService.getExercises(),
    { refetchOnWindowFocus: false }
  );
};

export default useExercises;
