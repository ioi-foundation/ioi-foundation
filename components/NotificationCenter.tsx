import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Bell, Check, Info, AlertTriangle, CheckCircle, ArrowRight, Loader2, Filter, Trash2, Mail } from 'lucide-react';
import { View } from '../types';

interface NotificationCenterProps {
  onChangeView: (view: View) => void;
}

type FilterType = 'ALL' | 'ASSIGNMENT' | 'ALERT' | 'SYSTEM';

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onChangeView }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const getIcon = (type: string) => {
    switch (type) {
      case 'ASSIGNMENT': return <AlertTriangle size={18} className="text-amber-400" />;
      case 'SUCCESS': return <CheckCircle size={18} className="text-emerald-400" />;
      case 'ALERT': return <Bell size={18} className="text-indigo-400" />;
      default: return <Info size={18} className="text-zinc-400" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SYSTEM') return n.type === 'SUCCESS' || n.type === 'INFO';
    return n.type === activeFilter;
  });

  if (loading) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
          <p>Syncing Comms Link...</p>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-zinc-50">Transmission Log</h2>
          <p className="text-zinc-400 text-sm mt-1">
            <span className="text-indigo-400 font-mono font-bold">{unreadCount}</span> unread signals waiting for review.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2 text-xs h-8">
            <Check size={14} /> Ack All
          </Button>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter size={14} className="text-zinc-500 mr-2" />
        
        <button 
          onClick={() => setActiveFilter('ALL')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${activeFilter === 'ALL' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
        >
          All Feeds
        </button>
        <button 
          onClick={() => setActiveFilter('ASSIGNMENT')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${activeFilter === 'ASSIGNMENT' ? 'bg-amber-900/30 text-amber-300 border-amber-800' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
        >
          Assignments
        </button>
        <button 
          onClick={() => setActiveFilter('ALERT')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${activeFilter === 'ALERT' ? 'bg-indigo-900/30 text-indigo-300 border-indigo-800' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
        >
          Alerts
        </button>
        <button 
          onClick={() => setActiveFilter('SYSTEM')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${activeFilter === 'SYSTEM' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-800' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
        >
          System Logs
        </button>
      </div>

      {/* LIST SECTION */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-zinc-800/50 rounded-lg bg-zinc-900/20">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-4 text-zinc-600">
               {activeFilter === 'ALL' ? <Mail size={20} /> : <Filter size={20} />}
            </div>
            <p className="text-zinc-500 text-sm">No transmissions found in this frequency.</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`transition-all duration-300 group ${!notification.is_read ? 'bg-zinc-900 border-indigo-500/30 ring-1 ring-indigo-500/10' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}`}
            >
              <CardContent className="p-4 flex gap-4">
                {/* Icon Column */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-950 border border-zinc-800 shadow-sm`}>
                    {getIcon(notification.type)}
                    </div>
                    {!notification.is_read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" title="Unread"></div>
                    )}
                </div>
                
                {/* Content Column */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className={`text-sm font-medium ${!notification.is_read ? 'text-zinc-100' : 'text-zinc-400'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-[10px] text-zinc-600 font-mono whitespace-nowrap flex-shrink-0">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3 line-clamp-2">
                    {notification.message}
                  </p>

                  {/* Action Bar */}
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {notification.link && (
                      <Button 
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                            markAsRead(notification.id);
                            onChangeView(notification.link as View);
                        }}
                        className="h-7 text-xs gap-2 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                      >
                        Open Resource <ArrowRight size={10} />
                      </Button>
                    )}
                    {!notification.is_read ? (
                       <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                        className="h-7 text-xs text-zinc-500 hover:text-zinc-300"
                      >
                        <Check size={12} className="mr-1" /> Dismiss
                      </Button>
                    ) : (
                        <Button 
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-zinc-600 hover:text-zinc-400"
                        // Optional: Add delete logic here if backend supports it
                      >
                        <Trash2 size={12} className="mr-1" /> Clear
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};