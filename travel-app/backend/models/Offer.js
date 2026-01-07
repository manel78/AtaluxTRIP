
const pool = require('./db');

async function getAllOffers(filters = {}) {
  const { destination, category, service_type, min_price, max_price } = filters;
  const conditions = [];
  const values = [];
  let i = 1;

  if (destination) {
    conditions.push(`destination ILIKE $${i++}`);
    values.push(`%${destination}%`);
  }
  if (category) {
    conditions.push(`category = $${i++}`);
    values.push(category);
  }
  if (service_type) {
    conditions.push(`service_type = $${i++}`);
    values.push(service_type);
  }
  if (min_price) {
    conditions.push(`price >= $${i++}`);
    values.push(min_price);
  }
  if (max_price) {
    conditions.push(`price <= $${i++}`);
    values.push(max_price);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const q = `SELECT * FROM offers ${where} ORDER BY id DESC`;
  const { rows } = await pool.query(q, values);
  return rows;
}

async function getOfferById(id) {
  const { rows } = await pool.query('SELECT * FROM offers WHERE id = $1', [id]);
  return rows[0] || null;
}

async function createOffer(data) {
  const {
    title,
    description,
    destination,
    price,
    category,
    service_type,
    is_active = true,
  } = data;

  const q = `
    INSERT INTO offers (title, description, destination, price, category, service_type, is_active)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `;
  const { rows } = await pool.query(q, [
    title,
    description,
    destination,
    price,
    category,
    service_type,
    is_active,
  ]);
  return rows[0];
}

async function updateOffer(id, data) {
  const q = `
    UPDATE offers
    SET title=$1, description=$2, destination=$3, price=$4, category=$5, service_type=$6, is_active=$7
    WHERE id=$8
    RETURNING *
  `;
  const { rows } = await pool.query(q, [
    data.title,
    data.description,
    data.destination,
    data.price,
    data.category,
    data.service_type,
    data.is_active,
    id,
  ]);
  return rows[0];
}

async function deleteOffer(id) {
  await pool.query('DELETE FROM offers WHERE id=$1', [id]);
  return true;
}

module.exports = { getAllOffers, getOfferById, createOffer, updateOffer, deleteOffer };
