// SubStructureList.js
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { GreyBackgroundButton } from "../generic/GenericButton";
import { grey } from "@mui/material/colors";

const SubStructureList = ({
  selectedStructure,
  dataStructure,
  handleSubStructureClick,
  openSubStructureDialog,
}) => {
  return (
    <Box sx={{ width: "50%", overflowY: "auto" }}>
      <List>
        {selectedStructure &&
          dataStructure
            .find((structure) => structure.name === selectedStructure)
            ?.subStructures.map((subStructure) => (
              <ListItem key={subStructure.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSubStructureClick(subStructure.name)}
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
            onClick={openSubStructureDialog}
          />
        )}
      </List>
    </Box>
  );
};

export default SubStructureList;
