const express = require("express");
const router = express.Router();
const { db,endpoints, messages, constants } = require("../config/index");

// Teacher register
router.post(endpoints.TEACHER.REGISTER, (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || role !== constants.roles.TEACHER) {
    return res.status(400).json({ message: messages.auth.error.invalidRoleOrInfo });
  }

  const sql = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
  const values = [firstName, lastName, email, password, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Teacher registration error:", err);
      return res.status(500).json({ message: messages.auth.error.dbError });
    }

    res.status(201).json({ message: messages.auth.success.teacherRegistration, userId: result.insertId });
  });
});

module.exports = router;
