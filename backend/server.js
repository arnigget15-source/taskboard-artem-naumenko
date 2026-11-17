const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const session = require('express-session');
const { requireAuth } = require('./middleware/auth');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(session({
  name: 'taskboard.sid',
  secret: process.env.SESSION_SECRET || 'taskboard-local-development-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 8
  }
}));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', requireAuth, require('./routes/users'));
app.use('/api/boards', requireAuth, require('./routes/boards'));
app.use('/api/tasks', requireAuth, require('./routes/tasks'));

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html')));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`Serwer: http://localhost:${PORT}`));
