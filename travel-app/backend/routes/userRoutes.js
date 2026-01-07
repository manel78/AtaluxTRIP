// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfileCtrl, getProfileCtrl } = require("../controllers/userController");

router.get("/me", authMiddleware, getProfileCtrl);
router.put("/me", authMiddleware, updateProfileCtrl);

module.exports = router;
