import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user?.role || '');
  }, []);

  const handleClick = () => {
    if (role === 'student') {
      navigate("/student-dashboard");
    }
    else {
      navigate("/teacher-dashboard");
    }

  };

  return (
    <div className='dashboard box-shadow'
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        textAlign: 'center'
      }}
    >
    DASHBOARD
    </div>
  );
};

export default Dashboard;