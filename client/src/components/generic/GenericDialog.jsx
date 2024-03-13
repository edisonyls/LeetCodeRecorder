import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { BlackBackgroundButton } from "./GenericButton";

const GenericDialog = ({ isOpen, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#000", // Sets the background color to black
          color: "#fff", // Sets the text color to white for all text in the dialog
        },
        "& .MuiDialogContentText-root, & .MuiDialogTitle-root": {
          color: "#fff", // Ensure this applies to both the dialog content and title specifically, if needed
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <BlackBackgroundButton onClick={onClose} buttonText="No" />
        <BlackBackgroundButton onClick={onConfirm} buttonText="Yes" />
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
