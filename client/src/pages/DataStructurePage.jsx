import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import AddStructureDialog from "../components/AddStructureDialog";
import axiosInstance from "../config/axiosConfig";
import DataStructureList from "../components/data_structure_page/DataStructureList";
import SubStructureList from "../components/data_structure_page/SubStructureList";
import ContentDisplay from "../components/data_structure_page/ContentDisplay";

const DataStructurePage = () => {
  const [dataStructure, setDataStructure] = useState([]);

  const [isMainStructureDialogOpen, setIsMainStructureDialogOpen] =
    useState(false);
  const [isSubStructureDialogOpen, setIsSubStructureDialogOpen] =
    useState(false);
  const [selectedStructure, setSelectedStructure] = useState("");
  const [selectedSubStructure, setSelectedSubStructure] = useState("");

  useEffect(() => {
    axiosInstance
      .get("data-structure")
      .then((response) => {
        const fetchedData = response.data.data;
        setDataStructure(fetchedData);
      })
      .catch((error) => {
        console.error("Failed to fetch data structures:", error);
      });
  }, []);

  const closeMainStructureDialog = () => setIsMainStructureDialogOpen(false);
  const closeSubStructureDialog = () => setIsSubStructureDialogOpen(false);

  const handleAddMainStructure = () => {
    closeMainStructureDialog();
  };

  const handleAddSubStructure = () => {
    closeSubStructureDialog();
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
              <DataStructureList
                dataStructure={dataStructure}
                handleMainStructureClick={setSelectedStructure}
                openMainStructureDialog={() =>
                  setIsMainStructureDialogOpen(true)
                }
              />
              <SubStructureList
                selectedStructure={selectedStructure}
                dataStructure={dataStructure}
                handleSubStructureClick={setSelectedSubStructure}
                openSubStructureDialog={() => setIsSubStructureDialogOpen(true)}
              />
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
            <ContentDisplay
              selectedSubStructure={selectedSubStructure}
              dataStructure={dataStructure}
              selectedStructure={selectedStructure}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DataStructurePage;
