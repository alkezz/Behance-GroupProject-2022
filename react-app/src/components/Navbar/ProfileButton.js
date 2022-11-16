import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './ProfileButton.css'
import avatar from '../../assets/behance-profile-image.png'

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
    <div className="profile-button-container">
      <img id="profile-button" src={avatar} onClick={openMenu} />
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-user-info">
          <img src={avatar} alt="profile-avatar" height="70" width="70"></img>
          <div className="dropdown-profile-name">{user.first_name} {user.last_name}</div>
          <div className='dropdown-profile-email'>{user.email}</div>
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
