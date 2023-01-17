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
  ];

  return (
    <Box
      flex={1}
      p={1}
      sx={{
        display: { xs: "none", sm: "block" },
        width: "400px",
        height: "100vh",
        maxWidth: "20%",
        borderRight: "1px solid #c9c8c7 ",
      }}>
      <Box>
        <List>
          {links.map(({ title, icon, path }, index) => (
            <ListItem key={index} sx={{ width: "100%" }}>
              <Link to={path} style={{ textDecoration: "none", color: "red" }}>
                <ListItemButton sx={{ width: "100%" }}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          {/* THEME MODE TOGGLER */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {themeMode === "dark" ? <ModeNight /> : <LightMode />}
              </ListItemIcon>
              <Switch onChange={toogleThemeMode} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
