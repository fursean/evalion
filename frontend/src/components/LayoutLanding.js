import HeaderNav from "./HeaderNav";
import "./LandingStyle.css";

export default function LayoutLanding({ children }) {
  return (
    <div className="layout-landing">
      <HeaderNav />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
