import React, { useEffect, useRef, useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import account from '../../assets/account.png';
import {UserProfil, HandleUser} from '../../utils/UserData';
import { Hamburger } from '../../utils/Helpers';

function Header( setSelectedComponent) {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const { userData } = UserProfil();
 
  useEffect(() => {
    const checkEmail = () => {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    };

    checkEmail();
    window.addEventListener('storage', checkEmail);
    return () => window.removeEventListener('storage', checkEmail);
  }, []);

     const {
          isOpen,
          toggleMenu,
          navRef,
          hamburgerRef,
          setIsOpen,
      } = Hamburger();


//Logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/');
  };
const handleClick =() =>{
  HandleUser(userData, navigate);
};


  

  return (
    <header className="header flex">
      <div className="logo flex">
        <Link to="/">
          <img className="logo-img" src={logo} alt="Logo" />
          <h1>EDULIEN</h1>
        </Link>
      </div>

      <nav ref={navRef} className={`main-nav ${isOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="right flex">
          {userEmail ? (
            <div className="account-info flex">
              <img className="account-img" src={account} alt="Account" />
              <a onClick={handleClick} className="user" >{userData?.firstName}</a>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          ) : (
            <Link to="/">
              <img className="account-img" src={account} alt="Account" />
              <p>Se connect</p>
            </Link>
          )}
        </div>
      </nav>

      <button ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
        <img className="account-img" src={account} alt="Account" />
      </button>
    </header>
  );
}

export default Header;
