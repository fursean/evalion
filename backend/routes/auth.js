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
    .eq('username', username);

  const user = data?.[0];
  console.log("Supabase data:", user);

  if (error || !user) {
    console.log("Fant ikke bruker");
    return res.status(401).json({ error: 'Bruker ikke funnet' });
  }

  if (user.password !== password) {
    console.log("Feil passord");
    return res.status(401).json({ error: 'Feil passord' });
  }

  res.status(200).json({
    username: user.username,
    role: user.role,
    name: user.name,
    class: user.class,
  });
});



module.exports = router;
