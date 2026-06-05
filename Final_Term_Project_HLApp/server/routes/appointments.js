const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');
const { verifyToken, allowRoles } = require('../middleware/auth');
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let transporterPromise = null;
const getTransporter = async () => {
  if (transporterPromise) return transporterPromise;
  transporterPromise = (async () => {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
    }
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
  })();
  return transporterPromise;
};

router.post('/', verifyToken, allowRoles('patient'), async (req, res) => {
  try {
    const { date, reason } = req.body;
    let patient = await Patient.findOne({ user: req.user.id });
    if (!patient) {
      patient = new Patient({ user: req.user.id });
      await patient.save();
    }
    const appointment = new Appointment({ patient: patient._id, date, reason });
    await appointment.save();
    // send notification email stub
    const note = new Notification({ userEmail: req.user.email, type: 'appointment', message: 'Appointment requested' });
    await note.save();
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Approve/reject by doctor or admin
router.post('/:id/decision', verifyToken, allowRoles('admin','doctor'), async (req, res) => {
  try {
    const { action, doctorId } = req.body; // action: approve/reject
    const appt = await Appointment.findById(req.params.id).populate({ path: 'patient', populate: { path: 'user', select: 'email name' } });
    if (!appt) return res.status(404).json({ msg: 'Not found' });
    if (action === 'approve') {
      appt.status = 'approved';
      if (doctorId) appt.doctor = doctorId;
      await appt.save();
      // notify patient via email
      const patientEmail = (appt.patient && appt.patient.user && appt.patient.user.email) ? appt.patient.user.email : null;
      const note = new Notification({ userEmail: patientEmail || req.user.email, type: 'appointment', message: 'Appointment approved' });
      await note.save();
      try {
        const transporter = await getTransporter();
        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'hlapp@example.com',
          to: patientEmail || req.user.email,
          subject: 'Appointment Approved',
          text: `Your appointment on ${appt.date} has been approved.`
        });
        console.log('Email sent', info.messageId, nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : '');
      } catch (e) {
        console.error('Email send error', e.message);
      }
    } else if (action === 'reject') {
      appt.status = 'rejected';
      await appt.save();
    }
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add prescription to appointment
router.post('/:id/prescription', verifyToken, allowRoles('doctor'), async (req, res) => {
  try {
    const { medications, notes } = req.body;
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ msg: 'Not found' });
    const pres = new Prescription({ appointment: appt._id, patient: appt.patient, doctor: appt.doctor, medications, notes });
    await pres.save();
    appt.treatments.push(pres._id);
    await appt.save();
    res.json(pres);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List appointments for user
router.get('/', verifyToken, async (req, res) => {
  const q = {};
  if (req.user.role === 'patient') {
    // find patient id
    const patient = await Patient.findOne({ user: req.user.id });
    q.patient = patient ? patient._id : null;
  }
  if (req.user.role === 'doctor') {
    const doctor = await Doctor.findOne({ user: req.user.id });
    q.$or = [
      { doctor: doctor ? doctor._id : undefined },
      { doctor: { $exists: false } },
      { doctor: null }
    ];
    q.status = 'requested';
  }
  const list = await Appointment.find(q).populate('patient').populate('doctor');
  res.json(list);
});

  // Simple endpoint to send medication reminders (manual trigger)
  router.post('/notifications/send-reminders', verifyToken, allowRoles('admin'), async (req, res) => {
    try {
      const prescriptions = await Prescription.find().populate({ path: 'patient', populate: { path: 'user', select: 'email name' } });
      const transporter = await getTransporter();
      for (const p of prescriptions) {
        const email = p.patient && p.patient.user && p.patient.user.email;
        if (!email) continue;
        const text = `Reminder: You have medication(s): ${p.medications.map(m=>m.name+ ' ('+m.dosage+')').join(', ')}`;
        await transporter.sendMail({ from: process.env.EMAIL_FROM || 'hlapp@example.com', to: email, subject: 'Medication Reminder', text });
        await new Notification({ userEmail: email, type: 'medication', message: text }).save();
      }
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
