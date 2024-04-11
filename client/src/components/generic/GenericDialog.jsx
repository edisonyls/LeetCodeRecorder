import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { BlackBackgroundButton } from "./GenericButton";

const GenericDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  extraButtonOption,
  onExtraAction,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#000",
          color: "#fff",
        },
        "& .MuiDialogContentText-root, & .MuiDialogTitle-root": {
          color: "#fff",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {extraButtonOption === true && (
          <BlackBackgroundButton onClick={onExtraAction} buttonText="Cancel" />
        )}
        <Box>
          <BlackBackgroundButton onClick={onClose} buttonText="No" />
          <BlackBackgroundButton onClick={onConfirm} buttonText="Yes" />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
