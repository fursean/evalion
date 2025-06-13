import { getUser, logout } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

// Komponent for toppmeny og navigasjon
export default function HeaderNav() {
  const user = getUser(); // Henter innlogget bruker fra lokal lagring
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Sjekker om en rute er aktiv (brukes for å fremheve valgt meny)
  const isActive = (route) => {
    return path.startsWith(route) && path !== route;
  };

  // Håndterer inn-/utlogging
  const handleClick = () => {
    if (user) {
      logout();        // Tømmer brukerdata
      navigate("/");   // Går til landingsside etter utlogging
    } else {
      navigate("/login", { state: { role: "student" } }); // Går til login som elev
    }
  };

  return (
    <header className="header-nav">
      {/* Logo klikker brukeren til riktig dashboard */}
      <div
        className="logo-area"
        onClick={() => {
          if (user?.role === "teacher") navigate("/teacher");
          else if (user?.role === "student") navigate("/student");
          else navigate("/login");
        }}
        style={{ cursor: "pointer" }}
      >
        <img src="/logo.png" alt="Evalion logo" className="hover-logo" />
        <span className="brand"></span>
      </div>

      <nav>
        {/* Hvis lærer er innlogget – vis lærerens meny */}
        {user?.role === "teacher" ? (
          <>
            <a
              onClick={() => navigate("/teacher/tests")}
              className={isActive("/teacher") ? "active" : ""}
            >
              <img src="/clipboard.png" alt="Mine prøver" className="nav-icon" />
              Mine prøver
            </a>

            <a
              onClick={() => alert("Monitor kommer!")}
              className={isActive("/monitor") ? "active" : ""}
            >
              <img src="/monitor.png" alt="Monitor" className="nav-icon" />
              Monitor
            </a>

            <a
              onClick={() => alert("Vurdering kommer!")}
              className={isActive("/vurdering") ? "active" : ""}
            >
              <img src="/medal.png" alt="Vurdering" className="nav-icon" />
              Vurdering
            </a>
          </>
        ) : (
          // Meny for ikke-innloggede brukere
          <>
            <a href="#">Om Evalion</a>
            <a href="#">Priser</a>
            <a href="#">Support</a>
          </>
        )}

        {/* Hvis bruker er logget inn, vis navn, klasse og utloggingsknapp */}
        {user && (
          <>
            <span style={{ marginRight: "1rem", fontWeight: "bold" }}>
              👤 {user.name} ({user.class})
            </span>
            <button className="btn pink" onClick={handleClick}>Logg ut</button>
          </>
        )}

        {/* Hvis ikke innlogget – vis innloggingsknapp */}
        {!user && (
          <button className="btn pink" onClick={handleClick}>Logg inn</button>
        )}
      </nav>
    </header>
  );
}
