import React from 'react';
import { useSignals } from '../hooks/useSignals';
import { useAuth } from '../contexts/AuthContext';
import { Radio, Lock, ShieldAlert, X } from 'lucide-react';

export const ActiveOperations: React.FC = () => {
  const { user } = useAuth();
  const { signals, deleteSignal } = useSignals();
  
  // Filter for active signals (last 4 hours)
  const activeSignals = signals.filter(s => {
    const age = Date.now() - new Date(s.created_at).getTime();
    return age < 4 * 60 * 60 * 1000;
  });

  if (activeSignals.length === 0) return null;

  return (
    <div className="mt-auto px-4 pb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Radio size={12} className="text-amber-500 animate-pulse" />
        Active Operations
      </div>
      
      <div className="space-y-2">
        {activeSignals.map(signal => {
          const isMe = signal.user_id === user?.id;
          
          return (
            <div 
              key={signal.id} 
              className={`relative p-2 rounded border text-xs group ${
                isMe 
                  ? 'bg-indigo-900/20 border-indigo-500/30 text-indigo-200' 
                  : 'bg-amber-900/10 border-amber-900/30 text-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  {isMe ? <Lock size={10} /> : <ShieldAlert size={10} />}
                  <span className="truncate max-w-[120px]">{signal.area}</span>
                </div>
                {isMe && (
                   <button 
                     onClick={() => deleteSignal(signal.id)}
                     className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-white"
                     title="Release Lock"
                   >
                     <X size={10} />
                   </button>
                )}
              </div>
              
              <p className="opacity-70 leading-tight line-clamp-2 text-[10px]">
                {signal.message}
              </p>
              
              {!isMe && (
                 <div className="mt-1.5 pt-1.5 border-t border-amber-900/20 flex justify-between items-center opacity-50">
                    <span className="text-[9px] uppercase tracking-wider">Locked by Peer</span>
                    <span className="text-[9px] font-mono">{new Date(signal.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};