import React, { createContext, useContext, useState } from "react";

const DataStructureContext = createContext();

export const useDataStructure = () => useContext(DataStructureContext);

export const DataStructureProvider = ({ children }) => {
  const [dataStructrue, setDataStructure] = useState(null);

  return (
    <DataStructureContext.Provider value={{ dataStructrue, setDataStructure }}>
      {children}
    </DataStructureContext.Provider>
  );
};
