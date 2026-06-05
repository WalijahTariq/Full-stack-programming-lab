const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Checkup = require('../models/Checkup');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const { verifyToken, allowRoles } = require('../middleware/auth');

// Doctor adds a checkup for an appointment
router.post('/:appointmentId', verifyToken, allowRoles('doctor','admin'),
  body('vitals').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { appointmentId } = req.params;
      const appt = await Appointment.findById(appointmentId);
      if (!appt) return res.status(404).json({ msg: 'Appointment not found' });
      const { vitals, notes, followUpInDays } = req.body;
      const checkup = new Checkup({ appointment: appointmentId, patient: appt.patient, doctor: appt.doctor || req.user.id, vitals, notes, followUpInDays });
      await checkup.save();
      res.json(checkup);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// Get checkups for current patient
router.get('/me', verifyToken, allowRoles('patient'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    if (!patient) return res.status(404).json({ msg: 'Patient record not found' });
    const list = await Checkup.find({ patient: patient._id }).populate('doctor', 'user').sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get checkups for a patient (admin/doctor)
router.get('/patient/:id', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  try {
    const list = await Checkup.find({ patient: req.params.id }).populate('doctor', 'user').sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
