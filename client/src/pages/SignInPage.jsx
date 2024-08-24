import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import AccountNavbar from "../components/navbar/AccountNavbar";
import {
  BlackBackgroundButton,
  WhiteBackgroundButton,
} from "../components/generic/GenericButton";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { grey } from "@mui/material/colors";

const SignInPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: grey[900],
        color: "white",
      }}
    >
      <AccountNavbar />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
            padding: 5,
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
            backgroundColor: "black",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoFocus
            variant="outlined"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: grey[900],
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            sx={{
              marginBottom: 5,
              "& .MuiOutlinedInput-root": {
                backgroundColor: grey[900],
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
            }}
          />
          <BlackBackgroundButton buttonText="Sign In" type="submit" fullWidth />
          <Grid container sx={{ marginTop: 5 }}>
            <Grid item xs>
              <Link to="#" variant="body2" style={{ color: "white" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" style={{ color: "white" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
