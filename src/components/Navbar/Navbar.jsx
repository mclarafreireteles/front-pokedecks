import './navbar.style.css'

import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';

import { DropdownList } from '../DropdownList/DropdownList'
import { SearchInput } from '../SearchInput/SearchInput';
import { NavbarProfile } from '../NavbarProfile/NavbarProfile'

import { FiHeart, FiShoppingCart } from "react-icons/fi";


export function Navbar() {

    const { isAuthenticated } = useAuth();

    const setsList = [
        { id: 0, value: 'volvo', label: 'Volvo' },
        { id: 1, value: 'saab', label: 'Saab' },
        { id: 2, value: 'mercedes', label: 'Mercedes' },
        { id: 3, value: 'audi', label: 'Audi' }
    ];

    return (
        <nav className='navbar'>
            <div className="left-container">
                <h1>poke<span>decks</span></h1>
                <div className="navigation">
                    <h3>Marketplace</h3>
                    <DropdownList list={setsList} title="Sets"/>
                </div>
            </div>
            <div className="right-container">
                <SearchInput placeholder="Venusar" />
                <div className="usertab">
                    <FiHeart size={24} />
                    <FiShoppingCart size={24}/>
                    {isAuthenticated ? (
                        <NavbarProfile/>
                ) : (
                    <Link to="/home" className="join-us-link">
                        <h3>Join us!</h3>
                    </Link>
                )}
                </div>
            </div>
        </nav>
    )
}