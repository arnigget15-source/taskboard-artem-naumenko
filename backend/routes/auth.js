const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const LOGIN_PATTERN = /^[A-Za-z0-9._-]{3,30}$/;
const EMAIL_PATTERN = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

function publicUser(user) {
  return {
    id: user.id,
    login: user.login,
    firstName: user.firstName,
    lastName: user.lastName
  };
}

router.post('/register', async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const login = typeof req.body.login === 'string' ? req.body.login.trim() : '';
    const firstName = typeof req.body.firstName === 'string' ? req.body.firstName.trim() : '';
    const lastName = typeof req.body.lastName === 'string' ? req.body.lastName.trim() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });
    }
    if (!LOGIN_PATTERN.test(login)) {
      return res.status(400).json({ error: 'Login: 3–30 znaków, litery, cyfry, kropka, myślnik lub podkreślnik.' });
    }
    if (!firstName || firstName.length > 50 || !lastName || lastName.length > 50) {
      return res.status(400).json({ error: 'Podaj imię i nazwisko (maksymalnie 50 znaków).' });
    }
    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({ error: 'Hasło musi mieć od 8 do 72 znaków.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE login = ? OR email = ?', [login, email]);
    if (existing.some((row) => row.login === login)) {
      return res.status(409).json({ error: 'Ten login jest już zajęty.' });
    }
    if (existing.some((row) => row.email === email)) {
      return res.status(409).json({ error: 'Ten adres e-mail jest już zarejestrowany.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, login, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
      [email, login, passwordHash, firstName, lastName]
    );
    const user = { id: result.insertId, login, firstName, lastName };
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.save((saveError) => {
        if (saveError) return next(saveError);
        res.status(201).json(user);
      });
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Login lub adres e-mail jest już zarejestrowany.' });
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const login = typeof req.body.login === 'string' ? req.body.login.trim() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (!login || !password) {
      return res.status(400).json({ error: 'Podaj login i hasło.' });
    }

    const [rows] = await pool.query(
      'SELECT id, login, email, passwordHash, firstName, lastName FROM users WHERE login = ? OR email = ? LIMIT 1',
      [login, login]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Nieprawidłowy login lub hasło.' });
    }

    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.save((saveError) => {
        if (saveError) return next(saveError);
        res.json(publicUser(user));
      });
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, login, firstName, lastName FROM users WHERE id = ?',
      [req.session.userId]
    );
    if (!rows.length) {
      return req.session.destroy(() => res.status(401).json({ error: 'Sesja wygasła. Zaloguj się ponownie.' }));
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  if (!req.session) return res.status(204).end();
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('taskboard.sid');
    res.status(204).end();
  });
});

module.exports = router;
