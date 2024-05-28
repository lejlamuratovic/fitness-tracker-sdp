import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Password, User } from "src/utils/types";
import { UsersService } from "src/services";

const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, { id: string; password: Password }>(
    ({ id, password }) => UsersService.updateUserPassword(id, password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export default useUpdateUserPassword;
