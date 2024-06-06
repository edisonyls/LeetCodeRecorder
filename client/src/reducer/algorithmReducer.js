import { algorithmActionTypes } from "./algoirthmActions";

export const initialState = {
  algorithms: [],
  loading: false,
  error: null,
};

export function algorithmReducer(state, action) {
  switch (action.type) {
    case algorithmActionTypes.PROCESS_START:
      return { ...state, loading: true, error: null };
    case algorithmActionTypes.PROCESS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case algorithmActionTypes.FETCH_ALGORITHMS_SUCCESS:
      return { ...state, algorithms: action.payload, loading: false };
    case algorithmActionTypes.ADD_ALGORITHM:
      return {
        ...state,
        algorithms: [...state.algorithms, action.payload],
        loading: false,
        error: null,
      };
    case algorithmActionTypes.UPDATE_ALGORITHM:
      return {
        ...state,
        algorithms: [...state.algorithms, action.payload],
        loading: false,
        error: null,
      };
    case algorithmActionTypes.DELETE_ALGORITHM:
      return {
        ...state,
        algorithms: state.algorithms.filter((a) => a.id !== action.payload),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
