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

// Mock data for the example
const dataStructures = {
  Array: ["Dynamic Array", "Static Array"],
  Queue: ["Priority Queue", "Circular Queue"],
  Stack: ["LIFO Stack"],
  LinkedList: [
    "Singly Linked List",
    "Doubly Linked List",
    "Circular Linked List",
  ],
  Graph: ["Directed Graph", "Undirected Graph", "Weighted Graph"],
  Tree: ["Binary Tree", "Binary Search Tree", "AVL Tree", "Red-Black Tree"],
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

  const handleAddMainStructure = () => {
    const newStructureName = prompt(
      "Enter the name of the new main structure:"
    );
    if (newStructureName && !dataStructuresState[newStructureName]) {
      setDataStructuresState((prevState) => ({
        ...prevState,
        [newStructureName]: [],
      }));
    }
  };

  const handleAddSubStructure = () => {
    if (!selectedStructure) return; // Ensure a main structure is selected

    const newSubStructureName = prompt(
      "Enter the name of the new sub-structure:"
    );
    if (
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
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: grey[50] }}
        >
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
                <Typography variant="h6" sx={{ color: grey[400], mb: 2 }}>
                  Main Structures
                </Typography>
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
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleAddMainStructure}>
                      <ListItemText
                        primary="+ Add New Main Structure"
                        primaryTypographyProps={{ sx: { color: grey[50] } }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
              <Box sx={{ width: "50%", overflowY: "auto" }}>
                <Typography variant="h6" sx={{ color: grey[400], mb: 2 }}>
                  Sub-Structures
                </Typography>
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
                  {selectedStructure && <p></p>}
                </List>
              </Box>
            </Box>
          </Grid>
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
