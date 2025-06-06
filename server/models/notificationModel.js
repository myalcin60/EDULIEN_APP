const { db } = require("../config/index");

const createNotificationsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      isRead BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error("notifications tablosu oluşturulurken hata:", err);
    } else {
      console.log("notifications tablosu başarıyla oluşturuldu.");
    }
  });
};

module.exports = createNotificationsTable;
