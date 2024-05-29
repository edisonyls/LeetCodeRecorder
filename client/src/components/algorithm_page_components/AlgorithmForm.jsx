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
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import AlgorithmTextField from "./AlgorithmTextField";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { grey } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NewAlgorithmDialog from "./NewAlgorithmDialog";
import { toast } from "react-toastify";

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

const AlgorithmForm = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [summary, setSummary] = useState("");
  const [sections, setSections] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [customSectionName, setCustomSectionName] = useState("");
  const [customSectionContent, setCustomSectionContent] = useState("");
  const [insertAfterSection, setInsertAfterSection] = useState("default");

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
    } else if (selectedSection === "custom" && !sectionToAdd.content.trim()) {
      toast.error("Please enter content for the custom section.", {
        autoClose: 2000,
      });
    } else if (sections.find((sec) => sec.name === sectionToAdd.name)) {
      toast.error("This section already exists.");
    } else {
      const newSections = [...sections];
      newSections.splice(index, 0, sectionToAdd);
      setSections(newSections);
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

  //   const handleSectionAdd = () => {
  //     const newSections = [...sections];
  //     // default is to append the new section at the end of the current
  //     // existing section list
  //     let index = sections.length;

  //     // if insert after short-summary
  //     if (insertAfterSection === "short-summary") {
  //       index = 0;
  //     } else if (
  //       // find the index of the section that the user wants to add after
  //       insertAfterSection !== "default" &&
  //       sections.includes(insertAfterSection)
  //     ) {
  //       index = sections.findIndex((sec) => sec === insertAfterSection) + 1;
  //     }

  //     // const sectionToAdd = {
  //     //   name:
  //     //     selectedSection === "custom"
  //     //       ? customSectionName.trim()
  //     //       : selectedSection,
  //     //   content: selectedSection === "custom" ? customSectionContent : "",
  //     // };

  //     // !sections.includes(sectionToAdd.name)
  //     if (!sections.includes(selectedSection)) {
  //       console.log(!sections.includes(selectedSection));
  //       //   newSections.splice(index, 0, sectionToAdd.name);
  //       //   const newSectionInputs = [...sectionInputs];
  //       //   newSectionInputs.splice(index, 0, sectionToAdd);
  //       newSections.splice(index, 0, selectedSection);

  //       setSections(newSections);
  //       //   setSectionInputs(newSectionInputs);
  //       setCustomSectionName("");
  //       setCustomSectionContent("");
  //       setSelectedSection("");
  //       setInsertAfterSection("default");
  //       handleClose();
  //     } else {
  //       toast.error("This section already exists.");
  //     }
  //   };

  const handleDeleteSection = (sectionName) => {
    const filteredSections = sections.filter(
      (section) => section.name !== sectionName
    );
    setSections(filteredSections);
    toast.info("Section " + sectionName + " deleted successfully.", {
      autoClose: 2000,
    });
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedSection("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sections);
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
          sx={{
            backgroundColor: grey[800],
            color: "white",
            marginTop: 2,
            padding: 2,
            borderRadius: 1,
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
                onClick={() => handleDeleteSection(section.name)}
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
