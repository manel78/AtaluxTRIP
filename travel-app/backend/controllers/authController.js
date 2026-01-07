const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash: hash });
    const token = generateToken(user);
    res.json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
