import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Ubike } from './models/ubike';
import agent from './api/agent';
import Stop from './pages/Stop';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [data, setData] = useState<Ubike[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    agent.list().then(response => {
      setData(response);
    })
  }, [data])

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <Router>
      <Routes>
        <Route path="" element={<Dashboard handleClick={handleClick} menuOpen={menuOpen} />}>
          <Route index element={<Navigate to="/stop" replace />} />
          <Route path="stop" element={<Stop data={data} />} />
          <Route path="instructions" element={<Stop data={data} />} />
          <Route path="charging" element={<Stop data={data} />} />
          <Route path="news" element={<Stop data={data} />} />
          <Route path="activity" element={<Stop data={data} />} />
          <Route path="login" element={<Stop data={data} />} />
        </Route>
      </Routes>
    </Router>
  );
}