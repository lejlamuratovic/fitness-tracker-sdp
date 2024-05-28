import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

// get routine details by id
const useRoutine = (id: string) => {
  return useQuery<Routine, AxiosError>(
    ["routine", id],
    () => RoutineService.getRoutineById(id),
    { refetchOnWindowFocus: false }
  );
};

export default useRoutine;
