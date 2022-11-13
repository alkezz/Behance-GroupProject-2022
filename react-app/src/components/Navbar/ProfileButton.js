import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'

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
    <>
      <img src='../../assets/behance-profile-image.png' id="profile-button" onClick={openMenu} />
      {showMenu && (
        <div className="profile-dropdown">
          <Link to='/user/profile' className="manage-account-link">Enhance Profile</Link>
          <LogoutButton />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
