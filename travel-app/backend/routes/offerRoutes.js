// backend/routes/offerRoutes.js
const express = require("express");
const router = express.Router();

const {
  listOffers,
  getOffer,
  createOfferCtrl,
  updateOfferCtrl,
  deleteOfferCtrl,
} = require("../controllers/offerController");

router.get("/", listOffers);
router.get("/:id", getOffer);
router.post("/", createOfferCtrl);
router.put("/:id", updateOfferCtrl);
router.delete("/:id", deleteOfferCtrl);

module.exports = router;
