import React, { createContext, useContext, useState } from "react";

const DataStructureContext = createContext();

export const useDataStructure = () => useContext(DataStructureContext);

export const DataStructureProvider = ({ children }) => {
  const [dataStructure, setDataStructure] = useState({});

  return (
    <DataStructureContext.Provider value={{ dataStructure, setDataStructure }}>
      {children}
    </DataStructureContext.Provider>
  );
};
