
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, UserProfile, HealthLog, WellnessRoutine } from '../types.ts';

interface HealthContextType extends AppState {
  login: (profile: UserProfile) => void;
  logout: () => void;
  addLog: (log: Omit<HealthLog, 'id'>) => void;
  addRoutine: (routine: WellnessRoutine) => void;
  togglePremium: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('wellsphere_data');
      return saved ? JSON.parse(saved) : { user: null, logs: [], routines: [] };
    } catch (e) {
      return { user: null, logs: [], routines: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem('wellsphere_data', JSON.stringify(state));
  }, [state]);

  const login = (profile: UserProfile) => setState(prev => ({ ...prev, user: profile }));
  const logout = () => setState({ user: null, logs: [], routines: [] });
  
  const addLog = (logData: Omit<HealthLog, 'id'>) => {
    const newLog: HealthLog = { ...logData, id: Math.random().toString(36).substr(2, 9) };
    setState(prev => ({ ...prev, logs: [newLog, ...prev.logs] }));
  };

  const addRoutine = (routine: WellnessRoutine) => {
    setState(prev => ({ ...prev, routines: [routine, ...prev.routines] }));
  };

  const togglePremium = () => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, isPremium: true } : null
      }));
    }
  };

  return (
    <HealthContext.Provider value={{ ...state, login, logout, addLog, addRoutine, togglePremium }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) throw new Error('useHealth must be used within a HealthProvider');
  return context;
};
