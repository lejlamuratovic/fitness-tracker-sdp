import { useMutation, useQueryClient } from "react-query";

import { ExerciseService } from "src/services";

const useAddExercise = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (formData: FormData) => ExerciseService.addExercise(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("exercises");
      },
    }
  );
};

export default useAddExercise;
