import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import CodeSnippet from "../CodeSnippet";
import { GreyBackgroundButton } from "../generic/GenericButton";
import GenericDialog from "../generic/GenericDialog";
import axiosInstance from "../../config/axiosConfig";
import ContentComponent from "./ContentComponent";

const ContentDisplay = ({ selectedSubStructure, selectedStructure }) => {
  // State to manage if the Add Content button has been clicked
  const [addClicked, setAddClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newContentType, setNewContentType] = useState("");
  const [newContentValue, setNewContentValue] = useState("");

  const hasContents = contents && contents.length > 0;

  useEffect(() => {
    setAddClicked(false);
    setNewContentValue("");
    // If you need to reset contents to an empty array or a default state
    setContents([]);
    const fetchContents = () => {
      setLoading(true);
      axiosInstance
        .get(`content/${selectedSubStructure.id}`)
        .then((res) => {
          setContents(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Failed to fetch contentss: ", err);
          setLoading(false);
        });
    };

    if (selectedSubStructure && selectedSubStructure.id) {
      fetchContents();
    }
  }, [selectedSubStructure]);

  const addContent = (contentType) => {
    var newContent;
    if (contentType !== "IMAGE_ID") {
      newContent = {
        type: contentType,
        text: "",
        imageId: null,
      };
    } else {
      newContent = {
        type: contentType,
        text: null,
        imageId: "",
      };
    }
    setContents((prevContents) => [...prevContents, newContent]);
  };

  const handleConfirmCancel = () => {
    setAddClicked(false);
    setDialogOpen(false);
    setNewContentValue("");
    setContents([]);
  };

  const handleContentChange = (event, index) => {
    const { name, value } = event.target;
    setContents((prevContents) => {
      const updatedContents = [...prevContents];
      updatedContents[index] = {
        ...updatedContents[index],
        [name]: value,
      };
      return updatedContents;
    });
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContents((prevContents) => {
        // Clone the previous contents array
        const updatedContents = [...prevContents];

        // Update the specific item at index
        updatedContents[index] = {
          ...updatedContents[index],
          imageUrl: imageUrl, // Assign the created URL for image preview
          file: file, // Store the file object for later upload
        };

        return updatedContents; // Return the correctly updated array
      });
    }
  };

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
      }}
    >
      {console.log(contents)}
      {selectedStructure && selectedSubStructure ? (
        <>
          <Box sx={{ width: "100%", textAlign: "center", mb: 4 }}>
            <Typography variant="h5" sx={{ color: grey[400] }}>
              {selectedSubStructure.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: hasContents ? "flex-start" : "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Loading...</Typography>
              </Box>
            ) : (
              <>
                {hasContents &&
                  contents.map((content, index) => (
                    <ContentComponent
                      key={index}
                      content={content}
                      onContentChange={(e) => handleContentChange(e, index)}
                      // onSave={handleSaveNewContent}
                      text={content.text}
                      contentType={content.type}
                      contentValue={newContentValue}
                      addClicked={addClicked}
                      imageUrl={content.imageUrl}
                      handleImageChange={(e) => handleImageChange(e, index)}
                    />
                  ))}
                {!hasContents && !addClicked && (
                  <>
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
                  </>
                )}
                {addClicked && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    {!hasContents ? (
                      <Box mb={3}>
                        <Typography>Select from the following:</Typography>
                      </Box>
                    ) : null}
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <GreyBackgroundButton
                        buttonText="Add Text"
                        onClick={() => addContent("TEXT")}
                      />
                      <GreyBackgroundButton
                        buttonText="Add Code"
                        onClick={() => addContent("CODE_SNIPPET")}
                      />
                      <GreyBackgroundButton
                        buttonText="Add Image"
                        onClick={() => addContent("IMAGE_ID")}
                      />
                    </Box>
                    <Box sx={{ mt: 5, display: "flex", gap: 1 }}>
                      <GreyBackgroundButton
                        buttonText="Cancel"
                        onClick={() => setDialogOpen(true)}
                      />
                      <GreyBackgroundButton buttonText="Save" />
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
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
          Please select a data structure.
        </Typography>
      )}
      <GenericDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Do you want to cancel?"
        contents="Any contents wouldn't be saved"
      />
    </Box>
  );
};

export default ContentDisplay;
