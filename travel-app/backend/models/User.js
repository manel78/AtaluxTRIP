const pool = require('./db');

async function createUser({ name, email, passwordHash, role = 'user' }) {
  const q = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;
  const { rows } = await pool.query(q, [name, email, passwordHash, role]);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

module.exports = { createUser, findUserByEmail };

