import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import axiosInstance from "../config/axiosConfig";
import DataStructureList from "../components/data_structure_page/DataStructureList";
import SubStructureList from "../components/data_structure_page/SubStructureList";
import ContentDisplay from "../components/data_structure_page/ContentDisplay";

const DataStructurePage = () => {
  const [dataStructure, setDataStructure] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedSubStructure, setSelectedSubStructure] = useState("");

  useEffect(() => {
    fetchDataStructures();
  }, []);

  const fetchDataStructures = () => {
    axiosInstance
      .get("data-structure")
      .then((response) => {
        const fetchedData = response.data.data;
        setDataStructure(fetchedData);
      })
      .catch((error) => {
        console.error("Failed to fetch data structures:", error);
      });
  };

  const handleMainStructureClick = (structure) => {
    setSelectedStructure(structure);
  };

  const handleSubStructureClick = (subStructure) => {
    setSelectedSubStructure(subStructure);
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
                handleMainStructureClick={handleMainStructureClick}
                fetchDataStructures={fetchDataStructures}
              />
              <SubStructureList
                selectedStructure={selectedStructure}
                dataStructure={dataStructure}
                handleSubStructureClick={handleSubStructureClick}
                fetchDataStructures={fetchDataStructures}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <ContentDisplay
              selectedSubStructure={selectedSubStructure}
              selectedStructure={selectedStructure}
              fetchDataStructures={fetchDataStructures}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DataStructurePage;
