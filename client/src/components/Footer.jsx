import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const handleIconClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <FooterContainer>
      <SocialMediaBox>
        <SocialMediaWrap>
          <Box sx={{ width: "200px" }}></Box>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#fff",
              textAlign: "center",
              flexGrow: 0,
              mx: "auto",
            }}
          >
            YLSLC © {new Date().getFullYear()}
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "200px" }}
          >
            <SocialIcon>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() =>
                  handleIconClick("https://www.instagram.com/leesianyong/")
                }
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() =>
                  handleIconClick(
                    "https://www.linkedin.com/in/lishun-yang-152aa01b8/"
                  )
                }
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => handleIconClick("https://github.com/edisonyls")}
              >
                <GitHubIcon />
              </IconButton>
            </SocialIcon>
          </Box>
        </SocialMediaWrap>
      </SocialMediaBox>
    </FooterContainer>
  );
};

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "black",
  paddingTop: "10px",
  paddingBottom: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "3vh",
}));

const SocialMediaBox = styled(Box)(({ theme }) => ({
  maxWidth: "1000px",
  width: "100%",
}));

const SocialMediaWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  margin: "4px auto 0 auto",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "200px",
}));

export default Footer;
