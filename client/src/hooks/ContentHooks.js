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

  const uploadImageToBackend = async (imageFile, subStructureId) => {
    const fileData = new FormData();
    fileData.append("image", imageFile);
    fileData.append("subStructureId", subStructureId);
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

  const deleteImage = async (subStructureId, imageId) => {
    await axiosInstance.delete(
      `sub-structure/image/${subStructureId}/${imageId}`
    );
  };

  const handleSave = async (
    subStructureId,
    stringContent,
    dataStructureId,
    imageSrcs
  ) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.patch(
        `sub-structure/content/${subStructureId}`,
        {
          content: stringContent,
        }
      );

      // Efficiently delete images and handle potential errors
      await Promise.all(
        imageSrcs.map((imageId) =>
          deleteImage(subStructureId, imageId).catch((error) => {
            console.error(`Failed to delete image ${imageId}:`, error);
            // Optionally handle this error in a more user-friendly way
          })
        )
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
      console.error("Failed to save content: ", error);
      // Optionally, update the UI to inform the user of the failure
    }
  };

  return {
    handleSave,
    convertBlobUrlToFile,
    uploadImageToBackend,
  };
};
