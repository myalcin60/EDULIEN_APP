import React from 'react';
import Header from '../../components/Header/header.js';
import './Login.css';

function Login() {
  return (
    <di> 
    <div className="login-page">
    
      <div className="login-sections">

        {/* Öğrenci Giriş Bölümü */}
        <div className="login-container">
          <h2>Student</h2>
          <img src='/assets/OGRENCI.jpg' alt='student'></img>
          <form>
            <label>Email:</label>
            <input type="text" />
            <label>Password:</label>
            <input type="password" />
            <button type="submit">Log in</button>
            <a href="/signup">Don't have an account? Sign up</a>
          </form>
        </div>

        {/* Öğretmen Giriş Bölümü */}
        <div className="login-container">
          <h2>Teacher</h2>
          <img  src='/assets/ogretmen.jpg' alt='teacher'></img>
          <form>
            <label>Email:</label>
            <input type="text" />
            <label>Password:</label>
            <input type="password" />
            <button type="submit">Log in</button>
            <a href="/signup">Don't have an account? Sign up</a>
          </form>
        </div>

      </div>
    </div>
    </di>
  );
}

export default Login;
