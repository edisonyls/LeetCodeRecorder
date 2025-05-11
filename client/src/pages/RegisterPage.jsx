import { Avatar, TextField, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountNavbar from "../components/navbar/AccountNavbar";
import { BlackBackgroundButton } from "../components/generic/GenericButton";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PasswordValidator from "../components/PasswordValidator";
import { useUser } from "../context/userContext";
import { UserHooks } from "../hooks/userHooks/UserHooks";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { state } = useUser();
  const { loading, error } = state;
  const { register, reset } = UserHooks();

  useEffect(() => {
    if (error) {
      toast.error(error);
      reset();
    }
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword, error, reset]);

  const checkData = (data) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/;
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
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const formatName = ({ name }) => {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    if (checkData(formData) === false) {
      return;
    } else {
      formData.firstName = formatName({ name: formData.firstName });
      formData.lastName = formatName({ name: formData.lastName });
      formData.role = "REGULAR";
      register(formData);
    }
  };

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
          onSubmit={handleSubmit}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? "Passwords do not match." : ""}
                sx={{ marginBottom: 5 }}
              />
              {password && <PasswordValidator password={password} />}
            </Grid>
          </Grid>
          {loading ? (
            <BlackBackgroundButton
              disabled={loading}
              buttonText="Loading..."
              fullWidth
            />
          ) : (
            <BlackBackgroundButton
              buttonText="Sign Up"
              type="submit"
              fullWidth
            />
          )}
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
  onChange,
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
      onChange={onChange}
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: { color: "white", borderColor: "white" },
      }}
      variant="outlined"
      sx={{
        marginBottom: "2px",
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
