const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { verifyToken } = require('../middleware/auth');

// Get notifications for current user (by email)
router.get('/', verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const notes = await Notification.find({ userEmail: email }).sort({ sentAt: -1 }).limit(50);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Mark notification as read
router.post('/:id/read', verifyToken, async (req, res) => {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(n);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
