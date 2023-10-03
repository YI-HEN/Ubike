import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Stop from './pages/Stop';
import Dashboard from './pages/Dashboard';

export default function App() {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <Router>
      <Routes>
        <Route path="" element={<Dashboard handleClick={handleClick} menuOpen={menuOpen} />}>
          <Route index element={<Navigate to="/stop" replace />} />
          <Route path="stop" element={<Stop />} />
          <Route path="instructions" element={<Stop />} />
          <Route path="charging" element={<Stop />} />
          <Route path="news" element={<Stop />} />
          <Route path="activity" element={<Stop />} />
          <Route path="login" element={<Stop />} />
        </Route>
      </Routes>
    </Router>
  );
}