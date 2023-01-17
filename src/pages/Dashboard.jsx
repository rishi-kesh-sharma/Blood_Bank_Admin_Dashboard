import React, { useState } from "react";
import { createTheme, Stack, Box, ThemeProvider } from "@mui/material";

import { Navbar, Sidebar } from "../components";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_OVERVIEW } from "../actions/overviewActions";
import { getOverview } from "../apiCalls/misc";
const Dashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getOverviews = async () => {
      const overviews = await getOverview();
      dispatch({ type: SET_OVERVIEW, payload: overviews });
    };
    getOverviews();
  });

  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const [mode, setMode] = useState("light");
  const toogleThemeMode = () => setMode(mode === "light" ? "dark" : "light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });
  // if (isAuthenticated) return <Navigate to="/dashboard/" />;
  return (
    <div>
      {isAuthenticated ? (
        <ThemeProvider theme={theme}>
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Stack direction="row" gap="15rem">
              <Sidebar toogleThemeMode={toogleThemeMode} themeMode={mode} />
              <Outlet />
            </Stack>
          </Box>
        </ThemeProvider>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Dashboard;
