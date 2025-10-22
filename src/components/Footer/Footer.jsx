import './footer.style.css'

import { RiInstagramFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";


export function Footer(){
    return (
        <div className="footer-container">
            <div className="content-footer">
                <h1>poke<span>decks</span></h1>
                <div className="footer-navbar">
                    <h3 className='footer-navbar-link'>Home</h3>
                    <h3 className='footer-navbar-link'>Marketplace</h3>
                </div>
                <div className="footer-social">
                    <BsFacebook size={28} className='social-icon' />
                    <RiInstagramFill size={32} className='social-icon'/>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="copyright">
                <h3>© Copyright 2025, All Rights Reserved by ClarityUI</h3>
            </div>
        </div>
    )
}