import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config, endpoints, headers, frontendMessages } from '../../config/index';
import home_page from '../../assets/home_page.png';
import student from '../../assets/OGRENCI.jpg';
import teacher from '../../assets/ogretmen.jpg';


function Login() {
  const [selectedRole, setSelectedRole] = useState(config.ROLES.STUDENT); // default: student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": headers.JSON['Content-Type']
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        })
      });

      const data = await response.json();


      if (response.ok) {
        navigate(endpoints.DASHBOARD);
        toast.success(frontendMessages.success.login, { autoClose: 2000 });

        localStorage.setItem("userEmail", email);  //Save user email to localStorage
        //  Tetikleyici: Header güncellesin
        window.dispatchEvent(new Event("storage"));

        if (data.userType === config.ROLES.STUDENT) {

          navigate(endpoints.STUDENT_DASHBOARD);
        } else {

          navigate(endpoints.TEACHER_DASHBOARD);
        }
      } else {
        alert(data.error || frontendMessages.error.login);
      }
    } catch (error) {
      alert(frontendMessages.error.server);
      console.error("Login error:", error);
    }
  };


  return (
    <div class="login-page flex">      
      <div class="flex">
          <div class="login-container ">
            {/* Role selection */}
            <div className="role-toggle">
              <button
                className={selectedRole === config.ROLES.STUDENT ? 'active' : ''}
                onClick={() => handleRoleClick(config.ROLES.STUDENT)}
              >
                Student
              </button>
              <button
                className={selectedRole === config.ROLES.TEACHER ? 'active' : ''}
                onClick={() => handleRoleClick(config.ROLES.TEACHER)}
              >
                Teacher
              </button>
            </div>
            {/* Login Form */}
            <img
              src={selectedRole === config.ROLES.STUDENT ? student : teacher
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
                Don't have an account? <a href={`${endpoints.SIGN_UP}`}>Sign up</a>
              </p>
            </form>
          </div>
          <img class="image-homePage" src={home_page} alt='home_page' /> 
        </div>
       
    </div>

  );
}

export default Login;
