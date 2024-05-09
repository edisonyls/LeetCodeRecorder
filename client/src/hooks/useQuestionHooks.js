import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosConfig";
import dayjs from "dayjs";

export const useQuestionHooks = (question, initialQuestion) => {
  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const isValidData = validateData();
    if (!isValidData) {
      return;
    }
    const originalImageIds = initialQuestion.solutions.map(
      (solution) => solution.imageId
    );
    const updatedImageIds = question.solutions.map(
      (solution) => solution.imageId
    );

    const imagesToBeDeleted = originalImageIds.filter(
      (id) => !updatedImageIds.includes(id)
    );

    // delete all the images that have been modified and have been uploaded to S3 before
    const deletePromises = imagesToBeDeleted.map((imageId) => {
      return axiosInstance
        .delete(`question/image/${question.id}/${imageId}`)
        .then((response) => console.log(`Deleted imageId: ${imageId}`))
        .catch((error) =>
          console.error(`Error deleting imageId: ${imageId}`, error)
        );
    });

    if (imagesToBeDeleted.length > 0) {
      await Promise.all(deletePromises);
    }

    const uploadPromises = question.solutions.map(async (solution, index) => {
      // only update to S3 if contains a file in solution
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
      submitRestData(question.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during image uploads", error);
    }
  };

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
    } else if (question.success === "" || question.success === null) {
      alert("Did you solve the question?");
      return false;
    }
    return true;
  };

  const submitRestData = async (id) => {
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
      var response = null;
      if (id) {
        response = await axiosInstance.put(`question/${id}`, formattedData);
      } else {
        response = await axiosInstance.post("question", formattedData);
      }
      if (response && response.data.serverMessage === "SUCCESS") {
        console.log("Form submission successful", response.data.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("An error occurred during form submission", error);
    }
  };

  return { handleSubmit, handleUpdateSubmit };
};
