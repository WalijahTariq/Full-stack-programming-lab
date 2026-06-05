const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  specialization: { type: String },
  phone: { type: String },
  bio: { type: String }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
