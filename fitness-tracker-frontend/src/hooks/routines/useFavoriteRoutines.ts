import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { UsersService } from "src/services";
import { Routine } from "src/utils/types";

const usePublicRoutines = (id: string) => {
  return useQuery<Routine[], AxiosError>(
    "favoriteRoutines",
    () => UsersService.getFavoriteRoutines(id),
    { refetchOnWindowFocus: false }
  );
};

export default usePublicRoutines;
