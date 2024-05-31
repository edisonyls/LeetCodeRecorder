import { axiosInstance } from "../config/axiosConfig";
import { useAlgorithm } from "../context/AlgorithmContext";
import { algorithmActionTypes } from "../reducer/algoirthmActions";

export const AlgorithmHooks = () => {
  const { dispatch } = useAlgorithm();

  const fetchAlgorithms = async () => {
    dispatch({ type: algorithmActionTypes.PROCESS_START });
    try {
      const response = await axiosInstance.get("algorithm");
      dispatch({
        type: algorithmActionTypes.FETCH_ALGORITHMS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: algorithmActionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.log("Failed to fetch algorithm: ", error);
    }
  };

  return {
    fetchAlgorithms,
  };
};
