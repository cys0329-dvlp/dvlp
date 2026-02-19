
import React, { useState } from 'react';
import { HealthProvider, useHealth } from './store/healthStore';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LogForm from './components/LogForm';
import Pricing from './components/Pricing';
import Login from './components/Login';

const MainContent: React.FC = () => {
  const { user } = useHealth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'log' | 'premium'>('dashboard');

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'log' && <LogForm onComplete={() => setActiveTab('dashboard')} />}
        {activeTab === 'premium' && <Pricing />}
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        &copy; 2024 WellSphere. All rights reserved.
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HealthProvider>
      <MainContent />
    </HealthProvider>
  );
};

export default App;
