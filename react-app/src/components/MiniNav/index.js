import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './MiniNav.css'

function MiniNav({ data }) {
  const location = useLocation()

  return (
    <div className='miniNavBar'>
        <div className='miniNavLinks'>
        <Link exact to={`/${data.username}` || `/${data.username}/work`} className={(`/${data.username.toLowerCase()}` || `/${data.username.toLowerCase()}/work`) == location.pathname.toLowerCase() ? 'miniNavButton selected' : 'miniNavButton unselected'}>Work</Link>
        <Link exact to={`/${data.username}/appreciations`} className={`/${data.username.toLowerCase()}/appreciations` == location.pathname.toLowerCase() ? 'miniNavButton selected' : 'miniNavButton unselected'}>Appreciations</Link>
        </div>
    </div>
  )
}

export default MiniNav;