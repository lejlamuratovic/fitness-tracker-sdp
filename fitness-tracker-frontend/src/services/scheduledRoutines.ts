import appAxios from "./appAxios";
import { ScheduledRoutine } from "src/utils/types";

// create routine
const createScheduledRoutine = async (routine: ScheduledRoutine): Promise<ScheduledRoutine> => {
  return appAxios.post(`/scheduled-routines/`, routine).then((response) => {
    const data = response.data;

    return data;
  });
};


export default { createScheduledRoutine };
