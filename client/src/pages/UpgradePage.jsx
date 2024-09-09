import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import {
  Box,
  Typography,
  Switch,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star"; // New icon for extra features
import Footer from "../components/Footer";
import { GreyBackgroundButton } from "../components/generic/GenericButton";
import { useUser } from "../context/userContext";

const UpgradePage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { state } = useUser();
  const { user } = state;

  const packages = [
    {
      name: "Basic",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      feature: [
        { text: "Record coding problems", isExtra: false },
        { text: "Details of each problem", isExtra: false },
        { text: "Image Uploading", isExtra: false },
      ],
      available: false,
    },
    {
      name: "Premium",
      monthlyPrice: "$4.99",
      yearlyPrice: "$39.99",
      feature: [
        { text: "Record coding problems", isExtra: false },
        { text: "Details of each problem", isExtra: false },
        { text: "Image Uploading", isExtra: false },
        { text: "Statistics Analysis", isExtra: true }, // Extra feature
      ],
      available: user.role !== "PREMIUM" && user.role !== "PREPLUS",
    },
    {
      name: "Premium-Plus",
      monthlyPrice: "$9.99",
      yearlyPrice: "$69.99",
      feature: [
        { text: "Record coding problems", isExtra: false },
        { text: "Details of each problem", isExtra: false },
        { text: "Image Uploading", isExtra: false },
        { text: "Statistics Analysis", isExtra: true }, // Extra feature
        { text: "Data Structure Recording", isExtra: true }, // Extra feature
        { text: "Algorithm Recording", isExtra: true }, // Extra feature
      ],
      available: user.role !== "PREPLUS",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AuthenticatedNavbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          mt: -4,
          px: 12,
        }}
      >
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ mb: 2, color: grey[50] }}>
            Here are all our plans
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              px: 4,
              color: grey[50],
              maxWidth: "50%",
              mx: "auto",
              fontSize: "1rem",
            }}
          >
            Unlock premium features and elevate your coding experience. Choose
            the plan that suits you best and gain access to exclusive content,
            expert lessons, and tools to help you reach your goals faster.
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ mr: 2, color: grey[50] }}>
              Monthly
            </Typography>
            <Switch
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
              color="primary"
              sx={{ mr: 2 }}
            />
            <Typography variant="h6" sx={{ color: grey[50] }}>
              Yearly
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2, justifyContent: "center" }}>
            {packages.map((pkg, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: "#1e1e1e",
                    color: grey[50],
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%", // Makes sure the card takes up the full height
                  }}
                >
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                    {pkg.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: "#ff9800", fontWeight: "bold" }}
                  >
                    {isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ color: grey[400], ml: 1 }}
                    >
                      /{isYearly ? "year" : "month"}
                    </Typography>
                  </Typography>
                  <Box
                    sx={{
                      mt: 3,
                      mb: 2,
                      textAlign: "left",
                      ml: 2,
                      flexGrow: 1,
                    }}
                  >
                    <ul
                      style={{
                        listStyleType: "none", // Removes the default bullet points
                        paddingLeft: 0, // Removes any default padding from the list
                      }}
                    >
                      {pkg.feature.map((feat, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          {feat.isExtra ? (
                            <StarIcon sx={{ mr: 2, color: "#FFD700" }} /> // New icon for extra features
                          ) : (
                            <CheckCircleIcon sx={{ mr: 2, color: "#00FF00" }} />
                          )}
                          {feat.text}
                        </li>
                      ))}
                    </ul>
                  </Box>

                  <GreyBackgroundButton
                    buttonText="Subscribe"
                    disabled={pkg.available !== true}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UpgradePage;
