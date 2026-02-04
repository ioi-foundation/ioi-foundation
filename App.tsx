import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SpecViewer } from './components/SpecViewer';
import { QuestBoard } from './components/QuestBoard';
import { Archives } from './components/Archives';
import { TGEDashboard } from './components/TGEDashboard';
import { NotificationCenter } from './components/NotificationCenter';
import { LoginGate } from './components/LoginGate';
import { LandingPage } from './components/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import { View } from './types';
import { ToastContainer } from './components/ui/Toast';
import { Omnibar } from './components/Omnibar';
import { useRoute } from './hooks/useRoute';
import { Menu } from 'lucide-react'; // Import Menu icon

const InternalSystem: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const { toasts, removeToast } = useNotifications();
  const { currentView, navigate } = useRoute('dashboard');
  
  // NEW: Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <LoginGate />;
  }

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-hidden flex">
      
      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-900/90 backdrop-blur border-b border-zinc-800 flex items-center px-4 z-40">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 -ml-2 text-zinc-400 hover:text-white"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
        <span className="ml-2 font-serif font-bold text-zinc-100">IOI Nexus</span>
      </div>

      <Sidebar 
        currentView={currentView} 
        onChangeView={(v) => { navigate(v); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* MAIN CONTENT AREA */}
      {/* 
         - md:ml-64: Margin on desktop to make room for sidebar
         - pt-14: Top padding on mobile for header
         - md:pt-0: No top padding on desktop
      */}
      <main className="flex-1 md:ml-64 h-screen flex flex-col min-w-0 pt-14 md:pt-0 transition-all duration-300">
        <div className="flex-1 p-4 md:p-8 overflow-hidden max-w-[1920px] w-full mx-auto">
          {(() => {
            switch (currentView) {
              case 'dashboard': return <Dashboard onChangeView={navigate} />;
              case 'notifications': return <NotificationCenter onChangeView={navigate} />;
              case 'specs': return <SpecViewer />;
              case 'quests': return <QuestBoard />;
              case 'archives': return <Archives />;
              case 'tge': return <TGEDashboard />;
              default: return <Dashboard onChangeView={navigate} />;
            }
          })()}
        </div>
      </main>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Omnibar onNavigate={navigate} />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(() => {
    return !!localStorage.getItem('ioi_nexus_user_id');
  });

  return (
    <AuthProvider>
      <NotificationProvider>
        {isAppMode ? (
          <InternalSystem onLogout={() => setIsAppMode(false)} />
        ) : (
          <LandingPage onEnterApp={() => setIsAppMode(true)} />
        )}
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;