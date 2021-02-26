import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  let login = (e) => {
    e.preventDefault();
    auth.signin(userName, () => {
      history.replace(from);
    });
  };

  const onTextChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div>
      SignIn
      <form onSubmit={login}>
        <input onChange={onTextChange} />
        <input type="submit" value="SignIn" />
      </form>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}
