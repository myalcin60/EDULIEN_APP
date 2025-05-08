// routes/users.js
const express = require("express");
const router = express.Router();
const { db, endpoints, messages } = require("../config/index");

// Kullanıcı kaydı (Signup)
router.post(endpoints.USERS.REGISTER, (req, res) => {
  const {firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: messages.db.error.required });
  }

  const sql = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?,?, ?, ?)";
  db.query(sql, [firstName, lastName, email, password, role], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }

    return res.status(201).json({ message: messages.auth.success.registration });
  });
});

module.exports = router;