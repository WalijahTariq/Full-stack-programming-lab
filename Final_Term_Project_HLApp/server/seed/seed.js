const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Patient.deleteMany({});
  const password = await bcrypt.hash('password123', 10);
  // create an admin
  const admin = new User({ name: 'Admin', email: 'admin@hlapp.com', password, role: 'admin' });
  await admin.save();

  // create 15 doctors
  for (let i = 1; i <= 15; i++) {
    const u = new User({ name: `Doctor ${i}`, email: `doctor${i}@hlapp.com`, password, role: 'doctor' });
    await u.save();
    const d = new Doctor({ user: u._id, specialization: ['Cardiology','Dermatology','Pediatrics','Neurology'][i%4], phone: `+10000000${i}`, bio: `Bio of doctor ${i}` });
    await d.save();
  }

  // create 15 patients
  for (let i = 1; i <= 15; i++) {
    const u = new User({ name: `Patient ${i}`, email: `patient${i}@hlapp.com`, password, role: 'patient' });
    await u.save();
    const p = new Patient({ user: u._id, age: 20 + i, gender: i%2===0? 'female':'male', phone: `+20000000${i}`, medicalHistory: [] });
    await p.save();
  }

  console.log('Seeding complete');
  process.exit(0);
};

seed();
