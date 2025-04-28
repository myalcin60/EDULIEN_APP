const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Student register
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || role !== "student") {
    return res.status(400).json({ message: "Incomplete information or incorrect role" });
  }

  const sql = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
  const values = [firstName, lastName, email, password, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Student registration error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({ message: "Student registration successful", userId: result.insertId });
  });
});

module.exports = router;
