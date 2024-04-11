import React, { createContext, useContext, useReducer, useEffect } from "react";
import { userReducer, initialState } from "../reducer/userReducer";
import { UserHooks } from "../hooks/userHooks/UserHooks";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
