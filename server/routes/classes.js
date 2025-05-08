const express = require("express");
const router = express.Router();
const {db, messages,endpoints } = require("../config");

// Class Create
router.post(endpoints.TEACHER.CLASS.CREATE, (req, res) => {
  const { className, teacherName,teacherId } = req.body;

  if (!className || !teacherId) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
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

// Get classes for a teacher
router.get(endpoints.TEACHER.CLASS.LIST, (req, res) => {
  const teacherId = req.params.teacherId;

  const sql = "SELECT * FROM class WHERE teacherId = ?";
  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Veritabanı hatası" });
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
router.delete(endpoints.TEACHER.CLASS.DELETE, (req, res) => {
  const classId = req.params.id;

  const sql = "DELETE FROM class WHERE id = ?";
  db.query(sql, [classId], (err) => {
    if (err) {
      console.error("Class delete error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }
    res.status(200).json({ message: messages.db.success.classDeleted });
  });
});

module.exports = router;
