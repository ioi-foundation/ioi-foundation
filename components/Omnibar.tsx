import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Scroll, User, ArrowRight, LayoutDashboard, Radio, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { View } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface OmnibarProps {
  onNavigate: (view: View) => void;
}

type SearchResult = {
  id: string;
  type: 'SPEC' | 'QUEST' | 'PROFILE' | 'ACTION' | 'VIEW';
  title: string;
  subtitle?: string;
  action?: () => void;
  view?: View;
};

export const Omnibar: React.FC<OmnibarProps> = ({ onNavigate }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      fetchSearchIndex();
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build the Search Index
  const fetchSearchIndex = async () => {
    const [specs, quests, profiles] = await Promise.all([
      supabase.from('specs').select('id, title, filename'),
      supabase.from('quests').select('id, title, status'),
      supabase.from('profiles').select('id, username, role')
    ]);

    const index: SearchResult[] = [];

    // 1. Static Actions & Views
    index.push(
      { id: 'nav-dash', type: 'VIEW', title: 'Dashboard', subtitle: 'Operations Center', view: 'dashboard' },
      { id: 'nav-specs', type: 'VIEW', title: 'Specifications', subtitle: 'Documentation & Standards', view: 'specs' },
      { id: 'nav-quests', type: 'VIEW', title: 'Quest Board', subtitle: 'Tasks & Governance', view: 'quests' },
      { id: 'nav-tge', type: 'VIEW', title: 'TGE Ledger', subtitle: 'Economic Evidence', view: 'tge' },
      { id: 'act-logout', type: 'ACTION', title: 'Disconnect Session', subtitle: 'Log out securely', action: logout }
    );

    // 2. Dynamic Content
    if (specs.data) {
      specs.data.forEach(s => index.push({
        id: s.id, type: 'SPEC', title: s.title, subtitle: s.filename, view: 'specs' // Nav logic would need deeper linking in V2
      }));
    }
    if (quests.data) {
      quests.data.forEach(q => index.push({
        id: q.id, type: 'QUEST', title: q.title, subtitle: `${q.status} • #${q.id}`, view: 'quests'
      }));
    }
    if (profiles.data) {
      profiles.data.forEach(p => index.push({
        id: p.id, type: 'PROFILE', title: p.username, subtitle: p.role, view: 'dashboard' // Just go to dash for now
      }));
    }

    setResults(index);
  };

  // Filter Logic
  const filteredResults = results.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.subtitle?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8); // Limit to 8 items

  // Keyboard Navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeResult(filteredResults[selectedIndex]);
    }
  };

  const executeResult = (item: SearchResult) => {
    if (!item) return;
    if (item.action) item.action();
    if (item.view) onNavigate(item.view);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col">
        
        {/* Input Area */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <Search size={18} className="text-zinc-500" />
          <input 
            ref={inputRef}
            className="flex-1 bg-transparent text-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
            placeholder="Type a command or search..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleInputKeyDown}
          />
          <div className="text-[10px] font-mono text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">ESC</div>
        </div>

        {/* Results Area */}
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-1 bg-zinc-950">
          {filteredResults.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm italic">
              No matching frequencies found.
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => executeResult(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors ${
                    isActive ? 'bg-indigo-600/10 border border-indigo-500/30' : 'hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`}>
                    {item.type === 'VIEW' && <LayoutDashboard size={14} />}
                    {item.type === 'SPEC' && <FileText size={14} />}
                    {item.type === 'QUEST' && <Scroll size={14} />}
                    {item.type === 'PROFILE' && <User size={14} />}
                    {item.type === 'ACTION' && <Radio size={14} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isActive ? 'text-indigo-100' : 'text-zinc-300'}`}>
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className={`text-xs truncate ${isActive ? 'text-indigo-300/70' : 'text-zinc-600'}`}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>

                  {isActive && <ArrowRight size={14} className="text-indigo-400" />}
                </button>
              );
            })
          )}
        </div>
        
        {/* Footer */}
        <div className="px-3 py-1.5 bg-zinc-900 border-t border-zinc-800 text-[10px] text-zinc-600 flex justify-end gap-3">
           <span>Select <span className="text-zinc-400">↵</span></span>
           <span>Navigate <span className="text-zinc-400">↑↓</span></span>
        </div>
      </div>
    </div>
  );
};