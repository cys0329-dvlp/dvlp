
import React from 'react';
import { useHealth } from '../store/healthStore';

interface Props {
  activeTab: 'dashboard' | 'log' | 'premium';
  setActiveTab: (tab: 'dashboard' | 'log' | 'premium') => void;
}

const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useHealth();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <span className="text-xl font-bold text-gray-800">WellSphere</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'}`}
          >
            대시보드
          </button>
          <button 
            onClick={() => setActiveTab('log')}
            className={`text-sm font-medium transition-colors ${activeTab === 'log' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'}`}
          >
            기록하기
          </button>
          <button 
            onClick={() => setActiveTab('premium')}
            className={`text-sm font-medium transition-colors ${activeTab === 'premium' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'}`}
          >
            프리미엄 {user?.isPremium && <span className="ml-1 text-[10px] bg-yellow-400 text-yellow-900 px-1.5 rounded-full">PRO</span>}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 hidden sm:inline">{user?.name}님</span>
          <button 
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
