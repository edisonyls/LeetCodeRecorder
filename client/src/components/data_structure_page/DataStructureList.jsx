import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../../config/axiosConfig";

const DataStructureList = ({
  dataStructure,
  handleMainStructureClick,
  fetchDataStructures,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // Add, rename and delete
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [selectedId, setSelectedId] = useState(null); // storing the selected structure id
  const [newName, setNewName] = useState(""); // name of the renamed data structure
  const open = Boolean(anchorEl); // To check if menu is open

  const handleDialogOpen = (type) => {
    setActionType(type);
    setDialogOpen(true);
    if (type === "Rename") {
      const selectedStructure = dataStructure.find(
        (structure) => structure.id === selectedId
      );
      console.log(selectedStructure);
      setNewName(selectedStructure ? selectedStructure.name : "");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewName("");
  };

  const handleSubmit = () => {
    switch (actionType) {
      case "Add":
        handleAddDataStructure(newName);
        break;
      case "Rename":
        handleRenameDataStructure(selectedId, newName);
        break;
      case "Delete":
        handleDeleteDataStructure(selectedId);
        break;
      default:
        break;
    }
    handleDialogClose();
  };

  const handleAddDataStructure = (name) => {
    axiosInstance
      .post("data-structure", { name, subStructures: [] })
      .then(() => {
        fetchDataStructures();
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add new data structure:", error);
      });
  };

  const handleRenameDataStructure = (id, newName) => {
    // API call to rename data structure by id
    console.log("Renaming data structure", id, "to", newName);
    // Refresh your data structures list here
  };

  const handleDeleteDataStructure = (id) => {
    // API call to delete data structure by id
    console.log("Deleting data structure with id", id);
    // Refresh your data structures list here
  };

  const handleMenuItemClick = (type) => {
    setAnchorEl(null);
    handleDialogOpen(type);
  };

  const handleListItemClick = (structure) => {
    handleMainStructureClick(structure);
    setSelectedId(structure.id);
  };

  return (
    <Box
      sx={{
        width: "50%",
        overflowY: "auto",
      }}
    >
      <List>
        <ListItem>
          <Typography>Data Structure</Typography>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ marginLeft: "auto", color: grey[50] }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => setAnchorEl(null)}
            sx={{ padding: 0 }}
          >
            <MenuItem onClick={() => handleMenuItemClick("Add")}>
              Add New Data Structure
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Rename")}
              disabled={!selectedId}
            >
              Rename Data Structure
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Delete")}
              disabled={!selectedId}
            >
              Delete Data Structure
            </MenuItem>
          </Menu>
        </ListItem>
        <Divider sx={{ background: grey[50] }} />
        {dataStructure.map((structure) => (
          <ListItem
            key={structure.id}
            disablePadding
            sx={{
              backgroundColor:
                selectedId === structure.id ? grey[700] : "transparent",
              "&:hover": {
                backgroundColor: grey[700],
              },
            }}
          >
            <ListItemButton onClick={() => handleListItemClick(structure)}>
              <ListItemText
                primary={structure.name}
                primaryTypographyProps={{ sx: { color: grey[50] } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{actionType} Data Structure</DialogTitle>
        <DialogContent>
          {(actionType === "Add" || actionType === "Rename") && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Data Structure Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
          {actionType === "Delete" && (
            <Typography>
              Are you sure you want to delete this data structure?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {actionType === "Delete" ? "Delete" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataStructureList;
