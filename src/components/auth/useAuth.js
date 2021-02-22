import React, { useState, useEffect, useContext, createContext } from "react";

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

  const signin = (callback) => {
      setUser("Maayami");
      callback();
  };

  const signup = (email, password) => {};

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
