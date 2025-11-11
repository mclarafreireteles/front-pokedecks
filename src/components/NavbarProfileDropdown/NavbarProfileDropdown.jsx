import './navbar-profile.style.css'

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';

export function NavbarProfileDropdown() {
    const { logout, user } = useAuth();
    // const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    console.log("Dados do usuário no token:", user);

    if (!user) {
        return null;
    }

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleLogoutClick = () => {
        logout();
        setIsOpen(false); 
    }


    return (
        <div className='dropdown-container'>
            <IconButton
                onClick={toggleDropdown}
                size="small"
                aria-haspopup="true"
            >
                <Avatar sx={{ width: 40, height: 40, fontSize: '1rem', bgcolor: 'var(--main-500)' }}>
                    {user.sub[0].toUpperCase()}
                </Avatar>
            </IconButton>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li
                        className="dropdown-item"
                        onClick={handleLogoutClick}
                    >
                        <Logout fontSize="small" style={{ marginRight: '8px' }} />
                        <span>Logout</span>
                    </li>
                </ul>
            )}
        </div>
    )
}