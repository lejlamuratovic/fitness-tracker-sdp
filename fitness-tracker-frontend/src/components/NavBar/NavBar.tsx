import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { RootState } from "src/store";
import { logout } from "src/store/authSlice";

const NavBar = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);
  const userToken = useSelector((state: RootState) => state.auth.userToken);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "#72A1BF",
        pl: 1,
        pr: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", maxWidth: "100%" }}>
        {/* Icon and Logo */}
        <Box sx={{ display: "flex" }}>
          <FitnessCenterIcon
            sx={{
              display: { xs: "none", sm: "block" },
              fontSize: "40px",
              mr: 1,
              color: "white",
            }}
          />
          <Typography
            variant='h4'
            sx={{
              display: { xs: "none", sm: "block" },
              mr: 1,
              color: "white",
              "&:hover": {
                color: "white",
              },
            }}
            component={Link}
            to='/'
          >
            Fitness Tracker
          </Typography>
        </Box>

        {/* Menu for smaller screens */}
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ display: { xs: "block", sm: "none" }, mr: 1 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ color: "white" }}
        >
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to='/'
            sx={{ color: "white" }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to='/explore'
            sx={{ color: "white" }}
          >
            Explore
          </MenuItem>
          {userType === "MEMBER" && (
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to='/routines'
              sx={{ color: "white" }}
            >
              Routines
            </MenuItem>
          )}
          {userType === "MEMBER" && (
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to='/community'
              sx={{ color: "white" }}
            >
              Community
            </MenuItem>
          )}
          {userType === "MEMBER" && (
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to='/favorites'
              sx={{ color: "white" }}
            >
              Favorites
            </MenuItem>
          )}
        </Menu>

        {/* Buttons for larger screens */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            paddingLeft: "20px",
          }}
        >
          <Button
            color='inherit'
            sx={{
              fontSize: "16px",
              color: "white",
              "&:hover": {
                fontWeight: "bold",
                color: "white",
              },
            }}
            component={Link}
            to='/'
          >
            Home
          </Button>
          <Button
            color='inherit'
            sx={{
              fontSize: "16px",
              color: "white",
              "&:hover": {
                fontWeight: "bold",
                color: "white",
              },
            }}
            component={Link}
            to='/explore'
          >
            Explore
          </Button>
          {userType === "MEMBER" && (
            <Button
              color='inherit'
              sx={{
                fontSize: "16px",
                color: "white",
                "&:hover": {
                  fontWeight: "bold",
                  color: "white",
                },
              }}
              component={Link}
              to='/routines'
            >
              Routines
            </Button>
          )}
          {userType === "MEMBER" && (
            <Button
              color='inherit'
              sx={{
                fontSize: "16px",
                color: "white",
                "&:hover": {
                  fontWeight: "bold",
                  color: "white",
                },
              }}
              component={Link}
              to='/community'
            >
              Community
            </Button>
          )}
          {userType === "MEMBER" && (
            <Button
              color='inherit'
              sx={{
                fontSize: "16px",
                color: "white",
                "&:hover": {
                  fontWeight: "bold",
                  color: "white",
                },
              }}
              component={Link}
              to='/favorites'
            >
              Favorites
            </Button>
          )}
        </Box>

        {userToken ? (
          userType === "MEMBER" ? (
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              color='inherit'
              component={Link}
              to='/users/1'
              sx={{ "&:hover": { color: "lightgray" } }}
            >
              <AccountCircle sx={{ fontSize: "35px", color: "white" }} />
            </IconButton>
          ) : (
            // render logout button for admin
            <Button
              color='inherit'
              onClick={() => dispatch(logout())}
              sx={{
                fontSize: "16px",
                "&:hover": { fontWeight: "bold", color: "white" },
              }}
              component={Link}
              to='/'
            >
              Logout
            </Button>
          )
        ) : (
          // render login if no userToken
          <Button
            color='inherit'
            component={Link}
            to='/login'
            sx={{
              fontSize: "16px",
              "&:hover": { fontWeight: "bold", color: "white" },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
