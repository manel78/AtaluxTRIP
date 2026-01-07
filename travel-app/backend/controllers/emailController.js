const { sendMail } = require('../utils/email');
const { createRequest, getRequestsByUser } = require('../models/Request');

async function createRequestCtrl(req, res) {
  try {
    const userId = req.user ? req.user.id : null;
    const request = await createRequest({ ...req.body, user_id: userId });

    // email utilisateur
    if (request.email) {
      await sendMail({
        to: request.email,
        subject: 'Confirmation de demande de voyage',
        text: `Votre demande pour ${request.destination} a bien été reçue.`,
      });
    }

    // email admin
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: 'Nouvelle demande de réservation',
      text: JSON.stringify(request, null, 2),
    });

    res.status(201).json(request);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getMyRequests(req, res) {
  try {
    const requests = await getRequestsByUser(req.user.id);
    res.json(requests);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createRequestCtrl, getMyRequests };
