import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./LoginForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    console.log("This ran")

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    } else {
      return setErrors(["Password fields must match"])
    }

  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />
  }

  return (
    <div className="login-page">
    <form className="login-form" onSubmit={onSignUp}>
      <h2>Sign up</h2>
      <div>
        {errors.map((error, ind) => (
          <div className="form-error" key={ind}>{error}</div>
        ))}
      </div>
        <label>First Name</label>
        <input
          type='text'
          name='firstname'
          onChange={updateFirstName}
          value={firstName}
        />
        <label>Last Name</label>
        <input
          type='text'
          name='lastname'
          onChange={updateLastName}
          value={lastName}
        />
        <label htmlFor="username">Username</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        />
        <label htmlFor="email">Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      <div className="form-submit-container">
      <button className="submit-button" type='submit'>Sign Up</button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
