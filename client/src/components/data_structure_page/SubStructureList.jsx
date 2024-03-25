import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { GreyBackgroundButton } from "../generic/GenericButton";
import { grey } from "@mui/material/colors";
import AddStructureDialog from "../AddStructureDialog";
import axiosInstance from "../../config/axiosConfig";

const SubStructureList = ({
  selectedStructure,
  dataStructure,
  handleSubStructureClick,
  fetchDataStructures,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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

  return (
    <Box sx={{ width: "50%", overflowY: "auto" }}>
      <List>
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
