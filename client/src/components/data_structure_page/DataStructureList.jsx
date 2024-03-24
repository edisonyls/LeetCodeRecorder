// DataStructureList.js
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { GreyBackgroundButton } from "../generic/GenericButton";

const DataStructureList = ({
  dataStructure,
  handleMainStructureClick,
  openMainStructureDialog,
}) => {
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
            <ListItemButton
              onClick={() => handleMainStructureClick(structure.name)}
            >
              <ListItemText
                primary={structure.name}
                primaryTypographyProps={{ sx: { color: grey[50] } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <GreyBackgroundButton
          buttonText="Add"
          onClick={openMainStructureDialog}
        />
      </List>
    </Box>
  );
};

export default DataStructureList;
