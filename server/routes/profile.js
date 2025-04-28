const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Kullanıcının profil bilgilerini getir
router.get("/profile/:email", (req, res) => {
  const { email } = req.params;

  db.query("SELECT id, firstName, lastName, email, role FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  });
});

module.exports = router;
