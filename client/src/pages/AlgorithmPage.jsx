import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer";
import AlgorithmDialog from "../components/algorithm_page_components/AlgorithmDialog";
import { BlackBackgroundButton } from "../components/generic/GenericButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAlgorithm } from "../context/AlgorithmContext";
import { AlgorithmHooks } from "../hooks/AlgorithmHooks";

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

const AlgorithmPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const { state } = useAlgorithm();
  const { algorithms, loading, error } = state;
  const { fetchAlgorithms } = AlgorithmHooks();

  useEffect(() => {
    fetchAlgorithms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(algorithms);

  const navigate = useNavigate();

  const handleClickOpen = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAlgorithm(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#121212",
      }}
    >
      <AuthenticatedNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
          minHeight: "79vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: grey[50] }}>
            Algorithms
          </Typography>
          <BlackBackgroundButton
            buttonText="New Algorithm"
            onClick={() => navigate("/new-algorithm")}
            startIcon={<AddIcon />}
          />
        </Box>

        <Grid container spacing={2} sx={{ width: "80%", mb: 2 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="outlined"
                sx={{
                  backgroundColor: "#121212",
                  borderRadius: 1,
                  mr: 2,
                  flexGrow: 1,
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
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  backgroundColor: "#121212",
                  borderRadius: 1,
                  flexGrow: 2,
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
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ padding: "20px", width: "80%", marginBottom: "1rem" }}
        >
          {algorithms.map((algorithm, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <Chip
                    label={algorithm.tag}
                    sx={{
                      backgroundColor: tagColors[algorithm.tag],
                      color: "black",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "1em",
                      marginBottom: "10px",
                      color: "white",
                    }}
                  >
                    {truncateString(algorithm.summary, 140)}{" "}
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
                        boxShadow:
                          "0px 0px 8px #00FF00, 0px 0px 10px #00FF00 inset", // Outer and inner glow
                        textShadow: "0px 0px 8px #00FF00", // Neon-like text glow
                      },
                    }}
                    onClick={() => handleClickOpen(algorithm)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />

      {selectedAlgorithm && (
        <AlgorithmDialog
          open={open}
          onClose={handleClose}
          algorithm={selectedAlgorithm}
        />
      )}
    </Box>
  );
};

export default AlgorithmPage;
