import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import followActions from "../../store/follows"
import { login } from '../../store/session';
import logo from '../../assets/enlogo4.png'
import './LoginForm.css'

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  // const [pastHistory, setPastHistory] = useState(history.location.state.from)
  const dispatch = useDispatch();
  // console.log("HISTORY", history.location.state.from)
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    // await dispatch(followActions.userFollows(data.id))
    if (data) {
      setErrors(data);
    }
    // if (pastHistory === 'project page') {
    //   history.goBack()
    // }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-page">
      <div className='enLogo'>
        <img className='enLogoimg' src={logo} />
        <div className='enLogoText'>
          Enhance
        </div>
      </div>
      <form className="login-form" onSubmit={onLogin}>
        <h2>Sign in</h2>
        <div>
          {errors.map((error, ind) => (
            <div className="form-error" key={ind}>{error}</div>
          ))}
        </div>
        <label htmlFor='email'>Email address</label>
        <input
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <div className="form-submit-container">
          <button type='submit' className="submit-button">Continue</button>
        </div>
        <button
          type="submit"
          className="demo-login-form-button"
          onClick={() => {
            setEmail("demo@aa.io");
            setPassword("password");
          }}
        >
          Demo User
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
