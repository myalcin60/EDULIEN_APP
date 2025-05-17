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

app.use("/api", require("./routes/login"));
app.use(endpoints.STUDENT.STUDENT, require("./routes/student"));
app.use(endpoints.TEACHER.TEACHER, require("./routes/teacher"));
app.use("/api", require("./routes/profile"));

// Tablo oluşturucular
 const createUserTable = require("./models/userModel");
 const createClassTable = require("./models/classModel");

 app.use(endpoints.USERS.USERS, require("./routes/signUp"));
 app.use('/api', require("./routes/classes"));

// Tabloları oluştur
 createUserTable();
 createClassTable();


// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



