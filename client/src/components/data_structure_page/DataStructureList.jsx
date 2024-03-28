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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../../config/axiosConfig";
import ActionDialog from "./ActionDialog";

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
  const [selectedStructure, setSelectedStructure] = useState(null);
  const open = Boolean(anchorEl); // To check if menu is open

  const handleDialogOpen = (type) => {
    setActionType(type);
    setDialogOpen(true);
    if (type === "Rename") {
      const selectedStructure = dataStructure.find(
        (structure) => structure.id === selectedId
      );
      setSelectedStructure(selectedStructure);
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

  const handleAddDataStructure = async (name) => {
    await axiosInstance
      .post("data-structure", { name, subStructures: [] })
      .then(() => {
        fetchDataStructures();
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add new data structure:", error);
      });
  };

  const handleRenameDataStructure = async (id, newName) => {
    await axiosInstance
      .patch(`data-structure/${id}`, { name: newName }) // Assuming the backend expects a JSON object
      .then(() => {
        fetchDataStructures(); // Refresh the list to show the updated name
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to rename data structure:", error);
      });
  };

  const handleDeleteDataStructure = async (id) => {
    await axiosInstance
      .delete(`data-structure/${id}`)
      .then(() => {
        handleMainStructureClick(null);
        setSelectedId(null);
        setDialogOpen(false);
        fetchDataStructures();
      })
      .catch((error) => {
        console.error("Failed to delete data structure:", error);
      });
  };

  const handleMenuItemClick = (type) => {
    setAnchorEl(null);
    handleDialogOpen(type);
  };

  const handleListItemClick = (structure) => {
    handleMainStructureClick(structure);
    setSelectedStructure(structure);
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
          <Typography>Data Structures</Typography>
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
            sx={{
              padding: 0,
              "& .MuiDialog-paper": { bgcolor: grey[800], color: grey[50] },
            }}
          >
            <MenuItem
              onClick={() => handleMenuItemClick("Add")}
              sx={{ color: grey[800] }}
            >
              Add
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Rename")}
              sx={{ color: grey[800] }}
              disabled={!selectedId}
            >
              {selectedStructure
                ? `Rename ${selectedStructure.name}`
                : "Rename"}
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Delete")}
              sx={{ color: grey[800] }}
              disabled={!selectedId}
            >
              {selectedStructure
                ? `Delete ${selectedStructure.name}`
                : "Delete"}
            </MenuItem>
          </Menu>
        </ListItem>
        <Divider sx={{ background: grey[50] }} />
        {dataStructure.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minHeight: 200,
            }}
          >
            <Typography>No data</Typography>
          </Box>
        ) : (
          dataStructure.map((structure) => (
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
          ))
        )}
      </List>
      <ActionDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        actionType={actionType}
        structureName="Data Structure"
        newName={newName}
        setNewName={setNewName}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default DataStructureList;
