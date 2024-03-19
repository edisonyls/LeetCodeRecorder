import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axiosInstance from "../config/axiosConfig";
import InfoIcon from "@mui/icons-material/Info";

const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axiosInstance.get("user");
      const data = await response.data;

      if (data.serverMessage === "SUCCESS") {
        setUser(data.data);
        setEditedUser(data.data);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    // Implement saving logic here, for example:
    // await axiosInstance.post('user/update', editedUser);
    setUser(editedUser);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const displayValueOrPlaceholder = (
    value,
    placeholder = "Information not provided"
  ) =>
    value ? (
      value
    ) : (
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <InfoIcon sx={{ mr: 1 }} fontSize="small" />
        {placeholder}
      </Typography>
    );

  return (
    <div
      style={{
        backgroundColor: grey[900],
        color: grey[50],
        minHeight: "100vh",
      }}
    >
      <AuthenticatedNavbar />
      <Container component="main" maxWidth="md" sx={{ pt: 8, pb: 6 }}>
        <Card raised sx={{ backgroundColor: grey[800], color: grey[50] }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {!editMode ? (
                <Button variant="contained" onClick={handleEdit} sx={{ mb: 2 }}>
                  Edit Profile
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSave} sx={{ mb: 2 }}>
                  Save Changes
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={editedUser.firstName || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={editedUser.lastName || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    name="sex"
                    value={editedUser.sex || ""}
                    label="Sex"
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  value={editedUser.mobileNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Personal Info"
                  name="personalInfo"
                  multiline
                  rows={4}
                  value={editedUser.personalInfo || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: grey[50],
                  color: grey[900],
                  width: 90,
                  height: 90,
                  fontSize: "2rem",
                  mb: 2,
                }}
              >
                {user.firstName && user.lastName
                  ? user.firstName[0] + user.lastName[0]
                  : "??"}
              </Avatar>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "medium" }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: grey[400], mt: 1 }}>
                Email: {user.username}
              </Typography>
            </Box>
            <Divider />
            <Grid
              container
              spacing={isSmallScreen ? 2 : 4}
              sx={{ mt: 3, px: isSmallScreen ? 2 : 4 }}
            >
              <Grid item xs={12} sm={6}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  sx={{ color: grey[400] }}
                >
                  Sex
                </Typography>
                {displayValueOrPlaceholder(user.sex)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  sx={{ color: grey[400] }}
                >
                  Mobile Number
                </Typography>
                {displayValueOrPlaceholder(user.mobileNumber)}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  sx={{ color: grey[400] }}
                >
                  Personal Info
                </Typography>
                {displayValueOrPlaceholder(
                  user.personalInfo,
                  "No personal information provided"
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
