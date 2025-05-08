const express = require("express");
const router = express.Router();
const { db,endpoints,  messages } = require("../config/index");


// Login
router.post(endpoints.AUTH.LOGIN, (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: messages.auth.error.emailRequired });
  }

  db.query("SELECT * FROM user WHERE email = ? AND role = ?", [email, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: messages.auth.error.server, details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: messages.auth.error.noSuchUser });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: messages.auth.error.wrongPassword });
    }

    res.json({
      message: messages.auth.success.login,
      userType: user.role
    });
  });
});

module.exports = router;
