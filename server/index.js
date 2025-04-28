const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

// Veritabanında user tablosu oluştur (eğer yoksa)
const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
)
`;

db.query(createUserTable, (err, result) => {
  if (err) {
    console.error("Could not create User table:", err);
  } else {
    console.log("User table is ready! ✅");
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Edulien App API" });
});

const studentRoutes = require("./routes/student");
app.use("/api/student", studentRoutes);

const teacherRoutes = require("./routes/teacher");
app.use("/api/teacher", teacherRoutes);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api", profileRoutes);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
