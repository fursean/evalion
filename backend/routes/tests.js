const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET /api/tests
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .order('title', { ascending: true });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// GET /api/tests/:id/tasks
router.get('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('test_id', id)
    .order('order', { ascending: true });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

module.exports = router;
