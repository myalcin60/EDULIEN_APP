const express = require("express");
const router = express.Router();
const { endpoints } = require("../config/index");
const { getUserProfile } = require("../controllers/profileController");

router.get(endpoints.PROFILE.PROFILE, getUserProfile);

module.exports= router;