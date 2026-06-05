const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userEmail: { type: String },
  type: { type: String },
  message: { type: String },
  sentAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
