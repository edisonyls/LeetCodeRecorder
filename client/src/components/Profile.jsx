import React from "react";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import GenericTextField from "./generic/GenricTextField";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const ProfileView = ({ user }) => {
  return (
    <div>
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
        <Typography variant="h4" component="h1" sx={{ fontWeight: "medium" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: grey[400], mt: 1 }}>
          Email: {user.username}
        </Typography>
      </Box>
      <Divider />
      <Grid container spacing={4} sx={{ mt: 3, px: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: grey[400] }}
          >
            Sex
          </Typography>
          <Typography>{displayValueOrPlaceholder(user.sex)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: grey[400] }}
          >
            Mobile Number
          </Typography>
          <Typography>
            {displayValueOrPlaceholder(user.mobileNumber)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: grey[400] }}
          >
            Personal Info
          </Typography>
          <Typography>
            {displayValueOrPlaceholder(
              user.personalInfo,
              "No personal information provided"
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export const ProfileEdit = ({ editedUser, handleChange }) => {
  return (
    <div>
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
            mb: 2, // Added margin-bottom for spacing
          }}
        >
          {editedUser.firstName && editedUser.lastName
            ? `${editedUser.firstName[0]}${editedUser.lastName[0]}`
            : "😢"}
        </Avatar>
        <Typography variant="subtitle1" sx={{ color: grey[400], mt: 1 }}>
          Email: {editedUser.username}
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ px: 4, mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <GenericTextField
            fullWidth
            label="First Name"
            name="firstName"
            value={editedUser.firstName || ""}
            onChange={handleChange}
            inputLabelColor={grey[400]}
            inputColor={grey[50]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericTextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={editedUser.lastName || ""}
            onChange={handleChange}
            inputLabelColor={grey[400]}
            focusColor={"grey"}
            inputColor={grey[50]}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ mt: 3, px: 4, mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: grey[400] }}>Sex</InputLabel>
            <Select
              label="Sex"
              name="sex"
              value={editedUser.sex || ""}
              onChange={handleChange}
              IconComponent={() => (
                <ArrowDropDownIcon style={{ color: grey[50] }} />
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "grey",
                  },
                },
              }}
              sx={{ color: grey[50] }}
            >
              <MenuItem value="Male" sx={{ color: grey[50] }}>
                Male
              </MenuItem>
              <MenuItem value="Female" sx={{ color: grey[50] }}>
                Female
              </MenuItem>
              <MenuItem value="Prefer Not To Say" sx={{ color: grey[50] }}>
                Prefer Not To Say
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericTextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            value={editedUser.mobileNumber || ""}
            onChange={handleChange}
            inputLabelColor={grey[400]}
            inputColor={grey[50]}
          />
        </Grid>
        <Grid item xs={12}>
          <GenericTextField
            fullWidth
            label="Personal Info"
            name="personalInfo"
            multiline
            value={editedUser.personalInfo || ""}
            onChange={handleChange}
            inputLabelColor={grey[400]}
            inputColor={grey[50]}
          />
        </Grid>
      </Grid>
    </div>
  );
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
