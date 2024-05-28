import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

const useDeleteRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation<Routine, AxiosError, { id: string }>(
    ({ id }) => RoutineService.deleteRoutine(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("routines");
      },
    }
  );
};

export default useDeleteRoutine;
