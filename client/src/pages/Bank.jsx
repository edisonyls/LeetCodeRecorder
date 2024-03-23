import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AlgorithmIcon from "@mui/icons-material/Functions"; // Example icon, adjust as needed
import DataStructureIcon from "@mui/icons-material/Storage"; // Example icon, adjust as needed
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { useNavigate } from "react-router-dom";

const Bank = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

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
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="textPrimary"
          sx={{ color: grey[50] }}
        >
          Select Your Path
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card
              raised
              sx={{
                backgroundColor: grey[800],
                color: grey[50],
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardActionArea onClick={() => navigateToPage("/algorithm")}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="200px"
                  >
                    <AlgorithmIcon
                      sx={{ fontSize: 60, mb: 2, color: grey[50] }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ color: grey[50] }}
                    >
                      Algorithms
                    </Typography>
                    <Typography sx={{ color: grey[400] }}>
                      Explore various algorithms.
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              raised
              sx={{
                backgroundColor: grey[800],
                color: grey[50],
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardActionArea onClick={() => navigateToPage("/data-structure")}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="200px"
                  >
                    <DataStructureIcon
                      sx={{ fontSize: 60, mb: 2, color: grey[50] }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ color: grey[50] }}
                    >
                      Data Structures
                    </Typography>
                    <Typography sx={{ color: grey[400] }}>
                      Dive into data structures.
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Bank;
