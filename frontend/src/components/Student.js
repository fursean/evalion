import LayoutLanding from "./LayoutLanding";
import "./StudentStyle.css";

export default function Student() {
  const features = [
    {
      title: "MINE PRØVER",
      image: "/clipboard.png",
      bg: "#d2edfd"
    },
    {
      title: "MONITOR",
      image: "/monitor.png",
      bg: "#fffaa5"
    },
    {
      title: "VURDERING",
      image: "/medal.png",
      bg: "#dfffd7"
    },
  ];

  return (
    <LayoutLanding>
      <div className="student-feature-container">
        {features.map((item, index) => (
          <div
            key={index}
            className="student-feature-box"
            style={{ backgroundColor: item.bg }}
          >
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </LayoutLanding>
  );
}
