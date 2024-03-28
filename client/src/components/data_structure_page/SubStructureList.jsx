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
import axiosInstance from "../../config/axiosConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionDialog, WarningDialog } from "./DataStructureDialogs";

const SubStructureList = ({
  selectedStructure,
  dataStructure,
  handleSubStructureClick,
  fetchDataStructures,
  addClicked,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningDialogOpen, setWaringDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // Add, rename and delete
  const [selectedId, setSelectedId] = useState(null); // storing the selected sub-structure id
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [newName, setNewName] = useState(""); // name of the renamed sub-structure
  const [selectedSubStructure, setSelectedSubStructure] = useState(null);

  const open = Boolean(anchorEl); // To check if menu is open

  const handleDialogOpen = (type) => {
    setActionType(type);
    setDialogOpen(true);
    if (type === "Rename") {
      const structure = dataStructure.find(
        (structure) => structure.id === selectedStructure.id
      );
      const selectedSubStructure = structure?.subStructures.find(
        (subStructure) => subStructure.id === selectedId
      );
      setNewName(selectedSubStructure ? selectedSubStructure.name : "");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewName("");
  };

  const handleSubmit = () => {
    switch (actionType) {
      case "Add":
        handleAddSubStructure(newName);
        break;
      case "Rename":
        handleRenameSubStructure(selectedId, newName);
        break;
      case "Delete":
        handleDeleteSubStructure(selectedId);
        break;
      default:
        break;
    }
    handleDialogClose();
  };

  const handleAddSubStructure = async (name) => {
    if (!selectedStructure) return;
    await axiosInstance
      .post(`sub-structure/${selectedStructure.id}`, { name, contents: [] })
      .then(() => {
        fetchDataStructures();
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add new sub-structure:", error);
      });
  };

  const handleRenameSubStructure = async (id, newName) => {
    await axiosInstance
      .patch(`sub-structure/${id}`, { name: newName })
      .then(() => {
        fetchDataStructures();
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to rename sub-structure:", error);
      });
  };

  const handleDeleteSubStructure = async (id) => {
    await axiosInstance
      .delete(`sub-structure/${id}`)
      .then(() => {
        handleSubStructureClick(null);
        setDialogOpen(false);
        setSelectedId(null);
        fetchDataStructures();
      })
      .catch((error) => {
        console.error("Failed to delete sub-structure:", error);
      });
  };
  const handleMenuItemClick = (type) => {
    setAnchorEl(null);
    handleDialogOpen(type);
  };

  const handleListItemClick = (subStructure) => {
    if (addClicked) {
      setWaringDialogOpen(true);
      return;
    }
    handleSubStructureClick(subStructure);
    setSelectedSubStructure(subStructure);
    setSelectedId(subStructure.id);
  };

  return (
    <Box sx={{ width: "50%", overflowY: "auto" }}>
      <List>
        {selectedStructure && (
          <>
            <ListItem>
              <Typography>Sub Structures</Typography>
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
                  {selectedSubStructure
                    ? `Rename ${selectedSubStructure.name}`
                    : "Rename"}
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick("Delete")}
                  sx={{ color: grey[900] }}
                  disabled={!selectedId}
                >
                  {selectedSubStructure
                    ? `Delete ${selectedSubStructure.name}`
                    : "Delete"}
                </MenuItem>
              </Menu>
            </ListItem>
            <Divider sx={{ ml: 2, background: grey[50] }} />
          </>
        )}

        {selectedStructure &&
          (selectedStructure.subStructures.length === 0 ? (
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
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                minHeight: 300,
              }}
            >
              {dataStructure
                .find((structure) => structure.id === selectedStructure.id)
                ?.subStructures.map((subStructure) => (
                  <ListItem
                    key={subStructure.id}
                    disablePadding
                    sx={{
                      backgroundColor:
                        selectedId === subStructure.id
                          ? grey[700]
                          : "transparent",
                      "&:hover": {
                        backgroundColor: grey[700],
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleListItemClick(subStructure)}
                    >
                      <ListItemText
                        primary={subStructure.name}
                        primaryTypographyProps={{ sx: { color: grey[50] } }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </Box>
          ))}
      </List>
      <ActionDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        actionType={actionType}
        structureName="Sub-structure"
        newName={newName}
        setNewName={setNewName}
        onSubmit={handleSubmit}
      />
      <WarningDialog
        dialogOpen={warningDialogOpen}
        onClose={() => {
          setWaringDialogOpen(false);
        }}
      />
    </Box>
  );
};

export default SubStructureList;
