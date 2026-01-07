// backend/models/User.js
const pool = require("./db");

async function createUser({ name, email, password_hash, role = "user" }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, password_hash, role]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0] || null;
}

async function getUserById(id) {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users WHERE id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0] || null;
}

async function updateUser(id, data) {
  // Exemple minimal: update name uniquement si fourni
  const name = data.name;
  if (!name) return getUserById(id);

  const result = await pool.query(
    `UPDATE users
     SET name = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, id]
  );
  return result.rows[0] || null;
}

async function listUsers() {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY id DESC`
  );
  return result.rows;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  listUsers,
};
