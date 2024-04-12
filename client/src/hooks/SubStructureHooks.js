import { axiosInstance } from "../config/axiosConfig";
import { useDataStructure } from "../context/dataStructureContext";
import { actionTypes } from "../reducer/dataStructureActions";

export const SubStructureHooks = () => {
  const { dispatch } = useDataStructure();

  const addSubStructure = async (selectedStructureId, name) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.post(
        `sub-structure/${selectedStructureId}`,
        { name, contents: [] }
      );
      dispatch({
        type: actionTypes.ADD_SUB_STRUCTURE,
        payload: {
          dataStructureId: selectedStructureId,
          subStructure: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to add a new sub structure: ", error);
    }
  };

  const renameSubStructure = async (
    dataStructureId,
    subStructureId,
    newName
  ) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.patch(
        `sub-structure/${subStructureId}`,
        { name: newName }
      );
      dispatch({
        type: actionTypes.RENAME_SUB_STRUCTURE,
        payload: {
          dataStructureId,
          subStructure: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to rename the sub structure: ", error);
    }
  };

  const deleteSubStructure = async (dataStructureId, subStructureId) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.delete(
        `sub-structure/${subStructureId}`
      );
      dispatch({
        type: actionTypes.DELETE_SUB_STRUCTURE,
        payload: {
          dataStructureId,
          subStructure: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to delete the sub structure: ", error);
    }
  };

  return { addSubStructure, renameSubStructure, deleteSubStructure };
};
