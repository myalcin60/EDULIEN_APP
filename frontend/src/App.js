import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signUp";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import StudentDashboard from "./pages/Student/studentDashboard";

function App() {
  return (
    <Router>
       <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student-dashboard" element = {<StudentDashboard/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
