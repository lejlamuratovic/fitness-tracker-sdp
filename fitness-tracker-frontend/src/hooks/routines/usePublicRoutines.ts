import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { RoutineService } from "src/services";
import { Routine } from "src/utils/types";

// get by user id
const usePublicRoutines = () => {
  return useQuery<Routine[], AxiosError>(
    "routines",
    () => RoutineService.getPublicRoutines(),
    { refetchOnWindowFocus: false }
  );
};

export default usePublicRoutines;
