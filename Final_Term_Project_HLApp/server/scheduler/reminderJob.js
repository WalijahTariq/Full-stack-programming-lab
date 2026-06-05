const cron = require('node-cron');
const Prescription = require('../models/Prescription');
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const getTransporter = async () => {
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
};

// Run every minute for demo; adjust schedule to '0 9 * * *' for daily 9am
const task = cron.schedule('*/1 * * * *', async () => {
  try {
    const prescriptions = await Prescription.find().populate({ path: 'patient', populate: { path: 'user', select: 'email name' } });
    const transporter = await getTransporter();
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const currentTime = `${hh}:${mm}`;
    const today = now.toISOString().slice(0,10);
    for (const p of prescriptions) {
      if (!p.patient || !p.patient.user || !p.patient.user.email) continue;
      const email = p.patient.user.email;
      for (const m of p.medications) {
        const duration = m.durationDays || 7;
        const daysSince = Math.floor((now - new Date(p.createdAt)) / 86400000);
        if (daysSince < 0 || daysSince >= duration) continue;
        if (!m.times || !m.times.length) continue;
        // if medication scheduled at currentTime
        if (m.times.includes(currentTime)) {
          // check if already reminded today at this time for this med
          const already = (p.reminderLog || []).some(r => r.medName === m.name && r.time === currentTime && r.date === today);
          if (already) continue;
          const text = `Reminder: Take ${m.name} (${m.dosage}) now.`;
          try {
            await transporter.sendMail({ from: process.env.EMAIL_FROM || 'hlapp@example.com', to: email, subject: 'Medication Reminder', text });
            await new Notification({ userEmail: email, type: 'medication', message: text }).save();
            p.reminderLog.push({ medName: m.name, time: currentTime, date: today, sentAt: now });
            await p.save();
            console.log(`Reminder sent to ${email} for ${m.name} at ${currentTime}`);
          } catch (e) {
            console.error('Failed sending med reminder', e.message);
          }
        }
      }
    }
    // follow-up reminders based on checkups
    try {
      const Checkup = require('../models/Checkup');
      const checkups = await Checkup.find({ followUpInDays: { $exists: true, $ne: null }, followUpReminderSent: { $ne: true } }).populate({ path: 'patient', populate: { path: 'user', select: 'email name' } });
      for (const c of checkups) {
        if (!c.patient || !c.patient.user || !c.patient.user.email) continue;
        const followUpDate = new Date(c.date);
        followUpDate.setDate(followUpDate.getDate() + (c.followUpInDays || 0));
        // compare date portion only
        const followUpDay = followUpDate.toISOString().slice(0,10);
        if (followUpDay <= today) {
          const email = c.patient.user.email;
          const text = `Reminder: You have a follow-up scheduled (from checkup on ${new Date(c.date).toLocaleDateString()}). Please book or attend your follow-up.`;
          try {
            await transporter.sendMail({ from: process.env.EMAIL_FROM || 'hlapp@example.com', to: email, subject: 'Follow-up Reminder', text });
            await new Notification({ userEmail: email, type: 'followup', message: text }).save();
            c.followUpReminderSent = true;
            await c.save();
            console.log(`Follow-up reminder sent to ${email} for checkup ${c._id}`);
          } catch (e) {
            console.error('Failed sending follow-up reminder', e.message);
          }
        }
      }
    } catch (e) {
      console.error('Follow-up reminder error', e.message);
    }
  } catch (err) {
    console.error('Reminder job error', err.message);
  }
});

module.exports = task;
