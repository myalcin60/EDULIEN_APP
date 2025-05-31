const { db } = require("../config");

// Aynı isimde sınıf var mı kontrolü
const checkDuplicateClassName = (className, teacherId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM class WHERE className = ? AND teacherId = ?";
    db.query(sql, [className, teacherId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.length > 0);
    });
  });
};

module.exports = {
  checkDuplicateClassName,
};
