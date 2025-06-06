const express = require('express');
const router = express.Router();
const supabase = require('../supabase');


// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Forsøk på innlogging:", username, password);

  const { data, error } = await supabase
    .from('users')
    .select('username, password, role, name, class')
    .ilike('username', username) // 👈 matcher case-insensitivt
    .maybeSingle();

  console.log("Supabase svar:", data, error);

  if (error || !data) return res.status(401).json({ error: 'Bruker ikke funnet' });

  if (data.password !== password) {
    return res.status(401).json({ error: 'Feil passord' });
  }

  res.status(200).json({
    username: data.username,
    role: data.role,
    name: data.name,
    class: data.class,
  });
});


// GET /api/users (for admin dashboard)
router.get('/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, role, name, class');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});



module.exports = router;
