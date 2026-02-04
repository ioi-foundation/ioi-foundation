import React, { useState } from 'react';
import { View } from '../types';
import { LayoutDashboard, FileText, Scroll, Archive, LineChart, LogOut, Bell, Settings, Lock, Database, Download, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { IOILogo } from './ui/IOILogo';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { generateMasterBackup } from '../utils/backupGenerator';
import { ActiveOperations } from './ActiveOperations';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onClose }) => {
  const { user, logout, updatePassword } = useAuth();
  const { unreadCount } = useNotifications();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });
  const [pwStatus, setPwStatus] = useState<{msg: string, type: 'error' | 'success'} | null>(null);

  const navItems: { id: View; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'specs', label: 'Specs', icon: FileText },
    { id: 'quests', label: 'Quests', icon: Scroll },
    { id: 'archives', label: 'Archives', icon: Archive },
    { id: 'tge', label: 'TGE Ledger', icon: LineChart },
  ];

  const handlePasswordUpdate = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
        setPwStatus({ msg: 'New passwords do not match.', type: 'error' });
        return;
    }
    if (passwordForm.new.length < 6) {
        setPwStatus({ msg: 'Password must be at least 6 characters.', type: 'error' });
        return;
    }

    const res = await updatePassword(passwordForm.old, passwordForm.new);
    if (res.success) {
        setPwStatus({ msg: 'Access code updated successfully.', type: 'success' });
        setPasswordForm({ old: '', new: '', confirm: '' });
        setTimeout(() => setIsSettingsOpen(false), 2000);
    } else {
        setPwStatus({ msg: res.message || 'Failed to update.', type: 'error' });
    }
  };

  return (
    <>
    {/* 
       RESPONSIVE CONTAINER:
       - On Desktop (md+): Translate 0 (Always visible), bg-transparent/50
       - On Mobile: Translate based on isOpen, bg-zinc-900 (Opaque)
    */}
    <div className={`
      w-64 border-r border-zinc-800 bg-zinc-900/95 md:bg-zinc-900/50 flex flex-col h-full 
      fixed left-0 top-0 backdrop-blur-sm z-50 transition-transform duration-300 shadow-2xl md:shadow-none
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <IOILogo className="w-8 h-8" />
          <h1 className="text-xl font-serif font-bold text-zinc-100 tracking-wider">IOI Foundation</h1>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="md:hidden text-zinc-500 hover:text-white">
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all text-sm font-medium ${
                isActive 
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-indigo-400' : ''} />
                {item.label}
              </div>
              
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-indigo-600 text-[10px] text-white font-bold animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <ActiveOperations />

      {user && (
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/20">
          <button 
             onClick={() => setIsSettingsOpen(true)}
             className="flex items-center gap-3 px-2 py-2 mb-2 w-full hover:bg-zinc-800 rounded-md transition-colors text-left group"
          >
            <img 
              src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
              alt={user.username} 
              className="w-8 h-8 rounded-full border border-zinc-700 group-hover:border-zinc-500"
            />
            <div className="flex flex-col overflow-hidden flex-1">
              <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-zinc-100">{user.username}</span>
              <span className="text-xs text-zinc-500 truncate group-hover:text-zinc-400">{user.role}</span>
            </div>
            <Settings size={14} className="text-zinc-600 group-hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 py-1"
          >
            <LogOut size={12} /> Disconnect
          </button>
        </div>
      )}
    </div>

    <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="User Security">
        <div className="space-y-6">
            <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 flex items-start gap-3">
                <div className="p-2 bg-indigo-900/20 rounded-full text-indigo-400">
                    <Lock size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-zinc-200">Rotate Access Key</h4>
                    <p className="text-xs text-zinc-500 mt-1">Update the personal access code used to sign sessions.</p>
                </div>
            </div>

            <div className="space-y-4">
                <Input 
                    type="password" 
                    label="Current Access Key" 
                    value={passwordForm.old}
                    onChange={(e) => setPasswordForm({...passwordForm, old: e.target.value})}
                />
                <Input 
                    type="password" 
                    label="New Access Key" 
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                />
                <Input 
                    type="password" 
                    label="Confirm New Key" 
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                />
            </div>

            {pwStatus && (
                <div className={`text-xs p-2 rounded ${pwStatus.type === 'error' ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'}`}>
                    {pwStatus.msg}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
                <Button onClick={handlePasswordUpdate} disabled={!passwordForm.old || !passwordForm.new}>Update Key</Button>
            </div>

            {user?.role === 'Maintainer' && (
                <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 flex items-start gap-3 mt-6 border-t pt-6">
                    <div className="p-2 bg-emerald-900/20 rounded-full text-emerald-400">
                        <Database size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-zinc-200">System Snapshot</h4>
                        <p className="text-xs text-zinc-500 mt-1 mb-3">
                            Generate a full SQL dump of the current state. This file can be run directly in the Supabase SQL Editor to restore the database.
                        </p>
                        <Button 
                            onClick={generateMasterBackup} 
                            variant="secondary" 
                            size="sm" 
                            className="w-full gap-2 border border-zinc-700"
                        >
                            <Download size={14} /> Download Master Backup (.sql)
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </Modal>
    </>
  );
};