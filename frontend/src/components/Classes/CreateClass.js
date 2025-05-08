import React, { useState, useEffect } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config/index';

function CreateClass() {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("userEmail");

  const [classList, setClassList] = useState([]);

  const getClasses = async () => {
    try {
      const res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_ALL}`);
      const data = await res.json();
      setClassList(data);
    } catch (err) {
      console.error("Class list fetch failed", err);
    }
  };


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

  useEffect(() => {
    if (userData?.id) {
      getClasses();
    }
  }, [userData]) ;


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

      <h3>Your Classes</h3>
      <ul>
        {classList
          .filter(cls => cls.teacherId === userData.id)
          .map((cls) => (
            <li key={cls.classId}>
              {cls.className} (ID: {cls.classId})
            </li>
          ))}
      </ul>

    </div>
  );
}

export default CreateClass;
