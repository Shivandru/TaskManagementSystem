import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [taskData, settaskData] = useState([]);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, taskData, settaskData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
