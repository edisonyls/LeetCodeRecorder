import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchDataStructures();
  }, []);

  const fetchDataStructures = async () => {
    setLoading(true);
    await axiosInstance
      .get("data-structure")
      .then((response) => {
        const fetchedData = response.data.data;
        // Update selectedStructure with the latest info
        if (selectedStructure) {
          const updatedSelectedStructure = fetchedData.find(
            (structure) => structure.id === selectedStructure.id
          );
          setSelectedStructure(updatedSelectedStructure);
        }
        setDataStructure(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data structures:", error);
        setLoading(false);
      });
  };

  const handleMainStructureClick = (structure) => {
    setSelectedStructure(structure);
  };

  const handleSubStructureClick = (subStructure) => {
    setSelectedSubStructure(subStructure);
    console.log(subStructure);
    if (subStructure !== null && subStructure.contents.length !== 0) {
      setContent(subStructure.contents[0].content);
    } else {
      setContent(null);
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <>
        <AuthenticatedNavbar />
        <Container component="main" maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
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
                  addClicked={addClicked}
                />
                <SubStructureList
                  selectedStructure={selectedStructure}
                  dataStructure={dataStructure}
                  handleSubStructureClick={handleSubStructureClick}
                  fetchDataStructures={fetchDataStructures}
                  addClicked={addClicked}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  bgcolor: grey[800],
                  color: grey[50],
                  p: 2,
                  borderRadius: 1,
                  minHeight: 380,
                  overflow: "auto",
                }}
              >
                <ContentDisplay
                  selectedStructure={selectedStructure}
                  selectedSubStructure={selectedSubStructure}
                  addClicked={addClicked}
                  setAddClicked={setAddClicked}
                  content={content}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
};

export default DataStructurePage;
