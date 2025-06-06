import { useState } from "react";
import axios from "axios";
import { setUser, getUser, logout } from "../utils/auth";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUserState] = useState(getUser());
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", 
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data);
      setUserState(res.data);
    } catch (err) {
      setError("Feil brukernavn eller passord");
    }
  };

  const handleLogout = () => {
    logout();
    setUserState(null);
    setUsername("");
    setPassword("");
  };

  // Ikke logget inn → vis login-skjema
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Logg inn</h2>
        <input
          type="text"
          placeholder="Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Logg inn</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  // Etter innlogging → vis riktig dashboard
  return (
    <div style={{ padding: 20 }}>
      <p>Velkommen, {user.name} ({user.role})</p>
      <p>Klasse: {user.class}</p>
      <button onClick={handleLogout}>Logg ut</button>

      {user.role === "admin" && <AdminDashboard />}
      {user.role === "teacher" && <TeacherDashboard />}
      {user.role === "student" && <StudentDashboard />}
    </div>
  );
}
