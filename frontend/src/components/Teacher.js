import { useNavigate } from "react-router-dom";
import LayoutLanding from "./LayoutLanding";
import "./StudentStyle.css"; // OBS: Dette bør kanskje hete TeacherStyle.css?

// Komponent for lærerens startsiden / dashboard
export default function Teacher() {
  const navigate = useNavigate();

  // Funksjoner/bokser som læreren kan velge mellom
  const features = [
    {
      title: "MINE PRØVER",
      image: "/clipboard.png",
      bg: "#d2edfd", // Blå bakgrunn
      route: "/teacher/tests",
    },
    {
      title: "MONITOR",
      image: "/monitor.png",
      bg: "#fffaa5", // Gul bakgrunn
      route: "#", // Ikke aktiv ennå
    },
    {
      title: "VURDERING",
      image: "/medal.png",
      bg: "#dfffd7", // Grønn bakgrunn
      route: "#", // Ikke aktiv ennå
    },
  ];

  return (
    <LayoutLanding>
      <div className="student-feature-container">
        {/* Mapper over funksjoner og viser som klikkbare bokser */}
        {features.map((item, index) => (
          <div
            key={index}
            className="student-feature-box"
            style={{ backgroundColor: item.bg, cursor: "pointer" }}
            onClick={() => item.route !== "#" && navigate(item.route)}
          >
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </LayoutLanding>
  );
}
