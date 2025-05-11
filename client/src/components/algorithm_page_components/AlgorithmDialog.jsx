import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { axiosInstance } from "../../config/axiosConfig";

const AlgorithmDialog = ({ open, onClose, algorithm }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    algorithm.sections.forEach((section) => {
      if (section.name === "Visual Representation") {
        fetchImage(section);
      }
    });
  }, [algorithm]);

  const fetchImage = async (section) => {
    try {
      const response = await axiosInstance.get(
        `algorithm/image/${section.content}`,
        {
          responseType: "blob",
        }
      );
      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setImages((prev) => ({ ...prev, [section.content]: imageObjectURL }));
    } catch (error) {
      console.error("Failed to fetch image", error);
    }
  };

  const formatContent = (sectionName, content) => {
    if (sectionName === "Visual Representation") {
      const imageSrc = images[content];
      if (imageSrc) {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={imageSrc}
              alt="Algorithm Visual Representation"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </Box>
        );
      } else {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        );
      }
    } else if (content.trim().startsWith("1.")) {
      return (
        <ol>
          {content.split("\n").map((item, index) => (
            <li key={index}>{item.slice(item.indexOf(" ") + 1)}</li>
          ))}
        </ol>
      );
    } else if (content.trim().startsWith("-")) {
      return (
        <ul>
          {content.split("\n").map((item, index) => (
            <li key={index}>{item.slice(item.indexOf(" ") + 1)}</li>
          ))}
        </ul>
      );
    }
    return <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{content}</pre>;
  };

  if (!algorithm) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: "#00FF00",
          color: "black",
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {algorithm.title}
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ color: "black" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ background: grey[800], color: "white", padding: 3 }}
      >
        <Chip
          label={algorithm.tag}
          sx={{
            backgroundColor: tagColors[algorithm.tag],
            color: "black",
            marginBottom: "10px",
          }}
        />
        <Typography paragraph>{algorithm.summary}</Typography>
        {algorithm.sections.map((section, index) => (
          <Box
            key={index}
            sx={{
              marginTop: 2,
              padding: 2,
              borderLeft: "5px solid #00FF00",
              background: grey[900],
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom component="div">
              {section.name}
            </Typography>
            <Typography variant="body2" paragraph component="div">
              {formatContent(section.name, section.content)}
            </Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

const tagColors = {
  Sorting: "#2196f3",
  Searching: "#8bc34a",
  Graph: "#f44336",
  "Dynamic Programming": "#ff9800",
  Greedy: "#673ab7",
  Backtracking: "#e91e63",
  "Divide and Conquer": "#009688",
  String: "#cddc39",
  Mathematical: "#795548",
  "Machine Learning": "#ffeb3b",
};

export default AlgorithmDialog;
