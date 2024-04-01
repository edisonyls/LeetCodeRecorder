import React, { createContext, useContext, useReducer } from "react";
import {
  dataStructureReducer,
  initialState,
} from "../reducer/dataStructureReducer";

const DataStructureContext = createContext();

export const useDataStructure = () => useContext(DataStructureContext);

export const DataStructureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataStructureReducer, initialState);

  return (
    <DataStructureContext.Provider value={{ state, dispatch }}>
      {children}
    </DataStructureContext.Provider>
  );
};
