const { messages } = require("../config");

const handleDbError = (res, err, context = "Veritabanı hatası") => {
  console.error(`${context}:`, err);
  return res.status(500).json({ message: messages.db.error.dbError });
};

module.exports = {
  handleDbError,
};
