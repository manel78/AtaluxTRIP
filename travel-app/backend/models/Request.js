// backend/models/Request.js
const pool = require('./db');

async function createRequest(data) {
  const {
    user_id,
    offer_id,
    email,
    destination,
    start_date,
    end_date,
    adults,
    children,
    category,
    service_type,
    message,
  } = data;

  const q = `
    INSERT INTO requests
    (user_id, offer_id, email, destination, start_date, end_date, adults, children, category, service_type, message, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending')
    RETURNING *
  `;
  const { rows } = await pool.query(q, [
    user_id,
    offer_id,
    email,
    destination,
    start_date,
    end_date,
    adults,
    children,
    category,
    service_type,
    message,
  ]);
  return rows[0];
}

async function getRequestsByUser(userId) {
  const { rows } = await pool.query(
    'SELECT * FROM requests WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

module.exports = { createRequest, getRequestsByUser };
