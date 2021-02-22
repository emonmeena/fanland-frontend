import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Auth() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };
  return (
    <div>
      <p>You must login to view the page at {from.pathname} </p>
      <button onClick={login}>Login</button>
    </div>
  );
}
