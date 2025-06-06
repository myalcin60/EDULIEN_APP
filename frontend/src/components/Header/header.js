import React, { useEffect, useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../../config/Endpoints";
import logo from '../../assets/logo.jpg';
import account from '../../assets/account.png';
import Profile from "../Profile/Profile";

function Header( setSelectedComponent) {
  const [userEmail, setUserEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  // Dinamik olarak localStorage değişimini dinle
  useEffect(() => {
    const checkEmail = () => {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    };

    checkEmail(); // İlk yüklemede kontrol et
    window.addEventListener('storage', checkEmail); // Tetikleyici

    return () => {
      window.removeEventListener('storage', checkEmail);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/'); // anasayfaya yönlendir
  };


  const handleProfile = () =>{
    setSelectedComponent('Profile');
  };
  const toggleMenu = () => {
     setIsOpen(!isOpen);
  };

  return (
    <header className="flex ">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
          <h1>EDULIEN</h1>
        </Link>
      </div>

      <nav className={`main-nav ${isOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <div className="right">
        {userEmail ? (
          <div className="account-info">
            <img className="account-img" src={account} alt="Account" />
            <button onClick={handleProfile} >{userEmail}</button>
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
           <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

      
    </header>
  );
}

export default Header;
