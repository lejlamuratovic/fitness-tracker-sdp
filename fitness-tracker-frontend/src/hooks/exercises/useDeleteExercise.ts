import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { ExerciseService } from "src/services";
import { Exercise } from "src/utils/types";

const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation<Exercise, AxiosError, { id: string }>(
    ({ id }) => ExerciseService.deleteExercise(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("exercises");
      },
    }
  );
};

export default useDeleteExercise;
