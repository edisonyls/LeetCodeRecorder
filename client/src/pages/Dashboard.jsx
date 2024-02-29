import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Retrieve the token from localStorage
      const token = JSON.parse(localStorage.getItem("user"));

      // Make sure token exists
      if (!token) {
        console.log("No token found in localStorage.");
        return;
      }

      // Include the token in the Authorization header
      axiosInstance
        .get("question/all")
        .then((response) => {
          setQuestions(response.data.data); // Assuming the response structure you provided earlier
        })
        .catch((error) => {
          alert("User not authenticated!");
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Question Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Date of Completion</th>
            <th>Time of Completion</th>
            <th>Attempts</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.number}</td>
              <td>{question.title}</td>
              <td>{question.difficulty}</td>
              <td>{question.dateOfCompletion}</td>
              <td>{question.timeOfCompletion}</td>
              <td>{question.attempts}</td>
              <td>{question.success ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
