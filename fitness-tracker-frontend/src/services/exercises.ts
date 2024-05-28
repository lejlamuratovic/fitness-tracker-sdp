import appAxios from "./appAxios";
import { Exercise } from "src/utils/types";

// get all exercises
const getExercises = async (): Promise<Exercise[]> => {
  return appAxios.get(`/exercise/`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// get exercise by id
const getExerciseById = async (id: string): Promise<Exercise> => {
  return appAxios.get(`/exercise/${id}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// add exercise
const addExercise = async (formData: FormData): Promise<Exercise> => {
  return appAxios
    .post("/exercise/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// update exercise
const updateExercise = async (
  id: string,
  formData: FormData
): Promise<Exercise> => {
  let response;
  try {
    response = await appAxios.put(`/exercise/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    console.log(error.response.data);
  }

  return response?.data;
};

// delete exercise by id
const deleteExercise = async (id: string): Promise<Exercise> => {
  return appAxios.delete(`/exercise/${id}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default {
  getExercises,
  getExerciseById,
  addExercise,
  deleteExercise,
  updateExercise,
};
