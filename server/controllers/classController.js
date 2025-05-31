const { db, messages } = require("../config");
const { checkDuplicateClassName } = require("../utils/dbUtils");
const { handleDbError } = require("../utils/errorUtils");

// Sınıf oluştur
const createClass = async (req, res) => {
  const { className, teacherName, teacherId } = req.body;

  if (!className || !teacherId) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  try {
    const isDuplicate = await checkDuplicateClassName(className, teacherId);
    if (isDuplicate) {
      return res.status(409).json({ message: "Aynı isimde sınıf zaten mevcut" });
    }

    const sql = "INSERT INTO class (className, teacherName, teacherId) VALUES (?, ?, ?)";
    db.query(sql, [className, teacherName, teacherId], (err, result) => {
      if (err) return handleDbError(res, err, "Sınıf oluşturulurken hata");
      res.status(201).json({ message: messages.db.success.classCreated, classId: result.insertId });
    });
  } catch (err) {
    return handleDbError(res, err, "Sınıf kontrolü yapılırken hata");
  }
};

// Öğretmene ait tüm sınıflar
const getClassesByTeacher = (req, res) => {
  const teacherId = req.params.id;
  const sql = "SELECT * FROM class WHERE teacherId = ?";

  db.query(sql, [teacherId], (err, results) => {
    if (err) return handleDbError(res, err, "Sınıflar getirilirken hata");
    res.status(200).json(results);
  });
};

// Belirli bir sınıfı ID ile getir
const getClassById = (req, res) => {
  const classId = req.params.id;
  const sql = "SELECT * FROM class WHERE classId = ?";

  db.query(sql, [classId], (err, results) => {
    if (err) return handleDbError(res, err, "Sınıf ID ile getirilirken hata");
    res.status(200).json(results);
  });
};

// Sınıfı güncelle
const updateClass = (req, res) => {

  console.log(" Incoming PUT request to update class");
  console.log("PARAMS:", req.params);         // burada :id’yi göreceksin
  console.log("BODY:", req.body);             // burada className ve teacherId

  const classId = req.params.id;
  const { className, teacherId } = req.body;


  if (!classId || !className || !teacherId) {
    return res.status(400).json({ message: messages.db.error.missingInfo });
  }

  const sql = "UPDATE class SET className = ? WHERE classId = ? AND teacherId = ?";

  db.query(sql, [className, classId, teacherId], (err, result) => {
    if (err) {
      return handleDbError(res, err, "Sınıf güncellenirken hata");
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: messages.db.error.permissionDenied });
    }

    res.status(200).json({ message: messages.db.success.classUpdated });
  });
};


// Sınıfı sil (sadece sahibi)
const deleteClass = (req, res) => {
  const classId = req.params.id;
  const teacherId = req.query.teacherId;

  if (!teacherId) {
    return res.status(400).json({ message: messages.auth.error.teacherID });
  }

  const checkSql = "SELECT * FROM class WHERE classId = ? AND teacherId = ?";
  db.query(checkSql, [classId, teacherId], (checkErr, results) => {
    if (checkErr) return handleDbError(res, checkErr, "Silme yetkisi kontrol edilirken hata");

    if (results.length === 0) {
      return res.status(403).json({ message: messages.auth.error.deleteAuth });
    }

    const deleteSql = "DELETE FROM class WHERE classId = ?";
    db.query(deleteSql, [classId], (err) => {
      if (err) return handleDbError(res, err, "Sınıf silinirken hata");
      res.status(200).json({ message: messages.db.success.classDeleted });
    });
  });
};

module.exports = {
  createClass,
  getClassesByTeacher,
  getClassById,
  updateClass,
  deleteClass,
};
