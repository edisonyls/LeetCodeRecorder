import React, { useEffect, useState } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountNavbar from "../components/navbar/AccountNavbar";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import { useUser } from "../context/userContext";
import { UserHooks } from "../hooks/userHooks/UserHooks";
import { userActionTypes } from "../reducer/userActions";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#B9BBB6" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        LeetCodeRecorder
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();
  const { login, getCurrentUser } = UserHooks();
  const { isAuthenticated, token, user, error } = state;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Invalid login credentials. Try again!");

      // Clear the error state after a delay
      setTimeout(() => {
        dispatch({ type: userActionTypes.CLEAR_ERROR });
      }, 5000); // Adjust the delay as needed
    }
    if (token) {
      getCurrentUser(token);
    }
    if (isAuthenticated && user && Object.keys(user).length > 0) {
      navigate("/dashboard");
    }
  }, [error, isAuthenticated, navigate, user, getCurrentUser, token, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data.username) {
      toast.error("Please enter your email address!");
      return;
    }

    if (!data.password) {
      toast.error("Please enter your password!");
      return;
    }

    // Proceed with login if validation passes
    login(data);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AccountNavbar />
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100%" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ marginBottom: "2rem" }}
              />
              <WhiteBackgroundButton
                buttonText="Sign In"
                type="submit"
                fullWidth
              />
              <Grid container sx={{ marginTop: 2 }}>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleOpenDialog}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ marginTop: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{"Feature in Development"}</DialogTitle>
        <DialogContent>
          This feature is currently being developed and is not available at the
          moment. Please check back later!
        </DialogContent>
      </Dialog>
    </Box>
  );
}
