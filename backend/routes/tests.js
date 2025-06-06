const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// POST /api/tests – Opprett ny prøve
router.post("/", async (req, res) => {
  const { title, time_limit, modules } = req.body;

  if (!title || !time_limit || !modules || modules.length === 0) {
    return res.status(400).json({ error: "Mangler tittel, tid eller moduler" });
  }

  const { data, error } = await supabase
    .from("tests")
    .insert([{ title, time_limit, modules }])
    .select();

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// GET /api/tests – Hent tidligere prøver
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const { data: test, error: err1 } = await supabase
    .from("tests")
    .select("*")
    .eq("id", id)
    .single();

  if (err1) return res.status(404).json({ error: "Test ikke funnet" });

  // Hent modulene knyttet til denne testen
  const { data: modules, error: err2 } = await supabase
    .from("modules")
    .select("*")
    .in("id", test.modules);

  if (err2) return res.status(500).json({ error: err2.message });

  res.json({ test, questions: modules });
});

// GET /api/tests – Hent alle prøver
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});


module.exports = router;
