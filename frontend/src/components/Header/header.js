import React, { useEffect, useRef, useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import account from '../../assets/account.png';

function Header( setSelectedComponent) {
  const [userEmail, setUserEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmail = () => {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    };

    checkEmail();
    window.addEventListener('storage', checkEmail);
    return () => window.removeEventListener('storage', checkEmail);
  }, []);

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleProfile = () => {
   
       
    setSelectedComponent('Profile');
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
              <p className="user" >{userEmail}</p>
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
        ☰
      </button>
    </header>
  );
}

export default Header;
