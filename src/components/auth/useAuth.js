import React, { useState, useContext, createContext } from "react";
import { fetchUser } from "../api/fakeUserAPI";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (userName, userPassword, callback) => {
    let userData = fetchUser(userName);
    if (userData) {
      setUser(userData);
      callback();
    } else console.log("User not found.");
  };

  const signup = (userName, callback) => {
    callback();
  };

  const signout = () => {
    setUser(false);
  };

  return {
    user,

    signin,

    signup,

    signout,
  };
}
