import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getOverview } from "../apiCalls/misc";
import { useDispatch, useSelector } from "react-redux";
import { SET_OVERVIEW } from "../actions/overviewActions";
const Overview = () => {
  const overview = useSelector((state) => state.overviewReducer);
  return (
    <div
      className="cards"
      style={{
        display: "flex",
        alignItems: "start",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "6rem",
        minHeight: "100vh",
      }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Banks
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {overview.totalBanks}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Users
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {overview.totalUsers}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
