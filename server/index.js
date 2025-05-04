const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

// Tablo oluşturucular
 const createUserTable = require("./models/userModel");
 const createClassTable = require("./models/classModel");
 app.use("/api/users", require("./routes/users"));
 app.use("/api/classes", require("./routes/classes"));

// Tabloları oluştur
 createUserTable();
 createClassTable();


// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
