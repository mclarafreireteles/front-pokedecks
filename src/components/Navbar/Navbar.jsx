import './navbar.style.css'
import { Link, useNavigate } from 'react-router-dom' 
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DropdownList } from '../DropdownList/DropdownList'
import { SearchInput } from '../SearchInput/SearchInput';
import { NavbarProfileDropdown } from '../NavbarProfileDropdown/NavbarProfileDropdown'
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import * as setService from '../../services/setService';

export function Navbar() {
    const [setsList, setSetsList] = useState([]);
    const { isAuthenticated } = useAuth();
    
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSets() {
            try {
                const data = await setService.getAllSets();
                const formattedSets = data.map(set => ({
                    id: set.id,
                    label: set.name,
                    value: set.id,
                    logoUrl: set.logoUrl
                }));
                setSetsList(formattedSets);
            } catch (error) {
                console.error("Erro ao carregar sets:", error);
                setSetsList([]); 
            }
        }
        fetchSets();
    }, []);

    const handleSetClick = (item) => {
        console.log("Set selecionado:", item);
    };

    const handleNavbarSearch = (term) => {
        if (!term || term.trim() === "") {
            navigate('/marketplace');
        } else {
            navigate(`/marketplace?name=${term}`);
        }
    };

    return (
        <nav className='navbar'>
            <div className="left-container">
                <h1>poke<span>decks</span></h1>
                <div className="navigation">
                    <Link to="/marketplace" className="join-us-link">
                        <h3>Marketplace</h3>
                    </Link>
                    <DropdownList list={setsList} title="Sets" onItemClick={handleSetClick} />
                </div>
            </div>
            <div className="right-container">
                <SearchInput 
                    placeholder="Search card..." 
                    onSearch={handleNavbarSearch} 
                />
                
                <div className="usertab">
                    <Link to="/cart" className="icons-link" style={{ color: 'var(--text-black)', textDecoration: 'none' }}>
                        <FiShoppingCart size={24} />
                    </Link>
                    {isAuthenticated ? (
                        <NavbarProfileDropdown />
                    ) : (
                        <Link to="/login" className="join-us-link">
                            <h3>Join us!</h3>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}