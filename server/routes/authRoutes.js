const express = require("express");
const router = express.Router();
const { endpoints } = require("../config/index");
const authController = require("../controllers/authController");

router.post(endpoints.AUTH.REGISTER, authController.registerUser);

router.post(endpoints.AUTH.LOGIN, authController.loginUser);

module.exports = router;
