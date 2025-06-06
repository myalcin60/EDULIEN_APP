import React, { useState } from 'react';
import Profile from '../../components/Profile/Profile';
import './studentDashboard.css';
import Lesson from '../../components/Lesson/Lesson';
import Homework from '../../components/Homework/Homework';



const StudentDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    <div className="container-fluid">
      <div className="row g-1">
      <h2>Student Dashbord</h2>
        {/* left-menu */}
        <div className="col-2 left-menu " style={{ minHeight: '100vh' }}>

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

        <div className='col-1 space'>
          {/* for space */}
        </div>

        {/*  right-menu */}
        <div className="col-9 right-menu">
          {selectedComponent === "Profile" && <Profile />}
          {selectedComponent === "Lesson" && <Lesson />}
          {selectedComponent === "Homework" && <Homework />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
