import React from "react";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";

import {
  Home,
  Groups,
  Settings,
  ModeNight,
  LightMode,
  AccountBalance,
} from "@mui/icons-material";
import ContactsIcon from "@mui/icons-material/Contacts";
import { red } from "@mui/material/colors";
import { Link, Outlet } from "react-router-dom";

const Sidebar = ({ toogleThemeMode, themeMode }) => {
  let links = [
    { icon: <Home />, title: "Overview", path: "/dashboard" },
    { icon: <AccountBalance />, title: "Banks", path: "/dashboard/banks" },
    {
      icon: <AccountBalance />,
      title: "Add  ",
      path: "/dashboard/addBank",
    },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        width: "16vw",
        maxWidth: "190px",
        height: "100vh",
        maxWidth: "25%",
        position: "fixed",
        borderRight: "1px solid #c9c8c7 ",
        paddingTop: "3.2rem",
      }}
    >
      <Box>
        <List sx={{ width: "100%" }}>
          {links.map(({ title, icon, path }, index) => (
            <ListItem key={index} sx={{ width: "100%", marginX: "auto" }}>
              <Link to={path} style={{ textDecoration: "none", color: "red" }}>
                <ListItemButton
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "auto ", fontSize: "2rem" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{
                      fontSize: "2rem",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          {/* THEME MODE TOGGLER */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ justifyContent: "center", gap: 0 }}>
                {themeMode === "dark" ? <ModeNight /> : <LightMode />}
              </ListItemIcon>
              <Switch onChange={toogleThemeMode} sx={{ marginLeft: "-15px" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
