import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Face from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { BlackBackgroundButton } from "./generic/GenericButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataStructureIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import PolylineIcon from "@mui/icons-material/Polyline";

const OptionDrawer = ({
  isOpen,
  toggleDrawer,
  handleLogout,
  currentPath,
  user,
}) => {
  const navigate = useNavigate();

  const drawerOptions = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      onClick: () => navigate("/dashboard"),
      roles: ["PREMIUM", "PREPLUS", "ADMIN"],
    },
    {
      text: "LeetCode",
      icon: <CodeIcon />,
      path: "/table",
      onClick: () => navigate("/table"),
      roles: ["REGULAR", "PREMIUM", "PREPLUS", "ADMIN"],
    },
    {
      text: "Data Structure",
      icon: <DataStructureIcon />,
      path: "/data-structure",
      onClick: () => navigate("/data-structure"),
      roles: ["PREPLUS", "ADMIN"],
    },
    {
      text: "Algorithm",
      icon: <PolylineIcon />,
      path: "/algorithm",
      onClick: () => navigate("/algorithm"),
      roles: ["PREPLUS", "ADMIN"],
    },
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      path: "/profile",
      onClick: () => navigate("/profile"),
      roles: ["REGULAR", "PREMIUM", "PREPLUS", "ADMIN"],
    },
  ];

  // Filter options based on user role
  const filteredOptions = drawerOptions.filter((option) =>
    option.roles.includes(user?.role)
  );

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: "25%",
          backgroundColor: "black",
          color: "white",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mt: 2,
        }}
      >
        <Avatar sx={{ backgroundColor: "white", color: "black" }}>
          <Face />
        </Avatar>
        <Typography variant="h6" color="white" mt={1}>
          {user?.firstName} {user?.lastName}
        </Typography>
      </Box>

      <List>
        {filteredOptions.map((option, index) => (
          <ListItem
            key={index}
            onClick={option.onClick}
            sx={{
              margin: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor:
                currentPath === option.path
                  ? "rgba(255, 255, 255, 0.2)"
                  : "inherit",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{option.icon}</ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItem>
        ))}
      </List>
      <Divider color="gray" sx={{ marginY: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 2,
          gap: 2,
        }}
      >
        <BlackBackgroundButton
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          buttonText="Log Out"
        />
      </Box>
    </Drawer>
  );
};

export default OptionDrawer;
