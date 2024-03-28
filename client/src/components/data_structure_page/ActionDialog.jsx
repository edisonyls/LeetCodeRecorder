import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  DialogActions,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { LightGreyBackgroundButton } from "../generic/GenericButton";

const ActionDialog = ({
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
      maxWidth="xs" // Choose a value that fits your needs
      fullWidth={true}
      sx={{
        "& .MuiPaper-root": { backgroundColor: grey[50] },
        "& .MuiTypography-root, & .MuiInputBase-input, & .MuiButton-root": {
          color: grey[800],
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
              style: { color: grey[800] },
            }}
            inputProps={{
              style: { color: grey[800] },
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

export default ActionDialog;
