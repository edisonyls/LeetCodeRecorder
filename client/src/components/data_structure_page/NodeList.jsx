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
  Tooltip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionDialog, WarningDialog } from "./DataStructureDialogs";
import { NodeHooks } from "../../hooks/NodeHooks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const NodeList = ({
  selectedStructure,
  dataStructure,
  handleNodeClick,
  addClicked,
  selectedNodeId,
}) => {
  const { addNode, renameNode, deleteNode } = NodeHooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningDialogOpen, setWaringDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // Add, rename and delete
  const [selectedId, setSelectedId] = useState(); // storing the selected node id
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [newName, setNewName] = useState(""); // name of the renamed node
  const [selectedNode, setSelectedNode] = useState(null);

  const open = Boolean(anchorEl); // To check if menu is open

  const handleDialogOpen = (type) => {
    setActionType(type);
    setDialogOpen(true);
    if (type === "Rename") {
      const structure = dataStructure.find(
        (structure) => structure.id === selectedStructure.id
      );
      const selectedNode = structure?.nodes.find(
        (node) => node.id === selectedId
      );
      setSelectedNode(selectedNode);
      setNewName(selectedNode ? selectedNode.name : "");
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
        addNode(selectedStructure.id, newName);
        setDialogOpen(false);
        break;
      case "Rename":
        renameNode(selectedStructure.id, selectedId, newName);
        setDialogOpen(false);
        break;
      case "Delete":
        deleteNode(selectedStructure.id, selectedId);
        handleNodeClick(null);
        setSelectedNode(null);
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

  const handleListItemClick = (node) => {
    if (addClicked) {
      setWaringDialogOpen(true);
      return;
    }
    handleNodeClick(node);
    setSelectedNode(node);
    setSelectedId(node.id);
  };

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <List>
        <ListItem>
          <Typography>Notes & Extras</Typography>
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
              disabled={selectedStructure === null}
            >
              Add
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Rename")}
              sx={{ color: grey[900] }}
              disabled={!selectedId}
            >
              {selectedNode ? `Rename ${selectedNode.name}` : "Rename"}
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Delete")}
              sx={{ color: grey[900] }}
              disabled={!selectedId}
            >
              {selectedNode ? `Delete ${selectedNode.name}` : "Delete"}
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
          (selectedStructure.nodes.length === 0 ? (
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
                ?.nodes.map((node) => (
                  <ListItem
                    key={node.id}
                    disablePadding
                    sx={{
                      backgroundColor:
                        selectedId === node.id ? grey[700] : "transparent",
                      "&:hover": {
                        backgroundColor: grey[700],
                      },
                    }}
                  >
                    <ListItemButton onClick={() => handleListItemClick(node)}>
                      <ListItemText
                        primary={node.name}
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
        structureName="Variant or Type"
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

export default NodeList;
