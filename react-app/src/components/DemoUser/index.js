import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "../auth/LoginForm.css"

export default function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credential = "demo@aa.io";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button id="demoUser" type="submit">Demo Login</button>
    </form>
  );
}
