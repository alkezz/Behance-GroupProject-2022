import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import './Navbar.css';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="navbar-right">
        <button>Share Your Work</button>
        <LogoutButton />
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    )
  }

  return (
    <nav id="top-navbar">
      <div id="top-navbar-left">
        <div id="enhance-logo-container">
          <Link to='/' exact={true} activeClassName='active' id="enhance-logo">
            Enhance
          </Link>
        </div>
      </div>
      <div id="top-navbar-right">
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
