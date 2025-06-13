const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// Hent alle enkeltoppgaver
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Feil ved henting av oppgaver:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
