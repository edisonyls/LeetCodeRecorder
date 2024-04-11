import { axiosInstance, axiosInstanceNoAuth } from "../../config/axiosConfig";
import { useUser } from "../../context/userContext";
import { userActionTypes } from "../../reducer/userActions";

export const UserHooks = () => {
  const { dispatch } = useUser();

  const getCurrentUser = async (token) => {
    dispatch({ type: userActionTypes.PROCESS_START });
    try {
      const res = await axiosInstance.get("user");
      const user = res.data.data;
      dispatch({
        type: userActionTypes.GET_CURRENT_USER,
        payload: { user },
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.log("Failed fetch current user details: " + error);
    }
  };

  const login = async (userData) => {
    dispatch({ type: userActionTypes.PROCESS_START });
    try {
      const response = await axiosInstanceNoAuth.post(
        "auth/authenticate",
        userData
      );
      const token = response.data.data;
      localStorage.setItem("user", JSON.stringify(token));
      const userDetailsResponse = await axiosInstanceNoAuth.get("user", {
        headers: {
          Authorization: `Bearer ${token}`, // Manually set the Authorization header for this request
        },
      });
      const user = userDetailsResponse.data.data;
      dispatch({
        type: userActionTypes.SIGN_IN,
        payload: { token, user },
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.log("Failed to login: " + error);
    }
  };

  const register = async (userData) => {
    dispatch({ type: userActionTypes.PROCESS_START });
    try {
      localStorage.removeItem("user");
      const response = await axiosInstanceNoAuth.post(
        "auth/register",
        userData
      );
      const token = response.data.data;
      localStorage.setItem("user", JSON.stringify(token));
      const userDetailsResponse = await axiosInstanceNoAuth.get("user", {
        headers: {
          Authorization: `Bearer ${token}`, // Manually set the Authorization header for this request
        },
      });
      const user = userDetailsResponse.data.data;
      dispatch({
        type: userActionTypes.REGISTER,
        payload: { token, user },
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.log("Failed to register: " + error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: userActionTypes.LOGOUT });
  };

  const updateUser = async (id, user) => {
    dispatch({ type: userActionTypes.PROCESS_START });
    try {
      const res = await axiosInstance.put(`user/${id}`, user);
      const updatedUser = res.data.data;
      dispatch({
        type: userActionTypes.UPDATE_USER,
        payload: { updatedUser },
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.PROCESS_FAILURE,
        error: error,
      });
      console.log("Failed to update user detail: " + error);
    }
  };

  return {
    login,
    register,
    logout,
    getCurrentUser,
    updateUser,
  };
};
