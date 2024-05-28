import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { User } from "src/utils/types";
import { UsersService } from "src/services";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, { id: string; user: User }>(
    ({ id, user }) => UsersService.updateUser(id, user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export default useUpdateUser;
