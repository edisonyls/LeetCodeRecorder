import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BlackBackgroundButton } from "./GenericButton";
import { grey } from "@mui/material/colors";

export const GenericDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  extraButtonOption,
  onExtraAction,
  showHint,
  hint,
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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        {showHint && (
          <Tooltip
            title={hint}
            placement="top"
            enterDelay={500}
            leaveDelay={200}
          >
            <IconButton>
              <HelpOutlineIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
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

export const GreyBackgroundDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  extraButtonOption,
  onExtraAction,
  showHint,
  hint,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: grey[800],
          color: "#fff",
          width: "40%", // Set the width of the dialog
          maxWidth: "40%", // Ensure the dialog does not exceed this width
        },
        "& .MuiDialogContentText-root, & .MuiDialogTitle-root": {
          color: "#fff",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        {showHint && (
          <Tooltip
            title={hint}
            placement="top"
            enterDelay={500}
            leaveDelay={200}
          >
            <IconButton>
              <HelpOutlineIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {extraButtonOption === true && (
          <BlackBackgroundButton onClick={onExtraAction} buttonText="Cancel" />
        )}
        <Box>
          <BlackBackgroundButton onClick={onClose} buttonText="No" />
          <BlackBackgroundButton onClick={onConfirm} buttonText="Confirm" />
        </Box>
      </DialogActions>
    </Dialog>
  );
};
