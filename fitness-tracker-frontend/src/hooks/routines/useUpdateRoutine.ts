import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

const useUpdateRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation<Routine, AxiosError, { id: string; data: Routine }>(
    ({ id, data }) => RoutineService.updateRoutine(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("routine");
      },
    }
  );
};

export default useUpdateRoutine;
