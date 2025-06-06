const { db } = require("../config/index");

const createClassStudentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS class_students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      classId INT NOT NULL,
      studentId VARCHAR(20) NOT NULL,
      studentName VARCHAR(100),
      studentEmail VARCHAR(100),
      addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (classId) REFERENCES class(classId) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES user(id) ON DELETE CASCADE
    )
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("class_students tablosu oluşturulamadı:", err);
    } else {
      console.log("class_students tablosu başarıyla kontrol edildi/oluşturuldu.");
    }
  });
};
db.query(
  "ALTER TABLE class_students ADD UNIQUE KEY uniq_class_student (classId, studentId);",
  (err) => {
    if (err && err.code !== "ER_DUP_KEYNAME") {
      console.error("Unique kısıt eklenirken hata:", err);
    } else {
      console.log("class_students tablosuna UNIQUE(classId,studentId) eklendi veya zaten mevcut.");
    }
  }
);

module.exports =  createClassStudentsTable;
