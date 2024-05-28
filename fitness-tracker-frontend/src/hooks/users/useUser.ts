import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { UsersService } from "src/services";
import { User } from "src/utils/types";

// get user details by id
const useUser = (id: string) => {
  return useQuery<User, AxiosError>(
    ["user", id],
    () => UsersService.getUserById(id),
    { refetchOnWindowFocus: false }
  );
};

export default useUser;
