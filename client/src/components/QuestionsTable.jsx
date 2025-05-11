import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Star, StarBorder } from "@mui/icons-material";

function QuestionsTable({ questions, onDelete, onToggleStar }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ tableLayout: "fixed", width: "100%" }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            "& .MuiTableCell-head": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <TableRow>
            <TableCell align="center" sx={{ width: "3%" }} />
            <TableCell align="center" sx={{ width: "20%" }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ width: "32%" }}>
              Question
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Difficulty
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Success
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Attempts
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Time
            </TableCell>
            <TableCell sx={{ width: "5%" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <TableRow
                key={question.id}
                hover
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/question/${question.id}`, {
                    state: { id: question.id },
                  })
                }
              >
                <TableCell align="center" component="th" scope="row">
                  <IconButton
                    onClick={(event) => onToggleStar(question.id, event)}
                  >
                    {question.star ? (
                      <Star style={{ color: "#ffd250" }} />
                    ) : (
                      <StarBorder />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {question.dateOfCompletion}
                </TableCell>
                <TableCell align="center">
                  {question.number}. {question.title}
                </TableCell>
                <TableCell align="center">
                  <span
                    style={{
                      color:
                        question.difficulty === "Easy"
                          ? "#4CAF50"
                          : question.difficulty === "Medium"
                          ? "#FF9800"
                          : "#F44336",
                    }}
                  >
                    {question.difficulty}
                  </span>
                </TableCell>
                <TableCell align="center">
                  {question.success ? (
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  ) : (
                    <HighlightOffIcon style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell align="center">{question.attempts}</TableCell>
                <TableCell align="center">
                  {question.timeOfCompletion}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => onDelete(question.id, event)}>
                    <DeleteForeverIcon style={{ color: "black" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={7}>
                No Question Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionsTable;
