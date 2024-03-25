// DataStructureList.js
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { GreyBackgroundButton } from "../generic/GenericButton";
import axiosInstance from "../../config/axiosConfig";
import AddStructureDialog from "../AddStructureDialog";

const DataStructureList = ({
  dataStructure,
  handleMainStructureClick,
  fetchDataStructures,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
  return (
    <Box
      sx={{
        width: "50%",
        borderRight: `1px solid ${grey[700]}`,
        overflowY: "auto",
      }}
    >
      <List>
        {dataStructure.map((structure) => (
          <ListItem key={structure.id} disablePadding>
            <ListItemButton onClick={() => handleMainStructureClick(structure)}>
              <ListItemText
                primary={structure.name}
                primaryTypographyProps={{ sx: { color: grey[50] } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <GreyBackgroundButton
          buttonText="Add"
          onClick={() => setDialogOpen(true)}
        />
      </List>
      <AddStructureDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={(name) => handleAddDataStructure(name)}
        title="Add New Data Structure"
      />
    </Box>
  );
};

export default DataStructureList;
