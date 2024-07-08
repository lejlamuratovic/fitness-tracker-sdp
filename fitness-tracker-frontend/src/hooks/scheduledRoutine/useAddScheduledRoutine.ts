import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { ScheduledRoutine } from "src/utils/types";
import { ScheduledRoutineService } from "src/services";

const useAddScheduledRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation<ScheduledRoutine, AxiosError, { routine: ScheduledRoutine }>(
    ({ routine }) => ScheduledRoutineService.createScheduledRoutine(routine),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("scheduled-routines");
      },
    }
  );
};

export default useAddScheduledRoutine;
