import React, { useEffect, useRef, useState } from 'react';
import Profile from "../../components/Profile/Profile";
import CreateClass from "../../components/Classes/CreateClass";
import Homework from '../../components/Homework/Homework';
import "./TeacherDashboard.css";
import { Hamburger } from '../../utils/Helpers';


const TeacherDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("Profile");
    const components = {
        Profile: <Profile />,
        CreateClass: <CreateClass />,
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
            <div className=" menu flex">
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
                                setSelectedComponent("CreateClass")
                                setIsOpen(false);
                            }}
                            className={selectedComponent === "CreateClass" ? "active" : ""}

                        >
                            CLASSES
                        </button>
                        <button
                            onClick={() => {
                                setSelectedComponent("Homework")
                                setIsOpen(false);
                            }}
                            className={selectedComponent === "Homework" ? "active" : ""}

                        >
                            HOMEWORK
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
export default TeacherDashboard;