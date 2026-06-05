HLApp - Healthcare Booking Application

This repository contains a Next.js frontend and an Express/MongoDB backend for booking medical appointments, tracking treatments, prescriptions, checkups, and sending notifications.

Run backend

```
cd server
npm install
# copy .env.example -> .env and set MONGO_URI and JWT_SECRET
npm run seed
npm run dev
```

Run frontend

```
cd client
npm install
npm run dev
# open http://localhost:3000
```

Notes
- Scheduler runs every minute (for demo) by default at `server/scheduler/reminderJob.js`. Change cron expression for production.
- For email delivery in production, set `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_FROM` in `.env`.
