import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
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
  // const hasContents = contents && contents.length > 0;

  const resetStates = () => {
    setAddClicked(false);
    setDialogOpen(false);
    setNewContentValue("");
    setContents([]);
  };

  useEffect(() => {
    if (selectedSubStructure?.id) {
      const fetchContents = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get(
            `content/${selectedSubStructure.id}`
          );
          setContents(res.data.data);
        } catch (err) {
          console.error("Failed to fetch contents: ", err);
        } finally {
          setLoading(false);
        }
      };
      fetchContents();
    } else {
      resetStates();
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
    setContents((prev) =>
      prev.map((content, i) =>
        i === index ? { ...content, [name]: value } : content
      )
    );
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContents((prev) =>
        prev.map((content, i) =>
          i === index ? { ...content, imageUrl, file } : content
        )
      );
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(contents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContents(items);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        `content/multiple-content/${selectedSubStructure.id}`,
        contents
      );
    } catch (error) {
      console.error("Failed to save contents", error);
    } finally {
      resetStates();
    }
  };

  if (!selectedStructure || !selectedSubStructure) {
    return (
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
        Please make a selection
      </Typography>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
        <Typography
          variant="h5"
          sx={{ color: grey[400], width: "100%", textAlign: "center", mb: 4 }}
        >
          {selectedSubStructure.name}
        </Typography>
        {loading ? (
          <Typography
            variant="h6"
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
            Loading...
          </Typography>
        ) : (
          <>
            <Droppable droppableId="contents">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent:
                      contents.length > 0 ? "flex-start" : "center",
                    alignItems: "center",
                    width: "100%",
                    overflow: "auto",
                    minHeight: "100%",
                  }}
                >
                  {contents.map((content, index) => {
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
                  {!contents.length && !addClicked && (
                    <Typography
                      variant="subtitle1"
                      sx={{ color: grey[400], mb: 2, textAlign: "center" }}
                    >
                      No additional information available.
                    </Typography>
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
