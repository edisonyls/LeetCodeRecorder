// AlgorithmSectionDialog.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { grey } from "@mui/material/colors";
import AlgorithmTextField from "./AlgorithmTextField";
import { GreyBackgroundButton } from "../generic/GenericButton";

const NewAlgorithmDialog = ({
  open,
  onClose,
  predefinedSections,
  sections,
  selectedSection,
  setSelectedSection,
  customSectionName,
  setCustomSectionName,
  customSectionContent,
  setCustomSectionContent,
  insertAfterSection,
  setInsertAfterSection,
  handleSectionAdd,
  formControlStyles,
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={dialogStyles}>
      <DialogTitle>Select a Section to Add</DialogTitle>
      <DialogContent>
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          sx={formControlStyles}
        >
          <InputLabel>New Section</InputLabel>
          <Select
            label="New Section"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            IconComponent={() => (
              <ArrowDropDownIcon style={{ color: grey[50] }} />
            )}
          >
            {predefinedSections
              .filter(
                (option) =>
                  !sections.map((section) => section.name).includes(option)
              )
              .map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            <MenuItem value="custom">Customize</MenuItem>
          </Select>
        </FormControl>

        {selectedSection === "custom" && (
          <>
            <AlgorithmTextField
              label="Custom Section Name"
              required
              value={customSectionName}
              onChange={(e) => setCustomSectionName(e.target.value)}
            />
            <AlgorithmTextField
              label="Custom Section Content"
              required
              multiline
              value={customSectionContent}
              onChange={(e) => setCustomSectionContent(e.target.value)}
            />
          </>
        )}
        <Typography variant="body1" sx={{ color: "white", mt: 3 }}>
          Insert after
        </Typography>
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          sx={formControlStyles}
        >
          <InputLabel>Existing Section</InputLabel>
          <Select
            label="Existing Section"
            value={insertAfterSection}
            onChange={(e) => setInsertAfterSection(e.target.value)}
            IconComponent={() => (
              <ArrowDropDownIcon style={{ color: grey[50] }} />
            )}
          >
            <MenuItem value="default">Default (End of List)</MenuItem>
            <MenuItem value="short-summary">Short Summary</MenuItem>
            {sections.map((section) => (
              <MenuItem key={section.name} value={section.name}>
                {section.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <GreyBackgroundButton onClick={onClose} buttonText="Cancel" />
        <GreyBackgroundButton onClick={handleSectionAdd} buttonText="Add" />
      </DialogActions>
    </Dialog>
  );
};

const dialogStyles = {
  "& .MuiDialog-paper": {
    backgroundColor: grey[800],
    color: "#fff",
    width: "60%",
    maxWidth: "60%",
  },
  "& .MuiDialogContentText-root, & .MuiDialogTitle-root": {
    color: "#fff",
  },
};

export default NewAlgorithmDialog;
