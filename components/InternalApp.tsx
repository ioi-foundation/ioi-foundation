import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { SpecViewer } from './SpecViewer';
import { QuestBoard } from './QuestBoard';
import { Archives } from './Archives';
import { TGEDashboard } from './TGEDashboard';
import { NotificationCenter } from './NotificationCenter';
import { LoginGate } from './LoginGate';
import { ToastContainer } from './ui/Toast';
import { Omnibar } from './Omnibar';
import { IOILogo } from './ui/IOILogo';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useRoute } from '../hooks/useRoute';
import { SeoHead } from './SeoHead';

const INTERNAL_SEO = {
  title: 'IOI Nexus | Internal Application',
  description: 'Internal application surface for IOI Foundation operators.',
  robots: 'noindex,nofollow,noarchive',
  canonical: 'https://ioi.foundation/',
  htmlLang: 'en-US',
  ogTitle: 'IOI Nexus',
  ogDescription: 'Internal application surface for IOI Foundation operators.',
  ogType: 'website',
  ogImage: 'https://ioi.foundation/og-image.svg',
  siteName: 'IOI Foundation',
  locale: 'en_US',
  alternates: [],
  structuredData: [],
};

const InternalApp: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const { toasts, removeToast } = useNotifications();
  const { currentView, navigate } = useRoute('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return (
      <>
        <SeoHead {...INTERNAL_SEO} />
        <LoginGate />
      </>
    );
  }

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <>
      <SeoHead {...INTERNAL_SEO} />
      <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-hidden flex">
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-900/90 backdrop-blur border-b border-zinc-800 flex items-center px-4 z-40">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-400 hover:text-white"
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
          <div className="ml-2 flex items-center gap-2 min-w-0">
            <IOILogo className="w-8 h-8 flex-shrink-0" />
            <span className="font-serif font-bold text-zinc-100 tracking-wide">IOI Nexus</span>
          </div>
        </div>

        <Sidebar
          currentView={currentView}
          onChangeView={(view) => {
            navigate(view);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 md:ml-64 h-screen flex flex-col min-w-0 pt-14 md:pt-0 transition-all duration-300">
          <div className="flex-1 p-4 md:p-8 overflow-hidden max-w-[1920px] w-full mx-auto">
            {(() => {
              switch (currentView) {
                case 'dashboard':
                  return <Dashboard onChangeView={navigate} />;
                case 'notifications':
                  return <NotificationCenter onChangeView={navigate} />;
                case 'specs':
                  return <SpecViewer />;
                case 'quests':
                  return <QuestBoard />;
                case 'archives':
                  return <Archives />;
                case 'tge':
                  return <TGEDashboard />;
                default:
                  return <Dashboard onChangeView={navigate} />;
              }
            })()}
          </div>
        </main>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Omnibar onNavigate={navigate} />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default InternalApp;
