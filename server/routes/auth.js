const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Login
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password and role required!" });
  }

  db.query("SELECT * FROM user WHERE email = ? AND role = ?", [email, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Server error", details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "There is no such user!" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Password is wrong!" });
    }

    res.json({
      message: "Login successful!",
      userType: user.role
    });
  });
});

module.exports = router;
