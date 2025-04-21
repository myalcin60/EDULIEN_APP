import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; // React Router'dan Link bileşenini import ettik

function SignUp() {
  const [role, setRole] = useState('student'); // default rol
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Kayıt başarılıysa role'e göre yönlendir
        if (role === 'student') {
          navigate('/student-login');
        } else {
          navigate('/teacher-login');
        }
      } else {
        alert(data.message || 'Kayıt başarısız.');
      }
    } catch (err) {
      console.error('Kayıt hatası:', err);
      alert('Bir hata oluştu.');
    }
  };
  

  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
  );
  
}

export default SignUp;
