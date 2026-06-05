const mongoose = require('mongoose');

const CheckupSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  date: { type: Date, default: Date.now },
  vitals: {
    weight: Number,
    height: Number,
    bp: String,
    pulse: Number,
    temperature: Number
  },
  notes: String,
  followUpInDays: Number,
  followUpReminderSent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Checkup', CheckupSchema);
