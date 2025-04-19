import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signUp";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <Router>
       <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
