import { createContext, useState } from "react";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  // States
  const [token, setToken] = useState(true);

  const globalStates = {
    token,
    setToken,
  };
  return (
    <AuthContext.Provider value={globalStates}>{children}</AuthContext.Provider>
  );
};
