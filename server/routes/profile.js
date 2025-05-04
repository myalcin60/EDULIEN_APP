const express = require("express");
const router = express.Router();
const { db,endpoints, messages, } = require("../config/index");

// Kullanıcının profil bilgilerini getir
router.get(endpoints.PROFILE.PROFILE, (req, res) => {
  const { email } = req.params;

  db.query("SELECT id, firstName, lastName, email, role FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: messages.profile.error.dbError, details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: messages.profile.error.userNotFound });
    }

    res.json(results[0]);
  });
});

module.exports = router;
