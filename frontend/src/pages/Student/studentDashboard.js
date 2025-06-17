import React, { useEffect, useRef, useState } from 'react';
import Profile from '../../components/Profile/Profile';
import Lesson from '../../components/Lesson/Lesson';
import Homework from '../../components/Homework/Homework';
import './StudentDashboard.css';
import { Hamburger } from '../../utils/Helpers';

const StudentDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  const components = {
    Profile: <Profile />,
    Lesson: <Lesson />,
    Homework: <Homework />,

  };
  const {
    isOpen,
    toggleMenu,
    navRef,
    hamburgerRef,
    setIsOpen,
  } = Hamburger();

  return (
    <div className="container">
      <div className="menu flex">
        <button ref={hamburgerRef} className="hamburger-left" onClick={toggleMenu}>
          ☰
        </button>
        <div ref={navRef} className={`left-menu box-shadow ${isOpen ? 'open' : ''}`}>
          <div className="list-group">
            <button
              onClick={() => {
                setSelectedComponent("Profile");
                setIsOpen(false); // Mobilde seçim yapınca menüyü kapat
              }}
              className={selectedComponent === "Profile" ? "active" : ""}
            >
              PROFILE
            </button>
            <button
              onClick={() => {
                setSelectedComponent("Lesson");
                setIsOpen(false);
              }}
              className={selectedComponent === "Lesson" ? "active" : ""}
            >
              LESSON
            </button>
            <button
              onClick={() => {
                setSelectedComponent("Homework");
                setIsOpen(false);
              }}
              className={selectedComponent === "Homework" ? "active" : ""}
            >
              HOMEWORK
            </button>
            <button
              onClick={() => {
                setSelectedComponent("Grade");
                setIsOpen(false);
              }}
              className={selectedComponent === "Grade" ? "active" : ""}
            >
              GRADE
            </button>
          </div>
        </div>

        <div className="right-menu box-shadow">
          {components[selectedComponent]}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;