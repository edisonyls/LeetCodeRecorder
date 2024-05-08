import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosConfig";
import dayjs from "dayjs";

export const useQuestionHooks = (question, setQuestion) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidData = validateData();
    if (!isValidData) {
      return;
    }
    const uploadPromises = question.solutions.map(async (solution, index) => {
      if (solution.file) {
        const fileData = new FormData();
        fileData.append("image", solution.file);
        fileData.append("questionNumber", question.number);
        try {
          const response = await axiosInstance.post(
            "question/upload-image",
            fileData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.serverMessage === "SUCCESS") {
            return { ...solution, imageId: response.data.data };
          } else {
            console.log("Image upload failed for solution", index);
            return solution;
          }
        } catch (error) {
          console.error(
            "An error occurred during submission for solution",
            index,
            error
          );
          return solution;
        }
      } else {
        return solution; // Return the original solution if there's no file to upload
      }
    });
    try {
      // Wait for all the image upload promises to complete
      const updatedSolutions = await Promise.all(uploadPromises);
      question.solutions = updatedSolutions;
      submitRestData();
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during image uploads", error);
    }
  };

  const validateData = () => {
    if (question.dateOfCompletion === null) {
      alert("Date of Completion is required.");
      return false;
    } else if (dayjs(question.dateOfCompletion).isAfter(dayjs())) {
      alert("Date of Completion cannot be in the future.");
      return false;
    } else if (question.timeOfCompletion === null) {
      alert("Time of Completion is required.");
      return false;
    }
    return true;
  };

  const submitRestData = async () => {
    const formattedData = {
      ...question,
      dateOfCompletion: question.dateOfCompletion
        ? question.dateOfCompletion.format("YYYY-MM-DD")
        : "",
      solutions: question.solutions.map((solution) => ({
        thinkingProcess: solution.thinkingProcess,
        codeSnippet: solution.codeSnippet,
        imageId: solution.imageId,
      })),
    };
    if (formattedData.success === true) {
      formattedData.reasonOfFail = "";
    }
    try {
      const response = await axiosInstance.post("question", formattedData);
      if (response.data.serverMessage === "SUCCESS") {
        console.log("Form submission successful", response.data.data);
      }
    } catch (error) {
      console.error("An error occurred during form submission", error);
    }
  };

  return { handleSubmit };
};
