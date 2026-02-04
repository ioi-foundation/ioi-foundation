import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export const ToastContainer: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className="pointer-events-auto bg-zinc-900 border border-zinc-800 shadow-2xl rounded-lg p-4 w-80 animate-in slide-in-from-right-10 fade-in duration-300 flex gap-3"
        >
          <div className="mt-0.5">
            {toast.type === 'success' && <CheckCircle size={16} className="text-emerald-400" />}
            {toast.type === 'warning' && <AlertTriangle size={16} className="text-amber-400" />}
            {toast.type === 'info' && <Bell size={16} className="text-indigo-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-zinc-100">{toast.title}</h4>
            <p className="text-xs text-zinc-400 mt-1 leading-snug">{toast.message}</p>
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-zinc-500 hover:text-zinc-300 self-start">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};