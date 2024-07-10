import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { UsersService } from "src/services";

const useInitiatePasswordReset = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>(
    (email) => UsersService.initiatePasswordReset(email),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      }
    }
  );
};

export default useInitiatePasswordReset;
