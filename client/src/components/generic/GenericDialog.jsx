import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Tooltip,
  IconButton,
  TextField,
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
          width: "40%",
          maxWidth: "40%",
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
        <Box sx={{ mr: 1 }}>
          <BlackBackgroundButton onClick={onClose} buttonText="No" />
        </Box>
        <Box>
          <BlackBackgroundButton onClick={onConfirm} buttonText="Confirm" />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export const GreyBackgroundDialogWithInput = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  extraButtonOption,
  onExtraAction,
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(input);
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: grey[800],
          color: "#fff",
          width: "40%",
          maxWidth: "40%",
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
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>

        <TextField
          value={input}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: grey[600] },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
              color: "#fff",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        {extraButtonOption && (
          <BlackBackgroundButton onClick={onExtraAction} buttonText="Cancel" />
        )}
        <Box sx={{ mr: 1 }}>
          <BlackBackgroundButton onClick={handleClose} buttonText="No" />
        </Box>
        <Box>
          <BlackBackgroundButton onClick={handleConfirm} buttonText="Confirm" />
        </Box>
      </DialogActions>
    </Dialog>
  );
};
