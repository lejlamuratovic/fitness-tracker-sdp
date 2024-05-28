import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { UsersService } from "src/services";

const useAddRoutineToFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, { userId: string; routineId: string }>(
    ({ userId, routineId }) =>
      UsersService.addFavoriteRoutine(userId, routineId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favoriteRoutines");
      },
    }
  );
};

export default useAddRoutineToFavorites;
