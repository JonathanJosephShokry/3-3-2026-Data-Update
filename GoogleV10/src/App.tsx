import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { TeamPage } from './components/TeamPage';
import { MemberProfile } from './components/MemberProfile';
import { ProjectDetails } from './components/ProjectDetails';
import { AboutPage } from './components/AboutPage';
import { WasabiCards } from './components/WasabiCards';
import { Layout } from './components/Layout';
import { WasabiData } from './types';
import rawData from './data.json';

const App: React.FC = () => {
  const [data, setData] = useState<WasabiData | null>(null);

  useEffect(() => {
    // In a real app, we might fetch this from an API
    // For now, we use the imported JSON
    setData(rawData as WasabiData);
  }, []);

  if (!data) return <div className="flex items-center justify-center min-h-screen">Loading Wasabi System...</div>;

  return (
    <Router>
      <Layout version={data.version}>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/team/:teamId" element={<TeamPage data={data} />} />
          <Route path="/member/:memberId" element={<MemberProfile data={data} />} />
          <Route path="/project/:projectId" element={<ProjectDetails data={data} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cards" element={<WasabiCards data={data} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
