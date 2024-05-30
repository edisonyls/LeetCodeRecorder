import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import AlgorithmTextField from "./AlgorithmTextField";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { grey } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NewAlgorithmDialog from "./NewAlgorithmDialog";
import { toast } from "react-toastify";
import { GreyBackgroundDialog } from "../generic/GenericDialog";
import {
  GreyBackgroundButtonWithInput,
  WarningButton,
} from "../generic/GenericButton";
import { axiosInstance } from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const predefinedTags = [
  "Sorting",
  "Searching",
  "Graph",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Divide and Conquer",
  "String",
  "Mathematical",
  "Machine Learning",
];

const predefinedSections = [
  "Description",
  "Complexity",
  "Advantages",
  "Disadvantages",
  "Important Notes",
  "Pseudocode",
  "Code",
  "Use Case/Application",
  "Variation",
  "Visual Representation",
  "Edge Cases",
];

const AlgorithmForm = ({ setDataEntered }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [summary, setSummary] = useState("");
  const [sections, setSections] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [customSectionName, setCustomSectionName] = useState("");
  const [customSectionContent, setCustomSectionContent] = useState("");
  const [insertAfterSection, setInsertAfterSection] = useState("default");
  const [recentlyAddedSection, setRecentlyAddedSection] = useState("");
  const [sectionToDelete, setSectionToDelete] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const newSectionRef = useRef(null);
  const navigate = useNavigate();

  // Checks if the user has input anything already
  useEffect(() => {
    const isDataPresent = title || tag || summary || sections.length > 0;
    setDataEntered(isDataPresent);
  }, [title, tag, summary, sections, setDataEntered]);

  useEffect(() => {
    if (recentlyAddedSection) {
      const timer = setTimeout(() => {
        setRecentlyAddedSection("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [recentlyAddedSection]);

  useEffect(() => {
    if (recentlyAddedSection && newSectionRef.current) {
      newSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [recentlyAddedSection]);

  const handleSectionAdd = () => {
    let index = sections.length;
    if (insertAfterSection === "short-summary") {
      index = 0;
    } else if (
      insertAfterSection !== "default" &&
      sections.some((sec) => sec.name === insertAfterSection)
    ) {
      index = sections.findIndex((sec) => sec.name === insertAfterSection) + 1;
    }

    const sectionToAdd = {
      name:
        selectedSection === "custom"
          ? customSectionName.trim()
          : selectedSection,
      content: selectedSection === "custom" ? customSectionContent : "",
    };

    if (selectedSection === "") {
      toast.error("Please select a section.", {
        autoClose: 2000,
      });
    } else if (selectedSection === "custom" && !sectionToAdd.name) {
      toast.error("Please enter a name for the custom section.", {
        autoClose: 2000,
      });
    } else if (sections.find((sec) => sec.name === sectionToAdd.name)) {
      toast.error("This section already exists.");
    } else {
      const newSections = [...sections];
      newSections.splice(index, 0, sectionToAdd);
      setSections(newSections);
      setRecentlyAddedSection(sectionToAdd.name);
      setCustomSectionName("");
      setCustomSectionContent("");
      setSelectedSection("");
      setInsertAfterSection("default");
      handleClose();
    }
  };

  const handleComplexityChange = (name, value) => {
    const updatedSections = sections.map((sec) =>
      sec.name === "Complexity"
        ? {
            ...sec,
            content: {
              ...sec.content,
              [name]: value,
            },
          }
        : sec
    );
    setSections(updatedSections);
  };

  const handleDeleteSection = (sectionName) => {
    const filteredSections = sections.filter(
      (section) => section.name !== sectionName
    );
    setSections(filteredSections);
    toast.info("Section " + sectionName + " deleted successfully.", {
      autoClose: 2000,
    });
    setDeleteDialogOpen(false); // Close the dialog after deletion
  };

  const openDeleteDialog = (sectionName) => {
    setSectionToDelete(sectionName);
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedSection("");
  };

  const handleFileChange = (e, sectionName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Check if the file is an image
      const sectionIndex = sections.findIndex(
        (sec) => sec.name === sectionName
      );
      if (sectionIndex !== -1 && sections[sectionIndex].imagePreviewUrl) {
        URL.revokeObjectURL(sections[sectionIndex].imagePreviewUrl);
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          content: imageUrl,
          file: file,
        };
        return newSections;
      });
    } else {
      // Handle error for non-image files
      toast.error("Please upload a valid image file.");
    }
  };

  const handleDeleteImage = (sectionName) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.name === sectionName) {
          // Revoke URL if it exists
          if (section.imagePreviewUrl) {
            URL.revokeObjectURL(section.imagePreviewUrl);
          }
          const { imagePreviewUrl, file, ...restOfSection } = section;
          return { ...restOfSection, content: "" };
        }
        return section;
      });
    });
    setImagePreviewUrl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // transform "Complexity" section into separate ones
    const transformedSections = sections.flatMap((section) => {
      if (section.name === "Complexity" && section.content) {
        return [
          { name: "Time Complexity", content: section.content.time || "" },
          { name: "Space Complexity", content: section.content.space || "" },
        ];
      }
      return section;
    });

    //   filter out sections with empty content
    const filteredSections = transformedSections.filter((section) => {
      if (typeof section.content === "string") {
        return section.content.trim() !== "";
      } else if (typeof section.content === "object") {
        return Object.values(section.content).some(
          (value) => value && value.trim() !== ""
        );
      }
      return false;
    });

    const algorithmData = {
      title,
      tag,
      summary,
      sections: filteredSections,
    };
    console.log(algorithmData);

    try {
      await axiosInstance.post("algorithm", algorithmData);
      toast.success("New algorithm saved successfully!", {
        autoClose: 2000,
      });
      navigate("/algorithm");
    } catch (e) {
      toast.error("Failed to save algorithm. Contact admin.");
      console.log("Error while saving a new algorithm");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        width: "100%",
      }}
    >
      {/* Algorithm Name Field */}
      <AlgorithmTextField
        label="Algorithm Name"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Tag Field */}
      <FormControl
        variant="outlined"
        fullWidth
        required
        margin="normal"
        sx={formControlStyles}
      >
        <InputLabel>Tag</InputLabel>
        <Select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          label="Tag"
          IconComponent={() => (
            <ArrowDropDownIcon style={{ color: grey[50] }} />
          )}
        >
          {predefinedTags.map((preTag) => (
            <MenuItem key={preTag} value={preTag}>
              {preTag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Short Summary Field */}
      <AlgorithmTextField
        label="Short Summary (in a few words)"
        required
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* Sections */}
      {sections.map((section) => (
        <Card
          key={section.name}
          ref={recentlyAddedSection === section.name ? newSectionRef : null}
          sx={{
            backgroundColor:
              section.name === recentlyAddedSection ? grey[600] : grey[800],
            color: "white",
            marginTop: 2,
            padding: 2,
            borderRadius: 1,
            transition: "background-color 0.5s ease",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {section.name}
              </Typography>
              <IconButton
                edge="end"
                onClick={() => openDeleteDialog(section.name)}
              >
                <DeleteForeverIcon style={{ color: grey[50] }} />
              </IconButton>
            </Box>

            {section.name === "Complexity" && (
              <>
                <AlgorithmTextField
                  label="Time Complexity"
                  value={section.content?.time || ""}
                  onChange={(e) =>
                    handleComplexityChange("time", e.target.value)
                  }
                />
                <AlgorithmTextField
                  label="Space Complexity"
                  value={section.content?.space || ""}
                  onChange={(e) =>
                    handleComplexityChange("space", e.target.value)
                  }
                />
              </>
            )}

            {section.name === "Visual Representation" && (
              <>
                {imagePreviewUrl ? (
                  <>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                      Image Preview:
                    </Typography>
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                        marginBottom: "1rem",
                      }}
                    />
                    <WarningButton
                      buttonText="Delete Image"
                      onClick={() => handleDeleteImage(section.name)}
                    />
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <GreyBackgroundButtonWithInput
                      buttonText="Upload Image"
                      inputType="file"
                      inputId={`fileInput-${section.name}`}
                      inputOnChange={(e) => handleFileChange(e, section.name)}
                    />
                  </Box>
                )}
              </>
            )}

            {section.name !== "Complexity" &&
              section.name !== "Visual Representation" && (
                <AlgorithmTextField
                  multiline
                  value={section.content || ""}
                  onChange={(e) => {
                    const updatedSections = sections.map((sec) =>
                      sec.name === section.name
                        ? { ...sec, content: e.target.value }
                        : sec
                    );
                    setSections(updatedSections);
                  }}
                />
              )}
          </CardContent>
        </Card>
      ))}

      {/* Form Footer */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          color="inherit"
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: "20px",
            borderColor: grey[50],
            "&:hover": {
              backgroundColor: grey[50],
              color: "black",
            },
          }}
          onClick={() => setDialogOpen(true)}
        >
          Add New Section
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: "20px",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#00FF00",
            },
          }}
        >
          Save Algorithm
        </Button>
      </Box>

      {/* Pop Up Dialog Field */}
      <NewAlgorithmDialog
        open={dialogOpen}
        onClose={handleClose}
        predefinedSections={predefinedSections}
        sections={sections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        customSectionName={customSectionName}
        setCustomSectionName={setCustomSectionName}
        customSectionContent={customSectionContent}
        setCustomSectionContent={setCustomSectionContent}
        insertAfterSection={insertAfterSection}
        setInsertAfterSection={setInsertAfterSection}
        handleSectionAdd={handleSectionAdd}
        formControlStyles={formControlStyles}
      />

      <GreyBackgroundDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDeleteSection(sectionToDelete)}
        title="Are you sure to delete?"
        content="This action can not be reversed."
      />
    </Box>
  );
};

const formControlStyles = {
  backgroundColor: "#121212",
  borderRadius: 1,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
};

export default AlgorithmForm;
