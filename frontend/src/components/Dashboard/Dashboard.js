import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  setRole(user?.role || '');
}, []);

  const handleClick = () => {
if(role === 'student'){
navigate("/student-dashboard");
}
else{
navigate("/teacher-dashboard");
}
    
  };

  return (
    <div className='dashboard'
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        display: 'inline-block',      
      }}
    >
      DASHBOARD
    </div>
  );
};