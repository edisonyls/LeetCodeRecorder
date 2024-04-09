import React from "react";
import HomeNavbar from "../components/navbar/HomeNavbar";
import { styled } from "@mui/material/styles";
import Footer from "../components/Footer";
import { Box, Link, Typography } from "@mui/material";
import { Button } from "@mui/base";
import DashboardImage from "../images/dashboard.png";
import CodeDetailsImage from "../images/codeDetails.png";
import ServiceCard from "../components/ServiceCard";
import DataStructureImage from "../images/DataStructureImage.png";
import FutureImage from "../images/future.jpeg";
import { grey } from "@mui/material/colors";

function Home() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <HomeNavbar />
        <Box sx={{ backgroundColor: grey[900] }}>
          <MainContainerBox>
            <MainContentBox>
              <Typography
                sx={{
                  fontSize: "4rem",
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(to top, #0072ff 0%, #ff9100 100%)",
                  backgroundSize: "100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mozTextFillColor: "transparent",
                }}
              >
                PERSONAL
              </Typography>
              <Typography
                sx={{
                  fontSize: "4rem",
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(to top, #D32F2F 0%, #FBC02D 100%)",
                  backgroundSize: "100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mozTextFillColor: "transparent",
                }}
              >
                LEET-CODE RECORDER
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  fontFamily: "Jet Brain",
                  color: "#fff",
                }}
              >
                It does more than a recorder can do
              </Typography>
              <MainButton>
                <Link
                  href="/signin"
                  style={{
                    position: "relative",
                    zIndex: 2,
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Get Started
                </Link>
              </MainButton>
            </MainContentBox>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={DashboardImage}
                alt="pic"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </MainContainerBox>
          <ServicesBox>
            <ServicesTypoH1>
              See what you can make use of the service
            </ServicesTypoH1>
            <ServicesContainerBox>
              <ServiceCard
                title="Details"
                text="Record down every problem in details"
                imageSrc={CodeDetailsImage}
              />
              <ServiceCard
                title="Data Structure"
                text="Make code efficient and easy to understand"
                imageSrc={DataStructureImage}
              />
              <ServiceCard
                title="Future"
                text="More to come..."
                imageSrc={FutureImage}
              />
            </ServicesContainerBox>
          </ServicesBox>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

const MainContainerBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  justifySelf: "center",
  margin: "0 auto",
  height: "100vh",
  backgroundColor: grey[900],
  zIndex: 1,
  width: "100%",
  maxWidth: "1300px",
  padding: "0 50px",
  [theme.breakpoints.down("sm")]: {
    display: "grid",
    gridTemplateColumns: "auto",
    alignItems: "center",
    justifySelf: "center",
    width: "100%",
    margin: "0 auto",
    height: "90vh",
  },
}));

const MainContentBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { textAlign: "center", marginBottom: "4rem" },
}));

const MainButton = styled(Button)(({ theme }) => ({
  position: "relative",
  fontSize: "1rem",
  background: "linear-gradient(to top, #8e2de2 0%, #4a00e0 100%)",
  padding: "14px 32px",
  border: "none",
  borderRadius: 4,
  color: "#fff",
  marginTop: "2rem",

  outline: "none",
  overflow: "hidden",
  transition: "all 0.35s",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "0",
    height: "100%",
    background: "linear-gradient(to top, #f77062 0%, #fe5196 100%)",

    transition: "all 0.35s",
    borderRadius: "4px",
  },
  "&:hover": {
    color: "#fff",
    "&:after": {
      width: "100%",
    },
  },
}));

const ServicesBox = styled(Box)(({ theme }) => ({
  background: grey[900],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "auto",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ServicesTypoH1 = styled(Typography)(({ theme }) => ({
  backgroundColor: "#8e2de2", // Deep violet
  backgroundImage: "linear-gradient(to top, #8e2de2 0%, #4a00e0 100%)", // From deep violet to lighter purple
  backgroundSize: "100%",
  marginBottom: "5rem",
  fontSize: "2.5rem",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  mozTextFillColor: "transparent",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    marginTop: "12rem",
  },
  [theme.breakpoints.down("sm")]: { fontSize: "1.2rem" },
}));

const ServicesContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "2rem",
}));

export default Home;
