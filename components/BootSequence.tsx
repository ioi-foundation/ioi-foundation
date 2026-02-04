import React, { useEffect, useState } from 'react';
import { IOILogo } from './ui/IOILogo';

interface BootSequenceProps {
  onComplete: () => void;
  username: string;
}

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "VERIFYING CRYPTOGRAPHIC HANDSHAKE...",
  "LOADING USER PROFILE...",
  "SYNCING GOVERNANCE LEDGER...",
  "ESTABLISHING SECURE RPC UPLINK...",
  "SYSTEM READY."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, username }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      // Randomize delay slightly for realism
      delay += 300 + Math.random() * 400;
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === BOOT_LOGS.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs">
      <div className="w-full max-w-md space-y-4 p-8">
        <div className="flex justify-center mb-8 animate-pulse">
           <IOILogo className="w-12 h-12 opacity-50" />
        </div>
        
        <div className="space-y-1">
          <div className="text-zinc-300">USER: {username.toUpperCase()}</div>
          <div className="h-px bg-zinc-800 w-full mb-4"></div>
          
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? "text-indigo-400 font-bold" : "text-zinc-400"}>
                {log}
              </span>
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>
    </div>
  );
};