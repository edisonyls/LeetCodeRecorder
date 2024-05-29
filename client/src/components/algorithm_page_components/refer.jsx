import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  IconButton,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { GreyBackgroundButton } from "../generic/GenericButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AlgorithmTextField from "./AlgorithmTextField";
import { toast } from "react-toastify";

const categories = [
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

const sectionOptions = [
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
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionInputs, setSectionInputs] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [customSectionName, setCustomSectionName] = useState("");
  const [customSectionContent, setCustomSectionContent] = useState("");
  const [insertAfterSection, setInsertAfterSection] = useState("default");
  const [open, setOpen] = useState(false);

  const handleDeleteSection = (sectionToDelete) => {
    setSections(sections.filter((section) => section !== sectionToDelete));
    const newSectionInputs = { ...sectionInputs };
    delete newSectionInputs[sectionToDelete];
    setSectionInputs(newSectionInputs);
  };

  const handleSectionAdd = () => {
    const newSections = [...sections];
    let index = sections.length; // Default to append at the end

    if (insertAfterSection === "short-summary") {
      index = sections.findIndex((sec) => sec === "Short Summary") + 1;
    } else if (
      insertAfterSection !== "default" &&
      sections.includes(insertAfterSection)
    ) {
      index = sections.findIndex((sec) => sec === insertAfterSection) + 1;
    }

    const sectionToAdd = {
      name:
        selectedSection === "custom"
          ? customSectionName.trim()
          : selectedSection,
      content: selectedSection === "custom" ? customSectionContent : "",
    };

    if (!sections.includes(sectionToAdd.name)) {
      newSections.splice(index, 0, sectionToAdd.name);
      const newSectionInputs = [...sectionInputs];
      newSectionInputs.splice(index, 0, sectionToAdd);

      setSections(newSections);
      setSectionInputs(newSectionInputs);
      setCustomSectionName("");
      setCustomSectionContent("");
      setSelectedSection("");
      setInsertAfterSection("default"); // Reset to default after adding
      handleClose();
    } else {
      toast.error("This section already exists.");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (section, value) => {
    const updatedSections = sectionInputs.map((sec) =>
      sec.name === section ? { ...sec, content: value } : sec
    );
    setSectionInputs(updatedSections);
  };

  const handleComplexityChange = (section, field, value) => {
    const updatedSections = sectionInputs.map((sec) => {
      if (sec.name === section) {
        return { ...sec, [field]: value };
      }
      return sec;
    });
    setSectionInputs(updatedSections);
  };

  const handleFileChange = (section, file) => {
    const updatedSections = sectionInputs.map((sec) =>
      sec.name === section ? { ...sec, content: file } : sec
    );
    setSectionInputs(updatedSections);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, category, summary, sections: sectionInputs });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSection("");
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
      <AlgorithmTextField
        label="Algorithm Name"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormControl
        variant="outlined"
        fullWidth
        required
        margin="normal"
        sx={{
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
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          IconComponent={() => (
            <ArrowDropDownIcon style={{ color: grey[50] }} />
          )}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <AlgorithmTextField
        label="Short Summary (in a few words)"
        required
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {sectionInputs.map((section) => (
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
                marginBottom: 2,
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
            {section === "Complexity" && (
              <>
                <AlgorithmTextField
                  label="Time Complexity"
                  value={
                    sectionInputs.find((sec) => sec.name === "Complexity")
                      ?.time || ""
                  }
                  onChange={(e) =>
                    handleComplexityChange("Complexity", "time", e.target.value)
                  }
                />
                <AlgorithmTextField
                  label="Space Complexity"
                  value={
                    sectionInputs.find((sec) => sec.name === "Complexity")
                      ?.space || ""
                  }
                  onChange={(e) =>
                    handleComplexityChange(
                      "Complexity",
                      "space",
                      e.target.value
                    )
                  }
                />
              </>
            )}
            {section === "Visual Representation" && (
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#8884d8",
                    color: "white",
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(section, e.target.files[0])}
                />
              </Button>
            )}
            {section !== "Complexity" &&
              section !== "Visual Representation" && (
                <AlgorithmTextField
                  multiline
                  value={sectionInputs[section] || ""}
                  onChange={(e) => handleInputChange(section, e.target.value)}
                />
              )}
          </CardContent>
        </Card>
      ))}

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
        onClick={handleClickOpen}
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
            backgroundColor: grey[800],
            color: "white",
          },
        }}
      >
        Save Algorithm
      </Button>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: grey[800],
            color: "#fff",
            width: "60%", // Set the width of the dialog
            maxWidth: "60%", // Ensure the dialog does not exceed this width
          },
          "& .MuiDialogContentText-root, & .MuiDialogTitle-root": {
            color: "#fff",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select a Section to Add</DialogTitle>
        <DialogContent>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: grey[800],
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
            }}
          >
            <InputLabel>Sections</InputLabel>
            <Select
              label="Sections"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              IconComponent={() => (
                <ArrowDropDownIcon style={{ color: grey[50] }} />
              )}
            >
              {sectionOptions
                .filter((option) => !sections.includes(option))
                .map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              <MenuItem value="custom">Customize</MenuItem>
            </Select>
          </FormControl>

          {selectedSection === "custom" && (
            <>
              <AlgorithmTextField
                label="Custom Section Name"
                required
                value={customSectionName}
                onChange={(e) => setCustomSectionName(e.target.value)}
              />
              <AlgorithmTextField
                label="Custom Section Content"
                required
                multiline
                value={customSectionContent}
                onChange={(e) => setCustomSectionContent(e.target.value)}
              />
            </>
          )}

          <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
            Insert after
          </Typography>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: grey[800],
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
            }}
          >
            <InputLabel>Sections</InputLabel>
            <Select
              label="Insert after"
              value={insertAfterSection}
              onChange={(e) => setInsertAfterSection(e.target.value)}
              IconComponent={() => (
                <ArrowDropDownIcon style={{ color: grey[50] }} />
              )}
            >
              <MenuItem value="default">Default (End of List)</MenuItem>
              <MenuItem value="short-summary">Short Summary</MenuItem>
              {sections.map((section) => (
                <MenuItem key={section} value={section}>
                  {section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <GreyBackgroundButton onClick={handleClose} buttonText="Cancel" />
          <GreyBackgroundButton onClick={handleSectionAdd} buttonText="Add" />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlgorithmForm;
