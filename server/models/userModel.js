const { db } = require("../config/index");

const createUserTable = () => {
  const sql = `
  CREATE TABLE user (
  id VARCHAR(20) PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error(" Error creating user table:", err);
    } else {
      console.log(" User table checked/created.");
    }
  });
};

module.exports = createUserTable;
