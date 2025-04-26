import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [selectedRole, setSelectedRole] = useState('student'); // varsayılan: student
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
        alert("Giriş başarılı!");
  
        if (selectedRole === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/teacher-dashboard');
        }
      } else {
        alert(data.error || "Giriş başarısız.");
      }
    } catch (error) {
      alert("Sunucuya bağlanırken bir hata oluştu.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="login-page">

      <div className="login-container">
        {/* Rol Seçimi */}
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
          {/* Giriş formu */}
        <img
          src={ selectedRole === 'student'? '/assets/OGRENCI.jpg' : '/assets/ogretmen.jpg'
          }
          alt={selectedRole}  className="role-image" />

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
    </div>
  );
}

export default Login;
