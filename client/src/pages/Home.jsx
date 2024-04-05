import React from "react";
import HomeNavbar from "../components/navbar/HomeNavbar";
import { styled } from "@mui/material/styles";
import Footer from "../components/Footer";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/base";
import Pic1 from "../images/pic1.svg";
import Pic3 from "../images/pic3.jpg";

const MainContainerBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  justifySelf: "center",
  margin: "0 auto",
  height: "90vh",
  backgroundColor: "#141414",
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
  background: "linear-gradient(to top, #f77062 0%, #fe5196 100%)",
  padding: "14px 32px",
  border: "none",
  borderRadius: 4,
  color: "#fff",
  marginTop: "2rem",
  cursor: "pointer",
  outline: "none",
  overflow: "hidden", // To ensure the :after content does not overflow
  transition: "all 0.35s",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "0",
    height: "100%",
    background: "#4837ff",
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
  background: "#141414",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  [theme.breakpoints.down("md")]: { height: "1600px" },
  [theme.breakpoints.down("sm")]: { height: "1400px" },
}));

const ServicesTypoH1 = styled(Typography)(({ theme }) => ({
  backgroundColor: "#ff8177",
  backgroundImage:
    "linear-gradient(to top, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b1285b 100% )",
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
}));

const ServicesCard = styled(Box)(({ theme }) => ({
  margin: "1rem",
  height: "525px",
  width: "400px",
  borderRadius: "4px",
  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17,17,0.6) 100%), url(${Pic3})`,
  backgroundSize: "cover",
  position: "relative",
  color: "#fff",
  "&:hover": {
    transform: "scale(1.075)",
    transition: "0.2s ease-in",
    cursor: "pointer",
  },
  [theme.breakpoints.down("sm")]: { width: "300px" },
}));

const ServiceButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  outline: "none",
  borderRadius: "4px",
  background: "#f77062",
  position: "absolute",
  top: "440px",
  left: "30px",
  fontSize: "1rem",
  cursor: "pointer",
}));
function Home() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <HomeNavbar />
        <Box sx={{ backgroundColor: "#141414" }}>
          <MainContainerBox>
            <MainContentBox>
              <Typography
                sx={{
                  fontSize: "4rem",
                  backgroundColor: "#ff8177",
                  backgroundImage:
                    "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
                  backgroundSize: "100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mozTextFillColor: "transparent",
                }}
              >
                NEXT GENERATION
              </Typography>
              <Typography
                sx={{
                  fontSize: "4rem",
                  backgroundColor: "#ff8177",
                  backgroundImage:
                    "linear-gradient(to top, #b721ff 0%, #21d4fd 100%)",
                  backgroundSize: "100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mozTextFillColor: "transparent",
                }}
              >
                TECHNOLOGY
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  fontFamily: "Jet Brain",
                  color: "#fff",
                }}
              >
                See what makes us different
              </Typography>
              <MainButton>
                <a
                  href="/"
                  style={{
                    position: "relative",
                    zIndex: 2,
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Get Started
                </a>
              </MainButton>
            </MainContentBox>
            {/* main image container */}
            <Box sx={{ textAlign: "center" }}>
              <img
                src={Pic1}
                alt="pic"
                style={{ height: "80%", width: "80%" }}
              />
            </Box>
          </MainContainerBox>
          <ServicesBox>
            <ServicesTypoH1>See what the hype is about</ServicesTypoH1>
            <ServicesContainerBox>
              <ServicesCard>
                <Typography
                  sx={{ position: "absolute", top: "350px", left: "30px" }}
                >
                  Experience Bliss
                </Typography>
                <Typography
                  sx={{ position: "absolute", top: "400px", left: "30px" }}
                >
                  AI Powered Technology
                </Typography>
                <ServiceButton>Get Started</ServiceButton>
              </ServicesCard>
              <ServicesCard>
                <Typography>Are you Ready?</Typography>
                <Typography>Take the leap</Typography>
                <ServiceButton>Get Started</ServiceButton>
              </ServicesCard>
            </ServicesContainerBox>
          </ServicesBox>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
