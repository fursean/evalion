import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import TestView from "./TestView";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test/:id" element={<TestView />} />
      </Routes>
    </Router>
  );
}

export default Main;
