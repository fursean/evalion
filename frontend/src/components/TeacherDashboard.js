import { useEffect, useState } from "react";
import ModuleForm from "./ModuleForm";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [tests, setTests] = useState([]);
  const [status, setStatus] = useState("");

  // Feltene i skjemaet for å lage ny prøve
  const [testTitle, setTestTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  // Henter moduler fra backend (Supabase)
  const fetchModules = () => {
    fetch("http://localhost:3001/api/modules")
      .then(res => res.json())
      .then(setModules);
  };

  // Henter eksisterende prøver
  const fetchTests = () => {
    fetch("http://localhost:3001/api/tests")
      .then(res => res.json())
      .then(setTests);
  };

  // Kjør når appen starter
  useEffect(() => {
    fetchModules();
    fetchTests();
  }, []);

  // Legg til / fjern modul i valgt-listen
  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  // Opprett ny prøve i backend
  const handleCreateTest = async () => {
    if (!testTitle || !timeLimit || selectedModules.length === 0) {
      alert("Fyll ut tittel, tid og velg minst én modul");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: testTitle,
          time_limit: parseInt(timeLimit),
          modules: selectedModules
        })
      });

      if (!res.ok) throw new Error("Feil ved opprettelse");

      const result = await res.json();
      setStatus("✅ Prøve opprettet! ID: " + result.id);

      // Nullstill skjema
      setSelectedModules([]);
      setTestTitle("");
      setTimeLimit("");
      fetchTests();
    } catch (err) {
      setStatus("❌ Feil: " + err.message);
    }
  };

  // Hjelpefunksjon: Slå opp modultitler fra ID-er
  const getModuleTitles = (ids) => {
    return ids
      .map(id => {
        const match = modules.find(mod => mod.id === id);
        return match ? match.title : "[ukjent modul]";
      })
      .join(", ");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tilgjengelige moduler</h1>

      {/* Ny modul-skjema */}
      <ModuleForm onSuccess={fetchModules} />

      {/* Liste med moduler og valg av dem */}
      <ul>
        {modules.map(mod => (
          <li key={mod.id}>
            <input
              type="checkbox"
              checked={selectedModules.includes(mod.id)}
              onChange={() => toggleModule(mod.id)}
            />
            <strong>{mod.title}</strong> – {mod.topic}<br />
            <em>{mod.prompt}</em><br />
            ⏱ {mod.estimated_time} min<br />
            Kompetansemål: {mod.competence_goals.join(", ")}
            <hr />
          </li>
        ))}
      </ul>

      {/* Skjema for å lage ny prøve */}
      <h2>Opprett ny prøve</h2>
      <input
        placeholder="Tittel på prøven"
        value={testTitle}
        onChange={(e) => setTestTitle(e.target.value)}
      /><br />
      <input
        type="number"
        placeholder="Tid i minutter"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
      /><br />
      <button onClick={handleCreateTest}>🚀 Opprett prøve</button>
      <p>{status}</p>

      {/* Viser tidligere prøver med modultitler */}
      <h2>Tidligere prøver</h2>
      {tests.length === 0 ? (
        <p>(Ingen prøver funnet)</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li key={test.id}>
              <Link to={`/test/${test.id}`}>
                <strong>{test.title || "(Uten tittel)"}</strong>
              </Link><br />
              ⏱ {test.time_limit} min – {test.created_at?.slice(0, 16).replace("T", " ")}<br />
              <small>Moduler: {getModuleTitles(test.modules || [])}</small>
              <hr />
            </li>
          ))}
  </ul>
)}
    </div>
  );
}

export default TeacherDashboard;
