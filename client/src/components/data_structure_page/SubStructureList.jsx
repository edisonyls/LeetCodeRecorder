import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionDialog, WarningDialog } from "./DataStructureDialogs";
import { SubStructureHooks } from "../../hooks/SubStructureHooks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const SubStructureList = ({
  selectedStructure,
  dataStructure,
  handleSubStructureClick,
  addClicked,
}) => {
  const { addSubStructure, renameSubStructure, deleteSubStructure } =
    SubStructureHooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningDialogOpen, setWaringDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // Add, rename and delete
  const [selectedId, setSelectedId] = useState(null); // storing the selected sub-structure id
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [newName, setNewName] = useState(""); // name of the renamed sub-structure
  const [selectedSubStructure, setSelectedSubStructure] = useState(null);

  const open = Boolean(anchorEl); // To check if menu is open

  useEffect(() => {
    setSelectedSubStructure(null);
    setDialogOpen(false);
    setSelectedId(null);
  }, [selectedStructure]);

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
      setSelectedSubStructure(selectedSubStructure);
      setNewName(selectedSubStructure ? selectedSubStructure.name : "");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewName("");
  };

  const handleSubmit = () => {
    if (!selectedStructure) return;
    switch (actionType) {
      case "Add":
        addSubStructure(selectedStructure.id, newName);
        setDialogOpen(false);
        break;
      case "Rename":
        renameSubStructure(selectedStructure.id, selectedId, newName);
        setDialogOpen(false);
        break;
      case "Delete":
        deleteSubStructure(selectedStructure.id, selectedId);
        handleSubStructureClick(null);
        setSelectedSubStructure(null);
        setDialogOpen(false);
        setSelectedId(null);
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
    <Box sx={{ width: "100%", p: 1 }}>
      <List>
        <ListItem>
          <Typography>Variants & Types</Typography>
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
              disabled={dataStructure.length === 0}
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
        <Divider sx={{ background: grey[50] }} />

        {dataStructure.length === 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minHeight: 300,
            }}
          >
            <Typography>Please create a data structure</Typography>
          </Box>
        )}

        {!selectedStructure && dataStructure.length !== 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minHeight: 300,
            }}
          >
            <Typography>Please select a data structure on the left</Typography>
          </Box>
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
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      maxWidth: 250,
                      fontSize: "12px",
                      p: 1,
                    },
                  },
                }}
                title="If there is no further variant or type of selected data structure, you can create a dummy one with the same name "
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

export default SubStructureList;
