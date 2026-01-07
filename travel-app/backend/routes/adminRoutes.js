// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const { listUsersCtrl } = require("../controllers/adminController");

router.get("/users", authMiddleware, adminMiddleware, listUsersCtrl);

module.exports = router;
