import React from 'react';
import { Signal, Profile } from '../../types';
import { AlertOctagon, Radio, X } from 'lucide-react';

interface SignalRadarProps {
  signals: Signal[];
  profiles: Profile[];
  currentUserId: string;
  onClearSignal: (id: string) => void;
}

export const SignalRadar: React.FC<SignalRadarProps> = ({ signals, profiles, currentUserId, onClearSignal }) => {
  // Filter out signals older than 4 hours to prevent "zombie" locks
  const activeSignals = signals.filter(s => {
    const age = Date.now() - new Date(s.created_at).getTime();
    const fourHours = 4 * 60 * 60 * 1000;
    return age < fourHours;
  });

  return (
    <div className="mb-6 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
      <div className="flex items-center gap-2 mb-3">
        <AlertOctagon size={16} className="text-amber-500 animate-pulse" />
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Coordination Signals</h3>
      </div>
      
      {activeSignals.length === 0 ? (
        <div className="text-sm text-zinc-600 italic">No active locks. Systems clear.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeSignals.map(signal => {
            const user = profiles.find(p => p.id === signal.user_id);
            const isMine = signal.user_id === currentUserId;
            
            return (
              <div key={signal.id} className="flex items-start gap-3 p-3 rounded bg-amber-950/20 border border-amber-900/30">
                <div className="mt-1 relative">
                  <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping"></span>
                  <Radio size={16} className="text-amber-500 relative z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-amber-200 truncate pr-2">{signal.area}</span>
                    <span className="text-[10px] text-amber-500/80">{new Date(signal.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-xs text-amber-100/70 leading-relaxed mb-2">{signal.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {user && <img src={user.avatar_url} className="w-4 h-4 rounded-full" alt={user.username} />}
                      <span className="text-[10px] text-zinc-400">{user?.username || 'Unknown'}</span>
                    </div>
                    {isMine && (
                       <button onClick={() => onClearSignal(signal.id)} className="text-[10px] flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
                         <X size={10} /> Clear
                       </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};