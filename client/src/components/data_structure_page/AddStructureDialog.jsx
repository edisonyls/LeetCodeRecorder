import { useState } from "react";
import { grey } from "@mui/material/colors";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const AddStructureDialog = ({ open, onClose, onSubmit, title }) => {
  const [value, setValue] = useState("");

  const handleClose = () => {
    onClose();
    setValue(""); // Reset input field on close
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue(""); // Reset input field on submit
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { bgcolor: grey[800], color: grey[50] } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: grey[400] }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={{ color: grey[400] }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStructureDialog;
