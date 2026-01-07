// backend/routes/userRoutes.js
const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getMyRequests } = require('../controllers/emailController');

router.get('/requests', auth, getMyRequests);

module.exports = router;
