import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import CreateClass from "../../components/Classes/CreateClass";
import Homework from '../../components/Homework/Homework';

const TeacherDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("Profile");
    return (
        
        <div className="container-fluid">
            <div className="row g-1">
            <h2>Teacher Dashbord</h2>
                {/* left-menu*/}
                <div className=" col-2 left-menu" style={{ minHeight: '100vh' }}>
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
                <div className='col-1 space'>
                    {/* for space */}
                </div>

                {/* right-menu */}
                <div className="col-9 right-menu">
                    {selectedComponent === "Profile" && <Profile />}
                    {selectedComponent === "CreateClass" && <CreateClass />}
                    {selectedComponent === "Homework" && <Homework />}
                </div>
            </div>
        </div>

    );

};
export default TeacherDashboard;