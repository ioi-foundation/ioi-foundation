import React, { Suspense, lazy, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { hasSupabaseConfig } from './lib/supabase';
import { getPublicRouteMatch } from './lib/publicRoutes';

const InternalApp = lazy(() => import('./components/InternalApp'));
const LandingPage = lazy(() => import('./components/LandingPage').then((module) => ({ default: module.LandingPage })));
const CharterPage = lazy(() => import('./components/CharterPage').then((module) => ({ default: module.CharterPage })));
const BylawsPage = lazy(() => import('./components/BylawsPage').then((module) => ({ default: module.BylawsPage })));
const GovernancePage = lazy(() => import('./components/GovernancePage').then((module) => ({ default: module.GovernancePage })));
const ResearchPage = lazy(() => import('./components/ResearchPage').then((module) => ({ default: module.ResearchPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

const AppShellFallback: React.FC = () => <div className="min-h-screen bg-[#0a0a0b]" />;

function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(() => {
    return hasSupabaseConfig && !!localStorage.getItem('ioi_nexus_user_id');
  });

  const publicRoute = getPublicRouteMatch(window.location.pathname);

  const publicPage = (() => {
    switch (publicRoute.routeKey) {
      case 'charter':
        return <CharterPage onEnterApp={() => setIsAppMode(true)} />;
      case 'bylaws':
        return <BylawsPage onEnterApp={() => setIsAppMode(true)} />;
      case 'governance':
        return <GovernancePage onEnterApp={() => setIsAppMode(true)} />;
      case 'research':
        return <ResearchPage onEnterApp={() => setIsAppMode(true)} />;
      case 'home':
        return <LandingPage onEnterApp={() => setIsAppMode(true)} />;
      default:
        return <NotFoundPage onEnterApp={() => setIsAppMode(true)} />;
    }
  })();

  return (
    <AuthProvider>
      <NotificationProvider>
        <Suspense fallback={<AppShellFallback />}>
          {isAppMode ? <InternalApp onLogout={() => setIsAppMode(false)} /> : publicPage}
        </Suspense>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
