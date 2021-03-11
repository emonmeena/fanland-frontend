import React, { useState, useContext, createContext } from "react";
import djangoRESTAPI from "../api/djangoRESTAPI";

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

  const signin = async (userName, userPassword, callback, showError) => {
    let response = null;
    await djangoRESTAPI
      .get(`/users/${userName}/${userPassword}`)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => console.log(err));
    if (response) {
      setUser(response);
      callback();
    } else showError();
  };

  const signup = async (user, userdetail, callback, showError) => {
    await djangoRESTAPI
      .post("/users/", user)
      .then((res) => {
        djangoRESTAPI
          .post("/userdetails/", { ...userdetail, user_id: res.data })
          .then(() => {
            callback();
          })
          .catch((err) => console.log(err));
      })
      .catch(() => {
        showError();
      });
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
