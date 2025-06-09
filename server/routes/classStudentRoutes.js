const express = require("express");
const router = express.Router();
const classStudentController = require("../controllers/classStudentController");

router.post("/classes/invite", classStudentController.addStudentToClassByEmail);

router.get("/by-class/:classId", classStudentController.getStudentsByClassId);

// Classes Lists for student
router.get( "/classes/students/:id", classStudentController.getClassByStudentId);



module.exports = router;
