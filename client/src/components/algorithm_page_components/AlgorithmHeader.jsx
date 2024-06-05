import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GreyBackgroundDialog } from "../generic/GenericDialog";

const AlgorithmHeader = ({ isDataEntered, algorithm }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const closeDialog = () => {
    setDialogOpen(false);
    navigate(-1);
  };

  const handleBack = () => {
    if (isDataEntered) {
      setDialogOpen(true);
    } else {
      navigate(-1);
    }
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
      <IconButton color="inherit" onClick={handleBack} sx={{ color: "white" }}>
        <ArrowBackIcon />
      </IconButton>
      {algorithm === undefined ? (
        <Typography variant="h4" gutterBottom>
          New Algorithm
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom>
          {algorithm.title}
        </Typography>
      )}

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

export default AlgorithmHeader;
