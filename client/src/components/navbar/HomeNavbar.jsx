import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { grey } from "@mui/material/colors";
import {
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BlackBackgroundButton } from "../generic/GenericButton";

const HomeNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const list = () => (
    <Box
      sx={{ width: 150 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/signin">
          <ListItemText primary="Sign In" sx={{ color: "#fff" }} />
        </ListItem>
        <ListItem component={Link} to="/register" sx={{ color: "#fff" }}>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Toolbar>
        <FlutterDashIcon />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            ml: 2,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          YLSLC
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: grey[900],
                },
              }}
            >
              {list()}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <BlackBackgroundButton
              component={Link}
              to="/signin"
              buttonText="Sign In"
            />
            <BlackBackgroundButton
              component={Link}
              to="/register"
              buttonText="Register"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
