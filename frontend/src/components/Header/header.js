import React from "react";
import './Header.css';

function Header(){
    return(
<header className="header flex ">
    <nav>
    <a href="/">Home</a>
    </nav>
    
    <h1>EDULIEN</h1>
    <img src="/assets/logo.jpg" alt="Logo"></img>


</header>
    );
}
export default Header;