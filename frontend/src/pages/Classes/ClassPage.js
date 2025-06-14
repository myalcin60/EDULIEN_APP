import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config, endpoints, frontendMessages } from '../../config';
import './ClassPage.css'
import Dashboard from '../../components/Dashboard/Dashboard';

const ClassPage = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_BY_ID.replace(":id", classId)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Class data =', data);
        setClassInfo(data[0]);

      })
      .catch((err) => {
        console.error("Could not get class information:", err);
        setError(frontendMessages.error.classFetch);
      });

    // Then get the students added to the class
    fetch(`${config.API_BASE_URL}/by-class/${classId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Students could not be recruited:", err);
      });
  }, [classId]);

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.INVITE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId,
          studentEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || frontendMessages.success.inviteSent);
        setStudentEmail("");

        // Bring students back
        const updatedRes = await fetch(`${config.API_BASE_URL}/by-class/${classId}`);
        const updatedData = await updatedRes.json();
        setStudents(updatedData);
      } else {
        toast.error(data.message || frontendMessages.error.invite);
      }
    } catch (err) {
      console.error("Error inviting student:", err);
      toast.error(frontendMessages.error.error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!classInfo) return <div>Loding...</div>;

  return (
    <div className="container">
      <div className='flex'>
        <Dashboard />
        <div className='flex'>
          <p><strong>Class Name :</strong> {classInfo.className}</p>
         
        </div>
      </div>



      <form onSubmit={handleInvite} className='flex invte-student box-shadow '>
        <h3>Invite Students</h3>
        <input
          type="email"
          placeholder="Student email "
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>

      <div className='invite-student box-shadow'>
  <h3>Students</h3>
  {students.length === 0 ? (
    <p>There isn't any student.</p>
  ) : (
    <div className="table-container">
      <table className='students-table'>
        <thead>
          <tr >
            <th >Student ID</th>
            <th >Name</th>
            <th >Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} style={{
              ':hover': { backgroundColor: '#f9f9f9' }
            }}>
              <td >{student.studentId}</td>
              <td >{student.studentName}</td>
              <td >{student.studentEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
}

export default ClassPage;
