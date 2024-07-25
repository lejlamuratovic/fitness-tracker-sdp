import appAxios from "./appAxios";
import { Password, Routine, User } from "src/utils/types";

// get exercise by id
const getUserById = async (id: string): Promise<User> => {
  return appAxios.get(`/users/${id}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// update user
const updateUser = async (id: string, user: User): Promise<User> => {
  return appAxios.put(`/users/${id}`, user).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// update user password
const updateUserPassword = async (
  id: string,
  password: Password
): Promise<User> => {
  return appAxios.put(`/users/password/${id}`, password).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

// get favorite routines
const getFavoriteRoutines = async (id: string): Promise<Routine[]> => {
  return appAxios.get(`/users/${id}/favorite-routines`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

// add routine to users favorites
const addFavoriteRoutine = async (
  userId: string,
  routineId: string
): Promise<void> => {
  return appAxios
    .put(`/users/${userId}/add-favorite/${routineId}`)
    .then((response) => {
      console.log(response.data);
    });
};

// remove routine from users favorites
const removeFavoriteRoutine = async (
  userId: string,
  routineId: string
): Promise<void> => {
  return appAxios
    .put(`/users/${userId}/remove-favorite/${routineId}`)
    .then((response) => {
      console.log(response.data);
    })
};

const initiatePasswordReset = async (email: string): Promise<void> => {
  return appAxios.get(`/auth/initiate-password-reset?email=${email}`).then((response) => {
    console.log(response.data);
  })
};

const verifyToken = async (token: string, email: string): Promise<void> => {
  return appAxios.get(`/auth/verify-token?token=${token}&email=${email}`).then((response) => {
    console.log(response.data);
  })
}

const resetPassword = async (email: string, newPassword: string): Promise<void> => {
  return appAxios.put(`/auth/reset-password`, { email, newPassword }).then((response) => {
    console.log(response.data);
  })
}

export default {
  getUserById,
  updateUser,
  updateUserPassword,
  getFavoriteRoutines,
  addFavoriteRoutine,
  removeFavoriteRoutine,
  initiatePasswordReset,
  verifyToken,
  resetPassword
};
