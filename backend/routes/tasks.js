const express = require('express');
const pool = require('../db');
const router = express.Router();

const STATUSES = ['todo', 'in_progress', 'done'];
const PRIORITIES = ['low', 'medium', 'high'];
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

function parseDeadline(value) {
  if (value === undefined || value === null || value === '') return { value: null };
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return { error: 'Nieprawidłowy termin (wymagany format RRRR-MM-DD).' };
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return { error: 'Nieprawidłowy termin (wymagany format RRRR-MM-DD).' };
  return { value };
}

function validateTask(body) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (title.length < 3 || title.length > 100) return { error: 'Tytuł musi mieć od 3 do 100 znaków.' };
  const status = body.status || 'todo';
  const priority = body.priority || 'medium';
  if (!STATUSES.includes(status)) return { error: 'Nieprawidłowy status.' };
  if (!PRIORITIES.includes(priority)) return { error: 'Nieprawidłowy priorytet.' };
  const boardId = parseId(body.boardId);
  if (!boardId) return { error: 'Nieprawidłowa tablica.' };
  let assigneeId = null;
  if (body.assigneeId !== undefined && body.assigneeId !== null && body.assigneeId !== '') {
    assigneeId = parseId(body.assigneeId);
    if (!assigneeId) return { error: 'Nieprawidłowy użytkownik.' };
  }
  const deadline = parseDeadline(body.deadline);
  if (deadline.error) return deadline;
  const description = body.description == null ? null : String(body.description).trim() || null;
  if (description && description.length > 5000) return { error: 'Opis może mieć maksymalnie 5000 znaków.' };
  return { value: { title, description, status, priority, deadline: deadline.value, boardId, assigneeId } };
}

async function validateReferences(task, userId) {
  const [boards] = await pool.query(
    'SELECT id FROM boards WHERE id = ? AND ownerId = ? AND isDeleted = 0',
    [task.boardId, userId]
  );
  if (!boards.length) return 'Wybrana tablica nie istnieje.';
  if (task.assigneeId !== null) {
    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [task.assigneeId]);
    if (!users.length) return 'Wybrany użytkownik nie istnieje.';
  }
  return null;
}

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    const [rows] = await pool.query(
      `SELECT t.id, t.title, t.description, t.status, t.priority, t.deadline,
              t.boardId, t.assigneeId, t.createdAt,
              u.firstName AS assigneeFirstName, u.lastName AS assigneeLastName
       FROM tasks t LEFT JOIN users u ON u.id = t.assigneeId
       JOIN boards b ON b.id = t.boardId
       WHERE t.id = ? AND t.isDeleted = 0 AND b.ownerId = ? AND b.isDeleted = 0`,
      [id, req.session.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const validation = validateTask(req.body || {});
    if (validation.error) return res.status(400).json({ error: validation.error });
    const task = validation.value;
    const referenceError = await validateReferences(task, req.session.userId);
    if (referenceError) return res.status(400).json({ error: referenceError });
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, deadline, boardId, assigneeId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [task.title, task.description, task.status, task.priority, task.deadline, task.boardId, task.assigneeId]
    );
    res.status(201).json({ id: result.insertId, ...task });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    const [existing] = await pool.query(
      'SELECT t.id FROM tasks t JOIN boards b ON b.id = t.boardId WHERE t.id = ? AND t.isDeleted = 0 AND b.ownerId = ? AND b.isDeleted = 0',
      [id, req.session.userId]
    );
    if (!existing.length) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    const validation = validateTask(req.body || {});
    if (validation.error) return res.status(400).json({ error: validation.error });
    const task = validation.value;
    const referenceError = await validateReferences(task, req.session.userId);
    if (referenceError) return res.status(400).json({ error: referenceError });
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, deadline = ?, boardId = ?, assigneeId = ? WHERE id = ? AND isDeleted = 0',
      [task.title, task.description, task.status, task.priority, task.deadline, task.boardId, task.assigneeId, id]
    );
    res.json({ id, ...task });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    const [result] = await pool.query(
      `UPDATE tasks t JOIN boards b ON b.id = t.boardId
       SET t.isDeleted = 1, t.deletedAt = NOW(), t.deletedById = ?
       WHERE t.id = ? AND t.isDeleted = 0 AND b.ownerId = ? AND b.isDeleted = 0`,
      [req.session.userId, id, req.session.userId]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Zadanie nie istnieje.' });
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
