import React from "react";
import './Header.css';

function Header(){
    return(
<header>
        <div className="logo">
        <img src="/assets/logo.jpg" alt="Logo"></img>
            <h1>EDULIEN</h1>
        </div>
        <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    );
}
export default Header;