import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import './Navbar.css';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="top-navbar-right">
        <button id="new-project-button">Share Your Work</button>
        <ProfileButton user={sessionUser}/>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='top-navbar-right'>
        <Link to='/login' exact={true} id="login-button">
          Log In
        </Link>
        <Link to='/sign-up' exact={true} id='signup-button'>
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <nav id="top-navbar">
      <div id="top-navbar-left">
        <div id="enhance-logo-container">
          <Link to='/' exact={true} id="enhance-logo">
            Enhance
          </Link>
        </div>
      </div>
        {sessionLinks}
    </nav>
  );
}

export default NavBar;
