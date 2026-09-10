import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// TODO (sesi frontend): halaman-halaman ini akan dibangun berdasarkan mockup
// import NotesPage from "./pages/NotesPage";

function Placeholder({ label }) {
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <p>Halaman "{label}" akan dibangun di sesi frontend.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/notes" element={<Placeholder label="Notes" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
