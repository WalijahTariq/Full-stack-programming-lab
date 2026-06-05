const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  medicalHistory: { type: Array, default: [] },
  primaryDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});

module.exports = mongoose.model('Patient', PatientSchema);
