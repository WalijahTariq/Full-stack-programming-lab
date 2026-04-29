const express = require('express');
const app = express();
const PORT = 3000;

const styles = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #f0f2f5; display: flex; justify-content: center; padding: 50px 20px; }
    .card { background: white; border-radius: 12px; padding: 40px; max-width: 500px; width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    h1 { color: #2c3e50; margin-bottom: 16px; font-size: 28px; }
    p { color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 12px; }
    ul { list-style: none; margin-top: 10px; }
    li { background: #f8f9fa; border-left: 4px solid #3498db; padding: 10px 16px; margin-bottom: 8px; border-radius: 6px; font-size: 16px; color: #2c3e50; }
    a { display: inline-block; margin-top: 8px; margin-right: 8px; padding: 8px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; }
    a:hover { background: #2980b9; }
    .name { color: #3498db; }
  </style>
`;

// ── Task 4: / → Full HTML page ─────────────────────
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Express App</title>${styles}</head>
    <body>
      <div class="card">
        <h1>Welcome to My Express App</h1>
        <p>This server handles multiple tasks. Click a link below to explore.</p>
        <ul>
          <li><a href="/students">Student List</a></li>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/user/Ali">User: Ali</a></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// ── Task 1: /students → Student list ───────────────
const students = ['Ali', 'Sara', 'Ahmed', 'Fatima', 'Usman'];

app.get('/students', (req, res) => {
  const items = students.map(s => `<li>${s}</li>`).join('');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Students</title>${styles}</head>
    <body>
      <div class="card">
        <h1>Student List</h1>
        <p>There are ${students.length} students enrolled.</p>
        <ul>${items}</ul>
      </div>
    </body>
    </html>
  `);
});

// ── Task 2: Message routes ──────────────────────────
app.get('/home', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Home</title>${styles}</head>
    <body>
      <div class="card">
        <h1>Welcome Home</h1>
        <p>You are on the home page. This is your starting point.</p>
        <a href="/">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>About</title>${styles}</head>
    <body>
      <div class="card">
        <h1>About Us</h1>
        <p>This is a simple Express app built with Node.js.</p>
        <p>It demonstrates routing, dynamic pages, and HTML rendering.</p>
        <a href="/">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/contact', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Contact</title>${styles}</head>
    <body>
      <div class="card">
        <h1>Contact Us</h1>
        <p>Email: hello@example.com</p>
        <p>Phone: +92 300 0000000</p>
        <a href="/">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

// ── Task 3: /user/:name → Dynamic user page ────────
app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>User - ${name}</title>${styles}</head>
    <body>
      <div class="card">
        <h1>Hello, <span class="name">${name}</span>!</h1>
        <p>Welcome to your personal page.</p>
        <a href="/">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

// ── Start server ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});