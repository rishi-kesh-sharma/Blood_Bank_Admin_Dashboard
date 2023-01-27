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
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = ({ toogleThemeMode, themeMode }) => {
  const location = useLocation();
  console.log(location.pathname);

  let links = [
    { icon: <Home />, title: "Overview", path: "/", isActive: true },
    {
      icon: <AccountBalance />,
      title: "Banks",
      path: "/banks",
      isActive: false,
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
        paddingTop: "2rem",
        background: "#fafafc",
        boxShadow: "5px 10px 20px #b8b8b8",
      }}
    >
      <Box>
        <List sx={{ width: "100%" }}>
          {links.map(({ title, icon, path }, index) => (
            <ListItem key={index} sx={{ width: "100%" }}>
              <Link
                to={path}
                style={{
                  textDecoration: "none",
                  color: "#bf0212",
                  display: "inline-block",
                  width: "100%",
                }}
                className={`${location.pathname == path && "active-link"} `}
              >
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
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ justifyContent: "center", gap: 0 }}>
                {themeMode === "dark" ? <ModeNight /> : <LightMode />}
              </ListItemIcon>
              <Switch onChange={toogleThemeMode} sx={{ marginLeft: "-15px" }} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
