// backend/routes/requestRoutes.js
const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { createRequestCtrl, getMyRequests } = require('../controllers/emailController');

router.post('/', createRequestCtrl);      // invité ou user
router.get('/me', auth, getMyRequests);   // historique user

module.exports = router;
