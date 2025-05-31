const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { endpoints } = require("../config");

// Create
router.post(endpoints.TEACHER.CLASS.CREATE, classController.createClass);

// List for teacher
router.get(endpoints.TEACHER.CLASS.LIST, classController.getClassesByTeacher);

// Get by ID
router.get(endpoints.TEACHER.CLASS.LIST_ID, classController.getClassById);

// Update
router.put(endpoints.TEACHER.CLASS.UPDATE, classController.updateClass);

// Delete
router.delete(endpoints.TEACHER.CLASS.DELETE, classController.deleteClass);

module.exports = router;