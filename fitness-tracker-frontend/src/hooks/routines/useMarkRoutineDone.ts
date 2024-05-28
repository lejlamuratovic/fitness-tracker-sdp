import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

const useMarkRoutineDone = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Routine,
    AxiosError,
    { id: string; dateCompleted: string; userId: string }
  >(
    ({ id, dateCompleted, userId }) =>
      RoutineService.markRoutineCompleted(id, dateCompleted, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workoutlogs");
      },
    }
  );
};

export default useMarkRoutineDone;
