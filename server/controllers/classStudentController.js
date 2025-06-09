const { db, messages } = require("../config/index");
// Ogrenciye ait siniflari getir
const getClassByStudentId = (req, res) => {
  const studentId = req.params.id
  const sql = "SELECT className, teacherName FROM class_students, class where class.classId=class_students.classId and class_students.studentId=?; "

  db.query(sql, [studentId], (err, results) => {
    if (err) return handleDbError(res, err, "Sınıflar getirilirken hata");
    res.status(200).json(results);
  }
  );
};
// OGRENCI LISTESINI GETIR
const getStudentsByClassId = (req, res) => {
  const { classId } = req.params;
  const sql = `
    SELECT studentId, studentName, studentEmail, addedAt
    FROM class_students
    WHERE classId = ?
  `;
  const classIdNum = Number(req.params.classId);
  db.query(sql, [classIdNum], (err, results) => {
    if (err) {
      console.error("Öğrenciler alınırken hata:", err);
      return res.status(500).json({ message: "Öğrenciler alınamadı." });
    }
    console.log(">> getStudentsByClassId sonuç:", results); // <<< Buradaki log’a bakın
    res.json(results);
  });
};
const addStudentToClassByEmail = (req, res) => {
  const { classId, studentEmail } = req.body;

  if (!classId || !studentEmail) {
    return res.status(400).json({ message: "classId ve studentEmail gereklidir." });
  }

  // 1. Öğrenciyi bul
  const findStudentSql = "SELECT id, firstName, lastName, email FROM user WHERE email = ? AND role = 'student'";
  db.query(findStudentSql, [studentEmail], (err, studentResults) => {
    if (err || studentResults.length === 0) {
      return res.status(404).json({ message: "Öğrenci bulunamadı." });
    }

    const student = studentResults[0];
    const fullName = `${student.firstName} ${student.lastName}`;

    // 2. Sınıf bilgisi al
    const classSql = "SELECT className, teacherId FROM class WHERE classId = ?";
    db.query(classSql, [classId], (err2, classResults) => {
      if (err2 || classResults.length === 0) {
        return res.status(404).json({ message: "Sınıf bulunamadı." });
      }

      const className = classResults[0].className;
      const teacherIdFromClass = classResults[0].teacherId;

      // 3. Öğretmen bilgisi al
      const teacherSql = "SELECT firstName, lastName FROM user WHERE id = ?";
      db.query(teacherSql, [teacherIdFromClass], (err3, teacherResults) => {
        const teacher = teacherResults[0];
        
        const fullNameTeacher = `${teacher.firstName} ${teacher.lastName}`;

        // 4. Öğrenciyi class_students tablosuna ekle
        const insertSql = `
          INSERT INTO class_students (classId, studentId, studentName, studentEmail)
          VALUES (?, ?, ?, ?)
        `;
        db.query(insertSql, [classId, student.id, fullName, student.email], (err4) => {
          if (err4) {
            return res.status(500).json({ message: "Öğrenci sınıfa eklenemedi.", details: err4 });
          }


          // 5. Bildirim oluştur
          const notifMessage = `Öğretmen ${teacher.firstName} ${teacher.lastName} tarafından "${className}" sınıfına eklendiniz.`;
          const notifSql = `INSERT INTO notifications (userId, message) VALUES (?, ?)`;

          db.query(notifSql, [student.id, notifMessage], (err5) => {
            if (err5) {
              console.warn("Bildirim eklenemedi:", err5);
            }

            return res.status(201).json({
              message: "Öğrenci sınıfa başarıyla eklendi ve bildirildi.",
              student: {
                id: student.id,
                name: fullName,
                email: student.email
              }
            });
          });
        });
      });
    });
  });
};

module.exports = {
  addStudentToClassByEmail,
  getStudentsByClassId,
  getClassByStudentId,
};
