import React from "react";
import styled from "@emotion/styled";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, text, imageSrc }) => {
  const ServicesCard = styled(Box)(({ theme }) => ({
    margin: "1rem",
    height: "525px",
    width: "400px",
    borderRadius: "4px",
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17,17,0.6) 100%), url(${imageSrc})`,
    backgroundSize: "cover",
    position: "relative",
    color: "#fff",
    "&:hover": {
      transform: "scale(1.075)",
      transition: "0.2s ease-in",
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
    "&:hover": {
      background: "linear-gradient(to top, #8e2de2 0%, #4a00e0 100%)",
    },
  }));

  return (
    <ServicesCard>
      <Typography
        sx={{
          position: "absolute",
          top: "350px",
          left: "30px",
          fontSize: "22px",
          color: "#ffff8d",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "400px",
          left: "30px",
          fontSize: "18px",
          color: "#ffff8d",
        }}
      >
        {text}
      </Typography>
      <ServiceButton
        component={Link}
        to="/signin"
        endIcon={<ArrowForwardIcon />}
      >
        Get Started
      </ServiceButton>
    </ServicesCard>
  );
};

export default ServiceCard;
