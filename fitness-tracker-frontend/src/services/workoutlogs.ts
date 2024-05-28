import appAxios from "./appAxios";
import { WorkoutLog } from "src/utils/types";

// get workout logs by user id
const getLogsByUserId = async (userId: string): Promise<WorkoutLog[]> => {
  return appAxios.get(`/workoutlogs/user/${userId}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default { getLogsByUserId };
