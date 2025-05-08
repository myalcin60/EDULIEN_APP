const { db } = require("../config/index");

const createClassTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS class (
      classId INT AUTO_INCREMENT PRIMARY KEY,
      className VARCHAR(100) NOT NULL,
      teacherId INT NOT NULL,
      teacherName VARCHAR (100),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacherId) REFERENCES user(id) ON DELETE CASCADE
    )
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error("❌ Error creating class table:", err);
    } else {
      console.log("✅ Class table checked/created.");
    }
  });
};

module.exports = createClassTable;
