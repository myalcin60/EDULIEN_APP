import React, { useState, useEffect } from 'react';
import { config, endpoints, headers, frontendMessages } from '../../config';
import DeleteClass from './DeleteClass';
import UpdateClass from './UpdateClass';
import { Link } from 'react-router-dom';
import { showToast, handleError } from '../../utils/helpers';

function CreateClass() {
  const [className, setClassName] = useState('');
  const [userData, setUserData] = useState(null);
  const [classList, setClassList] = useState([]);

  const email = localStorage.getItem("userEmail");

  // Kullanıcı verisini çek
  useEffect(() => {
    if (!email) return;

    fetch(`${config.API_BASE_URL}${endpoints.PROFILE}/${email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => handleError(err, frontendMessages.error.profileFetch));
  }, [email]);

  // Kullanıcının sınıflarını çek
  const getClasses = async () => {
    if (!userData?.id) return;

    try {
      const res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_ALL}${userData.id}`);
      if (!res.ok) throw new Error("Class list fetch failed");

      const classData = await res.json();
      setClassList(classData);
    } catch (err) {
      handleError(err, "Class list fetch failed");
    }
  };

  useEffect(() => {
    if (userData?.id) getClasses();
  }, [userData]);

  if (!userData) return <div>Loading...</div>;

  // Sınıf oluşturma işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': headers.JSON['Content-Type'],
        },
        body: JSON.stringify({
          className,
          teacherName: userData.firstName,
          teacherId: userData.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(frontendMessages.success.createClass, 'success');
        setClassName('');
        getClasses();
      } else {
        showToast(data.message || frontendMessages.error.creation, 'error');
      }
    } catch (error) {
      handleError(error, frontendMessages.error.error);
    }
  };

  return (
    <div className="create-class-container">
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
        <input type="text" value={userData.firstName} readOnly />
        <label>Teacher ID:</label>
        <input type="text" value={userData.id} readOnly />

        <button type="submit">Create</button>
      </form>

      <div>
        <h3>Classes</h3>
        <ul>
          {classList.map((cls) => (
            <li key={cls.classId}>
              <Link to={`/classes/${cls.classId}`} style={{ marginRight: '10px' }}>
                {cls.className}
              </Link>
              {cls.teacherId === userData.id && (
                <>
                  <DeleteClass
                    classId={cls.classId}
                    teacherId={cls.teacherId}
                    currentUserId={userData.id}
                    onDelete={getClasses}
                  />
                  <UpdateClass
                    classData={cls}
                    currentUserId={userData.id}
                    onUpdate={getClasses}
                  />
                </>


              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateClass;
