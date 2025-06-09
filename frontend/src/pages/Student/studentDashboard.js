import React, { useState } from 'react';
import Profile from '../../components/Profile/Profile';
import './StudentDashboard.css';
import Lesson from '../../components/Lesson/Lesson';
import Homework from '../../components/Homework/Homework';

const StudentDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
 
 
  return (
    <div className="container"> 
            <h2 onClick={() => setSelectedComponent("Profile")}>
              DASHBORD
            </h2>
      <div className="flex">
        <div className="left-menu ">
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action"
              onClick={() => setSelectedComponent("Profile")}
            >
              PROFILE
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => setSelectedComponent("Lesson")}
            >
              LESSON
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => setSelectedComponent("Homework")}
            >
              HOMEWORK
            </li>
          </ul>
        </div>
        <div className="right-menu">
          {selectedComponent === "Profile" && <Profile />}
          {selectedComponent === "Lesson" && <Lesson />}
          {selectedComponent === "Homework" && <Homework />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
