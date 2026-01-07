// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('express');
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/requests', requestRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
