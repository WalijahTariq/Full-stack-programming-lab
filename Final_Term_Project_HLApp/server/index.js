const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/checkups', require('./routes/checkups'));

// notifications route
app.use('/api/notifications', require('./routes/notifications'));

// start scheduler
try{
	const reminderTask = require('./scheduler/reminderJob');
	reminderTask.start();
	console.log('Reminder scheduler started');
}catch(e){
	console.warn('Scheduler not started', e.message);
}

app.get('/', (req, res) => res.send({ ok: true, message: 'HLApp API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
