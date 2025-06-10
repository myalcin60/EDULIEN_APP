import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const showToast = (message, type = 'info') => {
  const config = { position: 'top-right', autoClose: 3000 };
  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'warning':
      toast.warning(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    default:
      toast.info(message, config);
  }
};//



// Error handler
export const handleError = (error, contextMessage = 'Error occurred') => {
  console.error(contextMessage, error);
  showToast(contextMessage, 'error');
};

// Confirm dialog helper
export const confirmDialog = (message) => {
  return window.confirm(message);
};

// Dashboard
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
    <div 
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '10px 20px',
        border: '1px solid #F4F6F9',
        borderRadius: '5px',
        backgroundColor: '#f8f9fa',
        display: 'inline-block',
        margin: '5px'
      }}
    >
      DASHBOARD
    </div>
  );
};