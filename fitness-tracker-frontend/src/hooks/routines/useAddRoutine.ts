import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Routine } from "src/utils/types";
import { RoutineService } from "src/services";

const useAddRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation<Routine, AxiosError, { routine: Routine }>(
    ({ routine }) => RoutineService.createRoutine(routine),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("routines");
      },
    }
  );
};

export default useAddRoutine;
