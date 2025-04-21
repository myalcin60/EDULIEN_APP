// routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // db bağlantımızı birazdan oluşturacağız

// Kullanıcı kaydı (Signup)
router.post("/", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Tüm alanlar gereklidir." });
  }

  const sql = "INSERT INTO user (email, password, role) VALUES (?, ?, ?)";
  db.query(sql, [email, password, role], (err, result) => {
    if (err) {
      console.error("Kayıt hatası:", err);
      return res.status(500).json({ message: "Veritabanı hatası." });
    }

    return res.status(201).json({ message: "Kayıt başarılı!" });
  });
});

module.exports = router;
