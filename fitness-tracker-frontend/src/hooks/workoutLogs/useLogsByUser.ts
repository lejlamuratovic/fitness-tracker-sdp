import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { WorkoutLogsService } from "src/services";
import { WorkoutLog } from "src/utils/types";

// get all logs per user id
const useLogsByUser = (userId: string) => {
  return useQuery<WorkoutLog[], AxiosError>(
    ["workout logs", userId],
    () => WorkoutLogsService.getLogsByUserId(userId),
    { refetchOnWindowFocus: false }
  );
};

export default useLogsByUser;
