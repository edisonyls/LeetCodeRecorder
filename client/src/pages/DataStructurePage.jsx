import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { GreyBackgroundButton } from "../components/generic/GenericButton";
import AddStructureDialog from "../components/AddStructureDialog";

// Mock data for the example
const dataStructures = {
  Array: ["Dynamic Array", "Static Array"],
};

// Mock content for sub-structures
const subStructureContent = {
  "Dynamic Array":
    "A dynamic array is an array with a big improvement: automatic resizing. It allows for the addition of elements to the array dynamically and increases its size accordingly.",
  "Static Array":
    "Static arrays have a fixed size, which is determined at the time of allocation. They cannot be resized dynamically and require a predetermined size at compile time.",
  "Priority Queue":
    "A priority queue is an abstract data type where each element has a priority assigned to it. Elements are served based on their priority, rather than just their order in the queue.",
  // Add mock content for other sub-structures as needed...
};

const DataStructurePage = () => {
  const [dataStructuresState, setDataStructuresState] =
    useState(dataStructures);
  const [isMainStructureDialogOpen, setIsMainStructureDialogOpen] =
    useState(false);
  const [isSubStructureDialogOpen, setIsSubStructureDialogOpen] =
    useState(false);
  const [selectedStructure, setSelectedStructure] = useState("");
  const [selectedSubStructure, setSelectedSubStructure] = useState("");

  const handleMainStructureClick = (structure) => {
    setSelectedStructure(structure);
    setSelectedSubStructure(""); // Reset sub-structure selection
  };

  const handleSubStructureClick = (subStructure) => {
    setSelectedSubStructure(subStructure);
  };

  const openMainStructureDialog = () => setIsMainStructureDialogOpen(true);
  const closeMainStructureDialog = () => setIsMainStructureDialogOpen(false);
  const openSubStructureDialog = () => setIsSubStructureDialogOpen(true);
  const closeSubStructureDialog = () => setIsSubStructureDialogOpen(false);

  const handleAddMainStructure = (newStructureName) => {
    if (newStructureName && !dataStructuresState[newStructureName]) {
      setDataStructuresState((prevState) => ({
        ...prevState,
        [newStructureName]: [],
      }));
    }
    closeMainStructureDialog(); // Close the dialog after adding
  };

  const handleAddSubStructure = (newSubStructureName) => {
    if (
      selectedStructure &&
      newSubStructureName &&
      !dataStructuresState[selectedStructure].includes(newSubStructureName)
    ) {
      setDataStructuresState((prevState) => ({
        ...prevState,
        [selectedStructure]: [
          ...prevState[selectedStructure],
          newSubStructureName,
        ],
      }));
    }
    closeSubStructureDialog(); // Close the dialog after adding
  };

  return (
    <div
      style={{
        backgroundColor: grey[900],
        color: grey[50],
        minHeight: "100vh",
      }}
    >
      <AuthenticatedNavbar />
      <Container component="main" maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: grey[50] }}>
          Data Structures
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                bgcolor: grey[800],
                color: grey[50],
                p: 2,
                borderRadius: 1,
                minHeight: 300,
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  borderRight: `1px solid ${grey[700]}`,
                  overflowY: "auto",
                }}
              >
                <List>
                  {Object.keys(dataStructures).map((structure) => (
                    <ListItem key={structure} disablePadding>
                      <ListItemButton
                        onClick={() => handleMainStructureClick(structure)}
                      >
                        <ListItemText
                          primary={structure}
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
              <Box sx={{ width: "50%", overflowY: "auto" }}>
                <List>
                  {selectedStructure &&
                    dataStructures[selectedStructure].map((subStructure) => (
                      <ListItem key={subStructure} disablePadding>
                        <ListItemButton
                          onClick={() => handleSubStructureClick(subStructure)}
                        >
                          <ListItemText
                            primary={subStructure}
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
            </Box>
          </Grid>
          <AddStructureDialog
            open={isMainStructureDialogOpen}
            onClose={closeMainStructureDialog}
            onSubmit={handleAddMainStructure}
            title="Add New Data Structure"
          />

          {selectedStructure && (
            <AddStructureDialog
              open={isSubStructureDialogOpen}
              onClose={closeSubStructureDialog}
              onSubmit={handleAddSubStructure}
              title="Add New Sub-Structure"
            />
          )}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                bgcolor: grey[800],
                color: grey[50],
                p: 2,
                borderRadius: 1,
                minHeight: 300,
                overflow: "auto",
              }}
            >
              {selectedSubStructure ? (
                <>
                  <Typography variant="h5" sx={{ color: grey[400], mb: 2 }}>
                    {selectedSubStructure}
                  </Typography>
                  <Typography sx={{ color: grey[400] }}>
                    {subStructureContent[selectedSubStructure] ||
                      "No additional information available."}
                  </Typography>
                </>
              ) : (
                <Typography variant="h6" sx={{ color: grey[400] }}>
                  Please select a sub-structure to see its details.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DataStructurePage;
