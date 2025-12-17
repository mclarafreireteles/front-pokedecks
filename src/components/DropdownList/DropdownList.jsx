import { useState } from 'react';

import './dropdownlist.style.css';


import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";


export function DropdownList({ list = [], title = "Opções", onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {

    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false);

  };

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >

        <span>{title}</span>

        {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}

      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {list.map((item) => (
            <li
              key={item.id}
              className="dropdown-item"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

