import LayoutLanding from "./LayoutLanding";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./TeacherTests.css";

// Komponent som viser oversikt over lærerens prøver
export default function TeacherTests() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);   // Liste over prøver
  const [loading, setLoading] = useState(true); // Laster-status

  // Henter prøver fra backend når komponenten lastes inn
  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await axios.get("http://localhost:3001/api/tests");
        setTests(res.data); // Lagre prøver i state
      } catch (err) {
        console.error("Klarte ikke å hente prøver:", err);
      } finally {
        setLoading(false); // Ferdig med lasting
      }
    }

    fetchTests();
  }, []);

  return (
    <LayoutLanding>
      <div className="teacher-tests-container">
        <div className="teacher-tests-box">

          {/* Handlingsknapper for å legge til prøver */}
          <div className="button-row">
            <button
              className="action-btn"
              onClick={() => navigate("/teacher/create-new-test")}
            >
              + Legg til ny prøve
            </button>
            <button className="action-btn">+ Mappe</button>
          </div>

          {/* Vis prøver eller tilbakemelding hvis ingen */}
          <div className="test-card-grid">
            {loading ? (
              <p>Laster prøver...</p>
            ) : tests.length === 0 ? (
              <p>Ingen prøver funnet.</p>
            ) : (
              tests.map((test, i) => (
                <div className="test-card" key={test.id || i}>
                  <h3>{test.title}</h3>
                  <p><strong>Trinn:</strong> {test.grade}</p>
                  <p><strong>Tema:</strong> {test.topic}</p>
                  <p><strong>Est. tidsbruk:</strong> {test.estimated_time} min</p>
                  <div className="test-icons">
                    <img src="/edit.png" alt="Rediger" />
                    <img src="/launch.png" alt="Start" />
                    <img src="/graph.png" alt="Statistikk" />
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </LayoutLanding>
  );
}
