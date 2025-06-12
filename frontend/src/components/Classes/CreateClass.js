import React, { useState } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config';
import DeleteClass from './DeleteClass';
import UpdateClass from './UpdateClass';
import { Link } from 'react-router-dom';
import { showToast, handleError } from '../../utils/Helpers';
import { UserProfil, GetClasses } from '../../utils/UserData';

function CreateClass() {
  const [className, setClassName] = useState('');
  const { userData } = UserProfil();
  const { classList, refreshClasses } = GetClasses(userData?.id);

  if (!userData) return <div>Loading...</div>;

  // creat class
  const handleSubmit = async (e) => {
    e.preventDefault();  // stop page refresh

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': headers.JSON['Content-Type'],
        },
        body: JSON.stringify({
          className,
          teacherName: userData.firstName + " "+ userData.lastName,
          teacherId: userData.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(frontendMessages.success.createClass, 'success');
        setClassName('');
    
      } else {
        showToast(data.message || frontendMessages.error.creation, 'error');
      }
    } catch (error) {
      handleError(error, frontendMessages.error.error);
    }
  };

  return (
    <div className="container">
      <h2>Create Class</h2>
      <form onSubmit={handleSubmit}>
        <label>Class Name:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <label>Teacher Name:</label>
        <input type="text" value={userData.firstName + " "+ userData.lastName} readOnly />
        <label>Teacher ID:</label>
        <input type="text" value={userData.id} readOnly />

        <button type="submit">Create</button>
      </form>

      <div>
        <div className='lesson-grid'>
          {classList.map((cls) => (
            <div key={cls.classId} className='lesson-card'>
              <Link to={`/classes/${cls.classId}`} >
                {cls.className}
              </Link>
              {cls.teacherId === userData.id && (
                <>
                  <DeleteClass 
                    classId={cls.classId}
                    teacherId={cls.teacherId}
                    currentUserId={userData.id}
                    onDelete={refreshClasses}
                  />
                  <UpdateClass
                    classData={cls}
                    currentUserId={userData.id}
                    onUpdate={refreshClasses}
                  />
                </>


              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateClass;
