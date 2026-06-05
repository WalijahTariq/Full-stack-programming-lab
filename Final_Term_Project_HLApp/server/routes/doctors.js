const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { verifyToken, allowRoles } = require('../middleware/auth');

// Create doctor (Admin only)
router.post('/', verifyToken, allowRoles('admin'),
  body('name').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, specialization, phone, bio } = req.body;
      // create User with role doctor
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email already used' });
      const rawPass = crypto.randomBytes(6).toString('hex');
      const hashed = await bcrypt.hash(rawPass, 10);
      user = new User({ name, email, password: hashed, role: 'doctor' });
      await user.save();
      const doctor = new Doctor({ user: user._id, specialization, phone, bio });
      await doctor.save();
      res.json({ doctor, temporaryPassword: rawPass });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// List doctors
router.get('/', verifyToken, async (req, res) => {
  const docs = await Doctor.find().populate('user', 'name email');
  res.json(docs);
});

// Update doctor
router.put('/:id', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user','name email');
  res.json(doc);
});

// Delete doctor
router.delete('/:id', verifyToken, allowRoles('admin'), async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
