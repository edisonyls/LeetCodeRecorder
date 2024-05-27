import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const AlgorithmDialog = ({ open, onClose, algorithm }) => {
  if (!algorithm) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ background: grey[800], color: "white" }}>
        {algorithm.title}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ background: "#1e1e1e", color: "white", padding: 3 }}
      >
        <Typography variant="h6" gutterBottom>
          Purpose
        </Typography>
        <Typography paragraph>{algorithm.purpose}</Typography>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Typography paragraph>{algorithm.howItWorks}</Typography>
        <Typography variant="h6" gutterBottom>
          Pseudocode
        </Typography>
        <Typography paragraph component="div">
          <Box sx={{ background: grey[800], padding: 2, borderRadius: 2 }}>
            <pre style={{ whiteSpace: "pre-wrap", color: grey[50] }}>
              {algorithm.pseudocode}
            </pre>
          </Box>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AlgorithmDialog;
