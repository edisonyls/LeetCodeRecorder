import React, { createContext, useContext, useReducer } from "react";
import { algorithmReducer, initialState } from "../reducer/algorithmReducer";

const AlgorithmContext = createContext();

export const useAlgorithm = () => useContext(AlgorithmContext);

export const AlgorithmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(algorithmReducer, initialState);

  return (
    <AlgorithmContext.Provider value={{ state, dispatch }}>
      {children}
    </AlgorithmContext.Provider>
  );
};
