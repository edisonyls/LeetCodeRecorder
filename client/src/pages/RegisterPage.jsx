import { Avatar, TextField, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountNavbar from "../components/navbar/AccountNavbar";
import { BlackBackgroundButton } from "../components/generic/GenericButton";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer";

const RegisterPage = () => {
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
          my: 4,
          mx: 4,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          Register
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                id="lastName"
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="username"
                label="Email Address"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="password"
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                sx={{ marginBottom: 5 }}
              />
            </Grid>
          </Grid>
          <BlackBackgroundButton buttonText="Sign Up" type="submit" fullWidth />
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid item>
              <Link to="/signin" variant="body2" style={{ color: "white" }}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

const CustomTextField = ({
  id,
  label,
  name,
  type = "text",
  autoFocus = false,
  required = true,
  sx = {},
}) => {
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      type={type}
      required={required}
      autoFocus={autoFocus}
      fullWidth
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: { color: "white", borderColor: "white" },
      }}
      variant="outlined"
      sx={{
        marginBottom: 2,
        "& .MuiOutlinedInput-root": {
          backgroundColor: grey[900],
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "white",
          },
        ...sx,
      }}
    />
  );
};

export default RegisterPage;
