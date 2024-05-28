import appAxios from "./appAxios";
import { ExerciseDetail, Routine } from "src/utils/types";

// get routine by user id
const getRoutines = async (userId: string): Promise<Routine[]> => {
  return appAxios.get(`/routines/user/${userId}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// get routine by id
const getRoutineById = async (routineId: string): Promise<Routine> => {
  return appAxios.get(`/routines/${routineId}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// update routine
const updateRoutine = async (
  routineId: string,
  routine: Routine
): Promise<Routine> => {
  try {
    const response = await appAxios.put(`/routines/${routineId}`, routine);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// add exercise to existing routine
const addExerciseToRoutine = async (
  id: string,
  exercise: ExerciseDetail
): Promise<Routine> => {
  try {
    const response = await appAxios.post(`/routines/${id}/exercises`, exercise);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create routine
const createRoutine = async (routine: Routine): Promise<Routine> => {
  return appAxios.post(`/routines/`, routine).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// mark routqine as completed
const markRoutineCompleted = async (
  id: string,
  dateCompleted: string,
  userId: string
): Promise<Routine> => {
  const date = new Date(dateCompleted);
  const formattedDate = date.toISOString(); // in the format yyyy-MM-dd'T'HH:mm:ss.SSSZ that the backend expects

  try {
    const response = await appAxios.post(
      `/routines/${id}/complete/${userId}`,
      JSON.stringify(formattedDate),
      {
        // stringify the date because backend expects a string
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    throw error;
  }
};

// delete routine
const deleteRoutine = async (id: string): Promise<Routine> => {
  try {
    const response = await appAxios.delete(`/routines/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get public routines
const getPublicRoutines = async (): Promise<Routine[]> => {
  return appAxios.get(`/routines/public`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default {
  getRoutines,
  getRoutineById,
  updateRoutine,
  addExerciseToRoutine,
  createRoutine,
  markRoutineCompleted,
  deleteRoutine,
  getPublicRoutines,
};
