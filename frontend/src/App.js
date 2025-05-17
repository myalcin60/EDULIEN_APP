import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import Profile from "./components/Profile/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import endpoints from "./config/Endpoints";
import CreateClass from "./components/Classes/CreateClass";
import DeleteClass from "./components/Classes/DeleteClass";

function App() {
  return (
    <Router>
       <Header />
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path= {`${endpoints.SIGN_UP}`} element={<SignUp />} />
        <Route path={`${endpoints.STUDENT_DASHBOARD}`} element = {<StudentDashboard/>} />
        <Route path={`${endpoints.TEACHER_DASHBOARD}`} element = {<TeacherDashboard/>} />
        <Route path={`${endpoints.PROFILE}`} element={<Profile />} />
        <Route path= {`${endpoints.CLASS.CREATE}`} element ={<CreateClass />}/>
     
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
