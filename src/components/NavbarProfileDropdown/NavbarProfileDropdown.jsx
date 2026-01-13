import './navbar-profile.style.css'

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { FiUser, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';

import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout'; //TODO: trocar esse icone de logout

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
                console.error("Erro ao verificar permissões:", error);
            }
        }

        checkUserRole();
    }, [user]);

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
                    {isAdmin && (
                        <>
                            <li
                                className="dropdown-item"
                                onClick={() => {
                                    navigate('/admin/cards');
                                    setIsOpen(false);
                                }}
                                style={{ borderBottom: '1px solid #eee' }}
                            >
                                <FiSettings fontSize="small" style={{ marginRight: '8px', color: '#d32f2f' }} />
                                <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Cards Panel</span>
                            </li>
                            <li
                                className="dropdown-item"
                                onClick={() => {
                                    navigate('/admin/sets');
                                    setIsOpen(false);
                                }}
                                style={{ borderBottom: '1px solid #eee' }} 
                            >
                                <FiSettings fontSize="small" style={{ marginRight: '8px', color: '#d32f2f' }} />
                                <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Sets Panel</span>
                            </li>
                        </>
                    )}
                    <li
                        className="dropdown-item"
                        onClick={() => navigate('/my-orders')}
                    >
                        <FiPackage fontSize="small" style={{ marginRight: '8px' }} />
                        <span>My orders</span>
                    </li>
                    <li
                        className="dropdown-item"
                        onClick={() => navigate('/profile')}
                    >
                        <FiUser fontSize="small" style={{ marginRight: '8px' }} />
                        <span>My profile</span>
                    </li>
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