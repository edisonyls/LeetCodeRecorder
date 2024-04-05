import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLinksWrapper>
          <FooterItems>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", color: "#fff" }}
            >
              About Me
            </Typography>
            <FooterLink href="/">How it works</FooterLink>
            <FooterLink href="/">How it works</FooterLink>
          </FooterItems>
          <FooterItems>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", color: "#fff" }}
            >
              New
            </Typography>
            <FooterLink href="/">How it works</FooterLink>
            <FooterLink href="/">How it works</FooterLink>
          </FooterItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterItems>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", color: "#fff" }}
            >
              Check this
            </Typography>
            <FooterLink href="/">How it works</FooterLink>
            <FooterLink href="/">How it works</FooterLink>
          </FooterItems>
          <FooterItems>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", color: "#fff" }}
            >
              Okay
            </Typography>
            <FooterLink href="/">How it works</FooterLink>
            <FooterLink href="/">How it works</FooterLink>
          </FooterItems>
        </FooterLinksWrapper>
      </FooterLinks>
      <SocialMediaBox>
        <SocialMediaWrap>
          <FooterLogo>
            <Typography>YLSLC © {new Date().getFullYear()}</Typography>
          </FooterLogo>
          <SocialIcon>
            <a
              style={{ color: "#fff", fontSize: "24px" }}
              href="/"
              target="_blank"
            >
              <InstagramIcon />
            </a>
            <a
              style={{ color: "#fff", fontSize: "24px" }}
              href="/"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a
              style={{ color: "#fff", fontSize: "24px" }}
              href="/"
              target="_blank"
            >
              <GitHubIcon />
            </a>
          </SocialIcon>
        </SocialMediaWrap>
      </SocialMediaBox>
    </FooterContainer>
  );
};
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#141414",
  padding: "5rem 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const FooterLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  marginBottom: "0.5rem",
  "&:hover": {
    color: "#e9e9e9",
    transition: "0.3s ease-out",
  },
});

const FooterLinks = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1000px",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: { paddingTop: "2rem" },
}));

const FooterLinksWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
}));

const SocialMediaBox = styled(Box)(({ theme }) => ({
  maxWidth: "1000px",
  width: "100%",
}));

const SocialMediaWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  maxWidth: "1000px",
  margin: "40px auto 0 auto",
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
}));

const FooterLogo = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  textDecoration: "none",
  fontSize: "2rem",
  [theme.breakpoints.down("md")]: { marginBottom: "2rem" },
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "200px",
}));

const FooterItems = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: "16px",
  textAlign: "left",
  width: "160px",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: { margin: 0, padding: "10px", width: "100%" },
}));

export default Footer;
