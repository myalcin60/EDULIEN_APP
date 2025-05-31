const { db, messages } = require("../config/index");
const generateUserId = require("../utils/generateId");

const registerUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: messages.db.error.required });
  }

  const id = generateUserId(role);

  const sql = "INSERT INTO user (id, firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, firstName, lastName, email, password, role], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }

    return res.status(201).json({ message: messages.auth.success.registration });
  });
};

const loginUser = (req, res) => {
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
};



module.exports = {
  loginUser,
  registerUser,
}