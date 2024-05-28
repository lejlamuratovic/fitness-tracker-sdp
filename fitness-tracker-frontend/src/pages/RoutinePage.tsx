import { useSelector } from "react-redux";

import RoutineList from "src/components/RoutineList";
import AddRoutineModal from "src/components/AddRoutineModal";

import { Box, Container, Typography } from "@mui/material"

import { RootState } from "src/store";
import { useRoutines } from "src/hooks";

const RoutinePage = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);

    if (!userId) {
        return (
            <Container sx={{ pt: '50px', display: 'block', margin: '0 auto' }}>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: '2px' }}>
                    Please log in to view your routines
                </Typography>
            </Container>
        );
    }

    const { data: routines, isLoading, isError, error } = useRoutines(userId);

    return (
        <>
        <Container sx={{ 
            display: 'block', 
            margin: '0 auto',
            '@media screen and (max-width: 535px)': {
                pt: '100px'
            }
        }}>
            <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: '2px' }}>
            Your Routines
            </Typography>
            <Box sx={{ mt: 3 }}>
            <RoutineList routines={routines} isLoading={isLoading} isError={isError} error={error} isEditable={true} />
            </Box>
            <Box sx={{ height: '100px', width: '100px', position: 'fixed', right: 15, bottom: 5 }}>
            <AddRoutineModal />
            </Box>
        </Container>
        </>
    );
}

export default RoutinePage
