const express = require("express");
const router = express.Router();
const {
  addStudentToClassByEmail,
  getStudentsByClassId,
} = require("../controllers/classStudentController");

router.post("/classes/invite", addStudentToClassByEmail);

router.get("/by-class/:classId", getStudentsByClassId);


module.exports = router;
