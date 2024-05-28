import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserAvatar from "src/components/UserAvatar";
import EditInfoModal from "src/components/EditInfoModal";
import Loading from "src/components/Loading";
import ErrorAlert from "src/components/ErrorAlert";
import SuccessAlert from "src/components/SuccessAlert";

import {
  Typography,
  Button,
  Container,
  Box,
  InputAdornment,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useUser } from "src/hooks";
import { logout } from "src/store/authSlice";
import { RootState } from "src/store";

const UserInfo = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const { data: user, isLoading, isError, error } = useUser(userId);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(user);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // update the user data when the user changes
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleSuccess = () => {
    setSuccessMessage(true);
  };

  return (
    <Container maxWidth='sm' sx={{ backgroundColor: "primary" }}>
      {successMessage && (
        <SuccessAlert
          message='Your information has been updated!'
          key={Date.now()}
        />
      )}

      {isLoading && <Loading />}

      {isError && <ErrorAlert message={error?.message} />}

      {user && (
        <Box>
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            size='80px'
            fontSize='30px'
            sx={{ margin: "15px auto" }}
          />

          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            {user.firstName} {user.lastName}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {user.email}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              size='medium'
              variant='contained'
              onClick={handleModalOpen}
              sx={{
                marginTop: "20px",
                color: "white",
                borderColor: "gray",
                maxWidth: "300px",
                display: "block",
                ml: "auto",
                mr: "auto",
                backgroundColor: "#72A1BF",
              }}
            >
              Edit personal information
            </Button>
            <Button
              size='medium'
              variant='text'
              sx={{
                marginTop: "20px",
                color: "text.secondary",
                backgroundColor: "none",
                maxWidth: "300px",
                display: "flex",
                ml: "auto",
                mr: "auto",
                "&:hover": {
                  backgroundColor: "none",
                  color: "text.primary",
                },
              }}
              onClick={() => dispatch(logout())}
              component={Link}
              to='/'
            >
              <InputAdornment position='start'>
                <LogoutIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
              Log out
            </Button>
          </Box>
        </Box>
      )}

      {user && userData && (
        <EditInfoModal
          open={modalOpen}
          handleClose={handleModalClose}
          user={userData}
          setUser={setUserData}
          onSuccess={handleSuccess}
        />
      )}
    </Container>
  );
};

export default UserInfo;
