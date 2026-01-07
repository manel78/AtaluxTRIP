// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const { registerCtrl, loginCtrl, meCtrl } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/me", authMiddleware, meCtrl);

module.exports = router;
