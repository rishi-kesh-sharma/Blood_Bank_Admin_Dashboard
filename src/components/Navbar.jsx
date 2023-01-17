import React, { useState } from "react";

import { Mail, Code, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  InputBase,
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  menuItemClasses,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../actions/authActions";
import { logoutUser } from "../apiCalls/auth";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(0,0,0,0.2)",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Actions = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "0.2px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const handleLogoutClick = async (e) => {
    const response = await logoutUser();
    localStorage.removeItem("auth-token");
    dispatch({
      type: LOGOUT,
      payload: { isAuthenticated: false, authenticatedUser: {} },
    });

    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        {/* brandname */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ display: { xs: "none", sm: "block" } }}>
          {"<JohnKoder />"}
        </Typography>
        <Code sx={{ display: { xs: "block", sm: "none" } }} />

        {/* searchbar */}
        <SearchBar>
          <InputBase placeholder="Search..." />
        </SearchBar>

        {/* actions */}
        <Actions>
          <button onClick={handleLogoutClick}>Logout</button>
        </Actions>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
