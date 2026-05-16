import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Dependencies from './pages/Dependencies';
import Risk from './pages/Risk';
import Efficiency from './pages/Efficiency';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dependencies" element={<Dependencies />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/efficiency" element={<Efficiency />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// Made with Bob
