import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import { Ubike } from './models/ubike';
import agent from './api/agent';

export default function App() {

  const [data, setData] = useState<Ubike[]>([]);

  useEffect(() => {
    agent.list().then(response => {
      setData(response);
    })
  })

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={
            <>
              <h1>測驗</h1>
              <Link to="page1"><button>Question 1</button></Link>
              <Link to="page2"><button>Question 2</button></Link>
              <Link to="page3"><button>Question 3</button></Link>
              <Link to="page4"><button>Question 4</button></Link>
            </>
          } />
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
          <Route path="page4" element={<Page4 data={data} />} />
          <Route path="instructions" element={<Page4 data={data} />} />
          <Route path="charging" element={<Page4 data={data} />} />
          <Route path="news" element={<Page4 data={data} />} />
          <Route path="activity" element={<Page4 data={data} />} />
          <Route path="stop" element={<Page4 data={data} />} />
          <Route path="login" element={<Page4 data={data} />} />
        </Routes>
      </div>
    </Router>
  );
}