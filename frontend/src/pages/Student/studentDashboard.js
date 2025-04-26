import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/Profile/profile.js'
import './studentDashboard.css'

const StudentDashboard = () => {
    return (
    <div className='body'>
        <div className='dashbord'>
            <p>Profile</p>
            <p>Lessons</p>
            <p>Notes</p>
            
        </div> 
        <div>
            <profile/>
        </div>
    

    </div>
      
    );
  };
export default StudentDashboard;