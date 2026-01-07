// backend/controllers/userController.js
const { getUserById, updateUser } = require("../models/User");

async function getProfileCtrl(req, res) {
  try {
    const userId = req.user?.sub || req.user?.id;
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.json(user);
  } catch (e) {
    console.error("getProfileCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateProfileCtrl(req, res) {
  try {
    const userId = req.user?.sub || req.user?.id;
    const updated = await updateUser(userId, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (e) {
    console.error("updateProfileCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getProfileCtrl, updateProfileCtrl };
