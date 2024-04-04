import { actionTypes } from "./dataStructureActions";

export const initialState = {
  dataStructures: [],
  loading: false,
  error: null,
};

export function dataStructureReducer(state, action) {
  switch (action.type) {
    case actionTypes.PROCESS_START:
      return { ...state, loading: true, error: null };
    case actionTypes.PROCESS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case actionTypes.FETCH_DATA_STRUCTURES_SUCCESS:
      return { ...state, dataStructures: action.payload, loading: false };
    case actionTypes.ADD_DATA_STRUCTURE_SUCCESS:
      return {
        ...state,
        dataStructures: [...state.dataStructures, action.payload],
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_DATA_STRUCTURE_NAME_SUCCESS:
      const updatedDataStructures = state.dataStructures.map((ds) => {
        if (ds.id === action.payload.id) {
          return { ...ds, name: action.payload.name };
        }
        return ds;
      });
      return {
        ...state,
        dataStructures: updatedDataStructures,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_DATA_STRUCTURE:
      return {
        ...state,
        dataStructures: state.dataStructures.filter(
          (ds) => ds.id !== action.payload.id
        ),
        loading: false,
        error: null,
      };
    case actionTypes.ADD_SUB_STRUCTURE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            return {
              ...dataStructure,
              subStructures: [
                ...dataStructure.subStructures,
                action.payload.subStructure,
              ],
            };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    case actionTypes.RENAME_SUB_STRUCTURE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            // Found the parent dataStructure, now find and update the subStructure
            const updatedSubStructures = dataStructure.subStructures.map(
              (subStructure) => {
                if (subStructure.id === action.payload.subStructure.id) {
                  return {
                    ...subStructure,
                    name: action.payload.subStructure.name,
                  };
                }
                return subStructure;
              }
            );
            return { ...dataStructure, subStructures: updatedSubStructures };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_SUB_STRUCTURE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            const updatedSubStructures = dataStructure.subStructures.filter(
              (subStructure) =>
                subStructure.id !== action.payload.subStructure.id
            );
            return {
              ...dataStructure,
              subStructures: updatedSubStructures,
            };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_CONTENT:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            // Found the parent dataStructure, now find and update the subStructure
            const updatedSubStructures = dataStructure.subStructures.map(
              (subStructure) => {
                if (subStructure.id === action.payload.subStructure.id) {
                  return {
                    ...subStructure,
                    content: action.payload.subStructure.content,
                  };
                }
                return subStructure;
              }
            );
            return { ...dataStructure, subStructures: updatedSubStructures };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
