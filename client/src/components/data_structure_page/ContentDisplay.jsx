import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GreyBackgroundButton } from "../generic/GenericButton";
import axiosInstance from "../../config/axiosConfig";
import EditorWithMenuBar from "./EditorWithMenuBar";

const ContentDisplay = ({
  selectedStructure,
  selectedSubStructure,
  addClicked,
  setAddClicked,
}) => {
  const [contents, setContents] = useState(null);
  // const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    setAddClicked(false);
    // Assuming the API requires a subStructure ID to fetch its content
    if (selectedSubStructure?.id) {
      axiosInstance
        .get(`/content/${selectedSubStructure.id}`)
        .then((response) => {
          setContents(response.data.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the content", error);
          setContents(null); // Reset contents on error
        });
    } else {
      setContents(null);
    }
  }, [selectedSubStructure]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: grey[800],
        color: grey[50],
        p: 2,
        borderRadius: 1,
        minHeight: 300,
        position: "relative",
        flexGrow: 1,
      }}
    >
      {selectedStructure ? (
        selectedSubStructure ? (
          <>
            <Typography
              variant="h5"
              sx={{
                color: grey[50],
                width: "100%",
                textAlign: "center",
                mb: 4,
              }}
            >
              {selectedSubStructure.name}
            </Typography>
            {addClicked ? (
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "auto",
                  marginTop: -3,
                }}
              >
                <EditorWithMenuBar />
              </Box>
            ) : selectedSubStructure.contents.length !== 0 ? (
              selectedSubStructure.contents.map((content) => (
                <Box sx={{ marginBottom: 2, width: "100%" }}></Box>
              ))
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    overflow: "auto",
                    minHeight: 300,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: grey[400], mb: 2, textAlign: "center" }}
                  >
                    No additional information available.
                  </Typography>
                  <GreyBackgroundButton
                    buttonText="Add Content"
                    onClick={() => setAddClicked(true)}
                  />
                </Box>
              </>
            )}
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: grey[400],
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Please select a sub-structure.
          </Typography>
        )
      ) : (
        <Typography
          variant="h6"
          sx={{
            color: grey[400],
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Please select a data structure.
        </Typography>
      )}
    </Box>
  );
};

export default ContentDisplay;
