import { userActionTypes } from "./userActions";

const storedData = JSON.parse(localStorage.getItem("user"));

export const initialState = {
  isAuthenticated: !!storedData,
  token: storedData ? storedData : null,
  user: {},
  error: null,
};

export function userReducer(state, action) {
  switch (action.type) {
    case userActionTypes.PROCESS_START:
      return { ...state, loading: true, error: null };
    case userActionTypes.PROCESS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userActionTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case userActionTypes.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: null,
      };
    case userActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case userActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload.updatedUser,
        loading: false,
      };
    default:
      return state;
  }
}
