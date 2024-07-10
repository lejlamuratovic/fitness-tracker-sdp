import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { UsersService } from "src/services";

const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, [string, string]>(
    ([email, newPassword]) => UsersService.resetPassword(email, newPassword),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      }
    }
  );
};

export default useResetPassword;
