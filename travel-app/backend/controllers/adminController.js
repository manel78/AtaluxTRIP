// backend/controllers/adminController.js
const { listUsers } = require("../models/User");

async function listUsersCtrl(req, res) {
  try {
    const users = await listUsers();
    return res.json(users);
  } catch (e) {
    console.error("listUsersCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { listUsersCtrl };
