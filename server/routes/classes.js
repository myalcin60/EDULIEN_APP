const express = require("express");
const router = express.Router();
const {db, messages,endpoints } = require("../config");

// Class Create
router.post(endpoints.TEACHER.CLASS.CREATE, (req, res) => {
  const { name, teacherId } = req.body;

  if (!name || !teacherId) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  const sql = "INSERT INTO class (name, teacherId) VALUES (?, ?)";
  db.query(sql, [name, teacherId], (err, result) => {
    if (err) {
      console.error("Class creation error:", err);
      return res.status(500).json({ message: messages.db.error.dbError });
    }
    res.status(201).json({ message: messages.db.success.classCreated, classId: result.insertId });
  });
});

// Class Read
router.get(endpoints.TEACHER.CLASS.LIST, (req, res) => {
  const sql = "SELECT * FROM class";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch classes error:", err);
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
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  const sql = "UPDATE class SET name = ? WHERE id = ?";
  db.query(sql, [name, classId], (err) => {
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
