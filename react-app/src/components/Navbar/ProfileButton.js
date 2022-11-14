import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './ProfileButton.css'

function ProfileButton({ user }) {

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div>
      <img id="profile-button" onClick={openMenu} />
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-user-info">
          <img src="./behance-profile-image.png"></img>
          <div>{user.first_name} {user.last_name}</div>
          <div>{user.email}</div>
          </div>
          <div className='dropdown-profile-link'>
          <Link to='/user/profile' className="manage-account-link">Enhance Profile</Link>
          </div>
          <div className='dropdown-logout'>
          <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
