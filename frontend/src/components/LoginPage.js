import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../utils/auth";
import LayoutLanding from "./LayoutLanding";
import "./LoginStyle.css";

// Komponent for innloggingsside
export default function LoginPage() {
  const [username, setUsername] = useState(""); // Brukernavn-input
  const [password, setPassword] = useState(""); // Passord-input
  const [error, setError] = useState("");       // Feilmelding ved feil innlogging
  const navigate = useNavigate();

  // Funksjon som kjøres ved innsending av skjema
  const handleLogin = async (e) => {
    e.preventDefault(); // Hindrer sideoppdatering
    try {
      // Sender POST-forespørsel til backend med brukernavn og passord
      const res = await axios.post("http://localhost:3001/api/login", 
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const user = res.data;
      setUser(user); // Lagrer brukerinfo i lokal lagring

      // Navigerer til riktig dashboard basert på rolle
      if (user.role === "teacher") {
        navigate("/teacher");
      } else if (user.role === "student") {
        navigate("/student");
      } else {
        navigate("/");
      }
    } catch (err) {
      // Viser feilmelding dersom innlogging mislykkes
      setError("Feil brukernavn eller passord");
    }
  };

  return (
    <LayoutLanding>
      <div className="login-box">
        <h2>Logg inn</h2>
        {/* Skjema for innlogging */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Brukernavn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Logg inn</button>
        </form>

        {/* Viser feilmelding hvis den finnes */}
        {error && <p className="error">{error}</p>}
      </div>
    </LayoutLanding>
  );
}
