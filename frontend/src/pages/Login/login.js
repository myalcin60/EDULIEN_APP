import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import"react-toastify/ReactToastify.css";


function Login() {
  const [selectedRole, setSelectedRole] = useState('student'); // default: student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        })
      });

      const data = await response.json();


      if (response.ok) {
        navigate("/dashboard"); 
        toast.success("Login successful!", {autoClose : 2000});
        localStorage.setItem("userEmail", email);  //Save user email to localStorage

        if (data.userType === 'student') {

          navigate('/student-dashboard');
        } else {

          navigate('/teacher-dashboard');
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("An error occurred while connecting to the server");
      console.error("Login error:", error);
    }
  };


  return (
    <div className="container-fluid login-page">
      <div className='row'>

        <div className=" col-3 login-container">
          {/* Role selection */}
          <div className="role-toggle">
            <button
              className={selectedRole === 'student' ? 'active' : ''}
              onClick={() => handleRoleClick('student')}
            >
              Student
            </button>
            <button
              className={selectedRole === 'teacher' ? 'active' : ''}
              onClick={() => handleRoleClick('teacher')}
            >
              Teacher
            </button>
          </div>
          {/* Login Form */}
          <img
            src={selectedRole === 'student' ? '/assets/OGRENCI.jpg' : '/assets/ogretmen.jpg'
            }
            alt={selectedRole} className="role-image" />

          <form onSubmit={handleLogin}>

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Log in</button>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
        <div className='col-7 image-homePage'>
          <img src="/assets/home_page.png"/>
        </div>
        
      </div>
      
    </div>
    
  );
}

export default Login;
