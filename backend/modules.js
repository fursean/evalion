const express = require("express");
const router = express.Router();
const supabase = require("./supabase");

// Hent alle moduler
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("title", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Legg til ny modul
router.post("/", async (req, res) => {
  const { title, prompt, topic, estimated_time, competence_goals } = req.body;

  if (!title || !prompt || !topic || !estimated_time || !competence_goals) {
    return res.status(400).json({ error: "Mangler påkrevde felter" });
  }

  const { data, error } = await supabase
    .from("modules")
    .insert([
      {
        title,
        prompt,
        topic,
        estimated_time,
        competence_goals
      }
    ])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
});

module.exports = router;
