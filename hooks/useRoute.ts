import { useState, useEffect } from 'react';
import { View } from '../types';

export const useRoute = (defaultView: View = 'dashboard') => {
  // 1. Initialize state from current Hash
  const getHashView = (): View => {
    const hash = window.location.hash.replace('#', '');
    const validViews: View[] = ['dashboard', 'specs', 'quests', 'archives', 'tge', 'notifications'];
    return validViews.includes(hash as View) ? (hash as View) : defaultView;
  };

  const [currentView, setCurrentView] = useState<View>(getHashView);

  // 2. Listen for external hash changes (e.g. Back button)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getHashView());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Update Hash when internal state changes
  const navigate = (view: View) => {
    window.location.hash = view;
    setCurrentView(view);
  };

  return { currentView, navigate };
};