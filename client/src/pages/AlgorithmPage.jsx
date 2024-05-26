import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Chip,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer";
import AlgorithmDialog from "../components/algorithm_page/AlgorithmDialog";
import { BlackBackgroundButton } from "../components/generic/GenericButton";
import AddIcon from "@mui/icons-material/Add";
import algorithms from "./algorithms";

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const categoryColors = {
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
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  const filteredAlgorithms = algorithms
    .filter((algorithm) =>
      algorithm.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

  const paginatedAlgorithms = filteredAlgorithms.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
            buttonText="     New    "
            onClick={() => console.log("Add new algorithm")}
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
          {paginatedAlgorithms.map((algorithm, index) => (
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
                    label={algorithm.category}
                    sx={{
                      backgroundColor: categoryColors[algorithm.category],
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
                    {truncateString(algorithm.description, 140)}{" "}
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
                        borderColor: "#8884d8",
                        backgroundColor: "#8884d8",
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

        <Pagination
          count={Math.ceil(filteredAlgorithms.length / pageSize)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "white",
                },
              },
            },
          }}
        />
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
