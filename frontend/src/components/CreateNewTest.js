import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateNewTest.css";
import LayoutLanding from "./LayoutLanding";

// Komponent for å lage ny prøve (visning og filtrering av prøvesett og oppgaver)
export default function CreateNewTest() {
  const navigate = useNavigate();

  // State for prøvesett og enkeltoppgaver hentet fra backend
  const [tests, setTests] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Brukersøk og filtervalg
  const [search, setSearch] = useState("");
  const [showSet, setShowSet] = useState(true);       // Vis prøvesett
  const [showSingle, setShowSingle] = useState(false); // Vis enkeltoppgaver
  const [grades, setGrades] = useState(["8. trinn"]);  // Filter: trinn
  const [types, setTypes] = useState([]);              // Filter: oppgavetyper

  // Henter prøvesett og oppgaver fra backend én gang ved oppstart
  useEffect(() => {
    const fetchTests = async () => {
      const res = await axios.get("http://localhost:3001/api/tests");
      setTests(res.data);
    };
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:3001/api/tasks");
      setTasks(res.data);
    };
    fetchTests();
    fetchTasks();
  }, []);

  // Toggle-funksjon for å legge til/fjerne trinn fra filter
  const toggleGrade = (grade) => {
    setGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  // Toggle-funksjon for å legge til/fjerne oppgavetype fra filter
  const toggleType = (type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filtrerer prøvesett etter søk og valgt trinn
  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(search.toLowerCase()) &&
      grades.includes(test.grade)
  );

  // Filtrerer enkeltoppgaver etter søk, trinn og type
  const filteredTasks = tasks.filter((task) => {
    // Henter trinn fra oppgave, eller prøven den tilhører
    const grade =
      task.grade || tests.find((t) => t.id === task.test_id)?.grade || "Ukjent";
    const contentText = task.content?.text || "";

    return (
      contentText.toLowerCase().includes(search.toLowerCase()) &&
      grades.includes(grade) &&
      (types.length === 0 || types.includes(task.type))
    );
  });

  return (
    <LayoutLanding>
      <div className="cnt-main">
        {/* Sidepanel med søk og filtervalg */}
        <aside className="cnt-sidebar">
          <input
            type="text"
            placeholder="🔍 Søk"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Visningsvalg: prøvesett og enkeltoppgaver */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={showSet}
                onChange={() => setShowSet(!showSet)}
              />
              Ferdig prøvesett
            </label>
            <label>
              <input
                type="checkbox"
                checked={showSingle}
                onChange={() => setShowSingle(!showSingle)}
              />
              Enkeltoppgaver
            </label>
          </div>
          {/* Filtrering på trinn */}
          <div>
            <strong>TRINN</strong>
            {["8. trinn", "9. trinn", "10. trinn"].map((trinn) => (
              <label key={trinn}>
                <input
                  type="checkbox"
                  checked={grades.includes(trinn)}
                  onChange={() => toggleGrade(trinn)}
                />
                {trinn}
              </label>
            ))}
          </div>
          {/* Filtrering på oppgavetype */}
          <div>
            <strong>OPPGAVETYPE</strong>
            {["Begreper", "NaturfagPrat", "Tegn og forklar"].map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </aside>

        {/* Kortvisning av filtrerte prøvesett og oppgaver */}
        <div className="cnt-cards">
          {showSet &&
            filteredTests.map((test) => (
              <div className="card-box card-blue" key={test.id}>
                <h3>{test.title}</h3>
                <small>- Ferdig prøvesett -</small>
                <p><strong>Trinn:</strong> {test.grade}</p>
                <p><strong>Oppgavetype:</strong> Alle</p>
                <p><strong>Tema:</strong> {test.topic}</p>
                <p><strong>Est. tidsbruk:</strong> {test.estimated_time} min</p>
                <div className="cnt-icons">
                  <img src="/eye.png" alt="Forhåndsvis" className="cnt-icon" />
                  <img src="/newtest.png" alt="Legg til" className="cnt-icon" />
                  <img src="/addtest.png" alt="Dupliser" className="cnt-icon" />
                </div>
              </div>
            ))}

          {showSingle &&
            filteredTasks.map((task) => {
              // Finner tilhørende prøvesett for utfyllende info
              const test = tests.find((t) => t.id === task.test_id);
              const grade = task.grade || test?.grade || "Ukjent";
              const topic = task.topic || test?.topic || "Ukjent";
              const estTime = task.estimated_time || "–";

              return (
                <div className="card-box card-yellow" key={task.id}>
                  <h3>{task.title}</h3>
                  <small>- Enkeltoppgave -</small>
                  <p><strong>Trinn:</strong> {grade}</p>
                  <p><strong>Oppgavetype:</strong> {task.type}</p>
                  <p><strong>Tema:</strong> {topic}</p>
                  <p><strong>Est. tidsbruk:</strong> {estTime} min</p>
                  <div className="cnt-icons">
                    <img src="/eye.png" alt="Se" className="cnt-icon" />
                    <img src="/newtest.png" alt="Legg til" className="cnt-icon" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </LayoutLanding>
  );
}
