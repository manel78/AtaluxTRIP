// backend/routes/adminRoutes.js
const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const { listOffers } = require('../controllers/offerController');

router.use(auth, admin);

router.get('/dashboard', async (req, res) => {
  // MVP : juste renvoyer le nombre d’offres
  const offers = await listOffers({}); // simple réutilisation
  res.json({ offersCount: offers.length });
});

module.exports = router;
