const express = require("express");
const router = express.Router();
const {db, messages,endpoints } = require("../config");


// Class Create
router.post(endpoints.TEACHER.CLASS.CREATE, (req, res) => {
  const { className, teacherName,teacherId } = req.body;

  if (!className || !teacherId) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  // Aynı isimde sınıf olup olmadığını kontrol et
  const checkSql = "SELECT * FROM class WHERE className = ? AND teacherId = ?";
  db.query(checkSql,[className, teacherId], (checkErr, checkResults) => {
    if(checkErr){
      console.error("Class check error : ", checkErr);
      return res.status(500).json({message : messages.db.error.dbError});
    }
    if (checkResults.length > 0) {
      return res.status(409).json({message : "Ayni isimde sinif zaten mevcut"});
    }
  

  const sql = "INSERT INTO class (className, teacherName,teacherId ) VALUES (?, ?, ?)";
  db.query(sql, [className, teacherName,teacherId], (err, result) => {
    if (err) {
      console.error("Class creation error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }
    res.status(201).json({ message: messages.db.success.classCreated, classId: result.insertId });
  });
});
});

// Get classes for a teacher
router.get(endpoints.TEACHER.CLASS.LIST, (req, res) => {
  const teacherId = req.params.id;

  const sql = "SELECT * FROM class WHERE teacherId = ?";
  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }

    res.status(200).json(results);
  });
});


// Class Read with id
router.get(endpoints.TEACHER.CLASS.LIST_ID, (req, res) => {
    const classId = req.params.id;

    const sql = "SELECT * FROM class WHERE id = ?";
    db.query(sql, [classId], (err, results) => {
      if (err) {
        console.error("Fetch classes error:", err);
        return res.status(500).json({ message: messages.db.error.dbError });
      }
      res.status(200).json(results);
    });
  });

// Class Update
router.put(endpoints.TEACHER.CLASS.UPDATE, (req, res) => {
  const classId = req.params.id;
  const { className } = req.body;

  if (!className) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  const sql = "UPDATE class SET className = ? WHERE id = ?";
  db.query(sql, [className, classId], (err) => {
    if (err) {
      console.error("Class update error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }
    res.status(200).json({ message: messages.db.success.classUpdated });
  });
});

// Class Delete

// Class Delete (sadece sahibi silebilsin)
router.delete(endpoints.TEACHER.CLASS.DELETE, (req, res) => {
  const classId = req.params.id;
  const teacherId = req.query.teacherId; // <-- Değişiklik burada

  if (!teacherId) {
    return res.status(400).json({ message: "Teacher ID gerekli." });
  }

  // Önce sınıfın bu öğretmene ait olup olmadığını kontrol et
  const checkSql = "SELECT * FROM class WHERE classId = ? AND teacherId = ?";
  db.query(checkSql, [classId, teacherId], (checkErr, results) => {
    if (checkErr) {
      console.error("Class ownership check error:", checkErr);
      return res.status(500).json({ message: "Veritabanı hatası" });
    }

    if (results.length === 0) {
      return res.status(403).json({ message: "Bu sınıfı silme yetkiniz yok." });
    }

    // Silme işlemi
    const sql = "DELETE FROM class WHERE classId = ?";
    db.query(sql, [classId], (err) => {
      if (err) {
        console.error("Class delete error:", err);
        return res.status(500).json({ message: "Veritabanı hatası" });
      }
      res.status(200).json({ message: "Sınıf başarıyla silindi" });
    });
  });
});



module.exports = router;
