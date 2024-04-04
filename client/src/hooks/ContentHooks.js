import axiosInstance from "../config/axiosConfig";
import { useDataStructure } from "../context/dataStructureContext";
import { actionTypes } from "../reducer/dataStructureActions";

export const ContentHooks = () => {
  const { dispatch } = useDataStructure();

  async function convertBlobUrlToFile(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: "image/jpeg" }); // Customize filename and mimetype as needed
  }

  const uploadImageToBackend = async (imageFile, subStructureName) => {
    const fileData = new FormData();
    fileData.append("image", imageFile);
    fileData.append("subStructureName", subStructureName);
    try {
      const response = await axiosInstance.post(
        "sub-structure/upload-image",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.serverMessage === "SUCCESS") {
        return response.data.data;
      } else {
        console.log("Image upload failed for content");
      }
    } catch (error) {
      console.log("Error while uploading content image: " + error);
    }
  };

  const handleSave = async (subStructureId, stringContent, dataStructureId) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.patch(
        `sub-structure/content/${subStructureId}`,
        {
          content: stringContent,
        }
      );
      dispatch({
        type: actionTypes.UPDATE_CONTENT,
        payload: {
          dataStructureId,
          subStructure: response.data.data,
        },
      });
    } catch (error) {
      dispatch({ type: actionTypes.PROCESS_FAILURE, error: error });
      console.log("Failed to save content: ", error);
    }
  };

  return {
    handleSave,
    convertBlobUrlToFile,
    uploadImageToBackend,
  };
};
