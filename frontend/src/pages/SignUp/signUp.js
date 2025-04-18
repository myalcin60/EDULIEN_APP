import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; // React Router'dan Link bileşenini import ettik

function SignUp() {
  const [role, setRole] = useState('student'); // default rol
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Burada backend'e kayıt işlemi yapılabilir
    // Sonrasında role'e göre yönlendirme
    if (role === 'student') {
      navigate('/student-login');
    } else {
      navigate('/teacher-login');
    }
  };

  return (
    <div className="signup-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" required />

        <label>Şifre:</label>
        <input type="password" required />

        <label>Rol Seçin:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Öğrenci</option>
          <option value="teacher">Öğretmen</option>
        </select>

        <button type="submit">Kayıt Ol</button>
      </form>

      <p>
        Zaten hesabınız var mı? <Link to="/">Giriş yap</Link>
      </p>
    </div>
  );
}

export default SignUp;
