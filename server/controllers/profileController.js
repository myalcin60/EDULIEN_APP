const { db, messages } = require("../config/index");

const getUserProfile = (req ,res) => {
const { email } = req.params;

  db.query("SELECT id, firstName, lastName, email, role FROM user WHERE email = ?", 
    [email], 
    (err, results) => {
    if (err) {
      return res.status(500).json({ error: messages.profile.error.dbError, details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: messages.profile.error.userNotFound });
    }

    res.json(results[0]);
  });

};

module.exports = {
    getUserProfile,
}