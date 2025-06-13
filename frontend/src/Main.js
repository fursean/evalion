import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import ProtectedRoute from "./components/ProtectedRoute";
import TeacherTests from "./components/TeacherTests";
import CreateNewTest from "./components/CreateNewTest";

// Hovedkomponent som definerer alle ruter (sider) i applikasjonen
export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standard landingsside og innloggingsside */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Beskyttet elevside – kun tilgjengelig for elever */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <Student />
            </ProtectedRoute>
          }
        />

        {/* Lærerens dashboard */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        {/* Side som viser lærerens prøver */}
        <Route
          path="/teacher/tests"
          element={
            <ProtectedRoute role="teacher">
              <TeacherTests />
            </ProtectedRoute>
          }
        />

        {/* Side for å lage ny prøve */}
        <Route
          path="/teacher/create-new-test"
          element={
            <ProtectedRoute role="teacher">
              <CreateNewTest />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
