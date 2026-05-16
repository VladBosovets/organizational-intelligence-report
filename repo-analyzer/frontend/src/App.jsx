import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Dependencies from './pages/Dependencies';
import Risk from './pages/Risk';
import Efficiency from './pages/Efficiency';
import AnalyzeStart from './pages/AnalyzeStart';
import AnalyzeProgress from './pages/AnalyzeProgress';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<AnalyzeStart />} />
          <Route path="/analyze/progress" element={<AnalyzeProgress />} />
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
