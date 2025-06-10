import { useState } from "react";
import Profile from "../../components/Profile/Profile";
import CreateClass from "../../components/Classes/CreateClass";
import Homework from '../../components/Homework/Homework';
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("Profile");
    const components = {
        Profile: <Profile />,
        CreateClass: <CreateClass />,
        Homework: <Homework />,
    };

    return (

        <div className="container">

            <h2 onClick={() => setSelectedComponent("Profile")}>
                DASHBOARD
            </h2>
            <div className=" menu flex">
                <div className="left-menu" >
                    <div className="list-group">
                        <button className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("Profile")}
                        >
                            PROFILE
                        </button>
                        <button
                            className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("CreateClass")}

                        >
                            CLASSES
                        </button>
                        <button
                            className="list-group-item list-group-item-action"
                            onClick={() => setSelectedComponent("Homework")}

                        >
                            HOMEWORK
                        </button>
                    </div>
                </div>
                <div className="right-menu">
                    {components[selectedComponent]}
                </div>
            </div>
        </div>

    );

};
export default TeacherDashboard;