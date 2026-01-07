// backend/controllers/requestController.js
const { createRequest, listRequests } = require("../models/Request");

function validateRequestPayload(body) {
  const required = ["email", "destination", "start_date", "end_date", "adults", "category", "service_type"];
  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === "");
  return missing;
}

async function createRequestCtrl(req, res) {
  try {
    const missing = validateRequestPayload(req.body);
    if (missing.length) return res.status(400).json({ message: "Missing fields", missing });

    const created = await createRequest(req.body);
    return res.status(201).json(created);
  } catch (e) {
    console.error("createRequestCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function listRequestsCtrl(req, res) {
  try {
    const rows = await listRequests();
    return res.json(rows);
  } catch (e) {
    console.error("listRequestsCtrl error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createRequestCtrl, listRequestsCtrl };
