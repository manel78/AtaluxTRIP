const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const {
  listOffers,
  getOffer,
  createOfferCtrl,
  updateOfferCtrl,
  deleteOfferCtrl,
} = require('../controllers/offerController');

// public
router.get('/', listOffers);
router.get('/:id', getOffer);

// admin
router.post('/', auth, admin, createOfferCtrl);
router.put('/:id', auth, admin, updateOfferCtrl);
router.delete('/:id', auth, admin, deleteOfferCtrl);

module.exports = router;
