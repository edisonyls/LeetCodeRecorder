import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer";

// Function to truncate the description if it exceeds a certain length
const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const AlgorithmPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleClickOpen = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAlgorithm(null);
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
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Grid
          container
          spacing={3}
          sx={{ padding: "20px", width: "80%", marginBottom: "2rem" }}
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
      </Box>

      <Footer />

      {selectedAlgorithm && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ background: grey[800], color: "white" }}>
            {selectedAlgorithm.title}
          </DialogTitle>
          <DialogContent
            dividers
            sx={{ background: "#1e1e1e", color: "white", padding: 3 }}
          >
            <Typography variant="h6" gutterBottom>
              Purpose
            </Typography>
            <Typography paragraph>{selectedAlgorithm.purpose}</Typography>
            <Typography variant="h6" gutterBottom>
              How It Works
            </Typography>
            <Typography paragraph>{selectedAlgorithm.howItWorks}</Typography>
            <Typography variant="h6" gutterBottom>
              Pseudocode
            </Typography>
            <Typography paragraph component="div">
              <Box sx={{ background: grey[800], padding: 2, borderRadius: 2 }}>
                <pre style={{ whiteSpace: "pre-wrap", color: grey[50] }}>
                  {selectedAlgorithm.pseudocode}
                </pre>
              </Box>
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

const algorithms = [
  {
    title: "Quick Sort",
    purpose: "Sorts an array of elements",
    description:
      "Quick Sort is an efficient, comparison-based, divide-and-conquer sorting algorithm.",
    howItWorks:
      "Quick Sort picks an element as a pivot and partitions the given array around the picked pivot.",
    pseudocode: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[Math.floor(arr.length / 2)];
  let left = arr.filter(x => x < pivot);
  let right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
  },
  {
    title: "Depth-First Search",
    purpose: "Traverses a graph or tree",
    description:
      "Depth-First Search is an algorithm for traversing or searching tree or graph data structures. Depth-First Search is an algorithm for traversing or searching tree or graph data structures. Depth-First Search is an algorithm for traversing or searching tree or graph data structures.",
    howItWorks:
      "The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
    pseudocode: `function DFS(node) {
  let visited = new Set();
  function visit(n) {
    if (visited.has(n)) return;
    visited.add(n);
    for (let neighbor of n.neighbors) {
      visit(neighbor);
    }
  }
  visit(node);
}`,
  },
  {
    title: "Breadth-First Search",
    purpose: "Traverses a graph or tree",
    description:
      "Breadth-First Search is an algorithm for traversing or searching tree or graph data structures. Breadth-First Search is an algorithm for traversing or searching tree or graph data structures.",
    howItWorks:
      "The algorithm starts at the root node and explores all the neighboring nodes at the present depth prior to moving on to nodes at the next depth level.",
    pseudocode: `function BFS(node) {
  let queue = [node];
  let visited = new Set();
  visited.add(node);
  while (queue.length > 0) {
    let current = queue.shift();
    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }
}`,
  },
  {
    title: "Merge Sort",
    purpose: "Sorts an array of elements",
    description:
      "Merge Sort is an efficient, stable, comparison-based, divide-and-conquer sorting algorithm.",
    howItWorks:
      "Merge Sort divides the array into two halves, recursively sorts them, and then merges the two sorted halves.",
    pseudocode: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return result.concat(left, right);
}`,
  },
  {
    title: "Dijkstra's Algorithm",
    purpose: "Finds the shortest path in a graph",
    description:
      "Dijkstra's Algorithm is an algorithm for finding the shortest paths between nodes in a graph.",
    howItWorks:
      "The algorithm repeatedly selects the node with the smallest tentative distance, calculates the tentative distances of its neighbors, and updates the neighbors' distances if necessary.",
    pseudocode: `function dijkstra(graph, start) {
  let distances = {};
  let pq = new PriorityQueue();
  pq.enqueue(start, 0);
  graph.forEach(node => distances[node] = Infinity);
  distances[start] = 0;
  while (!pq.isEmpty()) {
    let { element: u } = pq.dequeue();
    for (let [neighbor, weight] of graph[u]) {
      let alt = distances[u] + weight;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        pq.enqueue(neighbor, alt);
      }
    }
  }
  return distances;
}`,
  },
  {
    title: "Binary Search",
    purpose: "Finds an element in a sorted array",
    description:
      "Binary Search is an efficient algorithm for finding an item from a sorted list of items.",
    howItWorks:
      "Binary Search works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
    pseudocode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return middle;
    else if (arr[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return -1;
}`,
  },
  {
    title: "Heap Sort",
    purpose: "Sorts an array of elements",
    description:
      "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.",
    howItWorks:
      "Heap Sort first builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until all elements are sorted.",
    pseudocode: `function heapSort(arr) {
  function heapify(arr, length, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < length && arr[left] > arr[largest]) largest = left;
    if (right < length && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, length, largest);
    }
  }
  let length = arr.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) heapify(arr, length, i);
  for (let i = length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
  },
  {
    title:
      "A* Search uses a heuristic to guide its search and prioritizes nodes with the lowest cost to reach the goal.",
    purpose: "Finds the shortest path in a graph",
    description:
      "A* Search is an algorithm that finds the shortest path from a start node to a goal node in a graph.",
    howItWorks:
      "A* Search uses a heuristic to guide its search and prioritizes nodes with the lowest cost to reach the goal.",
    pseudocode: `function aStar(start, goal, h) {
  let openSet = new PriorityQueue();
  openSet.enqueue(start, 0);
  let cameFrom = new Map();
  let gScore = new Map();
  gScore.set(start, 0);
  let fScore = new Map();
  fScore.set(start, h(start));
  while (!openSet.isEmpty()) {
    let current = openSet.dequeue().element;
    if (current === goal) return reconstructPath(cameFrom, current);
    for (let neighbor of current.neighbors) {
      let tentative_gScore = gScore.get(current) + dist(current, neighbor);
      if (tentative_gScore < gScore.get(neighbor) || !gScore.has(neighbor)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentative_gScore);
        fScore.set(neighbor, gScore.get(neighbor) + h(neighbor));
        if (!openSet.contains(neighbor)) openSet.enqueue(neighbor, fScore.get(neighbor));
      }
    }
  }
  return [];
}
function reconstructPath(cameFrom, current) {
  let totalPath = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    totalPath.unshift(current);
  }
  return totalPath;
}`,
  },
];

export default AlgorithmPage;
