import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config, endpoints, frontendMessages } from '../../config';
import './ClassPage.css'
import { Dashboard } from '../../utils/Helpers';


const ClassPage=()=> {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [studentEmail, setStudentEmail] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_BY_ID.replace(":id", classId)}`)
      .then((res) => res.json())
      .then((data) => {
        setClassInfo(data);
      })
      .catch((err) => {
        console.error("Sınıf bilgisi alınamadı:", err);
        setError(frontendMessages.error.classFetch);
      });

    // Sonra sınıfa eklenen öğrencileri al
    fetch(`${config.API_BASE_URL}/by-class/${classId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Öğrenciler alınamadı:", err);
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

        // Öğrencileri tekrar getir
        const updatedRes = await fetch(`${config.API_BASE_URL}/by-class/${classId}`);
        const updatedData = await updatedRes.json();
        setStudents(updatedData);
      } else {
        toast.error(data.message || frontendMessages.error.invite);
      }
    } catch (err) {
      console.error("Öğrenci davet edilirken hata:", err);
      toast.error(frontendMessages.error.error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!classInfo) return <div>Yükleniyor...</div>;

  return (
    <div className="container">
       <Dashboard />
      <p><strong>Class Name :</strong> {classInfo.className}</p>
      <p><strong>Teacher:</strong> {classInfo.teacherName}</p>

      <form onSubmit={handleInvite}>
        <h3>Öğrenci Davet Et</h3>
        <input
          type="email"
          placeholder="Öğrenci e-posta"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        />
        <button type="submit">Davet Gönder</button>
      </form>

      <div >
        <h3>Öğrenciler</h3>
        {students.length === 0 ? (
          <p>Henüz öğrenci yok.</p>
        ) : (
          <ol>
            {students.map((student, index) => (
              <li key={index}>
                {student.studentId} {"......"} {student.studentName} {'.........'}{student.studentEmail}
              </li>
            ))}
          </ol>

        )}
      </div>
    </div>
  );
}

export default ClassPage;
