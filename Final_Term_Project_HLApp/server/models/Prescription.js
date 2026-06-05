const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  medications: [
    {
      name: String,
      dosage: String,
      // times array e.g. ['08:00','20:00'] and duration in days
      times: { type: [String], default: [] },
      durationDays: { type: Number, default: 7 }
    }
  ],
  notes: String,
  // logs of reminders sent to avoid duplicates: { medName, time, date, sentAt }
  reminderLog: { type: [{ medName: String, time: String, date: String, sentAt: Date }], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
