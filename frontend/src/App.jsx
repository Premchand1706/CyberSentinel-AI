import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import OneClickDemoModal from './components/OneClickDemoModal';

import Dashboard from './pages/Dashboard';
import DigitalTwin from './pages/DigitalTwin';
import UploadTrainer from './pages/UploadTrainer';
import ThreatCenter from './pages/ThreatCenter';
import Vulnerabilities from './pages/Vulnerabilities';
import IncidentReports from './pages/IncidentReports';
import Workflow from './pages/Workflow';

function AppContent() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleDemoNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      <OneClickDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigate={handleDemoNavigate}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col justify-between">
          <Routes>
            <Route path="/" element={<Dashboard key={refreshKey} />} />
            <Route path="/workflow" element={<Workflow key={refreshKey} />} />
            <Route path="/digital-twin" element={<DigitalTwin key={refreshKey} />} />
            <Route path="/threat-center" element={<ThreatCenter key={refreshKey} />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities key={refreshKey} />} />
            <Route path="/upload-trainer" element={<UploadTrainer key={refreshKey} />} />
            <Route path="/reports" element={<IncidentReports key={refreshKey} />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
