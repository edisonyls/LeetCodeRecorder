import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";

const AlgorithmCard = ({ algorithm, onOpen, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Card
      sx={{
        minHeight: "300px",
        background: grey[800],
        color: "white",
        boxShadow: 5,
        transition: "transform 0.3s, box-shadow 0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 10,
        },
      }}
    >
      <Box
        sx={{
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: "bold",
          }}
        >
          {truncateString(algorithm.title, 30)}
        </Typography>
      </Box>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={algorithm.tag}
            sx={{
              backgroundColor: tagColors[algorithm.tag],
              color: "black",
              marginBottom: "10px",
            }}
          />
          <IconButton
            aria-label="settings"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
            sx={{ color: "white" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onEdit(algorithm);
              }}
            >
              <EditIcon sx={{ marginRight: 1 }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onDelete(algorithm.id);
              }}
            >
              <DeleteIcon sx={{ marginRight: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </Box>
        <Typography
          sx={{
            fontSize: "1rem",
            marginBottom: "10px",
            height: "4rem",
            color: "white",
          }}
        >
          {truncateString(algorithm.summary, 120)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          sx={{
            color: "black",
            borderRadius: 2,
            border: `1px solid white`,
            backgroundColor: "white",
            "&:hover": {
              color: "black",
              borderColor: "#00FF00",
              backgroundColor: "#00FF00",
              boxShadow: "0px 0px 8px #00FF00, 0px 0px 10px #00FF00 inset",
              textShadow: "0px 0px 8px #00FF00",
            },
          }}
          onClick={() => onOpen(algorithm)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
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

export default AlgorithmCard;
