// backend/controllers/offerController.js
const {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} = require('../models/Offer');

async function listOffers(req, res) {
  try {
    const offers = await getAllOffers(req.query);
    res.json(offers);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOffer(req, res) {
  try {
    const offer = await getOfferById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Not found' });
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function createOfferCtrl(req, res) {
  try {
    const offer = await createOffer(req.body);
    res.status(201).json(offer);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateOfferCtrl(req, res) {
  try {
    const offer = await updateOffer(req.params.id, req.body);
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteOfferCtrl(req, res) {
  try {
    await deleteOffer(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  listOffers,
  getOffer,
  createOfferCtrl,
  updateOfferCtrl,
  deleteOfferCtrl,
};
