import React, { useState, useEffect } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config/index';
import DeleteClass from './DeleteClass';

function CreateClass() {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("userEmail");

  const [classList, setClassList] = useState([]);



  useEffect(() => {
    if (!email) return;

    fetch(`${config.API_BASE_URL}${endpoints.PROFILE}/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(frontendMessages.error.profileFetch, error);
      });
  }, [email]);
  const getClasses = async () => {
    if (!userData?.id) return;
    try {
      const url = `${config.API_BASE_URL}${endpoints.CLASS.GET_ALL}${userData.id}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Class list fetch failed");
      }
      const classData = await res.json();
      setClassList(classData);
    } catch (err) {
      console.error("Class list fetch failed", err);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      getClasses();
    }
  }, [userData]);


  if (!userData) {
    return <div>Loading ...</div>;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("UserData:", userData);

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': headers.JSON['Content-Type'],
        },
        body: JSON.stringify({
          className,
          teacherName: userData.firstName,
          teacherId: userData.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(frontendMessages.success.createClass);
        setClassName('');
        getClasses();

      } else {
        alert(data.message || frontendMessages.error.creation);
      }
    } catch (error) {
      console.error('Error creating class:', error);
      alert(frontendMessages.error.error);
    }
  };



  return (
    <div className="create-class-container">
      <h2>CreateClass</h2>
      <form onSubmit={handleSubmit}>
        <label>Class Name:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <label>Teacher Name:</label>
        <input
          type="text"
          value={userData.firstName}
          readOnly
        />
        <label>Teacher ID:</label>
        <input
          type="number"
          value={userData.id}
          readOnly
        />

        <button type="submit">Create</button>
      </form>
      <div>
        <h3> Classes</h3>
        <ul>
          {classList.map((cls) => (
              <li key={cls.classId}>
                {cls.className}
                {cls.teacherId === userData.id && (
          <DeleteClass
            classId={cls.classId}
            teacherId={cls.teacherId}
            currentUserId={userData.id}
            onDelete={getClasses}
          />
        )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateClass;
