import React, { useState } from 'react';
import Profile from '../../components/Profile/Profile';
import Lesson from '../../components/Lesson/Lesson';
import Homework from '../../components/Homework/Homework';


const StudentDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");


  return (
    <div className="container">
    
      <div className="menu flex">
        <div className="left-menu box-shadow">
          <div className="list-group">
            <div>
              <button onClick={() => setSelectedComponent("Profile")} >
                PROFILE
              </button>
            </div>
            <div>
              <button
                onClick={() => setSelectedComponent("Lesson")}
              >
                LESSON
              </button>
            </div>
             <div>
            <button
              onClick={() => setSelectedComponent("Homework")}
            >
              HOMEWORK
            </button>
          </div>
          <div>
            <button
              onClick={() => setSelectedComponent("Homework")}
            >
              GRADE
            </button>
          </div>
          </div>
         
        </div>
        <div className="right-menu box-shadow">
          {selectedComponent === "Profile" && <Profile />}
          {selectedComponent === "Lesson" && <Lesson />}
          {selectedComponent === "Homework" && <Homework />}
        </div>
      </div>
    </div >
  );
};

export default StudentDashboard;
