import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Quest, Notification, View, Profile } from '../../types';
import { ArrowRight, Vote, CheckSquare, Bell, AlertCircle } from 'lucide-react';

interface MyFocusProps {
  user: Profile | null;
  quests: Quest[];
  notifications: Notification[];
  onNavigate: (view: View) => void;
}

export const MyFocus: React.FC<MyFocusProps> = ({ user, quests, notifications, onNavigate }) => {
  if (!user) return null;

  // 1. Calculate Active Work
  const myWork = quests.filter(q => q.assignee_id === user.id && q.status === 'In Progress');

  // 2. Calculate Governance Duties (Pending Votes)
  // Check if user ID is in votes_for OR votes_against. If not, it's pending.
  const pendingRatifications = quests.filter(q => 
    q.status === 'Proposed' && 
    !q.votes_for.includes(user.id) && 
    !q.votes_against.includes(user.id)
  );

  const pendingVerifications = quests.filter(q => 
    q.status === 'Verification' && 
    !(q.verification_votes_for || []).includes(user.id) && 
    !(q.verification_votes_against || []).includes(user.id)
  );

  // 3. Unread Notifications
  const unreadNotifications = notifications.filter(n => !n.is_read);
  const unreadCount = unreadNotifications.length;

  const hasItems = myWork.length > 0 || pendingRatifications.length > 0 || pendingVerifications.length > 0 || unreadCount > 0;

  if (!hasItems) {
    return (
      <div className="mb-6 p-4 rounded-lg border border-dashed border-zinc-800 flex items-center justify-center gap-3 text-zinc-500 bg-zinc-900/20 animate-in fade-in duration-500">
        <CheckSquare size={16} />
        <span className="text-sm">All systems nominal. You are all caught up.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* CARD 1: ACTIVE TASKS */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <CheckSquare size={14} className="text-indigo-400" /> Active Tasks
            </h4>
            <span className="text-xs font-mono text-zinc-500">{myWork.length}</span>
          </div>
          <div className="space-y-2 flex-1">
            {myWork.length === 0 ? <p className="text-sm text-zinc-600 italic">No active quests.</p> : (
              myWork.slice(0, 3).map(q => (
                <div key={q.id} className="flex justify-between items-start gap-2 group cursor-pointer" onClick={() => onNavigate('quests')}>
                  <span className="text-sm text-zinc-300 truncate group-hover:text-indigo-300 transition-colors">{q.title}</span>
                  <Badge variant="outline" className="text-[10px] shrink-0">#{q.id}</Badge>
                </div>
              ))
            )}
          </div>
          {myWork.length > 0 && (
            <Button size="sm" variant="ghost" className="w-full mt-3 h-6 text-xs text-zinc-500 hover:text-indigo-300" onClick={() => onNavigate('quests')}>
              View Board <ArrowRight size={10} className="ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* CARD 2: GOVERNANCE DUTIES */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Vote size={14} className="text-amber-400" /> Pending Votes
            </h4>
            <span className="text-xs font-mono text-zinc-500">{pendingRatifications.length + pendingVerifications.length}</span>
          </div>
          <div className="space-y-2 flex-1">
            {(pendingRatifications.length === 0 && pendingVerifications.length === 0) ? <p className="text-sm text-zinc-600 italic">No pending votes.</p> : (
              <>
                {pendingRatifications.slice(0, 2).map(q => (
                  <div key={q.id} className="flex justify-between items-center gap-2 cursor-pointer group" onClick={() => onNavigate('quests')}>
                    <span className="text-sm text-zinc-300 truncate group-hover:text-amber-300 transition-colors">Ratify: {q.title}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" title="Ratification Required" />
                  </div>
                ))}
                {pendingVerifications.slice(0, 2).map(q => (
                  <div key={q.id} className="flex justify-between items-center gap-2 cursor-pointer group" onClick={() => onNavigate('quests')}>
                    <span className="text-sm text-zinc-300 truncate group-hover:text-emerald-300 transition-colors">Verify: {q.title}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" title="Verification Required" />
                  </div>
                ))}
              </>
            )}
          </div>
          {(pendingRatifications.length > 0 || pendingVerifications.length > 0) && (
             <Button size="sm" variant="ghost" className="w-full mt-3 h-6 text-xs text-zinc-500 hover:text-amber-300" onClick={() => onNavigate('quests')}>
               Go to Vote <ArrowRight size={10} className="ml-1" />
             </Button>
          )}
        </CardContent>
      </Card>

      {/* CARD 3: ALERTS */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Bell size={14} className="text-rose-400" /> Alerts
            </h4>
            <span className="text-xs font-mono text-zinc-500">{unreadCount}</span>
          </div>
          <div className="space-y-2 flex-1">
             {unreadCount === 0 ? <p className="text-sm text-zinc-600 italic">Inbox zero.</p> : (
                unreadNotifications.slice(0, 3).map(n => (
                    <div key={n.id} className="flex gap-2 items-start cursor-pointer group" onClick={() => onNavigate('notifications')}>
                        <AlertCircle size={12} className="mt-1 shrink-0 text-zinc-500 group-hover:text-rose-400 transition-colors" />
                        <span className="text-sm text-zinc-300 line-clamp-1 group-hover:text-zinc-100 transition-colors">{n.title}</span>
                    </div>
                ))
             )}
          </div>
          {unreadCount > 0 && (
             <Button size="sm" variant="ghost" className="w-full mt-3 h-6 text-xs text-zinc-500 hover:text-rose-300" onClick={() => onNavigate('notifications')}>
               Read All <ArrowRight size={10} className="ml-1" />
             </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};