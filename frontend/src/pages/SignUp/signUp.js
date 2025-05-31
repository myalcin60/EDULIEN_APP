import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; // We imported the Link component from React Router
import { config, endpoints, headers, frontendMessages } from '../../config/index';
import home_page from '../../assets/home_page.png';

function SignUp() {
  const [role, setRole] = useState(config.ROLES.STUDENT); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${config.API_BASE_URL}${endpoints.USER.REGISTER}`,
         {
        method: "POST",
        headers: {
          "Content-Type": headers.JSON['Content-Type'],
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        })
      }
    );

      const data = await res.json();

      if (res.ok) {
        // If registration is successful, redirect according to role
        if (role === config.ROLES.STUDENT) {
          navigate(endpoints.STUDENT_LOGIN);
        } else {
          navigate(endpoints.TEACHER_LOGIN);
        }
      } else {
        alert(data.message || frontendMessages.error.registration);
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert(frontendMessages.error.error);
    }
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="container-fluid signUp-page" >
      <div className='row'>
        <div className=" col-3 signup-container">

          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label>Select Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </div>
        <div className='col-7 image-homePage'>
          <img src={home_page}/>
        </div>
      </div>


    </div>

  );

}

export default SignUp;
