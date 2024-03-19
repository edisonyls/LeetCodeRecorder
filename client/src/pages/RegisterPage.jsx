import { useEffect, useState } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../auth/authSlice";
import AccountNavbar from "../components/navbar/AccountNavbar";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import PasswordValidator from "../components/PasswordValidator";

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

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const checkData = (data) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.firstName) {
      toast.error("Please fill in your first name!");
      return false;
    } else if (!data.lastName) {
      toast.error("Please fill in your last name!");
      return false;
    } else if (!data.username) {
      toast.error("Please fill in your email address!");
      return false;
    } else if (!emailRegex.test(data.username)) {
      toast.error("Please enter a valid email address.");
      return false;
    } else if (!data.password) {
      toast.error("Please fill in your password!");
      return false;
    } else if (!confirmPassword) {
      toast.error("Please re-enter your password!");
      return false;
    }
    if (!passwordRegex.test(data.password)) {
      toast.error(
        "Password must contain letters and numbers, and be 8-16 characters long."
      );
      return false;
    }

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
  };

  const formatName = ({ name }) => {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return name;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (checkData(data) === false) {
      return;
    } else {
      data.firstName = formatName({ name: data.firstName });
      data.lastName = formatName({ name: data.lastName });
      data.role = "USER";
      dispatch(register(data));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AccountNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid container sx={{ height: "100%" }}>
          <CssBaseline />
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Email Address"
                      name="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {password && <PasswordValidator password={password} />}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!passwordsMatch}
                      helperText={
                        !passwordsMatch ? "Passwords do not match." : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginBottom: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Clicking on this box to receive updates via email."
                    />
                  </Grid>
                </Grid>
                <WhiteBackgroundButton
                  buttonText="Sign Up"
                  type="submit"
                  fullWidth
                />
                <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 3 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
