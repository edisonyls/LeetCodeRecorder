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
import { GreyBackgroundButton } from "../generic/GenericButton";
import { grey } from "@mui/material/colors";
import AddStructureDialog from "./AddStructureDialog";
import axiosInstance from "../../config/axiosConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SubStructureList = ({
  selectedStructure,
  dataStructure,
  handleSubStructureClick,
  fetchDataStructures,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const open = Boolean(anchorEl); // To check if menu is open

  const handleAddSubStructure = (name) => {
    if (!selectedStructure) return;
    axiosInstance
      .post(`sub-structure/${selectedStructure.id}`, { name })
      .then(() => {
        fetchDataStructures();
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add new sub-structure:", error);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "50%", overflowY: "auto" }}>
      <List>
        {selectedStructure && (
          <>
            <ListItem>
              <Typography>Sub-structure</Typography>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ marginLeft: "auto", color: grey[50] }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                sx={{ padding: 0 }}
              >
                <MenuItem onClick={handleClose} sx={{ padding: "4px 16px" }}>
                  Edit
                </MenuItem>
              </Menu>
            </ListItem>
            <Divider sx={{ ml: 2, background: grey[50] }} />
          </>
        )}

        {selectedStructure &&
          dataStructure
            .find((structure) => structure.id === selectedStructure.id) // Use id for comparison
            ?.subStructures.map((subStructure) => (
              <ListItem key={subStructure.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSubStructureClick(subStructure)}
                >
                  <ListItemText
                    primary={subStructure.name}
                    primaryTypographyProps={{ sx: { color: grey[50] } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

        {selectedStructure && (
          <GreyBackgroundButton
            buttonText="Add"
            onClick={() => setDialogOpen(true)}
          />
        )}
        {selectedStructure && (
          <AddStructureDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmit={(name) => handleAddSubStructure(name)}
            title="Add New Sub-Structure"
          />
        )}
      </List>
    </Box>
  );
};

export default SubStructureList;
