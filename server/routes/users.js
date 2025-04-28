// routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // db bağlantımızı birazdan oluşturacağız

// Kullanıcı kaydı (Signup)
router.post("/", (req, res) => {
  const {firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?,?, ?, ?)";
  db.query(sql, [firstName, lastName, email, password, role], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: "Database error." });
    }

    return res.status(201).json({ message: "Registration successful!" });
  });
});

module.exports = router;
