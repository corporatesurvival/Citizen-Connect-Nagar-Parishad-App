
import React, { useState, useEffect } from 'react';
import { Screen, Complaint, ComplaintStatus } from './types';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import RaiseComplaintView from './views/RaiseComplaintView';
import StatusTrackingView from './views/StatusTrackingView';
import { Bell, User, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleLogin = (phone: string) => {
    setIsLoggedIn(true);
    setCurrentScreen('HOME');
  };

  const handleRaiseComplaint = (newComplaint: Omit<Complaint, 'id' | 'timestamp' | 'status'>) => {
    const complaint: Complaint = {
      ...newComplaint,
      id: `CMP-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date(),
      status: ComplaintStatus.RECEIVED
    };
    setComplaints([complaint, ...complaints]);
    setCurrentScreen('STATUS_TRACKING');
  };

  const renderHeader = () => {
    if (currentScreen === 'LOGIN') return null;

    return (
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentScreen !== 'HOME' && (
            <button 
              onClick={() => setCurrentScreen('HOME')}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-600" />
            </button>
          )}
          <h1 className="font-bold text-lg text-slate-800">
            {currentScreen === 'HOME' ? 'Citizen Portal' : 
             currentScreen === 'RAISE_COMPLAINT' ? 'New Complaint' : 'Status Tracking'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <User size={20} />
          </button>
        </div>
      </header>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return <LoginView onLogin={handleLogin} />;
      case 'HOME':
        return (
          <HomeView 
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setCurrentScreen('RAISE_COMPLAINT');
            }} 
            complaints={complaints}
            onViewAll={() => setCurrentScreen('STATUS_TRACKING')}
          />
        );
      case 'RAISE_COMPLAINT':
        return (
          <RaiseComplaintView 
            initialCategory={selectedCategory} 
            onSubmit={handleRaiseComplaint}
            onCancel={() => setCurrentScreen('HOME')}
          />
        );
      case 'STATUS_TRACKING':
        return (
          <StatusTrackingView 
            complaints={complaints} 
          />
        );
      default:
        return <LoginView onLogin={handleLogin} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-xl overflow-x-hidden relative flex flex-col">
      {renderHeader()}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </main>
      
      {/* Bottom Navigation */}
      {currentScreen !== 'LOGIN' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-2 flex justify-between items-center z-50">
          <button 
            onClick={() => setCurrentScreen('HOME')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'HOME' ? 'text-orange-500' : 'text-slate-400'}`}
          >
            <div className={`p-1 rounded-lg ${currentScreen === 'HOME' ? 'bg-orange-50' : ''}`}>
              <LayoutDashboard size={20} />
            </div>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('RAISE_COMPLAINT')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'RAISE_COMPLAINT' ? 'text-orange-500' : 'text-slate-400'}`}
          >
            <div className={`p-1 rounded-lg ${currentScreen === 'RAISE_COMPLAINT' ? 'bg-orange-50' : ''}`}>
              <Trash2 size={20} />
            </div>
            <span className="text-[10px] font-medium">Report</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('STATUS_TRACKING')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'STATUS_TRACKING' ? 'text-orange-500' : 'text-slate-400'}`}
          >
            <div className={`p-1 rounded-lg ${currentScreen === 'STATUS_TRACKING' ? 'bg-orange-50' : ''}`}>
              <BadgeCheck size={20} />
            </div>
            <span className="text-[10px] font-medium">Status</span>
          </button>
        </nav>
      )}
    </div>
  );
};

// Local component helpers to simulate icons for nav
const LayoutDashboard = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/>
  </svg>
);

const Trash2 = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);

const BadgeCheck = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default App;
