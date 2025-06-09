const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {endpoints} =require("../server/config/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Edulien App API" });
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);

const profileRoutes = require("./routes/profieRoutes");
app.use("/api", profileRoutes);

const classStudentRoutes = require("./routes/classStudentRoutes");
app.use("/api", classStudentRoutes);


 

// Table creators
 const createUserTable = require("./models/userModel");
 const createClassTable = require("./models/classModel");
 const createClassStudentsTable = require("./models/classStudentModel");
 const createNotificationsTable =require("./models/notificationModel");

 app.use('/api', require("./routes/classRoutes"));

// Creat tables
 createUserTable();
 createClassTable();
 createClassStudentsTable();
 createNotificationsTable();

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



