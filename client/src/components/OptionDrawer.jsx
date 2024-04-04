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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Face from "@mui/icons-material/Face";
import Group from "@mui/icons-material/Group";
import AccountTree from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { BlackBackgroundButton } from "./generic/GenericButton";
import DashboardIcon from "@mui/icons-material/Dashboard";

const OptionDrawer = ({ isOpen, toggleDrawer, handleLogout }) => {
  const navigate = useNavigate();
  const drawerOptions = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/dashboard"),
    },
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      onClick: () => navigate("/profile"),
    },
    {
      text: "Friends",
      icon: <Group />,
      onClick: () => navigate("/friends"),
    },
    {
      text: "Bank",
      icon: <AccountTree />,
      onClick: () => navigate("/bank"),
    },
  ];

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
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          mt: 2,
        }}
      >
        <Avatar sx={{ backgroundColor: "white", color: "black" }}>
          <Face />
        </Avatar>
      </Box>

      <List>
        {drawerOptions.map((option, index) => (
          <ListItem
            key={index}
            onClick={option.onClick}
            sx={{
              margin: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
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
      <Box textAlign="center" position="absolute" bottom={0} width="100%" p={2}>
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
