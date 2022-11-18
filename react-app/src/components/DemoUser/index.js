import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "../auth/LoginForm.css"
import { useHistory } from "react-router-dom";

export default function DemoUser() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [pastHistory, setPastHistory] = useState(history.location.state.from)
  console.log("DEMO", history.location.state.from)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = "demo@aa.io";
    const password = "password";
    dispatch(sessionActions.login({ credential, password }));
    if (pastHistory === 'project page') {
      history.goBack()
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button id="demoUser" type="submit">Demo Login</button>
    </form>
  );
}
