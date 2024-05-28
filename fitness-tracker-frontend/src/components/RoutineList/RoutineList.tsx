import { useState } from "react";
import { useSelector } from "react-redux";

import RoutineCard from "src/components/RoutineCard";
import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";

import {
  Container,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { Routine } from "src/utils/types";
import { useFavoriteRoutines } from "src/hooks";
import { RootState } from "src/store";

type RoutineListProps = {
  routines: Routine[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  isEditable?: boolean;
};

const RoutineList = ({
  routines,
  isLoading,
  isError,
  error,
  isEditable,
}: RoutineListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name"); // 'name' or 'date'
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const userId = useSelector((state: RootState) => state.auth.userId);
  if (!userId) {
    return null;
  }

  const { data: favoriteRoutines } = useFavoriteRoutines(userId);

  const favoriteRoutineIds: string[] =
    favoriteRoutines?.reduce<string[]>((acc, routine) => {
      if (routine.id) acc.push(routine.id);
      return acc;
    }, []) || [];

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event: any) => {
    setSortCriteria(event.target.value as string);
    setPage(1);
  };

  if (routines == null) {
    return null;
  }

  const filteredRoutines = routines
    .filter((routine) =>
      routine.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      } else {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateB.getTime() - dateA.getTime();
      }
    });

  const pageCount = Math.ceil(filteredRoutines.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedRoutines = filteredRoutines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container sx={{ minHeight: "calc(100vh - 200px)" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          // media query for mobile devices
          "@media screen and (max-width: 535px)": {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& > *": {
              marginBottom: "10px",
            },
          },
        }}
      >
        {/* sort criteria */}
        <FormControl size='small' sx={{ width: 150, backgroundColor: "white" }}>
          <Select
            value={sortCriteria}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value='name'>Sort by Name</MenuItem>
            <MenuItem value='date'>Sort by Date</MenuItem>
          </Select>
        </FormControl>

        {/* search */}
        <TextField
          placeholder='Search routines'
          value={searchQuery}
          onChange={handleSearchChange}
          variant='outlined'
          size='small'
          sx={{ backgroundColor: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>

      {isLoading && <Loading />}

      {isError && <ErrorAlert message={error?.message} />}

      {/* routines list */}
      {!isLoading && (
        <Grid container spacing={2}>
          {paginatedRoutines.map((routine, i) => (
            <Grid item key={i} xs={12} sm={10} md={4} lg={4}>
              <RoutineCard
                routine={routine}
                isEditable={isEditable}
                favoriteIds={favoriteRoutineIds}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* pagination */}
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default RoutineList;
