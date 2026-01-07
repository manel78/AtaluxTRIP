// backend/controllers/offerController.js

const {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../models/Offer");

async function listOffers(req, res) {
  try {
    const offers = await getAllOffers(req.query);
    return res.json(offers);
  } catch (e) {
    console.error("listOffers error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function getOffer(req, res) {
  try {
    const offer = await getOfferById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Not found" });
    return res.json(offer);
  } catch (e) {
    console.error("getOffer error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

function validateOfferPayload(body) {
  const required = ["title", "destination", "price", "category", "service_type"];
  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === "");
  return missing;
}

async function createOfferCtrl(req, res) {
  try {
    const missing = validateOfferPayload(req.body);
    if (missing.length) {
      return res.status(400).json({ message: "Missing fields", missing });
    }

    const offer = await createOffer(req.body);
    return res.status(201).json(offer);
  } catch (e) {
    console.error("createOfferCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateOfferCtrl(req, res) {
  try {
    const offer = await updateOffer(req.params.id, req.body);
    if (!offer) return res.status(404).json({ message: "Not found" });
    return res.json(offer);
  } catch (e) {
    console.error("updateOfferCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteOfferCtrl(req, res) {
  try {
    const ok = await deleteOffer(req.params.id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).end();
  } catch (e) {
    console.error("deleteOfferCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  listOffers,
  getOffer,
  createOfferCtrl,
  updateOfferCtrl,
  deleteOfferCtrl,
};
