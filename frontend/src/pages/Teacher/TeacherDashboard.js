import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import CreateClass from "../../components/Classes/CreateClass";
import Homework from '../../components/Homework/Homework';
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("Profile");
    return (

        <div className="container">
    
            <h2 onClick={() => setSelectedComponent("Profile")}>
                TEACHER DASHBORD
            </h2>
            <div className="flex">
                <div className="left-menu" >
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("Profile")}
                        >
                            PROFILE
                        </li>
                        <li
                            className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("CreateClass")}

                        >
                            CLASSES
                        </li>
                        <li
                            className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("Homework")}

                        >
                            HOMEWORK
                        </li>
                    </ul>
                </div>
               

                {/* right-menu */}
                <div className="right-menu">
                    {selectedComponent === "Profile" && <Profile />}
                    {selectedComponent === "CreateClass" && <CreateClass />}
                    {selectedComponent === "Homework" && <Homework />}
                </div>
            </div>


        </div>

    );

};
export default TeacherDashboard;