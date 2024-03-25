import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import CodeSnippet from "../CodeSnippet";
import { GreyBackgroundButton } from "../generic/GenericButton";
import GenericDialog from "../generic/GenericDialog";
import axiosInstance from "../../config/axiosConfig";
import ContentComponent from "./ContentComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ContentDisplay = ({ selectedSubStructure, selectedStructure }) => {
  const [addClicked, setAddClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newContentValue, setNewContentValue] = useState("");
  const hasContents = contents && contents.length > 0;

  useEffect(() => {
    setAddClicked(false);
    setNewContentValue("");

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
          console.log("Failed to fetch contents: ", err);
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
        const updatedContents = [...prevContents];
        updatedContents[index] = {
          ...updatedContents[index],
          imageUrl: imageUrl,
          file: file,
        };

        return updatedContents;
      });
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedContents = Array.from(contents);
    const [relocatedItem] = reorderedContents.splice(result.source.index, 1);
    reorderedContents.splice(result.destination.index, 0, relocatedItem);
    setContents(reorderedContents);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `content/multiple-content/${selectedSubStructure.id}`,
        contents
      );
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to save contents", error);
    } finally {
      setAddClicked(false);
      setNewContentValue("");
      setLoading(false);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {console.log(contents)}
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
                width: "100%",
                overflow: "auto",
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
                  <Droppable droppableId="contents">
                    {(provided, snapshot) => (
                      <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          width: "100%",
                          minHeight: "100%",
                        }}
                      >
                        {hasContents &&
                          contents.map((content, index) => {
                            if (addClicked) {
                              return (
                                <Draggable
                                  key={index}
                                  draggableId={`item-${index}`}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{ marginBottom: 2, width: "100%" }}
                                    >
                                      <ContentComponent
                                        content={content}
                                        onContentChange={(e) =>
                                          handleContentChange(e, index)
                                        }
                                        text={content.text}
                                        contentType={content.type}
                                        contentValue={newContentValue}
                                        addClicked={addClicked}
                                        imageUrl={content.imageUrl}
                                        handleImageChange={(e) =>
                                          handleImageChange(e, index)
                                        }
                                      />
                                    </Box>
                                  )}
                                </Draggable>
                              );
                            } else {
                              // Render without Draggable functionality when addClicked is false
                              return (
                                <Box
                                  key={index}
                                  sx={{ marginBottom: 2, width: "100%" }}
                                >
                                  <ContentComponent
                                    content={content}
                                    onContentChange={(e) =>
                                      handleContentChange(e, index)
                                    }
                                    text={content.text}
                                    contentType={content.type}
                                    contentValue={newContentValue}
                                    addClicked={addClicked}
                                    imageUrl={content.imageUrl}
                                    handleImageChange={(e) =>
                                      handleImageChange(e, index)
                                    }
                                  />
                                </Box>
                              );
                            }
                          })}
                        {provided.placeholder}
                        {!hasContents && !addClicked && (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: grey[400],
                                mb: 2,
                                textAlign: "center",
                              }}
                            >
                              No additional information available.
                            </Typography>
                            <GreyBackgroundButton
                              buttonText="Add Content"
                              onClick={() => setAddClicked(true)}
                            />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Droppable>
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
                        <GreyBackgroundButton
                          buttonText="Save"
                          onClick={handleSave}
                        />
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
    </DragDropContext>
  );
};

export default ContentDisplay;
