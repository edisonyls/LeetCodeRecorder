import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GreyBackgroundDialog } from "../generic/GenericDialog";

const NewAlgorithmHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const closeDialog = () => {
    setDialogOpen(false);
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => setDialogOpen(true)}
        sx={{ color: "white" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        New Algorithm
      </Typography>
      <Box />
      <GreyBackgroundDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={closeDialog}
        title="Are you sure?"
        content="All of the data will be lost."
      />
    </Box>
  );
};

export default NewAlgorithmHeader;
