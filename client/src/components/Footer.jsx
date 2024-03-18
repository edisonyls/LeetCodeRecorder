import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ my: 0.5 }}>
          YLSLC © {new Date().getFullYear()}
        </Typography>
        {/* <Typography variant="body2" align="center" sx={{ my: 0.5 }}>
          <Link
            href="/privacy"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link
            href="/terms"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Terms of Use
          </Link>
        </Typography> */}
      </Container>
    </Box>
  );
};

export default Footer;
