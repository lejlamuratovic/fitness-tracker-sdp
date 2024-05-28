import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

// get by user id
const useRoutines = (userId: string) => {
  return useQuery<Routine[], AxiosError>(
    ["routines", userId],
    () => RoutineService.getRoutines(userId),
    { refetchOnWindowFocus: false }
  );
};

export default useRoutines;
