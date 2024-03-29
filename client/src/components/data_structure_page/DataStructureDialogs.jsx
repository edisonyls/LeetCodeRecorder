import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LightGreyBackgroundButton } from "../generic/GenericButton";

export const ActionDialog = ({
  open,
  onClose,
  actionType,
  structureName,
  newName,
  setNewName,
  onSubmit,
}) => {
  const dialogTitle = `${actionType} ${structureName}`;
  const inputLabel = `New ${structureName} Name`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
      sx={{
        "& .MuiPaper-root": { backgroundColor: grey[50] },
        "& .MuiTypography-root, & .MuiInputBase-input, & .MuiButton-root": {
          color: grey[900],
        },
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {(actionType === "Add" || actionType === "Rename") && (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={inputLabel}
            type="text"
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            InputLabelProps={{
              style: { color: grey[900] },
            }}
            inputProps={{
              style: { color: grey[900] },
            }}
          />
        )}
        {actionType === "Delete" && (
          <Typography>Caution! All the data will be deleted.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <LightGreyBackgroundButton onClick={onClose} buttonText="Cancel" />
        <LightGreyBackgroundButton
          onClick={onSubmit}
          buttonText={actionType === "Delete" ? "Delete" : "Save"}
        />
      </DialogActions>
    </Dialog>
  );
};

export const ContentDialog = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": { backgroundColor: grey[50] },
        "& .MuiTypography-root, & .MuiInputBase-input, & .MuiButton-root": {
          color: grey[900],
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LightGreyBackgroundButton onClick={onClose} buttonText="No" />
        <LightGreyBackgroundButton onClick={onConfirm} buttonText="Yes" />
      </DialogActions>
    </Dialog>
  );
};

export const WarningDialog = ({
  dialogOpen,
  onClose,
  onCancel,
  optionNumber,
  title,
  text,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth={true}
      sx={{
        "& .MuiPaper-root": { backgroundColor: grey[50] },
        "& .MuiTypography-root, & .MuiInputBase-input, & .MuiButton-root": {
          color: grey[900],
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      {optionNumber === 2 ? (
        <DialogActions>
          <LightGreyBackgroundButton onClick={onCancel} buttonText="Cancel" />
          <LightGreyBackgroundButton onClick={onClose} buttonText="Confirm" />
        </DialogActions>
      ) : (
        <DialogActions>
          <LightGreyBackgroundButton onClick={onClose} buttonText="OK" />
        </DialogActions>
      )}
    </Dialog>
  );
};
