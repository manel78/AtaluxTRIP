// backend/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByEmail,
  getUserById,
} = require("../models/User");

async function registerCtrl(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already used" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password_hash,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.error("registerCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function loginCtrl(req, res) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (e) {
    console.error("loginCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function meCtrl(req, res) {
  try {
    // accepte les deux formats selon ton middleware
    const userId = req.user?.sub || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.json(user);
  } catch (e) {
    console.error("meCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  registerCtrl,
  loginCtrl,
  meCtrl,
};
