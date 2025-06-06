import React, { useState } from "react";

function ModuleForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    topic: "",
    estimated_time: "",
    competence_goals: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sender...");

    const payload = {
      ...formData,
      estimated_time: parseInt(formData.estimated_time),
      competence_goals: formData.competence_goals
        .split(",")
        .map((s) => s.trim()) // Lager ekte array som Supabase forstår som text[]
    };

    try {
      const res = await fetch("http://localhost:3001/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Feil ved innsending");
      const result = await res.json();
      setStatus("Modul sendt! ✅");
      setFormData({
        title: "",
        prompt: "",
        topic: "",
        estimated_time: "",
        competence_goals: ""
      });
      onSuccess && onSuccess();
    } catch (err) {
      setStatus("Feil: " + err.message);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Opprett ny modul</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Tittel"
          value={formData.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="prompt"
          placeholder="Prompt/spørsmål"
          value={formData.prompt}
          onChange={handleChange}
          required
        /><br />
        <input
          name="topic"
          placeholder="Tema (f.eks. Økologi)"
          value={formData.topic}
          onChange={handleChange}
          required
        /><br />
        <input
          name="estimated_time"
          type="number"
          placeholder="Tid i minutter"
          value={formData.estimated_time}
          onChange={handleChange}
          required
        /><br />
        <input
          name="competence_goals"
          placeholder="Kompetansemål (komma-separert)"
          value={formData.competence_goals}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Send inn</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default ModuleForm;
