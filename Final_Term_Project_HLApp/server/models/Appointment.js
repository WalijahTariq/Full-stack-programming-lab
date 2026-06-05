const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending','approved','rejected','completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }]
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
