import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { ExerciseService } from "src/services";
import { Exercise } from "src/utils/types";

const useUpdateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation<Exercise, AxiosError, { id: string; formData: FormData }>(
    ({ id, formData }) => ExerciseService.updateExercise(id, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("exercises");
      },
    }
  );
};

export default useUpdateExercise;
