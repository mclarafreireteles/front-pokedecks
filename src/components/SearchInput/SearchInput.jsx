import './searchinput.style.css'
import { useState } from 'react';
import { FiSearch } from "react-icons/fi";

export function SearchInput({ placeholder, onSearch }){
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); 
        onSearch(searchTerm);
    };

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input 
                type="text" 
                className="search-input"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit' className="search-button">
                <FiSearch size={15} />
            </button>
        </form>
    )
}