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
  Tooltip,
  Divider,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionDialog, WarningDialog } from "./DataStructureDialogs";
import { DataStructureHooks } from "../../hooks/DataStructureHooks";

const DataStructureList = ({
  dataStructure,
  handleStructureClick,
  addClicked,
}) => {
  const { addDataStructure, renameDataStructure, deleteDataStructure } =
    DataStructureHooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningDialogOpen, setWaringDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // Add, rename and delete
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [selectedId, setSelectedId] = useState(null); // storing the selected structure id
  const [newName, setNewName] = useState(""); // name of the renamed data structure
  const [selectedStructure, setSelectedStructure] = useState(null); // selected data structure by the user

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
        addDataStructure(newName);
        setDialogOpen(false);
        break;
      case "Rename":
        renameDataStructure(selectedId, newName);
        setDialogOpen(false);
        break;
      case "Delete":
        deleteDataStructure(selectedId);
        handleStructureClick(null);
        setSelectedStructure(null);
        setSelectedId(null);
        setDialogOpen(false);
        break;
      default:
        break;
    }
    handleDialogClose();
  };

  const handleMenuItemClick = (type) => {
    setAnchorEl(null);
    handleDialogOpen(type);
  };

  const handleListItemClick = (structure) => {
    if (addClicked) {
      setWaringDialogOpen(true);
      return;
    }
    handleStructureClick(structure);
    setSelectedStructure(structure);
    setSelectedId(structure.id);
  };

  return (
    <Box sx={{ width: "100%", p: 1 }}>
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
              "& .MuiDialog-paper": { bgcolor: grey[900], color: grey[50] },
            }}
          >
            <MenuItem
              onClick={() => handleMenuItemClick("Add")}
              sx={{ color: grey[900] }}
            >
              Add
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Rename")}
              sx={{ color: grey[900] }}
              disabled={!selectedId}
            >
              {selectedStructure
                ? `Rename ${selectedStructure.name}`
                : "Rename"}
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Delete")}
              sx={{ color: grey[900] }}
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
              minHeight: 300,
            }}
          >
            <Typography>No data</Typography>
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    maxWidth: 170,
                    fontSize: "12px",
                    p: 1,
                  },
                },
              }}
              title="Please click on the dot icon above to create a new data structure"
            >
              <IconButton>
                <HelpOutlineIcon sx={{ color: "#fff", fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box
            sx={{
              height: "100%",
              minHeight: 300,
            }}
          >
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
          </Box>
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
      <WarningDialog
        title="You are editing."
        text="Save or amend your changes before selecting the others."
        optionNumber={1}
        dialogOpen={warningDialogOpen}
        onClose={() => {
          setWaringDialogOpen(false);
        }}
      />
    </Box>
  );
};

export default DataStructureList;
