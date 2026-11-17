const express = require('express');
const pool = require('../db');
const router = express.Router();

function validId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT b.id, b.name, b.description, b.ownerId, b.createdAt,
              u.firstName AS ownerFirstName, u.lastName AS ownerLastName,
              (SELECT COUNT(*) FROM tasks t WHERE t.boardId = b.id AND t.isDeleted = 0) AS activeTasks
       FROM boards b
       JOIN users u ON u.id = b.ownerId
       WHERE b.isDeleted = 0 AND b.ownerId = ?
       ORDER BY b.createdAt DESC`,
      [req.session.userId]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const description = typeof req.body.description === 'string' ? req.body.description.trim() : '';
    if (name.length < 1 || name.length > 80) return res.status(400).json({ error: 'Nazwa musi mieć od 1 do 80 znaków.' });
    if (description.length > 255) return res.status(400).json({ error: 'Opis może mieć maksymalnie 255 znaków.' });
    const [result] = await pool.query(
      'INSERT INTO boards (name, description, ownerId) VALUES (?, ?, ?)',
      [name, description || null, req.session.userId]
    );
    res.status(201).json({ id: result.insertId, name, description: description || null });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = validId(req.params.id);
    if (!id) return res.status(404).json({ error: 'Tablica nie istnieje.' });
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const description = typeof req.body.description === 'string' ? req.body.description.trim() : '';
    if (name.length < 1 || name.length > 80) return res.status(400).json({ error: 'Nazwa musi mieć od 1 do 80 znaków.' });
    if (description.length > 255) return res.status(400).json({ error: 'Opis może mieć maksymalnie 255 znaków.' });
    const [result] = await pool.query(
      'UPDATE boards SET name = ?, description = ? WHERE id = ? AND ownerId = ? AND isDeleted = 0',
      [name, description || null, id, req.session.userId]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Tablica nie istnieje.' });
    res.json({ id, name, description: description || null });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = validId(req.params.id);
    if (!id) return res.status(404).json({ error: 'Tablica nie istnieje.' });
    const [result] = await pool.query(
      'UPDATE boards SET isDeleted = 1, deletedAt = NOW(), deletedById = ? WHERE id = ? AND ownerId = ? AND isDeleted = 0',
      [req.session.userId, id, req.session.userId]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Tablica nie istnieje.' });
    res.status(204).end();
  } catch (err) { next(err); }
});

router.get('/:boardId/tasks', async (req, res, next) => {
  try {
    const boardId = validId(req.params.boardId);
    if (!boardId) return res.status(404).json({ error: 'Tablica nie istnieje.' });
    const [boards] = await pool.query(
      'SELECT id FROM boards WHERE id = ? AND ownerId = ? AND isDeleted = 0',
      [boardId, req.session.userId]
    );
    if (!boards.length) return res.status(404).json({ error: 'Tablica nie istnieje.' });

    const { priority, assigneeId, q } = req.query;
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Nieprawidłowy priorytet.' });
    }
    let parsedAssignee = null;
    if (assigneeId !== undefined && assigneeId !== '') {
      parsedAssignee = validId(assigneeId);
      if (!parsedAssignee) return res.status(400).json({ error: 'assigneeId musi być dodatnią liczbą całkowitą.' });
    }
    if (q !== undefined && (typeof q !== 'string' || q.length > 100)) {
      return res.status(400).json({ error: 'Fraza wyszukiwania może mieć maksymalnie 100 znaków.' });
    }

    let sql = `SELECT t.id, t.title, t.description, t.status, t.priority, t.deadline,
                      t.boardId, t.assigneeId, t.createdAt,
                      u.firstName AS assigneeFirstName, u.lastName AS assigneeLastName
               FROM tasks t LEFT JOIN users u ON u.id = t.assigneeId
               WHERE t.boardId = ? AND t.isDeleted = 0`;
    const params = [boardId];
    if (priority) { sql += ' AND t.priority = ?'; params.push(priority); }
    if (parsedAssignee !== null) { sql += ' AND t.assigneeId = ?'; params.push(parsedAssignee); }
    if (q && q.trim()) { sql += ' AND t.title LIKE ?'; params.push(`%${q.trim()}%`); }
    sql += ' ORDER BY t.createdAt DESC, t.id DESC';
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

module.exports = router;
