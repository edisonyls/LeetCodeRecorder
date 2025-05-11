import { axiosInstance } from "../config/axiosConfig";
import { useDataStructure } from "../context/dataStructureContext";
import { actionTypes } from "../reducer/dataStructureActions";

export const NodeHooks = () => {
  const { dispatch } = useDataStructure();

  const addNode = async (selectedStructureId, name) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.post(`node/${selectedStructureId}`, {
        name,
        contents: [],
      });
      dispatch({
        type: actionTypes.ADD_NODE,
        payload: {
          dataStructureId: selectedStructureId,
          node: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to add a new node: ", error);
    }
  };

  const renameNode = async (dataStructureId, nodeId, newName) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.patch(`node/${nodeId}`, {
        name: newName,
      });
      dispatch({
        type: actionTypes.RENAME_NODE,
        payload: {
          dataStructureId,
          node: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to rename the node: ", error);
    }
  };

  const deleteNode = async (dataStructureId, nodeId) => {
    dispatch({ type: actionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.delete(`node/${nodeId}`);
      dispatch({
        type: actionTypes.DELETE_NODE,
        payload: {
          dataStructureId,
          node: response.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.error("Failed to delete the node: ", error);
    }
  };

  return { addNode, renameNode, deleteNode };
};
