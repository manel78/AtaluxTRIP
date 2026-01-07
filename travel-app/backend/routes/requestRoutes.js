// backend/routes/requestRoutes.js
const express = require("express");
const router = express.Router();

const { createRequestCtrl, listRequestsCtrl } = require("../controllers/requestController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Créer une demande (public ou user connecté selon ton choix)
// Ici: public (le formulaire demande email etc.)
router.post("/", createRequestCtrl);

// Lister demandes: admin uniquement
router.get("/", authMiddleware, adminMiddleware, listRequestsCtrl);

module.exports = router;
