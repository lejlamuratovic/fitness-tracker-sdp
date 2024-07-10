import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { UsersService } from "src/services";

const useVerifyToken = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, [string, string]>(
    ([token, email]) => UsersService.verifyToken(token, email),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      }
    }
  );
};

export default useVerifyToken;
