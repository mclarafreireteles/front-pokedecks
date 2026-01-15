import './navbar-profile.style.css';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
  FiUser,
  FiSettings,
  FiPackage,
  FiDatabase,
  FiLayers,
  FiLogOut,
  FiBarChart2,
} from 'react-icons/fi';

import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import * as userService from '../../services/userService';

export function NavbarProfileDropdown() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkUserRole() {
      try {
        if (user) {
          const profileData = await userService.getUserProfile();

          if (profileData.role === 'ADMIN') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        // Silently fail - user will just not see admin options
        // This prevents redirect loops when token expires
        console.error('Error checking permissions:', error);
      }
    }

    checkUserRole();
  }, [user]);

  if (!user) {
    return null;
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <IconButton onClick={toggleDropdown} size="small" aria-haspopup="true">
        <Avatar sx={{ width: 40, height: 40, fontSize: '1rem', bgcolor: 'var(--main-500)' }}>
          {user.sub[0].toUpperCase()}
        </Avatar>
      </IconButton>
      {isOpen && (
        <ul className="profile-dropdown-menu">
          {isAdmin && (
            <>
              <li
                className="profile-dropdown-item profile-dropdown-item-admin"
                onClick={() => handleNavigate('/admin/dashboard')}
              >
                <FiBarChart2 className="profile-dropdown-icon" />
                <span>Dashboard</span>
              </li>
              <li
                className="profile-dropdown-item profile-dropdown-item-admin"
                onClick={() => handleNavigate('/admin/cards')}
              >
                <FiDatabase className="profile-dropdown-icon" />
                <span>Cards Panel</span>
              </li>
              <li
                className="profile-dropdown-item profile-dropdown-item-admin"
                onClick={() => handleNavigate('/admin/sets')}
              >
                <FiLayers className="profile-dropdown-icon" />
                <span>Sets Panel</span>
              </li>
              <li
                className="profile-dropdown-item profile-dropdown-item-admin profile-dropdown-item-divider"
                onClick={() => handleNavigate('/admin/series')}
              >
                <FiSettings className="profile-dropdown-icon" />
                <span>Series Panel</span>
              </li>
            </>
          )}
          <li className="profile-dropdown-item" onClick={() => handleNavigate('/my-orders')}>
            <FiPackage className="profile-dropdown-icon" />
            <span>My orders</span>
          </li>
          <li className="profile-dropdown-item" onClick={() => handleNavigate('/profile')}>
            <FiUser className="profile-dropdown-icon" />
            <span>My profile</span>
          </li>
          <li className="profile-dropdown-item profile-dropdown-item-logout" onClick={handleLogoutClick}>
            <FiLogOut className="profile-dropdown-icon" />
            <span>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
}
