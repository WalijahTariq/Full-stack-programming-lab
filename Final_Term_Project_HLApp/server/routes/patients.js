const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { verifyToken, allowRoles } = require('../middleware/auth');

// Create patient (Admin only)
router.post('/', verifyToken, allowRoles('admin'),
  body('name').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, age, gender, phone } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email already used' });
      const rawPass = crypto.randomBytes(6).toString('hex');
      const hashed = await bcrypt.hash(rawPass, 10);
      user = new User({ name, email, password: hashed, role: 'patient' });
      await user.save();
      const patient = new Patient({ user: user._id, age, gender, phone });
      await patient.save();
      res.json({ patient, temporaryPassword: rawPass });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// Get current patient's record
router.get('/me', verifyToken, allowRoles('patient'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id }).populate('user','name email').populate('primaryDoctor','_id');
    if (!patient) return res.status(404).json({ msg: 'Patient record not found' });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get current patient's medical history (aggregated)
router.get('/me/history', verifyToken, allowRoles('patient'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    if (!patient) return res.status(404).json({ msg: 'Patient record not found' });
    const appointments = await require('../models/Appointment').find({ patient: patient._id }).sort({ date: -1 });
    const checkups = await require('../models/Checkup').find({ patient: patient._id }).sort({ date: -1 });
    const prescriptions = await require('../models/Prescription').find({ patient: patient._id }).sort({ createdAt: -1 });
    res.json({ appointments, checkups, prescriptions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List patients (doctors and admins)
router.get('/', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  const list = await Patient.find()
    .populate('user','name email')
    .populate({ path: 'primaryDoctor', populate: { path: 'user', select: 'name email' } });
  res.json(list);
});

// Get patient by id
router.get('/:id', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email')
      .populate({ path: 'primaryDoctor', populate: { path: 'user', select: 'name email' } });
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update patient
router.put('/:id', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user','name email');
  res.json(p);
});

// Assign or remove primary doctor for a patient
router.put('/:id/primary-doctor', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  try {
    const { doctorId } = req.body;
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: 'Patient not found' });
    p.primaryDoctor = doctorId || null;
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get patient's medical history (admin/doctor)
router.get('/:id/history', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  try {
    const patientId = req.params.id;
    const appointments = await require('../models/Appointment').find({ patient: patientId }).sort({ date: -1 });
    const checkups = await require('../models/Checkup').find({ patient: patientId }).sort({ date: -1 });
    const prescriptions = await require('../models/Prescription').find({ patient: patientId }).sort({ createdAt: -1 });
    res.json({ appointments, checkups, prescriptions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete patient
router.delete('/:id', verifyToken, allowRoles('admin'), async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
