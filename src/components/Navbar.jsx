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
  Breadcrumbs,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

const Navbar = () => {
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
    <AppBar
      position="sticky"
      sx={{
        height: "5rem",
        paddingY: "0.7rem",
        zIndex: 1,
        background: "#bf0212",
      }}
    >
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
        <Breadcrumbs aria-label="breadcrumb">
          {/* {location.pathname.split("/").map((item) => {
            return (
              <Link
                underline="hover"
                color="inherit"
                to={`${item}`}
                style={{ color: "white" }}
              >
                {item}
              </Link>
            );
          })} */}
          <p className="text-white text-lg">{`/dashboard${
            location.pathname == "/" ? "/overview" : location.pathname
          }`}</p>
        </Breadcrumbs>

        {/* actions */}
        <Actions>
          <button
            className="bg-gray-100 text-red-600 px-[0.5rem] py-[0.15rem] rounded "
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
