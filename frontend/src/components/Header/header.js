import React from "react";
import './Header.css';
import {Link} from "react-router-dom";

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
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
    );
}
export default Header;