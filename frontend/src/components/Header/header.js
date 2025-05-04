import React from "react";
import './Header.css';
import {Link} from "react-router-dom";
import endpoints from "../../config/Endpoints";

function Header(){
    return(
<header>
        <div className="logo">
            <a href="/">
            <img src="/assets/logo.jpg" alt="Logo"></img>

            <h1>EDULIEN</h1>
            </a>
        
        </div>
        <nav>
            <a href="/">Home</a>
            <a href={`${endpoints.ABOUT}`}>About</a>
            <a href={`${endpoints.CONTACT}`}>Contact</a>
        </nav>
    </header>
    );
}
export default Header;