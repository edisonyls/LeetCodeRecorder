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
import DataStructureList from "../components/data_structure_page/DataStructureList";
import SubStructureList from "../components/data_structure_page/SubStructureList";
import ContentDisplay from "../components/data_structure_page/ContentDisplay";
import { DataStructureHooks } from "../hooks/DataStructureHooks";
import { useDataStructure } from "../context/dataStructureContext";

const DataStructurePage = () => {
  const { state } = useDataStructure();
  const { dataStructures, loading, error } = state;
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedSubStructure, setSelectedSubStructure] = useState("");
  const [addClicked, setAddClicked] = useState(false);
  const [content, setContent] = useState(null);
  const { fetchDataStructures } = DataStructureHooks();

  useEffect(() => {
    fetchDataStructures();
  }, []);

  useEffect(() => {
    if (selectedStructure) {
      // Find the updated structure in the global state
      const updatedStructure = dataStructures.find(
        (ds) => ds.id === selectedStructure.id
      );
      // Update selectedStructure if it has been found in the global state and is different
      if (
        updatedStructure &&
        JSON.stringify(updatedStructure) !== JSON.stringify(selectedStructure)
      ) {
        setSelectedStructure(updatedStructure);
      }
    }
  }, [dataStructures, selectedStructure]);

  // Automatically select the first subStructure if available
  useEffect(() => {
    if (selectedStructure && selectedStructure.subStructures.length > 0) {
      setSelectedSubStructure(selectedStructure.subStructures[0]);
    } else {
      setSelectedSubStructure(null);
    }
  }, [selectedStructure]);

  // updated selectedSubStructure
  useEffect(() => {
    if (selectedStructure && selectedSubStructure) {
      const updatedSelectedStructure = dataStructures.find(
        (ds) => ds.id === selectedStructure.id
      );
      if (updatedSelectedStructure) {
        const updatedSelectedSubStructure =
          updatedSelectedStructure.subStructures.find(
            (ss) => ss.id === selectedSubStructure.id
          );
        if (
          updatedSelectedSubStructure &&
          JSON.stringify(updatedSelectedSubStructure) !==
            JSON.stringify(selectedSubStructure)
        ) {
          setSelectedSubStructure(updatedSelectedSubStructure);
        }
      }
    }
  }, [dataStructures, selectedSubStructure, selectedStructure]);

  useEffect(() => {
    // Check if the selectedSubStructure is not null and has content
    if (selectedSubStructure && selectedSubStructure.content !== undefined) {
      setContent(selectedSubStructure.content);
    } else {
      // Reset content if there's no selectedSubStructure or if it has no content
      setContent(null);
    }
  }, [selectedSubStructure]);

  const handleMainStructureClick = (structure) => {
    setSelectedStructure(structure);
  };

  const handleSubStructureClick = (subStructure) => {
    setSelectedSubStructure(subStructure);
    if (subStructure !== null && subStructure.content !== null) {
      setContent(subStructure.content);
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
      {/* {console.log(dataStructure)} */}
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
                  dataStructure={dataStructures}
                  handleMainStructureClick={handleMainStructureClick}
                  addClicked={addClicked}
                />
                <SubStructureList
                  selectedStructure={selectedStructure}
                  dataStructure={dataStructures}
                  handleSubStructureClick={handleSubStructureClick}
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
