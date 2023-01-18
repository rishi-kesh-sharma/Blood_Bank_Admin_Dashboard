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
import { useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../actions/authActions";
import { logoutUser } from "../apiCalls/auth";
import SearchBar from "./SearchBar";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Actions = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "0.2px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = ({
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
          sx={{ display: { xs: "none", sm: "block" }, marginLeft: "1rem" }}
        >
          Blood Bank
        </Typography>
        <Code sx={{ display: { xs: "block", sm: "none" } }} />
        {location.pathname == "/dashboard/banks" && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* actions */}
        <Actions>
          <button
            className="bg-white text-red-600 px-[0.5rem] py-[0.15rem] rounded "
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </Actions>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
