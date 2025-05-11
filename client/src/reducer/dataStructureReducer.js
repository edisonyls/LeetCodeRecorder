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
    case actionTypes.ADD_NODE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            return {
              ...dataStructure,
              nodes: [...dataStructure.nodes, action.payload.node],
            };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    case actionTypes.RENAME_NODE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            // Found the parent dataStructure, now find and update the node
            const updatedNodes = dataStructure.nodes.map((node) => {
              if (node.id === action.payload.node.id) {
                return {
                  ...node,
                  name: action.payload.node.name,
                };
              }
              return node;
            });
            return { ...dataStructure, nodes: updatedNodes };
          }
          return dataStructure;
        }),
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_NODE:
      return {
        ...state,
        dataStructures: state.dataStructures.map((dataStructure) => {
          if (dataStructure.id === action.payload.dataStructureId) {
            const updatedNodes = dataStructure.nodes.filter(
              (node) => node.id !== action.payload.node.id
            );
            return {
              ...dataStructure,
              nodes: updatedNodes,
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
            // Found the parent dataStructure, now find and update the node
            const updatedNodes = dataStructure.nodes.map((node) => {
              if (node.id === action.payload.node.id) {
                return {
                  ...node,
                  content: action.payload.node.content,
                };
              }
              return node;
            });
            return { ...dataStructure, nodes: updatedNodes };
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
