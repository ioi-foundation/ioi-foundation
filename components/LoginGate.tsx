import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, AlertCircle, ArrowRight, Lock, User, Terminal } from 'lucide-react';
import { IOILogo } from './ui/IOILogo';
import { BootSequence } from './BootSequence';

export const LoginGate: React.FC = () => {
  const { login, loading } = useAuth();
  
  // Stages: 'IDENTITY' -> 'AUTH' -> 'BOOT' -> (Complete handled by App wrapper)
  const [stage, setStage] = useState<'IDENTITY' | 'AUTH' | 'BOOT'>('IDENTITY');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Just checks if username is empty (Client side only for now)
  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStage('AUTH');
    setError('');
  };

  // Step 2: The actual RPC Login
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    
    setIsSubmitting(true);
    setError('');

    // Secure Login via RPC
    const result = await login(username, password);
    
    if (result.success) {
      setStage('BOOT');
      // Note: The AuthContext 'user' state will update, which typically triggers a re-render in App.tsx.
      // However, for this visual flow, we are not blocking the context update, so the component 
      // might unmount before BOOT completes if the parent (App.tsx) immediately switches views.
      // In a real-world scenario, we'd lift the "isBooting" state to the App context or 
      // delay the setUser call. For this tactical update, we accept the standard behavior
      // where success immediately grants access. The BootSequence file is available for future
      // integration if we decide to delay the main app render.
    } else {
      setError(result.message || 'Authentication failed');
      setIsSubmitting(false);
    }
  };

  if (loading) return null; 

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-200">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl bg-zinc-900/50 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <IOILogo className="w-16 h-16 mb-4" />
          <h1 className="text-3xl font-serif font-bold tracking-wider text-zinc-50">IOI Foundation</h1>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-zinc-500">
            <span className={`w-2 h-2 rounded-full ${stage === 'IDENTITY' ? 'bg-zinc-600' : 'bg-green-500'}`}></span>
            <span>SECURE TERMINAL ACCESS</span>
          </div>
        </div>

        {/* STEP 1: IDENTITY */}
        {stage === 'IDENTITY' && (
          <form onSubmit={handleIdentitySubmit} className="space-y-6 relative z-10 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-2">
                <User size={12} /> Identity Handle
              </label>
              <Input 
                placeholder="e.g. k4rl"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                className="bg-zinc-950/80 border-zinc-700"
              />
            </div>
            <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 group">
              Proceed <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        )}

        {/* STEP 2: AUTHENTICATION */}
        {stage === 'AUTH' && (
          <form onSubmit={handleAuthSubmit} className="space-y-6 relative z-10 animate-in slide-in-from-right-4 duration-300">
            {/* Identity Badge */}
            <div className="flex items-center justify-between p-3 rounded bg-zinc-950/50 border border-zinc-800">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                    {username.charAt(0).toUpperCase()}
                 </div>
                 <div>
                    <div className="text-xs text-zinc-500 uppercase">Authenticating</div>
                    <div className="text-sm font-medium text-zinc-200">{username}</div>
                 </div>
               </div>
               <button 
                 type="button" 
                 onClick={() => { setStage('IDENTITY'); setPassword(''); setError(''); }}
                 className="text-xs text-zinc-500 hover:text-zinc-300 underline"
               >
                 Change
               </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1">
                <Lock size={12} /> Access Code
              </label>
              <Input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                className="bg-zinc-950/80 border-zinc-700"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-900/10 p-3 rounded border border-red-900/20 animate-in shake">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-0" 
              disabled={isSubmitting || !password}
            >
              {isSubmitting ? (
                 <span className="flex items-center gap-2">
                   <Loader2 className="animate-spin" size={16} /> Decrypting Session...
                 </span>
              ) : 'Establish Uplink'}
            </Button>
          </form>
        )}
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
      </div>
      
      <div className="mt-8 text-center text-[10px] text-zinc-600 font-mono">
         <p>ENCRYPTION: AES-256-GCM</p>
         <p>GATEWAY: US-EAST-1</p>
      </div>
    </div>
  );
};