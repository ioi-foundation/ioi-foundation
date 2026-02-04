# Codebase Snapshot: ioi-foundation
Created: Tue Feb  3 06:53:30 PM EST 2026
Target: /home/levijosman/depin-network/codebase/ioi-foundation
Line threshold for included files: 10000

## Summary Statistics

* Total files: 13968
* Total directories: 918

### Directory: /home/levijosman/depin-network/codebase/ioi-foundation

#### Directory: components

##### Directory: components/dashboard

###### File: components/dashboard/MyFocus.tsx
###*Size: 8.0K, Lines: 141, Type: Java source, ASCII text*

```
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
};```

##### Directory: components/profile

###### File: components/profile/MemberDossier.tsx
###*Size: 8.0K, Lines: 113, Type: Java source, ASCII text*

```
import React, { useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Profile, Contribution, Quest } from '../../types';
import { Badge } from '../ui/Badge';
import { Shield, Zap, PenTool, GitMerge, Calendar } from 'lucide-react';
import { formatXP } from '../../utils/economics';

interface MemberDossierProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  contributions: Contribution[];
  quests: Quest[];
}

export const MemberDossier: React.FC<MemberDossierProps> = ({ isOpen, onClose, profile, contributions, quests }) => {
  if (!profile) return null;

  // 1. Filter Data for this User
  const userContribs = useMemo(() => 
    contributions.filter(c => c.user_id === profile.id).sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  [contributions, profile.id]);

  // 2. Calculate Derived Stats (Badges)
  const stats = {
    specs: userContribs.filter(c => c.type === 'ADR_AUTHOR').length,
    merges: userContribs.filter(c => c.type === 'CODE_MERGE').length,
    meetings: userContribs.filter(c => c.type === 'MEETING_HOST').length,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Identity Record">
      <div className="space-y-6">
        {/* HEADER: Identity & Rank */}
        <div className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <img 
            src={profile.avatar_url} 
            alt={profile.username} 
            className="w-16 h-16 rounded-full border-2 border-zinc-700" 
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-serif font-bold text-zinc-100">{profile.username}</h2>
                <Badge variant={profile.role === 'Maintainer' ? 'purple' : 'default'} className="mt-1">
                  {profile.role} Clearance
                </Badge>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold text-indigo-400">{formatXP(profile.total_xp)}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Total XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* BADGES / SPECIALIZATIONS */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`p-3 rounded border flex flex-col items-center gap-2 text-center ${stats.specs > 0 ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-zinc-900/30 border-zinc-800 text-zinc-600 opacity-50'}`}>
            <PenTool size={18} />
            <div>
              <span className="block text-xs font-bold">Architect</span>
              <span className="text-[10px]">{stats.specs} Specs</span>
            </div>
          </div>
          <div className={`p-3 rounded border flex flex-col items-center gap-2 text-center ${stats.merges > 5 ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-200' : 'bg-zinc-900/30 border-zinc-800 text-zinc-600 opacity-50'}`}>
            <GitMerge size={18} />
            <div>
              <span className="block text-xs font-bold">Builder</span>
              <span className="text-[10px]">{stats.merges} Merges</span>
            </div>
          </div>
          <div className={`p-3 rounded border flex flex-col items-center gap-2 text-center ${stats.meetings > 2 ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-zinc-900/30 border-zinc-800 text-zinc-600 opacity-50'}`}>
            <Calendar size={18} />
            <div>
              <span className="block text-xs font-bold">Scribe</span>
              <span className="text-[10px]">{stats.meetings} Sessions</span>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY LEDGER */}
        <div>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap size={12} /> Recent Evidence
          </h4>
          <div className="border border-zinc-800 rounded-lg overflow-hidden max-h-[200px] overflow-y-auto custom-scrollbar bg-zinc-950">
            {userContribs.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-600 italic">No recorded activity.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-zinc-800/50">
                  {userContribs.map(c => (
                    <tr key={c.id} className="hover:bg-zinc-900/50">
                      <td className="p-3 text-zinc-500 font-mono whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-zinc-300">
                        {c.description}
                      </td>
                      <td className="p-3 text-right font-bold text-indigo-400">
                        +{c.weight} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};```

##### Directory: components/quest

###### File: components/quest/BlockQuestModal.tsx
###*Size: 4.0K, Lines: 67, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/Input';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface BlockQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  questTitle: string;
  type: 'ratification' | 'verification';
}

export const BlockQuestModal: React.FC<BlockQuestModalProps> = ({ 
  isOpen, onClose, onConfirm, questTitle, type 
}) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason('');
    onClose();
  };

  const isRatification = type === 'ratification';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRatification ? "Block Proposal" : "Reject Verification"}>
      <div className="space-y-4">
        <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-lg flex gap-3 text-red-200">
          <ShieldAlert className="shrink-0 text-red-500" />
          <div className="text-sm">
            <p className="font-bold mb-1">Governance Interruption</p>
            <p className="opacity-80 leading-relaxed">
              You are about to {isRatification ? 'block consensus' : 'reject the proof of work'} for 
              <span className="font-mono text-red-100 mx-1">{questTitle}</span>.
              This requires a formal reason on the ledger.
            </p>
          </div>
        </div>

        <TextArea 
          label="Rationale (Required)" 
          placeholder={isRatification 
            ? "e.g., Security risk in auth module, duplicate of Q#104..." 
            : "e.g., Tests failed, PR does not match spec..."}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[120px] bg-zinc-950 border-red-900/30 focus:border-red-500/50"
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!reason.trim()} 
            className="bg-red-600 hover:bg-red-500 text-white border-0 gap-2"
          >
            <AlertTriangle size={16} />
            {isRatification ? "Cast Block Vote" : "Reject Submission"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};```

###### File: components/quest/QuestCard.tsx
###*Size: 16K, Lines: 308, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { Quest, QuestStatus, Profile } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AlertTriangle, RefreshCw, UserPlus, ExternalLink, ThumbsUp, ThumbsDown, FileCheck, Copy, Check, GripVertical } from 'lucide-react';
import { getDifficultyConfig, getHealthStatus, calculateDaysSinceUpdate, calculateConsensus } from '../../utils/questUtils';

interface QuestCardProps {
  quest: Quest;
  profiles: Profile[];
  currentUserId: string;
  isAdmin: boolean;
  onVote: (id: string, decision: 'for' | 'against', type: 'ratification' | 'verification', reason?: string) => void;
  onStatusChange: (id: string, status: QuestStatus) => void;
  onCheckIn: (id: string) => void;
  onReclaim: (id: string) => void;
  verificationLink: string;
  setVerificationLink: (link: string) => void;
  onClick: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  profiles,
  currentUserId,
  isAdmin,
  onVote,
  onStatusChange,
  onCheckIn,
  onReclaim,
  verificationLink,
  setVerificationLink,
  onClick
}) => {
  const [copied, setCopied] = useState(false);

  const assignee = profiles.find(p => p.id === quest.assignee_id);
  const proposer = profiles.find(p => p.id === quest.proposer_id);
  const isAssignedToMe = quest.assignee_id === currentUserId;
  
  const ratificationStats = calculateConsensus(quest.votes_for, quest.votes_against, profiles.length);
  const verificationStats = calculateConsensus(quest.verification_votes_for || [], quest.verification_votes_against || [], profiles.length);
  
  const hasVotedRatify = quest.votes_for.includes(currentUserId) || quest.votes_against.includes(currentUserId);
  const hasVotedVerify = (quest.verification_votes_for || []).includes(currentUserId) || (quest.verification_votes_against || []).includes(currentUserId);
  
  const health = getHealthStatus(quest);
  const daysInactive = calculateDaysSinceUpdate(quest.last_update_at);
  const diffConfig = getDifficultyConfig(quest.difficulty);

  const handleCopyRef = (e: React.MouseEvent) => {
    e.stopPropagation();
    const assigneeName = assignee ? ` | Assigned: ${assignee.username}` : '';
    const ref = `> **Quest #${quest.id}**: ${quest.title}\n> Status: \`${quest.status}\`${assigneeName}`;
    
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- DRAG HANDLER ---
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('questId', quest.id);
    e.dataTransfer.setData('currentStatus', quest.status);
    e.dataTransfer.effectAllowed = 'move';
    // Add a slight transparency to the drag ghost if supported by browser
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };

  return (
    <Card 
      onClick={() => onClick(quest)}
      // Enable Dragging
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-all group relative flex flex-col gap-2 cursor-pointer hover:shadow-lg active:cursor-grabbing"
    >
      {/* ID & Difficulty Badge */}
      <div className={`absolute -top-2 -right-1 border text-[10px] font-mono px-2 py-0.5 rounded shadow-sm z-10 flex items-center gap-2 ${diffConfig.bg} ${diffConfig.border} ${diffConfig.color}`}>
        <div className="flex items-center gap-1.5 opacity-70">
            <span>#{quest.id}</span>
            <span className="w-0.5 h-2 bg-current opacity-20"></span>
            <span className="font-bold tracking-wider">{diffConfig.label}</span>
        </div>
        
        <button 
            onClick={handleCopyRef}
            className="hover:text-white hover:scale-110 transition-all border-l border-current/20 pl-2 ml-1"
            title="Copy Discord Reference"
        >
            {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
        </button>
      </div>

      {/* Stale Warning Banner */}
      {quest.status === 'In Progress' && health !== 'Healthy' && (
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${health === 'Stale' ? 'bg-red-500' : 'bg-amber-500'}`} />
      )}

      <div className="p-3 space-y-2 mt-1">
        {/* Header */}
        <div className="flex justify-between items-start">
           <div className="flex items-center gap-1">
             {/* Grip handle for visual affordance */}
             <GripVertical size={12} className="text-zinc-700 cursor-grab active:cursor-grabbing" />
             <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{quest.tag}</Badge>
           </div>
        </div>
        
        {/* Body */}
        <div>
          <h4 className="text-sm font-medium text-zinc-200 leading-snug pr-2 pt-1">{quest.title}</h4>
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{quest.description}</p>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
          {assignee ? (
            <div className="flex items-center gap-2" title={`Assigned to ${assignee.username}`}>
              <img src={assignee.avatar_url} className="w-5 h-5 rounded-full ring-1 ring-zinc-800" alt={assignee.username} />
              <span className="text-xs text-zinc-400">{assignee.username}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2" title={`Proposed by ${proposer?.username}`}>
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 ring-1 ring-zinc-700">P</div>
              <span className="text-xs text-zinc-500 italic">Proposed</span>
            </div>
          )}
        </div>

        {/* Action Area based on Status */}
        
        {/* PROPOSED: Voting & Ratification */}
        {quest.status === 'Proposed' && (
          <div className="bg-zinc-950/50 -mx-3 -mb-3 p-3 mt-2 border-t border-zinc-800/50 rounded-b-lg space-y-2">
            <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              <span>Support: {ratificationStats.support}/{profiles.length}</span>
              {ratificationStats.isOptimistic && <span className="text-indigo-400">Passing</span>}
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${(ratificationStats.support / profiles.length) * 100}%` }} />
            </div>
            
            <div className="flex gap-2 pt-1">
            {!hasVotedRatify ? (
                <>
                <Button onClick={(e) => { e.stopPropagation(); onVote(quest.id, 'for', 'ratification'); }} size="sm" className="flex-1 h-7 text-xs gap-1 bg-green-900/20 text-green-400 hover:bg-green-900/40 border border-green-900/50">
                    <ThumbsUp size={12} /> Ack
                </Button>
                <Button onClick={(e) => { e.stopPropagation(); onVote(quest.id, 'against', 'ratification'); }} size="sm" className="flex-1 h-7 text-xs gap-1 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50">
                    <ThumbsDown size={12} /> Block
                </Button>
                </>
            ) : (
                <div className="w-full text-center text-xs text-zinc-500 py-1">You voted</div>
            )}
            </div>
            
            {ratificationStats.isOptimistic && isAdmin && (
              <Button onClick={(e) => { e.stopPropagation(); onStatusChange(quest.id, 'Open'); }} size="sm" className="w-full h-7 text-xs bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                Ratify & Open
              </Button>
            )}
            {ratificationStats.isOptimistic && !isAdmin && (
              <div className="text-[10px] text-center text-zinc-500 italic pt-1">Awaiting Maintainer Ratification</div>
            )}
          </div>
        )}

        {/* OPEN: Claiming */}
        {quest.status === 'Open' && (
          <div className="mt-2">
            {quest.assignee_id ? (
              isAssignedToMe ? (
                <Button onClick={(e) => { e.stopPropagation(); onStatusChange(quest.id, 'In Progress'); }} size="sm" className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                  Start Quest
                </Button>
              ) : (
                <div className="text-xs text-center text-zinc-500 italic py-1 border border-zinc-800 rounded bg-zinc-950/50">
                  Assigned to {assignee?.username}
                </div>
              )
            ) : (
              <Button onClick={(e) => { e.stopPropagation(); onStatusChange(quest.id, 'In Progress'); }} size="sm" variant="outline" className="w-full h-8 text-xs">
                Claim Quest
              </Button>
            )}
          </div>
        )}

        {/* IN PROGRESS: Submitting & Stale Checks */}
        {quest.status === 'In Progress' && (
          <div className="bg-zinc-950/50 -mx-3 -mb-3 p-3 mt-2 border-t border-zinc-800/50 rounded-b-lg space-y-2">
            {/* Stale/Warning Indicators */}
            {health !== 'Healthy' && (
              <div className={`flex items-start gap-2 text-xs p-2 rounded ${health === 'Stale' ? 'bg-red-900/20 text-red-400' : 'bg-amber-900/20 text-amber-400'}`}>
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{health === 'Stale' ? 'Stale: Reclaimable' : 'Update Required'}</p>
                  <p className="opacity-80">Inactive for {daysInactive} days.</p>
                </div>
              </div>
            )}

            {isAssignedToMe ? (
              <>
                <div onClick={(e) => e.stopPropagation()}>
                  <Input 
                    placeholder="github.com/ioi/core/pull/..." 
                    className="h-7 text-xs" 
                    value={verificationLink}
                    onChange={(e) => setVerificationLink(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={(e) => { e.stopPropagation(); onCheckIn(quest.id); }}
                    size="sm" 
                    variant="secondary"
                    className="flex-1 h-7 text-xs gap-1"
                    title="Reset stale timer"
                  >
                    <RefreshCw size={12} /> Check-in
                  </Button>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); onStatusChange(quest.id, 'Verification'); }} 
                    disabled={!verificationLink}
                    size="sm" 
                    className="flex-[2] h-7 text-xs"
                  >
                    Submit
                  </Button>
                </div>
              </>
            ) : (
              <>
                {health === 'Stale' && (
                  <Button 
                    onClick={(e) => { e.stopPropagation(); onReclaim(quest.id); }}
                    size="sm" 
                    className="w-full h-7 text-xs bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 gap-2"
                  >
                    <UserPlus size={12} /> Reclaim Quest
                  </Button>
                )}
                {/* View only for non-assignees */}
                {health === 'Healthy' && assignee && (
                  <div className="text-xs text-center text-zinc-500 italic">Work in progress by {assignee.username}</div>
                )}
              </>
            )}
          </div>
        )}

        {/* VERIFICATION: Reviewing */}
        {quest.status === 'Verification' && (
          <div className="bg-zinc-950/50 -mx-3 -mb-3 p-3 mt-2 border-t border-zinc-800/50 rounded-b-lg space-y-2">
            <a 
              href={quest.pr_link?.startsWith('http') ? quest.pr_link : `https://${quest.pr_link}`} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-xs text-indigo-400 hover:underline truncate px-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              {quest.pr_link}
            </a>
            
            <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              <span>Verify: {verificationStats.support}/{profiles.length}</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${(verificationStats.support / profiles.length) * 100}%` }} />
            </div>

            {!hasVotedVerify && (
            <div className="flex gap-2 pt-1">
                <Button onClick={(e) => { e.stopPropagation(); onVote(quest.id, 'for', 'verification'); }} size="sm" className="flex-1 h-7 text-xs gap-1 bg-green-900/20 text-green-400 hover:bg-green-900/40 border border-green-900/50">
                <FileCheck size={12} /> LGTM
                </Button>
                <Button onClick={(e) => { e.stopPropagation(); onVote(quest.id, 'against', 'verification'); }} size="sm" className="flex-1 h-7 text-xs gap-1 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50">
                <ThumbsDown size={12} /> Reject
                </Button>
            </div>
            )}

            {verificationStats.isMajority && isAdmin && (
              <Button onClick={(e) => { e.stopPropagation(); onStatusChange(quest.id, 'Completed'); }} size="sm" className="w-full h-7 text-xs bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                Finalize
              </Button>
            )}
            {verificationStats.isMajority && !isAdmin && (
              <div className="text-[10px] text-center text-zinc-500 italic pt-1">Awaiting Maintainer Finalization</div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}```

###### File: components/quest/QuestColumn.tsx
###*Size: 4.0K, Lines: 106, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { Quest, QuestStatus, Profile } from '../../types';
import { QuestCard } from './QuestCard';

interface QuestColumnProps {
  id: QuestStatus;
  title: string;
  icon: React.ElementType;
  quests: Quest[];
  profiles: Profile[];
  currentUserId: string;
  isAdmin: boolean;
  onVote: (id: string, decision: 'for' | 'against', type: 'ratification' | 'verification', reason?: string) => void;
  onStatusChange: (id: string, status: QuestStatus) => void;
  onCheckIn: (id: string) => void;
  onReclaim: (id: string) => void;
  verificationInput: { [key: string]: string };
  setVerificationInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onQuestClick: (quest: Quest) => void;
}

export const QuestColumn: React.FC<QuestColumnProps> = ({
  id,
  title,
  icon: Icon,
  quests,
  profiles,
  currentUserId,
  isAdmin,
  onVote,
  onStatusChange,
  onCheckIn,
  onReclaim,
  verificationInput,
  setVerificationInput,
  onQuestClick
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const questId = e.dataTransfer.getData('questId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    if (questId && currentStatus !== id) {
      // Trigger status change
      onStatusChange(questId, id);
    }
  };

  return (
    <div 
      className={`flex-1 flex flex-col gap-3 min-w-[280px] transition-colors rounded-lg ${
        isDragOver ? 'bg-indigo-900/20 ring-2 ring-indigo-500/50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 text-zinc-400 bg-zinc-900/50 py-2 rounded-md border border-zinc-800/50">
        <div className="flex items-center gap-2 font-medium">
          <Icon size={16} className={id === 'Proposed' ? 'text-indigo-400' : ''} />
          <span>{title}</span>
        </div>
        <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">{quests.length}</span>
      </div>

      {/* Column Content */}
      <div className={`bg-zinc-900/20 rounded-lg p-2 space-y-3 min-h-[500px] ${isDragOver ? 'bg-indigo-900/10' : ''}`}>
        {quests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            profiles={profiles}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            onVote={onVote}
            onStatusChange={onStatusChange}
            onCheckIn={onCheckIn}
            onReclaim={onReclaim}
            verificationLink={verificationInput[quest.id] || ''}
            setVerificationLink={(val) => setVerificationInput(prev => ({...prev, [quest.id]: val}))}
            onClick={onQuestClick}
          />
        ))}
        
        {quests.length === 0 && (
          <div className="h-32 flex flex-col items-center justify-center text-zinc-600 text-sm border-2 border-dashed border-zinc-800/50 rounded-lg pointer-events-none">
            <span className="opacity-50">Drop Quest Here</span>
          </div>
        )}
      </div>
    </div>
  );
};```

###### File: components/quest/QuestDetailModal.tsx
###*Size: 8.0K, Lines: 163, Type: Java source, ASCII text*

```
import React from 'react';
import { Quest, Profile } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Calendar, GitPullRequest, 
  Clock, AlertTriangle, ExternalLink, Shield 
} from 'lucide-react';
import { getDifficultyConfig, getHealthStatus, calculateDaysSinceUpdate } from '../../utils/questUtils';

interface QuestDetailModalProps {
  quest: Quest | null;
  onClose: () => void;
  profiles: Profile[];
  currentUserId: string;
  onReclaim?: (id: string) => void;
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({ 
  quest, 
  onClose, 
  profiles,
  currentUserId,
  onReclaim
}) => {
  if (!quest) return null;

  const assignee = profiles.find(p => p.id === quest.assignee_id);
  const proposer = profiles.find(p => p.id === quest.proposer_id);
  const diffConfig = getDifficultyConfig(quest.difficulty);
  const health = getHealthStatus(quest);
  const daysInactive = calculateDaysSinceUpdate(quest.last_update_at);

  return (
    <Modal isOpen={!!quest} onClose={onClose} title={`Quest #${quest.id}`}>
      <div className="space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar pr-2">
        
        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <div className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1.5 ${diffConfig.bg} ${diffConfig.border} ${diffConfig.color}`}>
             <Shield size={10} />
             <span className="font-bold tracking-wider">{diffConfig.label}</span>
          </div>
          <Badge variant="outline">{quest.status}</Badge>
          <Badge variant="default" className="bg-zinc-800">{quest.tag}</Badge>
          {health !== 'Healthy' && (
             <Badge variant="warning" className="gap-1">
               <AlertTriangle size={10} /> {health} ({daysInactive}d inactive)
             </Badge>
          )}
        </div>

        {/* Blocking Issue Banner */}
        {(quest.votes_against.length > 0 || (quest.verification_votes_against || []).length > 0) && quest['block_reason'] && (
           <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-lg mb-6 animate-in fade-in slide-in-from-top-2">
             <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2 mb-2">
               <AlertTriangle size={14} /> 
               {quest.status === 'Verification' ? 'Verification Rejected' : 'Blocking Issue'}
             </h4>
             <p className="text-sm text-red-100 leading-relaxed italic">
               "{quest['block_reason']}"
             </p>
           </div>
        )}

        {/* Main Title & Description */}
        <div>
          <h2 className="text-xl font-medium text-zinc-100 mb-4">{quest.title}</h2>
          <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono">
            {quest.description}
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800/50">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Assignee</span>
            <div className="flex items-center gap-2">
              {assignee ? (
                <>
                  <img src={assignee.avatar_url} className="w-5 h-5 rounded-full" alt={assignee.username} />
                  <span className="text-sm text-zinc-200">{assignee.username}</span>
                </>
              ) : (
                <span className="text-sm text-zinc-500 italic">Unassigned</span>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Proposer</span>
            <div className="flex items-center gap-2">
              <img src={proposer?.avatar_url || `https://ui-avatars.com/api/?name=${quest.proposer_id}`} className="w-5 h-5 rounded-full" alt="proposer" />
              <span className="text-sm text-zinc-200">{proposer?.username || 'Unknown'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Created</span>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
               <Calendar size={14} />
               <span>{new Date(quest.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Last Update</span>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
               <Clock size={14} />
               <span>{new Date(quest.last_update_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Context Specific Data */}
        {quest.pr_link && (
          <div className="space-y-2">
             <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Proof of Work</span>
             <a 
               href={quest.pr_link.startsWith('http') ? quest.pr_link : `https://${quest.pr_link}`} 
               target="_blank" 
               rel="noreferrer" 
               className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-700 rounded text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition-all"
             >
                <GitPullRequest size={16} />
                <span className="text-sm font-mono truncate">{quest.pr_link}</span>
                <ExternalLink size={14} className="ml-auto opacity-50" />
             </a>
          </div>
        )}

        {/* Voting Ledger (Read Only View) */}
        {(quest.votes_for.length > 0 || quest.votes_against.length > 0) && (
          <div className="space-y-2">
             <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Ratification Ledger</span>
             <div className="flex gap-2 text-xs">
                <div className="flex-1 bg-green-900/10 border border-green-900/30 p-2 rounded text-green-400">
                  <span className="font-bold">{quest.votes_for.length}</span> Ack
                </div>
                <div className="flex-1 bg-red-900/10 border border-red-900/30 p-2 rounded text-red-400">
                  <span className="font-bold">{quest.votes_against.length}</span> Block
                </div>
             </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
           <Button variant="ghost" onClick={onClose}>Close</Button>
           {health === 'Stale' && onReclaim && (
             <Button 
                onClick={() => { onReclaim(quest.id); onClose(); }}
                className="bg-red-900/30 text-red-400 border border-red-900 hover:bg-red-900/50"
             >
                Reclaim Stale Quest
             </Button>
           )}
        </div>

      </div>
    </Modal>
  );
};```

###### File: components/quest/QuestLedger.tsx
###*Size: 4.0K, Lines: 86, Type: HTML document, ASCII text*

```
import React from 'react';
import { Quest, Profile } from '../../types';
import { CheckCircle2, GitPullRequest, Calendar } from 'lucide-react';
import { getDifficultyConfig } from '../../utils/questUtils';

interface QuestLedgerProps {
  quests: Quest[];
  profiles: Profile[];
}

export const QuestLedger: React.FC<QuestLedgerProps> = ({ quests, profiles }) => {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="text-emerald-500" size={20} />
        <h3 className="text-lg font-serif font-bold text-zinc-100">Completion Ledger</h3>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">
          {quests.length}
        </span>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900/50 text-zinc-500 font-medium uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">ID / Difficulty</th>
              <th className="px-6 py-3">Quest</th>
              <th className="px-6 py-3">Assignee</th>
              <th className="px-6 py-3">Proof</th>
              <th className="px-6 py-3 text-right">Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {quests.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center italic opacity-50">No quests completed yet.</td></tr>
            ) : (
              quests.map(q => {
                const assignee = profiles.find(p => p.id === q.assignee_id);
                const diff = getDifficultyConfig(q.difficulty);
                
                return (
                  <tr key={q.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <span className="font-mono text-xs opacity-50">#{q.id}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded border ${diff.bg} ${diff.border} ${diff.color}`}>
                           {diff.label}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-200 font-medium">{q.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {assignee && <img src={assignee.avatar_url} className="w-5 h-5 rounded-full" alt={assignee.username} />}
                        <span>{assignee?.username || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {q.pr_link ? (
                        <a 
                          href={q.pr_link.startsWith('http') ? q.pr_link : `https://${q.pr_link}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-indigo-400 hover:underline text-xs"
                        >
                          <GitPullRequest size={12} /> View PR
                        </a>
                      ) : <span className="text-zinc-600">-</span>}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-xs">
                       <div className="flex items-center justify-end gap-2">
                         <Calendar size={12} className="opacity-50" />
                         {new Date(q.last_update_at).toLocaleDateString()}
                       </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};```

###### File: components/quest/SignalRadar.tsx
###*Size: 4.0K, Lines: 65, Type: Java source, ASCII text*

```
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
};```

##### Directory: components/spec

###### File: components/spec/SpecDiffViewer.tsx
###*Size: 4.0K, Lines: 32, Type: Java source, ASCII text*

```
import React from 'react';
import { diffLines } from 'diff';

interface SpecDiffViewerProps {
  oldText: string;
  newText: string;
}

export const SpecDiffViewer: React.FC<SpecDiffViewerProps> = ({ oldText, newText }) => {
  const diff = diffLines(oldText, newText);

  return (
    <div className="font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap bg-zinc-950 p-4 rounded border border-zinc-800">
      {diff.map((part: any, index: number) => {
        if (part.added) {
          return (
            <div key={index} className="bg-green-900/30 text-green-200 border-l-2 border-green-600 pl-4 pr-2 py-1 select-all">
              {part.value}
            </div>
          );
        }
        if (part.removed) {
          return (
            <div key={index} className="bg-red-900/20 text-red-300/50 line-through border-l-2 border-red-900 pl-4 pr-2 py-1 select-none">
              {part.value}
            </div>
          );
        }
        return <span key={index} className="text-zinc-400 opacity-60">{part.value}</span>;
      })}
    </div>
  );
};```

###### File: components/spec/SpecEditor.tsx
###*Size: 8.0K, Lines: 97, Type: Java source, ASCII text, with very long lines (552)*

```
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from '../ui/Input';
import { SpecCategory } from '../../types';

// Moved templates here as they are only relevant to the editor
export const SPEC_TEMPLATES = {
  BLANK: '',
  STANDARD: `# Specification Title\n\n**Status:** Draft\n**Category:** Core\n**Author:** @username\n\n## 1. Abstract\nA short summary of the technical specification.\n\n## 2. Motivation\nWhy is this needed? What problem does it solve?\n\n## 3. Specification\nThe technical details, schema, and protocol logic.\n\n### 3.1 Data Structures\n\`\`\`typescript\ninterface Example {\n  field: string;\n}\n\`\`\`\n\n## 4. Rationale\nWhy this approach was chosen over alternatives.\n\n## 5. Backwards Compatibility\nDoes this break existing implementations?\n`,
  ADR: `# ADR: [Short Title]\n\n**Status:** Draft\n**Context:** [Reference to Spec ID]\n\n## Context\nThe issue that we are seeing is...\n\n## Decision\nWe have decided to...\n\n## Consequences\n### Positive\n- Easier maintenance...\n\n### Negative\n- Higher latency in...\n`,
  PROCESS: `# Process: [Title]\n\n## Objective\nDescription of the organizational process.\n\n## Roles\n- **Owner:**\n- **Stakeholders:**\n\n## Workflow\n1. [Step 1]\n2. [Step 2]\n`
};

export interface EditorState {
  title: string;
  filename: string;
  category: SpecCategory;
  content: string;
  targetId?: string;
}

interface SpecEditorProps {
  state: EditorState;
  onChange: (newState: EditorState) => void;
}

export const SpecEditor: React.FC<SpecEditorProps> = ({ state, onChange }) => {
  
  const handleTemplateApply = (key: keyof typeof SPEC_TEMPLATES) => {
    if (confirm('This will overwrite current content. Continue?')) {
      onChange({ ...state, content: SPEC_TEMPLATES[key] });
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Left: Inputs */}
      <div className="w-1/2 flex flex-col border-r border-zinc-800 p-6 gap-4 bg-zinc-900/30">
        <div className="grid grid-cols-2 gap-4">
           <Input label="Title" value={state.title} onChange={e => onChange({...state, title: e.target.value})} />
           <Input 
            label="Path / Filename" 
            placeholder="folder/subfolder/file.md"
            value={state.filename} 
            onChange={e => onChange({...state, filename: e.target.value})} 
           />
           <div>
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Category</label>
              <select 
                className="flex h-10 w-full mt-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                value={state.category}
                onChange={(e) => onChange({...state, category: e.target.value as SpecCategory})}
              >
                <option value="Core">Core</option>
                <option value="Networking">Networking</option>
                <option value="Consensus">Consensus</option>
                <option value="Economic">Economic</option>
                <option value="Meta">Meta</option>
              </select>
           </div>
           
           {/* Template Selector */}
           <div>
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Load Scaffolding</label>
              <select 
                className="flex h-10 w-full mt-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                onChange={(e) => {
                  if (e.target.value) handleTemplateApply(e.target.value as keyof typeof SPEC_TEMPLATES);
                  e.target.value = ""; 
                }}
              >
                <option value="">-- Select Template --</option>
                <option value="STANDARD">Technical Spec</option>
                <option value="ADR">Decision Record (ADR)</option>
                <option value="PROCESS">Process Doc</option>
              </select>
           </div>
        </div>
        <div className="flex-1 flex flex-col">
           <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5">Markdown Content</label>
           <textarea 
             className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded p-4 font-mono text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 resize-none custom-scrollbar"
             value={state.content}
             onChange={(e) => onChange({...state, content: e.target.value})}
           />
        </div>
      </div>
      
      {/* Right: Preview */}
      <div className="w-1/2 p-10 overflow-y-auto bg-zinc-950 custom-scrollbar">
        <div className="prose prose-zinc prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{state.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};```

###### File: components/spec/SpecSidebar.tsx
###*Size: 8.0K, Lines: 189, Type: Java source, ASCII text*

```
import React from 'react';
import { Search, Layout, Folder, Plus, FilePlus, Download, FolderOpen, GitPullRequest, History, File, ScrollText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SpecTreeItem } from './SpecTreeItem';
import { Spec } from '../../types';

interface SpecSidebarProps {
  mode: 'governance' | 'tree';
  setMode: (m: 'governance' | 'tree') => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  
  // Data
  fileTree: any;
  ratifiedSpecs: Spec[];
  activeProposals: Spec[];
  historySpecs: Spec[];
  
  selectedSpecId?: string;
  onSelect: (s: Spec) => void;
  
  // Actions
  isAdmin: boolean;
  onStartCreate: () => void;
  onOpenADRModal: () => void;
  onDownloadBackup: () => void;
}

export const SpecSidebar: React.FC<SpecSidebarProps> = ({
  mode, setMode, searchTerm, setSearchTerm,
  fileTree, ratifiedSpecs, activeProposals, historySpecs,
  selectedSpecId, onSelect,
  isAdmin, onStartCreate, onOpenADRModal, onDownloadBackup
}) => {
  return (
    <div className="w-80 flex-shrink-0 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-zinc-50">Documentation</h2>
        <div className="flex gap-1">
            <Button size="sm" className="text-xs h-7 gap-1 bg-indigo-600 hover:bg-indigo-500 text-white border-0" onClick={onStartCreate}>
              <Plus size={12} /> Std
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={onOpenADRModal}>
              <FilePlus size={12} /> ADR
            </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex p-1 bg-zinc-900 rounded-md border border-zinc-800">
          <button 
            onClick={() => setMode('governance')}
            className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-sm transition-colors ${mode === 'governance' ? 'bg-zinc-800 text-zinc-200 font-medium shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layout size={12} /> Governance
          </button>
          <button 
            onClick={() => setMode('tree')}
            className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-sm transition-colors ${mode === 'tree' ? 'bg-zinc-800 text-zinc-200 font-medium shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Folder size={12} /> File System
          </button>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
        <input 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-9 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Search specs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        
        {/* VIEW: FILE TREE */}
        {mode === 'tree' && (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-2 pl-2">Root</div>
              {Object.keys(fileTree).sort().map(key => (
                <SpecTreeItem 
                  key={key} 
                  name={key} 
                  node={fileTree[key]} 
                  level={0} 
                  selectedSpecId={selectedSpecId} 
                  onSelect={onSelect}
                />
              ))}
              {Object.keys(fileTree).length === 0 && <div className="text-xs text-zinc-600 px-3 italic">Empty repository</div>}
            </div>
        )}

        {/* VIEW: GOVERNANCE */}
        {mode === 'governance' && (
          <>
            {/* Section: Ratified */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <FolderOpen size={14} />
                <span>Living Standard (v1.0)</span>
              </div>
              <div className="space-y-1">
                {ratifiedSpecs.map(spec => (
                  <button 
                    key={spec.id}
                    onClick={() => onSelect(spec)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${
                      selectedSpecId === spec.id 
                        ? 'bg-zinc-800 text-zinc-100 font-medium' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    <File size={14} className="opacity-70 flex-shrink-0" />
                    <span className="truncate flex-1">{spec.filename}</span>
                  </button>
                ))}
                {ratifiedSpecs.length === 0 && <div className="text-xs text-zinc-600 px-3 italic">No matching specs</div>}
              </div>
            </div>

            {/* Section: Active */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <GitPullRequest size={14} />
                <span>Active Proposals</span>
              </div>
              <div className="space-y-2">
                {activeProposals.map(spec => (
                  <div 
                    key={spec.id}
                    onClick={() => onSelect(spec)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSpecId === spec.id 
                        ? 'bg-zinc-900 border-indigo-500/50 ring-1 ring-indigo-500/20' 
                        : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-xs font-mono text-zinc-500 uppercase">{spec.category}</span>
                      <Badge variant={spec.status === 'Review' ? 'warning' : 'outline'} className="text-[10px] h-5">{spec.status}</Badge>
                    </div>
                    <h4 className="font-medium text-zinc-200 text-sm line-clamp-2 leading-snug">{spec.title}</h4>
                  </div>
                ))}
                {activeProposals.length === 0 && (
                  <div className="text-xs text-zinc-600 italic px-3">No active proposals</div>
                )}
              </div>
            </div>

            {/* Section: Archive */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <History size={14} />
                <span>Archive</span>
              </div>
              <div className="space-y-1">
                {historySpecs.map(spec => (
                  <button 
                  key={spec.id}
                  onClick={() => onSelect(spec)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${
                    selectedSpecId === spec.id 
                      ? 'bg-zinc-800 text-zinc-100 font-medium' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                  }`}
                >
                  <ScrollText size={14} className="opacity-50 flex-shrink-0" />
                  <span className="truncate flex-1 line-through opacity-70">{spec.filename}</span>
                </button>
                ))}
              </div>
            </div>
          </>
        )}

        {isAdmin && (
          <div className="pt-4 border-t border-zinc-800/50">
              <Button variant="secondary" size="sm" className="w-full h-8 text-xs gap-2" onClick={onDownloadBackup}>
              <Download size={14} /> Backup Specs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};```

###### File: components/spec/SpecTreeItem.tsx
###*Size: 4.0K, Lines: 65, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FileText as FileTextIcon } from 'lucide-react';
import { Spec } from '../../types';

interface TreeItemProps {
  name: string;
  node: any;
  level: number;
  selectedSpecId?: string;
  onSelect: (spec: Spec) => void;
}

export const SpecTreeItem: React.FC<TreeItemProps> = ({ name, node, level, selectedSpecId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.__folder;
  const isFile = node.__file;

  if (isFolder) {
    return (
      <div className="select-none">
        <div 
          className="flex items-center gap-1 py-1 px-2 hover:bg-zinc-900/50 rounded cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors"
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Folder size={14} className="text-zinc-600" />
          <span className="text-sm font-medium truncate">{name}</span>
        </div>
        {isOpen && (
          <div>
            {Object.keys(node).filter(k => k !== '__folder').sort().map(childName => (
              <SpecTreeItem 
                key={childName} 
                name={childName} 
                node={node[childName]} 
                level={level + 1} 
                selectedSpecId={selectedSpecId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isFile) {
    return (
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
          selectedSpecId === node.id 
            ? 'bg-zinc-800 text-zinc-100 font-medium' 
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
        }`}
        style={{ paddingLeft: `${level * 12 + 20}px` }}
        onClick={() => onSelect(node)}
      >
        <FileTextIcon size={13} />
        <span className="text-sm truncate">{name}</span>
      </div>
    );
  }

  return null;
};```

##### Directory: components/tge

###### File: components/tge/AttributionSimulator.tsx
###*Size: 12K, Lines: 199, Type: Java source, ASCII text*

```
import React, { useState, useMemo } from 'react';
import { Contribution, Profile, ContributionType } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Calculator, Coins, PieChart as PieIcon, Save } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AttributionSimulatorProps {
  contributions: Contribution[];
  profiles: Profile[];
}

// Default weights based on standard protocol values
const DEFAULT_WEIGHTS: Record<ContributionType, number> = {
  CODE_MERGE: 10,
  ADR_AUTHOR: 50,
  MEETING_HOST: 5,
  MANUAL_BOUNTY: 1
};

export const AttributionSimulator: React.FC<AttributionSimulatorProps> = ({ contributions, profiles }) => {
  const [totalSupply, setTotalSupply] = useState<number>(10000000); // 10M Tokens
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // --- THE MODEL LOGIC ---
  const simulationResults = useMemo(() => {
    const userScores: Record<string, number> = {};
    let totalNetworkScore = 0;

    // 1. Calculate weighted scores
    contributions.forEach(c => {
      // Base weight from DB * Multiplier from UI
      const score = c.weight * (weights[c.type] || 1);
      
      userScores[c.user_id] = (userScores[c.user_id] || 0) + score;
      totalNetworkScore += score;
    });

    // 2. Calculate Allocation
    const results = profiles.map(p => {
      const score = userScores[p.id] || 0;
      const share = totalNetworkScore > 0 ? score / totalNetworkScore : 0;
      const allocation = share * totalSupply;

      return {
        id: p.id,
        username: p.username,
        score: Math.round(score),
        share: (share * 100).toFixed(2),
        allocation: Math.floor(allocation)
      };
    }).sort((a, b) => b.score - a.score);

    return { results, totalNetworkScore };
  }, [contributions, profiles, weights, totalSupply]);

  const handleWeightChange = (type: ContributionType, val: string) => {
    const num = parseFloat(val);
    setWeights(prev => ({ ...prev, [type]: isNaN(num) ? 0 : num }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* CONTROLS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Global Parameters */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
              <Coins size={16} className="text-amber-400" /> Supply Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                label="Total Token Supply" 
                type="number"
                value={totalSupply} 
                onChange={e => setTotalSupply(Number(e.target.value))}
                className="font-mono text-lg text-amber-400"
              />
              <div className="p-3 rounded bg-zinc-950/50 border border-zinc-800 text-xs text-zinc-500">
                <div className="flex justify-between mb-1">
                  <span>Network Score:</span>
                  <span className="font-mono text-zinc-300">{Math.round(simulationResults.totalNetworkScore).toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="font-mono text-zinc-300">{profiles.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Weight Multipliers */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
              <Calculator size={16} className="text-indigo-400" /> Weight Multipliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(DEFAULT_WEIGHTS) as ContributionType[]).map(type => (
                <div key={type} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">{type.replace('_', ' ')}</label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={weights[type]}
                    onChange={(e) => handleWeightChange(type, e.target.value)}
                    className="font-mono text-center text-indigo-300 border-zinc-700 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-600 italic">
              * Adjusting multipliers simulates the relative value of different labor types in the protocol.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RESULTS VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
                <PieIcon size={16} /> Distribution Projection
             </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulationResults.results} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="username" type="category" width={60} tick={{fill: '#71717a', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#e4e4e7' }}
                  formatter={(value: number) => [Math.round(value).toLocaleString(), 'Score']}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                   {simulationResults.results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#3f3f46'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Ledger */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800 flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center">
             <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
                <Save size={16} /> Final Allocation Table
             </CardTitle>
             <Badge variant="outline" className="font-mono text-amber-500 border-amber-900/50 bg-amber-900/10">SIMULATION MODE</Badge>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/50 text-zinc-500 font-medium text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-3">Identity</th>
                  <th className="px-6 py-3 text-right">Adj. Score</th>
                  <th className="px-6 py-3 text-right">Network %</th>
                  <th className="px-6 py-3 text-right text-indigo-400">Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {simulationResults.results.map(r => (
                  <tr key={r.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-zinc-300">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                         {r.username}
                       </div>
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-zinc-400">{r.score.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-mono text-zinc-500">{r.share}%</td>
                    <td className="px-6 py-3 text-right font-mono font-bold text-amber-400">
                      {r.allocation.toLocaleString()} <span className="text-[10px] text-amber-500/50">IOI</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};```

##### Directory: components/ui

###### File: components/ui/Badge.tsx
###*Size: 4.0K, Lines: 23, Type: Java source, ASCII text*

```
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'purple';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
  const variants = {
    default: "bg-zinc-800 text-zinc-300",
    outline: "border border-zinc-700 text-zinc-400",
    success: "bg-green-900/30 text-green-400 border border-green-900",
    warning: "bg-amber-900/30 text-amber-400 border border-amber-900",
    purple: "bg-indigo-900/30 text-indigo-300 border border-indigo-900",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};```

###### File: components/ui/Button.tsx
###*Size: 4.0K, Lines: 37, Type: Java source, ASCII text*

```
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
    ghost: "hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100",
    outline: "border border-zinc-700 hover:bg-zinc-800 text-zinc-300",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};```

###### File: components/ui/Card.tsx
###*Size: 4.0K, Lines: 25, Type: Java source, ASCII text*

```
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-serif font-semibold leading-none tracking-tight text-zinc-50 ${className}`}>{children}</h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);```

###### File: components/ui/Input.tsx
###*Size: 4.0K, Lines: 28, Type: Java source, ASCII text, with very long lines (369)*

```
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>}
      <input
        className={`flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 ring-offset-zinc-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>}
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 ring-offset-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
};```

###### File: components/ui/IOILogo.tsx
###*Size: 8.0K, Lines: 35, Type: Java source, ASCII text, with very long lines (346)*

```
import React from 'react';

export const IOILogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="108.97 89.47 781.56 706.06" {...props}>
      <defs>
        <linearGradient id="linear-gradient" x1="295.299" x2="485.379" y1="544.373" y2="544.373" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3650c0"/><stop offset="1" stopColor="#346acf"/></linearGradient>
        <linearGradient id="linear-gradient1" x1="302.61" x2="697.39" y1="421.968" y2="421.968" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7"/><stop offset="1" stopColor="#b0c6f4"/></linearGradient>
        <linearGradient id="linear-gradient2" x1="797.683" x2="797.683" y1="740.594" y2="425.085" gradientUnits="userSpaceOnUse"><stop offset=".201" stopColor="#3b5eda"/><stop offset="1" stopColor="#2740a8"/></linearGradient>
        <linearGradient id="linear-gradient3" x1="609.661" x2="609.661" y1="654.115" y2="434.631" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c8dcfd"/><stop offset="1" stopColor="#93bef8"/></linearGradient>
        <linearGradient id="linear-gradient4" x1="223.747" x2="392.673" y1="846.122" y2="694.02" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#83a0e0"/><stop offset="1" stopColor="#5b86de"/></linearGradient>
        <linearGradient id="linear-gradient5" x1="518.726" x2="622.437" y1="314.342" y2="252.027" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#759ce8"/><stop offset=".289" stopColor="#7198e5"/><stop offset=".548" stopColor="#688dde"/><stop offset=".795" stopColor="#587bd2"/><stop offset="1" stopColor="#4666c4"/></linearGradient>
        <linearGradient id="linear-gradient6" x1="202.317" x2="202.317" y1="740.594" y2="425.086" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d3d3df"/><stop offset=".531" stopColor="#e8e9ed"/><stop offset="1" stopColor="#f7f8f7"/></linearGradient>
        <linearGradient id="linear-gradient7" x1="688.68" x2="688.68" y1="780.741" y2="675.219" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5a8cec"/><stop offset="1" stopColor="#3b67d3"/></linearGradient>
        <linearGradient id="linear-gradient8" x1="389.872" x2="389.872" y1="414.066" y2="104.779" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7"/><stop offset="1" stopColor="#b2c8f4"/></linearGradient>
        <linearGradient id="linear-gradient9" x1="401.305" x2="401.305" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#75abf0"/><stop offset=".316" stopColor="#699aeb"/><stop offset=".936" stopColor="#4d6fe0"/><stop offset="1" stopColor="#4a6bdf"/></linearGradient>
        <linearGradient id="linear-gradient10" x1="598.695" x2="598.695" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#bbd8f2"/><stop offset=".164" stopColor="#b3d3f1"/><stop offset=".413" stopColor="#9ec6ef"/><stop offset=".714" stopColor="#7cb0ed"/><stop offset="1" stopColor="#5698ea"/></linearGradient>
      </defs>
      <g>
        <path fill="url(#linear-gradient)" d="M295.299 434.631L295.299 654.116 485.379 544.373 295.299 434.631z"/>
        <path fill="url(#linear-gradient1)" d="M500 535.931L697.39 421.968 500 308.005 302.61 421.968 500 535.931z"/>
        <path fill="url(#linear-gradient2)" d="M719.322 662.557L854.487 740.594 876.043 695.903 719.322 425.085 719.322 662.557z"/>
        <path fill="url(#linear-gradient3)" d="M514.621 544.373L704.701 654.115 704.701 434.631 514.621 544.373z"/>
        <path fill="url(#linear-gradient4)" d="M287.988 675.22L151.883 753.8 164.878 780.741 470.757 780.741 287.988 675.22z"/>
        <path fill="url(#linear-gradient5)" d="M507.31 295.342L712.945 414.066 533.962 104.779 507.31 104.779 507.31 295.342z"/>
        <path fill="url(#linear-gradient6)" d="M280.678 662.557L280.678 425.086 123.957 695.903 145.513 740.594 280.678 662.557z"/>
        <path fill="url(#linear-gradient7)" d="M712.012 675.219L529.242 780.741 835.122 780.741 848.117 753.8 712.012 675.219z"/>
        <path fill="url(#linear-gradient8)" d="M492.689 295.343L492.689 104.779 466.038 104.779 287.055 414.066 492.689 295.343z"/>
        <g>
          <path fill="url(#linear-gradient9)" d="M302.61 666.778L500 780.741 500 780.741 500 552.815 302.61 666.778z"/>
          <path fill="url(#linear-gradient10)" d="M500 552.815L500 780.741 697.39 666.778 500 552.815z"/>
        </g>
      </g>
    </svg>
  );
};```

###### File: components/ui/Modal.tsx
###*Size: 4.0K, Lines: 42, Type: Java source, ASCII text*

```
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl shadow-black animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-serif font-bold text-zinc-100">{title}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};```

###### File: components/ui/Toast.tsx
###*Size: 4.0K, Lines: 34, Type: Java source, ASCII text*

```
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
};```

###### File: components/ui/Tooltip.tsx
###*Size: 4.0K, Lines: 21, Type: Java source, ASCII text*

```
import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, className = '' }) => {
  return (
    <div className={`relative flex items-center group/tooltip ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-50 w-max max-w-[200px] pointer-events-none">
        <div className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-2 py-1.5 rounded shadow-xl animate-in fade-in zoom-in-95 duration-200">
          {content}
          {/* Little triangle arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-800"></div>
        </div>
      </div>
    </div>
  );
};```

###### File: components/ui/WaffleChart.tsx
###*Size: 4.0K, Lines: 58, Type: Java source, ASCII text*

```
import React from 'react';
import { Tooltip } from './Tooltip';

interface DataPoint {
  label: string;
  value: number;
  color: string; // Tailwind class like 'bg-indigo-500'
}

interface WaffleChartProps {
  data: DataPoint[];
}

export const WaffleChart: React.FC<WaffleChartProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  
  // Calculate blocks (total 100)
  // We map the data to an array of 100 items representing the distribution
  let blocks: { color: string; label: string; value: number }[] = [];
  
  data.forEach(item => {
    // Calculate percentage, floor it to ensure we don't overflow easily
    const count = Math.round((item.value / total) * 100);
    for (let i = 0; i < count; i++) {
      if (blocks.length < 100) {
        blocks.push({ color: item.color, label: item.label, value: item.value });
      }
    }
  });

  // Fill remaining spots with 'empty' if rounding errors occur
  while (blocks.length < 100) {
    blocks.push({ color: 'bg-zinc-800', label: 'Unallocated', value: 0 });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* The Grid */}
      <div className="grid grid-cols-10 gap-1 aspect-square w-full max-w-[300px] mx-auto">
        {blocks.map((block, i) => (
          <Tooltip key={i} content={`${block.label}: ${Math.round((block.value / total) * 100)}%`}>
            <div className={`w-full h-full rounded-sm ${block.color} hover:opacity-80 transition-opacity cursor-crosshair`} />
          </Tooltip>
        ))}
      </div>

      {/* The Legend */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 rounded-sm ${item.color}`} />
            <span className="text-zinc-400">{item.label}</span>
            <span className="ml-auto font-mono text-zinc-300">{Math.round((item.value/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};```

##### File: components/ActiveOperations.tsx
##*Size: 4.0K, Lines: 69, Type: Java source, ASCII text*

```
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
};```

##### File: components/Archives.tsx
##*Size: 16K, Lines: 271, Type: Java source, ASCII text*

```
import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { Calendar, Loader2, Clock, FileText, ChevronRight, Plus, Save, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Meeting, Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Archives: React.FC = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    summary: '',
    content: '## Agenda\n\n1. \n2. \n\n## Decisions\n\n- ',
    attendees: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [meetingsRes, profilesRes] = await Promise.all([
      supabase.from('meetings').select('*').order('date', { ascending: false }),
      supabase.from('profiles').select('*')
    ]);

    if (meetingsRes.data) setMeetings(meetingsRes.data);
    if (profilesRes.data) setProfiles(profilesRes.data);
    setLoading(false);
  };

  const handleCreate = async () => {
    const timestamp = new Date(`${formData.date}T${formData.time}:00`).toISOString();
    
    const newMeeting = {
        id: `m-${Date.now()}`,
        title: formData.title,
        date: timestamp,
        summary: formData.summary,
        content: formData.content,
        attendees: formData.attendees
    };

    const { error } = await supabase.from('meetings').insert(newMeeting);
    
    if (!error) {
        setMeetings([newMeeting, ...meetings]);
        setIsCreateOpen(false);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            summary: '',
            content: '## Agenda\n\n1. \n2. \n\n## Decisions\n\n- ',
            attendees: []
        });
    } else {
        console.error("Failed to archive:", error);
    }
  };

  const toggleAttendee = (id: string) => {
    setFormData(prev => {
        const exists = prev.attendees.includes(id);
        return {
            ...prev,
            attendees: exists 
                ? prev.attendees.filter(a => a !== id)
                : [...prev.attendees, id]
        };
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Retrieving Archival Records...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
         <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-zinc-50">The Archives</h2>
            <p className="text-zinc-400 mt-1">Tribal knowledge, consensus records, and meeting minutes.</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-0">
            <Plus size={16} /> Archive Record
          </Button>
        </div>

        <div className="grid gap-3">
          {meetings.length === 0 ? (
            <div className="text-zinc-500 text-sm italic py-12 text-center border border-dashed border-zinc-800 rounded-lg">
                No meeting minutes recorded yet.
            </div>
          ) : (
            meetings.map((meeting) => {
                const dateObj = new Date(meeting.date);
                const day = dateObj.toLocaleDateString(undefined, { day: 'numeric' });
                const month = dateObj.toLocaleDateString(undefined, { month: 'short' });
                const year = dateObj.getFullYear();
                const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <Card key={meeting.id} className="group hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300">
                    <div className="p-5 flex flex-col sm:flex-row gap-5">
                      {/* Left: Date Block */}
                      <div className="flex-shrink-0 flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:w-16 sm:border-r border-zinc-800 sm:pr-4">
                        <div className="text-center">
                          <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">{month}</span>
                          <span className="block text-2xl font-serif font-bold text-zinc-200 leading-none my-1">{day}</span>
                          <span className="block text-[10px] text-zinc-500">{year}</span>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                        <div>
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium text-zinc-100 group-hover:text-indigo-300 transition-colors truncate pr-4">
                                    {meeting.title}
                                </h3>
                                <Badge variant="outline" className="flex-shrink-0 text-[10px] gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Clock size={10} /> {time}
                                </Badge>
                            </div>
                            <p className="text-zinc-400 text-sm mt-1 leading-relaxed line-clamp-2">
                                {meeting.summary}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            {/* Attendees */}
                            <div className="flex -space-x-2.5 overflow-visible">
                                {meeting.attendees?.map(id => {
                                    const p = profiles.find(pr => pr.id === id);
                                    if(!p) return null;
                                    return (
                                        <Tooltip key={id} content={p.username}>
                                            <img src={p.avatar_url} className="w-6 h-6 rounded-full border border-zinc-900 ring-1 ring-zinc-800" alt={p.username} />
                                        </Tooltip>
                                    );
                                })}
                            </div>

                            {/* Interaction */}
                            <button 
                                onClick={() => setViewMeeting(meeting)}
                                className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <FileText size={14} /> View Minutes <ChevronRight size={14} />
                            </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
            })
          )}
        </div>
      </div>

      {/* --- VIEW MODAL (The Reader) --- */}
      <Modal 
        isOpen={!!viewMeeting} 
        onClose={() => setViewMeeting(null)} 
        title={viewMeeting?.title || ''}
      >
        <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-800 pb-4">
                <span className="flex items-center gap-1"><Calendar size={12}/> {viewMeeting && new Date(viewMeeting.date).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Users size={12}/> {viewMeeting?.attendees?.length || 0} Attendees</span>
            </div>
            <div className="prose prose-zinc prose-invert prose-sm max-w-none max-h-[60vh] overflow-y-auto custom-scrollbar">
                {viewMeeting?.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{viewMeeting.content}</ReactMarkdown>
                ) : (
                    <p className="italic text-zinc-600 text-center py-8">No detailed minutes recorded for this session.</p>
                )}
            </div>
            <div className="flex justify-end pt-4 border-t border-zinc-800">
                <Button variant="ghost" onClick={() => setViewMeeting(null)}>Close Record</Button>
            </div>
        </div>
      </Modal>

      {/* --- CREATE MODAL (The Scribe) --- */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Scribe New Record">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
            <Input 
                label="Meeting Title" 
                placeholder="e.g. Weekly Sync #55"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
            />
            <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                <Input type="time" label="Time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            
            {/* Attendee Selector */}
            <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Attendees</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {profiles.map(p => (
                        <button
                            key={p.id}
                            onClick={() => toggleAttendee(p.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${
                                formData.attendees.includes(p.id) 
                                ? 'bg-indigo-900/40 border-indigo-500 text-indigo-200' 
                                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-zinc-500'
                            }`}
                        >
                            <img src={p.avatar_url} className="w-3 h-3 rounded-full" alt={p.username}/>
                            {p.username}
                        </button>
                    ))}
                </div>
            </div>

            <TextArea 
                label="Executive Summary (Short)" 
                placeholder="Brief overview for the archive card..."
                value={formData.summary} 
                onChange={e => setFormData({...formData, summary: e.target.value})} 
            />
            
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Detailed Minutes (Markdown)</label>
                <textarea 
                    className="flex min-h-[200px] w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 font-mono focus:ring-2 focus:ring-indigo-500/50 custom-scrollbar focus:outline-none"
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={!formData.title} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                    <Save size={16} /> Save to Archive
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};```

##### File: components/BootSequence.tsx
##*Size: 4.0K, Lines: 58, Type: Java source, ASCII text*

```
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
};```

##### File: components/Dashboard.tsx
##*Size: 16K, Lines: 358, Type: Java source, ASCII text*

```
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { calculateTotalXP, formatXP } from '../utils/economics';
import { Activity, FileText, Zap, Users, GitMerge, Loader2, Plus, Shield, ArrowRight, PlayCircle, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Contribution, Profile, Quest, Spec, Role, View } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { MyFocus } from './dashboard/MyFocus';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { MemberDossier } from './profile/MemberDossier';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

// NEW: Mission Briefing Component (Internal Helper)
const MissionBriefing: React.FC<{ role: Role; onNavigate: (v: View) => void }> = ({ role, onNavigate }) => {
  const isMaintainer = role === 'Maintainer';

  return (
    <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-indigo-900/20 to-zinc-900/50 border border-indigo-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Shield size={100} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-serif font-bold text-zinc-100 mb-2 flex items-center gap-2">
          {isMaintainer ? "Commander's Briefing" : "Operative's Directive"}
        </h3>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed mb-4">
          {isMaintainer 
            ? "The protocol requires direction. Review pending specifications for ratification or provision new quests for the team." 
            : "Your queue is empty. Access the Quest Board to claim an open task, or draft a new standard in the Spec module."}
        </p>
        
        <div className="flex gap-3">
          {isMaintainer ? (
            <>
              <Button onClick={() => onNavigate('quests')} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                <Shield size={16} /> Manage Quests
              </Button>
               <Button onClick={() => onNavigate('specs')} variant="secondary" className="gap-2">
                <BookOpen size={16} /> Review Specs
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => onNavigate('quests')} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                <PlayCircle size={16} /> Claim Quest
              </Button>
              <Button onClick={() => onNavigate('specs')} variant="secondary" className="gap-2">
                <Plus size={16} /> Draft Spec
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const { user, addMember } = useAuth();
  const { notifications } = useNotifications();
  const [data, setData] = useState<{
    contributions: Contribution[];
    quests: Quest[];
    specs: Spec[];
    profiles: Profile[];
  }>({ contributions: [], quests: [], specs: [], profiles: [] });
  
  const [loading, setLoading] = useState(true);

  // Add Member State
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newMember, setNewMember] = useState({ username: '', role: 'Contributor' as Role, password: '' });
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);

  // Profile Dossier State
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [contributionsRes, questsRes, specsRes, profilesRes] = await Promise.all([
        supabase.from('contributions').select('*').order('created_at', { ascending: false }),
        supabase.from('quests').select('*'),
        supabase.from('specs').select('*'),
        supabase.from('profiles').select('*')
      ]);

      setData({
        contributions: contributionsRes.data || [],
        quests: questsRes.data || [],
        specs: specsRes.data || [],
        profiles: profilesRes.data || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddMember = async () => {
    if (newMember.password.length < 6) {
        setInviteStatus("Password must be at least 6 characters.");
        return;
    }
    const res = await addMember(newMember.username, newMember.role, newMember.password);
    if (res.success) {
        setIsInviteOpen(false);
        setNewMember({ username: '', role: 'Contributor', password: '' });
        setInviteStatus(null);
        fetchDashboardData(); // Refresh list
    } else {
        setInviteStatus(res.message || "Failed to add user.");
    }
  };

  const totalContribs = data.contributions.length;
  const activeQuests = data.quests.filter(q => q.status === 'In Progress').length;
  const ratifiedSpecs = data.specs.filter(s => s.status === 'Ratified').length;

  // Calculate contribution counts and Total XP per profile
  const profileStats = data.profiles.map(p => {
    const userContributions = data.contributions.filter(c => c.user_id === p.id);
    const totalXP = calculateTotalXP(userContributions);
    return {
      ...p,
      contributionCount: userContributions.length,
      totalXP
    };
  }).sort((a, b) => b.totalXP - a.totalXP);

  // LOGIC: Does this user have active work?
  const myWork = data.quests.filter(q => q.assignee_id === user?.id && q.status === 'In Progress');
  const needsBriefing = myWork.length === 0;

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Syncing Operations Center...</p>
      </div>
    );
  }

  const isAdmin = user?.role === 'Maintainer';

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-zinc-50">Operations Center</h2>
            <p className="text-zinc-400 mt-1">Welcome back, {user?.username}. System status: Nominal.</p>
          </div>
          <div className="text-right">
             <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Your XP</span>
             <span className="block text-2xl font-mono text-indigo-400">{formatXP(profileStats.find(p => p.id === user?.id)?.totalXP || 0)}</span>
          </div>
        </div>

        {/* CONDITION: Show Mission Briefing OR My Focus */}
        {needsBriefing ? (
           <MissionBriefing role={user?.role || 'Contributor'} onNavigate={onChangeView} />
        ) : (
           <MyFocus 
             user={user}
             quests={data.quests}
             notifications={notifications}
             onNavigate={onChangeView}
           />
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Total Contributions</p>
                <h3 className="text-2xl font-bold text-zinc-100">{totalContribs}</h3>
              </div>
              <Activity className="text-indigo-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Ratified Specs</p>
                <h3 className="text-2xl font-bold text-zinc-100">{ratifiedSpecs}</h3>
              </div>
              <FileText className="text-green-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Active Quests</p>
                <h3 className="text-2xl font-bold text-zinc-100">{activeQuests}</h3>
              </div>
              <Zap className="text-amber-500" />
            </CardContent>
          </Card>
          <Card className="relative group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Core Members</p>
                <h3 className="text-2xl font-bold text-zinc-100">{data.profiles.length}</h3>
              </div>
              <Users className="text-blue-500" />
            </CardContent>
            {isAdmin && (
                <button 
                  onClick={() => setIsInviteOpen(true)}
                  className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-zinc-100 font-medium gap-2 cursor-pointer"
                >
                    <Plus size={16} /> Manage Team
                </button>
            )}
          </Card>
        </div>

        {/* Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contribution Ledger</CardTitle>
            </CardHeader>
            <CardContent>
              {data.contributions.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm italic">
                  No contributions recorded yet.
                </div>
              ) : (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                  {data.contributions.map((c) => {
                    const user = data.profiles.find(p => p.id === c.user_id);
                    return (
                      <div key={c.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 group-[.is-active]:bg-zinc-800 group-[.is-active]:border-zinc-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-zinc-400">
                          <GitMerge size={16} />
                        </div>
                        
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-zinc-800 bg-zinc-900/50 shadow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-zinc-200 text-sm">{user?.username || 'Unknown'}</span>
                            <time className="font-mono text-xs text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</time>
                          </div>
                          <p className="text-zinc-300 text-sm">{c.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">{c.reference_link}</span>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500">{c.type.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mini Team Leaderboard */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Total XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileStats.map((profile, i) => (
                  <div 
                    key={profile.id} 
                    onClick={() => setSelectedProfile(profile)}
                    className="flex items-center gap-3 pb-3 border-b border-zinc-800/50 last:border-0 last:pb-0 cursor-pointer hover:bg-zinc-900/50 p-2 rounded transition-colors -mx-2 px-2"
                  >
                    <div className="font-mono text-zinc-500 w-4">{i + 1}</div>
                    <img src={profile.avatar_url} alt={profile.username} className="w-8 h-8 rounded-full bg-zinc-800" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-zinc-200">{profile.username}</span>
                        <div className="text-right">
                           <span className="block text-xs font-bold text-indigo-400">{formatXP(profile.totalXP)} XP</span>
                           <span className="block text-[10px] text-zinc-600">{profile.contributionCount} Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin: Add Member Modal */}
      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Provision New Member">
        <div className="space-y-4">
            <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded text-xs text-amber-200 flex gap-2">
                <Shield size={16} className="shrink-0" />
                <p>You are about to grant access to the internal kernel. Ensure this individual has signed the contributor covenant.</p>
            </div>
            
            <Input 
                label="Username / Handle"
                placeholder="e.g. neo_matrix"
                value={newMember.username}
                onChange={e => setNewMember({...newMember, username: e.target.value})}
            />

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Clearance Level</label>
                <select 
                    className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value as Role})}
                >
                    <option value="Contributor">Contributor (Standard)</option>
                    <option value="Maintainer">Maintainer (Admin)</option>
                </select>
            </div>

            <Input 
                label="Initial Access Key"
                placeholder="Min 6 characters"
                value={newMember.password}
                onChange={e => setNewMember({...newMember, password: e.target.value})}
            />

            {inviteStatus && (
                <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">{inviteStatus}</div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMember} disabled={!newMember.username || !newMember.password}>Provision Identity</Button>
            </div>
        </div>
      </Modal>

      {/* Member Dossier Modal */}
      <MemberDossier 
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        contributions={data.contributions}
        quests={data.quests}
      />
    </div>
  );
};```

##### File: components/LandingPage.css
##*Size: 16K, Lines: 632, Type: ASCII text, with very long lines (311)*

```css

/* Scoped Variables for Landing Page to prevent global pollution */
.landing-page-wrapper {
  --lp-bg-dark: #0a0a0b;
  --lp-bg-light: #f8f7f5;
  --lp-bg-warm: #f4f2ef;
  --lp-text-dark: #1a1a1b;
  --lp-text-light: #e8e7e5;
  --lp-text-muted: #8a8987;
  --lp-text-muted-light: #6b6a68;
  --lp-accent: #3b5eda;
  --lp-border: #d8d6d2;
  --lp-font-display: 'Cormorant Garamond', Georgia, serif;
  --lp-font-body: 'IBM Plex Sans', -apple-system, sans-serif;

  font-family: var(--lp-font-body);
  font-weight: 400;
  line-height: 1.7;
  color: var(--lp-text-dark);
  background: var(--lp-bg-light);
  -webkit-font-smoothing: antialiased;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1; /* Ensure it sits on top of body bg */
}

.landing-page-wrapper * {
  box-sizing: border-box;
}

.landing-page-wrapper a {
  text-decoration: none;
  color: inherit;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  background: var(--lp-bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--lp-text-light); /* Ensure hero inherits light text default */
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
  z-index: 4;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 45% at 50% 58%, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.4) 40%, rgba(10,10,11,0) 70%);
  pointer-events: none;
  z-index: 5;
}

.hero-canvas-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

#hero-canvas {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

#hero-canvas.loaded {
  opacity: 1;
}

.hero-content {
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  width: 100%;
  max-width: 800px;
}

.hero-mark {
  font-family: var(--lp-font-body);
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--lp-text-muted);
  margin-bottom: 1.25rem;
  opacity: 0;
  animation: fadeUp 1.2s ease-out 0.5s forwards;
}

.hero-title {
  font-family: var(--lp-font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.1;
  color: var(--lp-text-light);
  margin-bottom: 1.25rem;
  opacity: 0;
  animation: fadeUp 1.2s ease-out 0.7s forwards;
}

.hero-subtitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--lp-font-body);
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  font-weight: 400;
  color: var(--lp-text-muted);
  letter-spacing: 0.1em;
  opacity: 0;
  animation: fadeUp 1.2s ease-out 0.9s forwards;
  flex-wrap: wrap;
}

.hero-subtitle .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--lp-text-muted);
  opacity: 0.6;
}

.hero-oneliner {
  font-family: var(--lp-font-body);
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  font-weight: 300;
  color: var(--lp-text-muted);
  margin-top: 1.5rem;
  opacity: 0;
  animation: fadeUp 1.2s ease-out 1.1s forwards;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-ctas {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  opacity: 0;
  animation: fadeUp 1.2s ease-out 1.3s forwards;
  flex-wrap: wrap;
}

.hero-cta {
  font-family: var(--lp-font-body);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--lp-text-light);
  text-decoration: none;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(232, 231, 229, 0.4);
  transition: all 0.3s ease;
}

.hero-cta:hover {
  color: #fff;
  border-color: #fff;
  text-shadow: 0 0 8px rgba(255,255,255,0.2);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-mark, .hero-title, .hero-subtitle, .hero-oneliner, .hero-ctas, .scroll-indicator {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 1s ease-out 1.8s forwards;
  z-index: 10;
}

.scroll-indicator::before {
  content: '';
  display: block;
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--lp-text-muted), transparent);
  margin: 0 auto;
  opacity: 0.5;
}

@keyframes fadeIn {
  to { opacity: 0.4; }
}

/* Sections General */
.landing-section {
  padding: 7rem 2rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-label {
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lp-text-muted-light);
  margin-bottom: 1.75rem;
}

.section-title {
  font-family: var(--lp-font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 400;
  line-height: 1.3;
  color: var(--lp-text-dark);
  margin-bottom: 1.75rem;
}

.section-subhead {
  font-family: var(--lp-font-body);
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--lp-text-muted-light);
  margin-bottom: 2rem;
  margin-top: -1rem;
}

.section-text {
  font-size: 1.05rem;
  color: #4a4a48;
  max-width: 680px;
}

.section-text p {
  margin-bottom: 1.5rem;
}

/* Mandate Grid */
.mandate-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.mandate-block h4 {
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--lp-text-muted-light);
  margin-bottom: 1rem;
}

.mandate-block ul {
  list-style: none;
  padding: 0;
}

.mandate-block li {
  font-size: 0.95rem;
  color: var(--lp-text-dark);
  line-height: 1.7;
  padding-left: 1rem;
  position: relative;
  margin-bottom: 0.75rem;
}

.mandate-block li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  background: var(--lp-accent);
  border-radius: 50%;
}

.charter-excerpt {
  font-family: var(--lp-font-display);
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--lp-text-muted-light);
  margin-top: 2.5rem;
  max-width: 640px;
  padding-left: 1.5rem;
  border-left: 2px solid var(--lp-border);
}

/* Section Backgrounds */
.mission {
  background: var(--lp-bg-warm);
  border-top: 1px solid var(--lp-border);
}

.charter-section {
  background: var(--lp-bg-light);
  border-top: 1px solid var(--lp-border);
}

.governance {
  background: var(--lp-bg-light);
  border-top: 1px solid var(--lp-border);
}

.research {
  background: var(--lp-bg-dark);
  color: var(--lp-text-light);
}

.research .section-label { color: #5a5a5e; }
.research .section-title { color: var(--lp-text-light); }
.research .section-text { color: #9a9a9e; }

.transparency {
  background: var(--lp-bg-light);
  border-top: 1px solid var(--lp-border);
}

/* Process Flow (Governance) */
.process-flow {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(0,0,0,0.02);
  border: 1px solid var(--lp-border);
  border-radius: 4px;
}

.process-flow h4 {
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--lp-text-muted-light);
  margin-bottom: 1.5rem;
}

.process-steps {
  list-style: none;
  counter-reset: step;
  padding: 0;
}

.process-steps li {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1rem;
  padding: 0.75rem 0 0.75rem 1.5rem;
  border-bottom: 1px solid var(--lp-border);
  counter-increment: step;
  align-items: baseline;
  position: relative;
}

.process-steps li:last-child {
  border-bottom: none;
}

.process-steps li::before {
  content: counter(step);
  font-family: var(--lp-font-display);
  font-size: 0.9rem;
  color: var(--lp-accent);
  font-weight: 500;
  position: absolute;
  left: 0;
}

.step-name {
  font-family: var(--lp-font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--lp-text-dark);
}

.step-desc {
  font-size: 0.9rem;
  color: var(--lp-text-muted-light);
}

@media (max-width: 640px) {
  .process-steps li {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}

/* Research Areas */
.research-areas {
  margin-top: 3.5rem;
  display: grid;
  gap: 0;
}

.research-area {
  padding: 2rem 0;
  border-bottom: 1px solid #222224;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

.research-area:last-child {
  border-bottom: none;
}

.research-area h4 {
  font-family: var(--lp-font-display);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--lp-text-light);
}

.research-area p {
  font-size: 0.95rem;
  color: #707075;
  line-height: 1.7;
}

.research-deliverable {
  display: block;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #5a5a5e;
  font-style: italic;
}

.open-calls {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #222224;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.open-calls-label {
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5a5a5e;
}

.open-calls-date {
  font-size: 0.9rem;
  color: var(--lp-text-light);
}

@media (max-width: 640px) {
  .research-area {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

/* CTAs */
.grants-ctas {
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.section-cta {
  font-family: var(--lp-font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--lp-accent);
  text-decoration: none;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.section-cta:hover {
  border-color: var(--lp-accent);
}

/* Transparency Grid */
.transparency-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.transparency-item h4 {
  font-family: var(--lp-font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--lp-text-muted-light);
  margin-bottom: 0.75rem;
}

.transparency-item p {
  font-size: 0.95rem;
  color: var(--lp-text-dark);
  line-height: 1.6;
}

.transparency-item a {
  color: var(--lp-accent);
  text-decoration: none;
}

.transparency-item a:hover {
  text-decoration: underline;
}

/* Footer */
.landing-footer {
  background: var(--lp-bg-dark);
  color: var(--lp-text-light);
  padding: 4rem 2rem;
  border-top: 1px solid #1a1a1c;
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-mark {
  font-family: var(--lp-font-display);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-links a {
  font-size: 0.85rem;
  color: var(--lp-text-muted-light);
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--lp-text-light);
}

.footer-copyright {
  width: 100%;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1c;
  font-size: 0.8rem;
  color: #4a4a4c;
  text-align: center;
}

/* Navigation Button */
.nav-login-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 50;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-login-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
}
```

##### File: components/LandingPage.tsx
##*Size: 24K, Lines: 461, Type: Java source, Unicode text, UTF-8 text, with very long lines (341)*

```
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { supabase } from '../lib/supabase';
import './LandingPage.css';
import { Meeting, Spec } from '../types';
import { FileText, Calendar, Shield, ExternalLink, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dynamic Data State
  const [minutes, setMinutes] = useState<Meeting[]>([]);
  const [ratifiedSpecs, setRatifiedSpecs] = useState<Spec[]>([]);

  // Fetch Public Data
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        // Fetch latest 3 meetings for Transparency section
        const { data: meetings, error: meetingsError } = await supabase
          .from('meetings')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);
        
        // Fetch latest ratified specs
        const { data: specs, error: specsError } = await supabase
          .from('specs')
          .select('*')
          .eq('status', 'Ratified')
          .order('updated_at', { ascending: false })
          .limit(3);

        if (!meetingsError && meetings) setMinutes(meetings);
        if (!specsError && specs) setRatifiedSpecs(specs);
      } catch (e) {
        console.warn("Public data sync failed (likely offline/demo mode):", e);
      }
    };

    fetchPublicData();
  }, []);

  // Three.js Animation Effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b); // Matches --lp-bg-dark
    scene.fog = new THREE.Fog(0x0a0a0b, 650, 1400);
    
    const frustumSize = 550;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2, frustumSize * aspect / 2,
        frustumSize / 2, frustumSize / -2, 0.1, 2000
    );
    camera.position.set(0, 0, 800);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current, 
        antialias: true, 
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x0a0a0b, 1);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
    scene.add(ambientLight);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(400, 500, 400);
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0xe8eeff, 0.45);
    fillLight.position.set(-300, 200, -300);
    scene.add(fillLight);
    
    // Material Properties
    const MP: Record<string, any> = {
        stone: {color: 0xdedad5, metalness: 0.02, roughness: 0.78},
        ceramic: {color: 0xeae8e4, metalness: 0.04, roughness: 0.72},
        shadow: {color: 0x3a3d42, metalness: 0.08, roughness: 0.68},
        accent: {color: 0x4a62a8, metalness: 0.15, roughness: 0.55}
    };
    const CM: Record<string, string> = {st0:'accent',st1:'ceramic',st3:'stone',st4:'shadow',st5:'stone',st6:'shadow',st7:'stone',st8:'stone',st9:'ceramic',st10:'stone',st11:'shadow'};
    
    function cM(c: string) {
        const p = MP[CM[c] || 'stone'];
        const m = new THREE.MeshStandardMaterial({
            color: p.color, 
            metalness: p.metalness, 
            roughness: p.roughness, 
            side: THREE.DoubleSide
        });
        m.dithering = true;
        return m;
    }
    
    // Geometries
    const OP = [
        {c:"st0",p:[719.32,662.56,854.49,740.59,876.04,695.90,719.32,425.08]},
        {c:"st7",p:[287.99,675.22,151.88,753.80,164.88,780.74,470.76,780.74]},
        {c:"st8",p:[507.31,295.34,712.95,414.07,533.96,104.78,507.31,104.78]},
        {c:"st10",p:[280.68,662.56,280.68,425.09,123.96,695.90,145.51,740.59]},
        {c:"st6",p:[712.01,675.22,529.24,780.74,835.12,780.74,848.12,753.80]},
        {c:"st5",p:[492.69,295.34,492.69,104.78,466.04,104.78,287.05,414.07]}
    ];
    
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    keyLight.target = logoGroup;
    scene.add(keyLight.target);
    
    const cubeGroup = new THREE.Group();
    const cubeSolidGroup = new THREE.Group();
    cubeGroup.add(cubeSolidGroup);
    logoGroup.add(cubeGroup);
    
    // Function to create Triangular Pyramid geometry
    function triPyr(A: THREE.Vector3, B: THREE.Vector3, C: THREE.Vector3, ctr: THREE.Vector3, ins: number) {
        const ct = new THREE.Vector3().add(A).add(B).add(C).multiplyScalar(1/3);
        const a = ct.clone().addScaledVector(A.clone().sub(ct), ins);
        const b = ct.clone().addScaledVector(B.clone().sub(ct), ins);
        const c = ct.clone().addScaledVector(C.clone().sub(ct), ins);
        const pos: number[] = [];
        [a, b, c, ctr].forEach(v => { pos.push(v.x, v.y, v.z); });
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex([0,1,2,0,1,3,1,2,3,2,0,3]);
        g.computeVertexNormals();
        return g;
    }
    
    // Function to create Quadrilateral Pyramid geometry
    function quadPyr(A: THREE.Vector3, B: THREE.Vector3, C: THREE.Vector3, D: THREE.Vector3, ctr: THREE.Vector3, ins: number) {
        const ct = new THREE.Vector3().add(A).add(B).add(C).add(D).multiplyScalar(0.25);
        const vs = [A, B, C, D].map(v => ct.clone().addScaledVector(v.clone().sub(ct), ins));
        const pos: number[] = [];
        vs.concat([ctr]).forEach(v => { pos.push(v.x, v.y, v.z); });
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex([0,1,2,0,2,3,0,1,4,1,2,4,2,3,4,3,0,4]);
        g.computeVertexNormals();
        return g;
    }
    
    function createCube(sz: number, ins: number) {
        while(cubeSolidGroup.children.length) cubeSolidGroup.remove(cubeSolidGroup.children[0]);
        const h = sz / 2;
        const ctr = new THREE.Vector3();
        const V = [
            new THREE.Vector3(-h,-h,h), new THREE.Vector3(h,-h,h),
            new THREE.Vector3(h,h,h), new THREE.Vector3(-h,h,h),
            new THREE.Vector3(-h,-h,-h), new THREE.Vector3(h,-h,-h),
            new THREE.Vector3(h,h,-h), new THREE.Vector3(-h,h,-h)
        ];
        // Define sides logic
        const sides: any[] = [[0,1,2,3,false,'st1'],[1,5,6,2,true,'st9'],[5,4,7,6,false,'st11'],[4,0,3,7,true,'st11']];
        sides.forEach((s: any) => {
            const A = V[s[0]].clone(), B = V[s[1]].clone(), C = V[s[2]].clone(), D = V[s[3]].clone();
            const tris = s[4] ? [[A,B,D],[B,C,D]] : [[A,B,C],[A,C,D]];
            tris.forEach((t: any) => {
                cubeSolidGroup.add(new THREE.Mesh(triPyr(t[0],t[1],t[2],ctr,ins/100), cM(s[5])));
            });
        });
        cubeSolidGroup.add(new THREE.Mesh(quadPyr(V[3].clone(),V[2].clone(),V[6].clone(),V[7].clone(),ctr,ins/100), cM('st3')));
        cubeSolidGroup.add(new THREE.Mesh(quadPyr(V[4].clone(),V[5].clone(),V[1].clone(),V[0].clone(),ctr,ins/100), cM('st4')));
        cubeGroup.position.set(0, -100, 0);
    }
    
    function createOuter() {
        const d = 18, cx = 500, cy = 442.5;
        OP.forEach(o => {
            const s = new THREE.Shape();
            s.moveTo(o.p[0] - cx, -(o.p[1] - cy));
            for (let i = 2; i < o.p.length; i += 2) {
                s.lineTo(o.p[i] - cx, -(o.p[i+1] - cy));
            }
            const g = new THREE.ExtrudeGeometry(s, {depth: d, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 1.1, bevelSegments: 2, curveSegments: 6});
            g.computeVertexNormals();
            const m = new THREE.Mesh(g, cM(o.c));
            m.position.z = -d / 2;
            logoGroup.add(m);
        });
    }
    
    createOuter();
    createCube(270, 85);
    
    function updateScale() {
        const scale = window.innerWidth < 768 ? 0.4 : 0.55;
        logoGroup.scale.setScalar(scale);
    }
    updateScale();
    logoGroup.position.set(0, 40, 0);
    
    let scrollTh = window.innerHeight * 0.3;
    let curSP = 0;
    
    function getTargetSP() {
        const raw = Math.min(1, window.scrollY / scrollTh);
        return raw * raw * raw;
    }

    const prec = {xF: 0.00004, yF: 0.00006, zF: 0.00002, xA: 0.05, yA: 0.08, zA: 0.025};
    const cubeRot = {x: 0.002, y: 0.0032, z: 0.0012};
    const lightOrb = {r: 450, h: 500, s: 0.00003};
    let startT: number | null = null;
    let rafId: number | null = null;
    
    function getLightCol(t: number) {
        const p = (Math.sin(t) + 1) / 2;
        return ((255 - p * 8) << 16) | ((252 - p * 4 + (1 - p) * 4) << 8) | (248 + p * 7);
    }
    
    function tick(ts: number) {
        if (!startT) startT = ts;
        const el = ts - startT;
        const eIn = Math.min(1, el / 10000);
        const e = eIn * eIn * (3 - 2 * eIn);
        const tSP = getTargetSP();
        curSP += (tSP - curSP) * 0.08;
        const pd = 1 - curSP * 0.5;
        
        if (logoGroup && cubeGroup) {
            logoGroup.rotation.x = Math.sin(ts * prec.xF) * prec.xA * e * pd;
            logoGroup.rotation.y = Math.sin(ts * prec.yF) * prec.yA * e * pd;
            logoGroup.rotation.z = Math.sin(ts * prec.zF) * prec.zA * e * pd;
            
            const ca = (1 - curSP) * e;
            cubeGroup.rotation.x += cubeRot.x * ca;
            cubeGroup.rotation.y += cubeRot.y * ca;
            cubeGroup.rotation.z += cubeRot.z * ca;
        }

        if (keyLight) {
            const lt = ts * lightOrb.s;
            keyLight.position.set(lightOrb.r * Math.cos(lt), lightOrb.h, lightOrb.r * Math.sin(lt));
            keyLight.color.setHex(getLightCol(lt));
        }

        renderer.render(scene, camera);
        
        // Show canvas
        if (canvasRef.current && !canvasRef.current.classList.contains('loaded')) {
            canvasRef.current.classList.add('loaded');
        }
        
        rafId = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
    } else {
        renderer.render(scene, camera);
        if (canvasRef.current) canvasRef.current.classList.add('loaded');
    }

    // Event Listeners
    const handleResize = () => {
        const a = window.innerWidth / window.innerHeight;
        camera.left = frustumSize * a / -2;
        camera.right = frustumSize * a / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        scrollTh = window.innerHeight * 0.3;
        updateScale();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (rafId) cancelAnimationFrame(rafId);
        renderer.dispose();
    };
  }, []);

  return (
    <div className="landing-page-wrapper">
      <button onClick={onEnterApp} className="nav-login-btn">
        Login
      </button>

      <section className="hero">
        <div className="hero-canvas-container">
          <canvas ref={canvasRef} id="hero-canvas"></canvas>
        </div>
        <div className="hero-content">
          <p className="hero-mark">Charter · Public Stewardship</p>
          <h1 className="hero-title">IOI Foundation</h1>
          <p className="hero-subtitle">
            <span>Governance</span><span className="dot"></span>
            <span>Research</span><span className="dot"></span>
            <span>Protocol Integrity</span>
          </p>
          <p className="hero-oneliner">A public institution for protocol neutrality, research funding, and long-horizon security.</p>
          <div className="hero-ctas">
            <a href="#charter" className="hero-cta">Read the Charter</a>
            <a href="#governance" className="hero-cta">Governance Process</a>
          </div>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <main id="main-content">
        <section id="mission" className="mission landing-section">
          <div className="container">
            <p className="section-label">Mission</p>
            <h2 className="section-title">Stewardship of the Semantic Internet</h2>
            <p className="section-subhead">A neutral institution responsible for the protocol's long-horizon integrity.</p>
            <div className="section-text">
              <p>The IOI Foundation exists to ensure the long-term integrity, neutrality, and evolution of the Internet of Intelligence protocol — the foundational infrastructure for verifiable AI and deterministic agent execution.</p>
              <p>We operate as custodians, not controllers. Our role is to facilitate governance, fund research, and protect the protocol's core principles across generations of technological change.</p>
            </div>
            <div className="mandate-grid">
              <div className="mandate-block"><h4>Mandate</h4><ul><li>Preserve protocol neutrality and credible upgrade paths</li><li>Fund research and standards work that hardens verifiability</li><li>Publish public records: decisions, grants, audits, and keys</li></ul></div>
              <div className="mandate-block"><h4>Non-Goals</h4><ul><li>The Foundation does not operate validators</li><li>The Foundation does not control applications or markets</li></ul></div>
            </div>
            <p className="charter-excerpt"><em>"The Foundation exists to preserve neutrality, publish the record, and steward protocol integrity across technological change."</em></p>
          </div>
        </section>

        <section id="charter" className="charter-section landing-section">
          <div className="container">
            <p className="section-label">Charter</p>
            <h2 className="section-title">The Foundation Charter</h2>
            <div className="section-text"><p>The Charter defines the Foundation's mandate, limits, and governance requirements. It is designed to outlast market cycles and keep protocol stewardship legible to the public.</p></div>
            <div className="grants-ctas">
                <a href="#" className="section-cta flex items-center gap-2"><FileText size={16} /> Bylaws (PDF)</a>
                <a href="#" className="section-cta flex items-center gap-2"><Shield size={16} /> Governance Framework</a>
                <a href="#" className="section-cta flex items-center gap-2"><ArrowRight size={16} /> Decision Log</a>
            </div>
          </div>
        </section>

        <section id="governance" className="governance landing-section">
          <div className="container">
            <p className="section-label">Governance</p>
            <h2 className="section-title">Constitutional Protocol Stewardship</h2>
            <div className="section-text"><p>Protocol governance requires structures that outlast any single generation of stakeholders. The Foundation maintains separation between operational decisions and constitutional amendments, ensuring stability without stagnation.</p></div>
            <div className="process-flow">
              <h4>Governance Process</h4>
              <ol className="process-steps">
                <li><span className="step-name">Proposal</span><span className="step-desc">IOI Improvement Proposal (IIP) submitted publicly</span></li>
                <li><span className="step-name">Review</span><span className="step-desc">Technical Council + public comment window</span></li>
                <li><span className="step-name">Safety</span><span className="step-desc">Formal security review requirements</span></li>
                <li><span className="step-name">Ratification</span><span className="step-desc">Threshold rule with defined quorum</span></li>
                <li><span className="step-name">Activation</span><span className="step-desc">Scheduled, versioned, reproducible releases</span></li>
                <li><span className="step-name">Record</span><span className="step-desc">Final decision + rationale published</span></li>
              </ol>
            </div>
          </div>
        </section>

        <section id="research" className="research landing-section">
          <div className="container">
            <p className="section-label">Research Programs</p>
            <h2 className="section-title">Long-Horizon Technical Investment</h2>
            <div className="section-text"><p>The Foundation funds research that commercial entities cannot justify — work measured in decades, not quarters.</p></div>
            <div className="research-areas">
              <div className="research-area"><h4>Post-Quantum Migration</h4><p>Developing transition pathways for cryptographic primitives as quantum computing matures.</p><span className="research-deliverable">Deliverables: Reference roadmap, test vectors, upgrade semantics</span></div>
              <div className="research-area"><h4>Formal Verification</h4><p>Proving protocol correctness through mathematical methods. We invest in tooling that allows critical infrastructure to be verified, not merely tested.</p><span className="research-deliverable">Deliverables: Spec proofs, model checking, invariant suites</span></div>
              <div className="research-area"><h4>Semantic Consensus</h4><p>Research into deterministic meaning resolution across heterogeneous agent populations.</p><span className="research-deliverable">Deliverables: Canonicalization rules, verifier frameworks, determinism boundaries</span></div>
            </div>
            <div className="open-calls"><span className="open-calls-label">Open Calls</span><span className="open-calls-date">Next RFP: Q1 2026</span></div>
          </div>
        </section>

        <section id="transparency" className="transparency landing-section">
          <div className="container">
            <p className="section-label">Public Record</p>
            <h2 className="section-title">Transparency</h2>
            <div className="section-text">
              <p>Foundations are judged by their records. We publish decisions, governance outcomes, and financial summaries as a matter of institutional duty.</p>
            </div>
            
            <div className="transparency-grid">
              <div className="transparency-item">
                <h4>Legal Entity</h4><p>IOI Foundation<br/>Status: Formation in progress (Dec 2025)</p>
              </div>

              {/* DYNAMIC: Ratified Specs */}
              <div className="transparency-item">
                <h4>Ratified Standards</h4>
                 {ratifiedSpecs.length === 0 ? <p className="text-sm opacity-50">Fetching records...</p> : (
                  <div className="flex flex-col gap-3">
                    {ratifiedSpecs.map(s => (
                      <div key={s.id} className="flex items-start gap-2">
                        <FileText size={16} className="text-[var(--lp-accent)] shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm block font-medium text-[var(--lp-text-dark)]">{s.filename}</span>
                            <span className="text-xs text-[var(--lp-text-muted)]">Version {s.version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DYNAMIC: Meeting Minutes */}
              <div className="transparency-item">
                <h4>Recent Minutes</h4>
                {minutes.length === 0 ? <p className="text-sm opacity-50">Fetching records...</p> : (
                  <div className="flex flex-col gap-3">
                    {minutes.map(m => (
                      <div key={m.id} className="flex items-start gap-2">
                        <Calendar size={16} className="text-[var(--lp-text-muted)] shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm block font-medium text-[var(--lp-text-dark)]">{m.title}</span>
                            <span className="text-xs text-[var(--lp-text-muted)]">{new Date(m.date).toLocaleDateString(undefined, {dateStyle: 'medium'})}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="transparency-item">
                <h4>Contact</h4>
                <p>foundation at ioi.ai</p>
                <div className="mt-2">
                    <a href="#security" className="flex items-center gap-1.5 text-sm">
                        <Shield size={14} /> Security Disclosure
                    </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-mark">IOI Foundation</div>
          <nav className="footer-links">
            <a href="#charter">Charter</a>
            <a href="#governance">Governance</a>
            <a href="#research">Research</a>
            <a href="#grants">Grants</a>
            <a href="#transparency">Transparency</a>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};```

##### File: components/LoginGate.tsx
##*Size: 8.0K, Lines: 157, Type: Java source, Unicode text, UTF-8 text*

```
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
};```

##### File: components/NotificationCenter.tsx
##*Size: 8.0K, Lines: 174, Type: Java source, ASCII text*

```
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
};```

##### File: components/Omnibar.tsx
##*Size: 8.0K, Lines: 188, Type: Java source, Unicode text, UTF-8 text*

```
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
};```

##### File: components/QuestBoard.tsx
##*Size: 16K, Lines: 416, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Quest, QuestStatus, QuestDifficulty, Signal } from '../types';
import { Button } from './ui/Button';
import { Input, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { Circle, Timer, Vote, FileCheck, Plus, Radio, AlertTriangle, Loader2, Search, User, AlertOctagon } from 'lucide-react';
import { useQuestData } from '../hooks/useQuestData';
import { useSignals } from '../hooks/useSignals';
import { SignalRadar } from './quest/SignalRadar';
import { QuestColumn } from './quest/QuestColumn';
import { QuestLedger } from './quest/QuestLedger';
import { QuestDetailModal } from './quest/QuestDetailModal';
import { BlockQuestModal } from './quest/BlockQuestModal';
import { supabase } from '../lib/supabase';

export const QuestBoard: React.FC = () => {
  const { user } = useAuth();
  const { 
    quests, 
    profiles, 
    loading: questsLoading, 
    error, 
    createQuest, 
    updateQuest,
    voteOnQuest
  } = useQuestData();

  const {
    signals,
    loading: signalsLoading,
    createSignal,
    deleteSignal
  } = useSignals();
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [blockModal, setBlockModal] = useState<{ isOpen: boolean; questId: string; title: string; type: 'ratification' | 'verification' }>({
    isOpen: false, questId: '', title: '', type: 'ratification'
  });
  
  // New Items State
  const [newQuest, setNewQuest] = useState({ title: '', description: '', difficulty: 3 as QuestDifficulty, tag: '' });
  const [newSignal, setNewSignal] = useState({ area: '', message: '' });
  
  // Verification input state
  const [verificationInput, setVerificationInput] = useState<{ [key: string]: string }>({});

  // --- Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMine, setFilterMine] = useState(false);
  const [filterCritical, setFilterCritical] = useState(false);
  
  if (!user) return null; // Should be handled by App auth gate but safe check

  // RBAC Checks
  const isAdmin = user.role === 'Maintainer';

  // --- Filter Logic ---
  const filteredQuests = quests.filter(q => {
    // 1. Text Search
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.includes(searchQuery);
    
    // 2. "My Quests" Filter
    const matchesMine = filterMine ? q.assignee_id === user?.id : true;

    // 3. "Critical" Filter (Difficulty >= 5)
    const matchesCritical = filterCritical ? q.difficulty >= 5 : true;

    return matchesSearch && matchesMine && matchesCritical;
  });

  const columns: { id: QuestStatus; title: string; icon: React.ElementType }[] = [
    { id: 'Proposed', title: 'Proposals', icon: Vote },
    { id: 'Open', title: 'Ratified', icon: Circle },
    { id: 'In Progress', title: 'Active', icon: Timer },
    { id: 'Verification', title: 'Verifying', icon: FileCheck },
    // Completed column removed, moved to Ledger
  ];

  const handlePropose = () => {
    const nextId = Math.floor(100 + Math.random() * 900).toString();
    const proposal: Quest = {
      id: nextId,
      title: newQuest.title,
      description: newQuest.description,
      difficulty: newQuest.difficulty,
      status: 'Proposed',
      tag: newQuest.tag || 'Task',
      proposer_id: user.id,
      created_at: new Date().toISOString(),
      last_update_at: new Date().toISOString(),
      votes_for: [user.id],
      votes_against: [],
      verification_votes_for: [],
      verification_votes_against: []
    };
    createQuest(proposal);
    setIsModalOpen(false);
    setNewQuest({ title: '', description: '', difficulty: 3, tag: '' });
  };

  const handleBroadcastSignal = () => {
    const nextId = `sig-${Date.now()}`;
    const signal: Signal = {
      id: nextId,
      user_id: user.id,
      area: newSignal.area,
      message: newSignal.message,
      created_at: new Date().toISOString()
    };
    createSignal(signal);
    setIsSignalModalOpen(false);
    setNewSignal({ area: '', message: '' });
  };

  const handleClearSignal = (id: string) => {
    deleteSignal(id);
  };

  const handleVote = (questId: string, decision: 'for' | 'against', type: 'ratification' | 'verification') => {
    // 1. Intercept Negative Votes
    if (decision === 'against') {
      const quest = quests.find(q => q.id === questId);
      if (quest) {
        setBlockModal({
          isOpen: true,
          questId: quest.id,
          title: quest.title,
          type: type
        });
      }
      return; // Stop here, wait for Modal
    }

    // 2. Standard Positive Votes (Immediate)
    const rpcVoteType = type === 'ratification' ? 'for' : 'verify_for';
    voteOnQuest(questId, user.id, rpcVoteType);
  };

  const handleConfirmBlock = async (reason: string) => {
    const { questId, type } = blockModal;
    
    // A. Update the text reason
    await supabase.from('quests').update({ block_reason: reason }).eq('id', questId);
    
    // B. Cast the vote
    const rpcVoteType = type === 'ratification' ? 'against' : 'verify_against';
    await voteOnQuest(questId, user.id, rpcVoteType);
    
    setBlockModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleStatusChange = (questId: string, newStatus: QuestStatus) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;
    
    const updates: Partial<Quest> = { 
      status: newStatus, 
      last_update_at: new Date().toISOString() 
    };
    
    // Auto-claim logic: Ratified quests are automatically claimed by the proposer
    if (newStatus === 'Open') {
      updates.assignee_id = quest.proposer_id;
    }

    if (newStatus === 'In Progress' && !quest.assignee_id) {
      updates.assignee_id = user.id;
    }

    if (newStatus === 'Verification') {
      const link = verificationInput[questId];
      // Operational Check: Enforce GitHub Link
      if (!link || !link.includes('github.com')) {
        alert("A valid GitHub Pull Request link is required to submit for Verification.\n\nExample: github.com/ioi/core/pull/123");
        return; 
      }

      updates.pr_link = link;
      // Auto-vote for the submitter to start the process
      updates.verification_votes_for = [user.id];
      updates.verification_votes_against = [];
    }

    updateQuest(questId, updates);
  };

  const handleCheckIn = (questId: string) => {
    updateQuest(questId, { last_update_at: new Date().toISOString() });
  };

  const handleReclaim = (questId: string) => {
    updateQuest(questId, { 
      assignee_id: user.id,
      last_update_at: new Date().toISOString()
    });
  };

  if (questsLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Syncing with Core Kernel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        <p>Connection Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-serif font-bold text-zinc-50">Quest Log</h2>
          <p className="text-zinc-400 text-sm">Decentralized task management. Propose, Ratify, Verify.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsSignalModalOpen(true)} variant="secondary" className="gap-2 border border-zinc-700">
            <Radio size={16} className="text-amber-500" /> Broadcast Signal
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-0">
            <Plus size={16} /> Propose Quest
          </Button>
        </div>
      </div>

      <SignalRadar 
        signals={signals} 
        profiles={profiles} 
        currentUserId={user.id} 
        onClearSignal={handleClearSignal} 
      />

      {/* --- Quest Control Bar --- */}
      <div className="flex items-center gap-3 mb-4 p-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
          <input 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-9 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-600"
            placeholder="Search ID, Title, or Tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="h-6 w-px bg-zinc-800 mx-2"></div>

        {/* Filter: My Quests */}
        <button 
          onClick={() => setFilterMine(!filterMine)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border transition-all ${
            filterMine 
              ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
          }`}
        >
          <User size={14} />
          <span>Assigned to Me</span>
        </button>

        {/* Filter: Critical */}
        <button 
          onClick={() => setFilterCritical(!filterCritical)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border transition-all ${
            filterCritical 
              ? 'bg-red-900/30 border-red-500 text-red-300' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
          }`}
        >
          <AlertOctagon size={14} />
          <span>Critical Only</span>
        </button>

        {/* Active Filter Count */}
        {(filterMine || filterCritical || searchQuery) && (
           <span className="text-[10px] text-zinc-500 ml-auto">
             Showing {filteredQuests.length} of {quests.length} quests
           </span>
        )}
      </div>

      {/* Main Board Area (Active Context) */}
      <div className="flex-shrink-0 mb-6 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1100px]">
          {columns.map(col => (
            <QuestColumn
              key={col.id}
              id={col.id}
              title={col.title}
              icon={col.icon}
              quests={filteredQuests.filter(q => q.status === col.id)}
              profiles={profiles}
              currentUserId={user.id}
              isAdmin={!!isAdmin}
              onVote={handleVote}
              onStatusChange={handleStatusChange}
              onCheckIn={handleCheckIn}
              onReclaim={handleReclaim}
              verificationInput={verificationInput}
              setVerificationInput={setVerificationInput}
              onQuestClick={setActiveQuest}
            />
          ))}
        </div>
      </div>

      {/* Completion Ledger (Archive Context) */}
      <QuestLedger 
        quests={quests.filter(q => q.status === 'Completed')} 
        profiles={profiles} 
      />

      {/* Quest Detail Modal (Dossier) */}
      <QuestDetailModal 
        quest={activeQuest}
        onClose={() => setActiveQuest(null)}
        profiles={profiles}
        currentUserId={user.id}
        onReclaim={handleReclaim}
      />

      {/* Block Reason Modal */}
      <BlockQuestModal 
        isOpen={blockModal.isOpen}
        onClose={() => setBlockModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmBlock}
        questTitle={blockModal.title}
        type={blockModal.type}
      />

      {/* Quest Proposal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Quest Proposal">
        <div className="space-y-4">
          <Input 
            label="Title" 
            placeholder="e.g., Implement Zero-Knowledge Proof for login" 
            value={newQuest.title}
            onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
          />
          <TextArea 
            label="Description" 
            placeholder="Describe the acceptance criteria..." 
            value={newQuest.description}
            onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">System Impact (Complexity)</label>
              <select 
                className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                value={newQuest.difficulty}
                onChange={(e) => setNewQuest({...newQuest, difficulty: Number(e.target.value) as QuestDifficulty})}
              >
                <option value={1}>THREAD - Trivial (1)</option>
                <option value={2}>PROCESS - Easy (2)</option>
                <option value={3}>DAEMON - Medium (3)</option>
                <option value={5}>CLUSTER - Hard (5)</option>
                <option value={8}>KERNEL - Critical (8)</option>
              </select>
            </div>
            <Input 
              label="Tag" 
              placeholder="e.g., Security, UI, Backend" 
              value={newQuest.tag}
              onChange={(e) => setNewQuest({...newQuest, tag: e.target.value})}
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handlePropose} disabled={!newQuest.title || !newQuest.description}>Submit Proposal</Button>
          </div>
        </div>
      </Modal>

      {/* Broadcast Signal Modal */}
      <Modal isOpen={isSignalModalOpen} onClose={() => setIsSignalModalOpen(false)} title="Broadcast Coordination Signal">
        <div className="space-y-4">
          <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded-lg flex gap-3 text-amber-200">
             <AlertTriangle className="shrink-0" />
             <p className="text-sm">Broadcast signals let the team know you are touching sensitive files or logic to prevent merge conflicts.</p>
          </div>
          <Input 
            label="Target Area / File" 
            placeholder="e.g., /api/auth or UserSchema" 
            value={newSignal.area}
            onChange={(e) => setNewSignal({...newSignal, area: e.target.value})}
          />
          <TextArea 
            label="Message" 
            placeholder="e.g., I'm rewriting the JWT validation logic. Don't touch auth routes!" 
            value={newSignal.message}
            onChange={(e) => setNewSignal({...newSignal, message: e.target.value})}
          />
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsSignalModalOpen(false)}>Cancel</Button>
            <Button onClick={handleBroadcastSignal} disabled={!newSignal.area || !newSignal.message} className="bg-amber-600 hover:bg-amber-500 text-white border-0">
              <Radio size={16} className="mr-2" /> Broadcast Lock
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};```

##### File: components/Sidebar.tsx
##*Size: 12K, Lines: 206, Type: Java source, ASCII text*

```
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
};```

##### File: components/SpecViewer.tsx
##*Size: 32K, Lines: 640, Type: Java source, Unicode text, UTF-8 text*

```
import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useSignals } from '../hooks/useSignals';
import { Spec, SpecStatus, Profile, SpecCategory } from '../types';
import { GitPullRequest, CheckCircle2, AlertCircle, File, History, ArrowRight, Copy, Check, Loader2, Edit3, Save, X, Send, Trash2, AlertTriangle, Lock, Clock, RotateCcw, FolderOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// New Imports
import { SpecDiffViewer } from './spec/SpecDiffViewer';
import { SpecEditor, SPEC_TEMPLATES, EditorState } from './spec/SpecEditor';
import { SpecSidebar } from './spec/SpecSidebar';

const specStatusToIcon = (status: SpecStatus) => {
  switch (status) {
    case 'Ratified': return <CheckCircle2 size={14} className="inline mr-1 text-green-400" />;
    case 'Review': return <AlertCircle size={14} className="inline mr-1 text-amber-400" />;
    case 'Draft': return <File size={14} className="inline mr-1 text-zinc-400" />;
    case 'Archived': return <History size={14} className="inline mr-1 text-zinc-500" />;
    default: return <File size={14} className="inline mr-1" />;
  }
};

export const SpecViewer: React.FC = () => {
  const { user } = useAuth();
  const { signals, createSignal, deleteSignal } = useSignals();
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // -- View Mode State --
  const [sidebarMode, setSidebarMode] = useState<'governance' | 'tree'>('governance');

  // -- Selection & Editor State --
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    filename: '',
    category: 'Core',
    content: ''
  });

  // -- Modal State --
  const [isADRModalOpen, setIsADRModalOpen] = useState(false);
  const [newADR, setNewADR] = useState<{ title: string; targetId: string; content: string }>({ title: '', targetId: '', content: '' });
  const [hasCopied, setHasCopied] = useState(false);
  
  // -- Deletion State --
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // -- History / Version Control State --
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [viewingVersion, setViewingVersion] = useState<any | null>(null);

  // -- SOFT LOCK LOGIC --
  const activeLock = selectedSpec ? signals.find(s => 
    s.area === `Spec: ${selectedSpec.filename}` && 
    s.user_id !== user?.id
  ) : null;

  const lockerName = activeLock ? profiles.find(p => p.id === activeLock.user_id)?.username : 'Unknown';

  useEffect(() => {
    let signalId: string | null = null;
    if (isEditing && selectedSpec && user) {
      signalId = `lock-${selectedSpec.id}`;
      createSignal({
        id: signalId,
        user_id: user.id,
        area: `Spec: ${selectedSpec.filename}`,
        message: 'Currently editing this specification.',
        created_at: new Date().toISOString()
      });
    }
    return () => { if (signalId) deleteSignal(signalId); };
  }, [isEditing, selectedSpec?.id, selectedSpec?.filename, user]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [specsRes, profilesRes] = await Promise.all([
        supabase.from('specs').select('*').order('filename', { ascending: true }),
        supabase.from('profiles').select('*')
      ]);

      if (specsRes.data) setSpecs(specsRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  // Filtering & Tree Building
  const filteredSpecs = specs.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ratifiedSpecs = filteredSpecs.filter(s => s.status === 'Ratified').sort((a,b) => a.filename.localeCompare(b.filename));
  const activeProposals = filteredSpecs.filter(s => ['Draft', 'Review'].includes(s.status));
  const historySpecs = filteredSpecs.filter(s => s.status === 'Archived');

  const buildTree = (specList: Spec[]) => {
    const root: any = {};
    specList.forEach(spec => {
      const parts = spec.filename.split('/'); 
      let current = root;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = { __file: true, ...spec };
        } else {
          current[part] = current[part] || { __folder: true };
          current = current[part];
        }
      });
    });
    return root;
  };

  const fileTree = buildTree(filteredSpecs);

  const isAdmin = user?.role === 'Maintainer';
  const author = profiles.find(p => p.id === selectedSpec?.author_id);
  const targetSpec = selectedSpec?.target_spec_id ? specs.find(s => s.id === selectedSpec.target_spec_id) : null;

  // -- Handlers --
  const handleSelectSpec = (spec: Spec) => {
    setSelectedSpec(spec);
    setIsEditing(false);
    setIsCreating(false);
    setEditorState({
      title: spec.title,
      filename: spec.filename,
      category: spec.category,
      content: spec.content,
      targetId: spec.target_spec_id
    });
  };

  const handleStartCreate = () => {
    setSelectedSpec(null);
    setIsEditing(true);
    setIsCreating(true);
    setEditorState({
      title: 'New Standard',
      filename: 'core/new-standard.md', 
      category: 'Core',
      content: SPEC_TEMPLATES.STANDARD
    });
  };

  const handleSave = async () => {
    if (!user) return;

    if (isCreating) {
      const newId = `spec-${Date.now()}`;
      const newSpec: Spec = {
        id: newId,
        title: editorState.title,
        filename: editorState.filename,
        category: editorState.category,
        content: editorState.content,
        status: 'Draft',
        author_id: user.id,
        updated_at: new Date().toISOString(),
        version: 1
      };
      
      const { error } = await supabase.from('specs').insert(newSpec);
      if (error) { alert('Failed to create spec: ' + error.message); return; }
      
      setSpecs([...specs, newSpec]);
      setSelectedSpec(newSpec);
      setIsCreating(false);
      setIsEditing(false);

    } else if (selectedSpec) {
      // 1. SNAPSHOT
      await supabase.from('spec_versions').insert({
        spec_id: selectedSpec.id,
        content: selectedSpec.content,
        version: selectedSpec.version,
        modified_by: selectedSpec.author_id 
      });

      // 2. UPDATE
      const nextVersion = (selectedSpec.version || 1) + 1;
      const { error } = await supabase.from('specs').update({
        title: editorState.title,
        filename: editorState.filename,
        category: editorState.category,
        content: editorState.content,
        updated_at: new Date().toISOString(),
        version: nextVersion
      }).eq('id', selectedSpec.id);

      if (error) { alert('Failed to save changes: ' + error.message); return; }

      const updated = { ...selectedSpec, ...editorState, version: nextVersion, updated_at: new Date().toISOString() };
      setSpecs(specs.map(s => s.id === selectedSpec.id ? updated : s));
      setSelectedSpec(updated);
      setIsEditing(false);
    }
  };

  const fetchHistory = async () => {
    if (!selectedSpec) return;
    const { data } = await supabase
      .from('spec_versions')
      .select('*, profiles(username)')
      .eq('spec_id', selectedSpec.id)
      .order('version', { ascending: false });
    
    if (data) setHistory(data);
    setIsHistoryOpen(true);
    setViewingVersion(null); 
  };

  const updateSpecStatus = async (specId: string, status: SpecStatus) => {
    const { error } = await supabase.from('specs').update({ status, updated_at: new Date().toISOString() }).eq('id', specId);
    if (error) { alert('Error updating status'); return; }
    
    setSpecs(prev => prev.map(s => s.id === specId ? { ...s, status } : s));
    if (selectedSpec?.id === specId) setSelectedSpec(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = async () => {
    if (!selectedSpec) return;
    if (isAdmin) {
        const { error } = await supabase.from('specs').delete().eq('id', selectedSpec.id);
        if (error) { alert("Failed to delete: " + error.message); return; }
        setSpecs(prev => prev.filter(s => s.id !== selectedSpec.id));
        setSelectedSpec(null);
    } else {
        await updateSpecStatus(selectedSpec.id, 'Archived');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCopy = () => {
    if (selectedSpec) {
      navigator.clipboard.writeText(selectedSpec.content);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(specs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ioi-specs-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateADR = async () => {
    if (!newADR.targetId || !user) return;
    const target = specs.find(s => s.id === newADR.targetId);
    const idStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    const newSpec: Spec = {
      id: `adr-${Date.now()}`,
      title: newADR.title,
      filename: `decisions/${target?.category.toLowerCase()}/ADR-${idStr}-${target?.filename.replace('.md', '') || 'unknown'}`,
      category: target?.category || 'Core',
      content: newADR.content,
      status: 'Draft',
      author_id: user.id,
      updated_at: new Date().toISOString(),
      version: 0,
      target_spec_id: newADR.targetId
    };

    setSpecs([...specs, newSpec]);
    handleSelectSpec(newSpec); 
    setIsADRModalOpen(false);
    setNewADR({ title: '', targetId: '', content: '' });
    await supabase.from('specs').insert(newSpec);
  };

  if (loading) {
     return (
       <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
         <Loader2 className="animate-spin text-indigo-500" size={32} />
         <p>Loading Documentation...</p>
       </div>
     );
   }

  return (
    <div className="h-full flex gap-6">
      {/* --- SIDEBAR --- */}
      <SpecSidebar 
        mode={sidebarMode}
        setMode={setSidebarMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fileTree={fileTree}
        ratifiedSpecs={ratifiedSpecs}
        activeProposals={activeProposals}
        historySpecs={historySpecs}
        selectedSpecId={selectedSpec?.id}
        onSelect={handleSelectSpec}
        isAdmin={!!isAdmin}
        onStartCreate={handleStartCreate}
        onOpenADRModal={() => setIsADRModalOpen(true)}
        onDownloadBackup={handleDownloadBackup}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
         <Card className="flex-1 flex flex-col overflow-hidden bg-zinc-950 border-zinc-800">
           {selectedSpec || isCreating ? (
             <>
               {/* HEADER ACTION BAR */}
               <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                 {/* Left Side Info */}
                 <div className="flex items-center gap-4">
                   {isEditing ? (
                      <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                        <Edit3 size={16} />
                        <span>{isCreating ? 'Creating New Standard' : `Editing: ${selectedSpec?.filename}`}</span>
                      </div>
                   ) : (
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-xl font-serif font-bold text-zinc-50">{selectedSpec?.title}</h1>
                          <Badge variant="outline" className="font-mono">{specStatusToIcon(selectedSpec!.status)} {selectedSpec?.filename} <span className="opacity-50 ml-1">v{selectedSpec?.version}</span></Badge>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span>Authored by <span className="text-zinc-200">{author?.username || 'Unknown'}</span></span>
                          {targetSpec && (
                            <>
                              <span>•</span>
                              <ArrowRight size={12} />
                              <span className="text-indigo-400">Modifies {targetSpec.filename}</span>
                            </>
                          )}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Lock Banner */}
                 {!isEditing && activeLock && (
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-950/30 border border-amber-900/50 rounded text-xs text-amber-200 animate-pulse">
                     <Lock size={12} />
                     <span>Editing locked by <span className="font-bold">{lockerName}</span></span>
                   </div>
                 )}

                 {/* Right Side Buttons */}
                 <div className="flex gap-2">
                    {!isEditing && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
                          {hasCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" onClick={fetchHistory} title="View Version History">
                          <Clock size={14} />
                        </Button>
                      </>
                    )}

                    {selectedSpec?.status === 'Draft' && !isEditing && (
                       <Button variant="secondary" size="sm" className="gap-2" onClick={() => updateSpecStatus(selectedSpec.id, 'Review')}>
                         <Send size={14} /> Request Review
                       </Button>
                    )}

                    {!isEditing && selectedSpec && (selectedSpec.status === 'Draft' || selectedSpec.status === 'Review' || isAdmin) && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => { setIsEditing(true); setEditorState({ ...selectedSpec } as EditorState); }}
                        disabled={!!activeLock}
                        title={activeLock ? `File is being edited by ${lockerName}` : 'Edit File'}
                      >
                        {activeLock ? <Lock size={14} /> : <Edit3 size={14} />} Edit
                      </Button>
                    )}

                    {isEditing && (
                       <>
                         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setIsCreating(false); if (selectedSpec) handleSelectSpec(selectedSpec); }}>
                            <X size={14} /> Cancel
                         </Button>
                         <Button variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-500 border-0 gap-2" onClick={handleSave}>
                           <Save size={14} /> Save Changes
                         </Button>
                       </>
                    )}

                    {!isEditing && selectedSpec && selectedSpec.status !== 'Ratified' && selectedSpec.status !== 'Archived' && isAdmin && (
                       <Button variant="primary" size="sm" className="bg-green-700 hover:bg-green-600 text-white border-0 gap-2" onClick={() => updateSpecStatus(selectedSpec.id, 'Ratified')}>
                        <CheckCircle2 size={14} /> Ratify
                      </Button>
                    )}

                    {!isEditing && selectedSpec && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-2 ${isAdmin ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                            onClick={() => setIsDeleteModalOpen(true)}
                            title={isAdmin ? "Permanently Delete" : "Archive"}
                        >
                            <Trash2 size={14} />
                        </Button>
                    )}
                 </div>
               </div>
               
               {/* CONTENT AREA */}
               <div className="flex-1 flex overflow-hidden">
                 {isEditing ? (
                    <SpecEditor state={editorState} onChange={setEditorState} />
                 ) : (
                    // STANDARD VIEW
                    <div className="w-full h-full overflow-y-auto custom-scrollbar p-10">
                       {selectedSpec?.target_spec_id && targetSpec && selectedSpec.status !== 'Ratified' ? (
                          // Diff View for ADRs
                          <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded p-4 mb-8">
                              <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                <GitPullRequest size={14} /> 
                                Proposed Changes
                              </h3>
                              <p className="text-xs text-zinc-500 mb-4">Comparing Draft against <span className="text-zinc-300 font-mono">{targetSpec.filename}</span></p>
                              <SpecDiffViewer oldText={targetSpec.content} newText={selectedSpec.content} />
                            </div>
                          </div>
                       ) : (
                          // Render Markdown
                          <div className="prose prose-zinc prose-invert max-w-3xl mx-auto">
                             <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({node, inline, className, children, ...props}: any) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <div className="not-prose my-6 relative group">
                                                <div className="absolute right-2 top-2 text-[10px] text-zinc-500 font-mono uppercase opacity-50 group-hover:opacity-100 transition-opacity select-none">
                                                    {match[1]}
                                                </div>
                                                <pre className="bg-[#1e1e1e] border border-zinc-800 rounded-lg p-4 overflow-x-auto shadow-sm">
                                                    <code className={`${className} font-mono text-sm`} {...props}>
                                                        {children}
                                                    </code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <code className="bg-zinc-800/50 text-zinc-200 px-1.5 py-0.5 rounded border border-zinc-700/50 text-[0.85em] font-mono" {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                               {selectedSpec!.content}
                             </ReactMarkdown>
                          </div>
                       )}
                    </div>
                 )}
               </div>
             </>
           ) : (
             // EMPTY STATE
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/20">
               <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-600">
                  <FolderOpen size={32} />
               </div>
               <h3 className="text-xl font-serif font-bold text-zinc-200 mb-2">No Specification Selected</h3>
               <p className="text-zinc-500 max-w-md text-center mb-8">Select a module from the registry to view its details, or initialize a new standard for the protocol.</p>
               <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2" onClick={handleStartCreate}>
                 <Edit3 size={16} /> Initialize New Standard
               </Button>
             </div>
           )}
         </Card>
      </div>

      {/* Legacy Create ADR Modal */}
      <Modal isOpen={isADRModalOpen} onClose={() => setIsADRModalOpen(false)} title="Create Architecture Decision Record (ADR)">
        <div className="space-y-4">
          <Input 
            label="Title" 
            placeholder="e.g., Update Staking Parameters"
            value={newADR.title}
            onChange={(e) => setNewADR({...newADR, title: e.target.value})} 
          />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Target Spec</label>
            <select 
              className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              value={newADR.targetId}
              onChange={(e) => {
                const target = specs.find(s => s.id === e.target.value);
                setNewADR({
                  ...newADR,
                  targetId: e.target.value,
                  content: target ? target.content : ''
                });
              }}
            >
              <option value="">-- Select a Standard to Amend --</option>
              {ratifiedSpecs.map(s => (
                <option key={s.id} value={s.id}>{s.filename} ({s.title})</option>
              ))}
            </select>
          </div>
          <TextArea 
            label="Content (Markdown)" 
            className="font-mono text-xs min-h-[300px]"
            value={newADR.content}
            onChange={(e) => setNewADR({...newADR, content: e.target.value})}
          />
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsADRModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateADR} disabled={!newADR.targetId || !newADR.title}>Propose ADR</Button>
          </div>
        </div>
      </Modal>

      {/* HISTORY MODAL */}
      <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title={`History: ${selectedSpec?.filename}`}>
        <div className="flex h-[60vh] gap-4">
          {/* List of Versions */}
          <div className="w-1/3 border-r border-zinc-800 pr-2 overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Previous Snapshots</h4>
            {history.length === 0 && <p className="text-xs text-zinc-600 italic">No history recorded.</p>}
            {history.map((ver) => (
              <div 
                key={ver.id}
                onClick={() => setViewingVersion(ver)}
                className={`p-3 rounded cursor-pointer border mb-2 transition-all ${
                  viewingVersion?.id === ver.id 
                    ? 'bg-zinc-800 border-indigo-500/50' 
                    : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="outline">v{ver.version}</Badge>
                  <span className="text-[10px] text-zinc-500">{new Date(ver.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">
                   Snapshot before update
                </p>
              </div>
            ))}
          </div>

          {/* Diff View */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950 p-4 rounded border border-zinc-800">
            {viewingVersion ? (
              <>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                   <div>
                     <span className="text-xs font-bold text-red-400 block">Comparing v{viewingVersion.version} (Old)</span>
                     <span className="text-xs font-bold text-green-400 block">Against v{selectedSpec?.version} (Current)</span>
                   </div>
                   {isAdmin && (
                     <Button 
                       size="sm" 
                       className="h-6 text-xs gap-1 bg-amber-900/30 text-amber-200 border border-amber-900 hover:bg-amber-900/50"
                       onClick={() => {
                         if(confirm("Revert to this version? Current changes will be lost.")) {
                           setEditorState({ ...selectedSpec, content: viewingVersion.content } as EditorState);
                           setIsHistoryOpen(false);
                           setIsEditing(true);
                         }
                       }}
                     >
                       <RotateCcw size={10} /> Revert
                     </Button>
                   )}
                </div>
                <SpecDiffViewer oldText={viewingVersion.content} newText={selectedSpec?.content || ''} />
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <Clock size={32} className="mb-2 opacity-20" />
                <p>Select a version to inspect changes.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title={isAdmin ? "Delete Specification" : "Archive Specification"}>
        <div className="space-y-4">
            <div className={`p-4 rounded border flex items-start gap-3 ${isAdmin ? 'bg-red-950/20 border-red-900/50 text-red-200' : 'bg-amber-950/20 border-amber-900/50 text-amber-200'}`}>
                <AlertTriangle className="shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm">{isAdmin ? 'Permanent Deletion' : 'Propose Archival'}</h4>
                    <p className="text-xs opacity-80 mt-1">
                        {isAdmin 
                            ? "You are about to permanently destroy this record. This action cannot be undone." 
                            : "You are proposing to move this specification to the Archive. It will no longer be considered active."}
                    </p>
                </div>
            </div>
            
            <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-sm text-zinc-400 truncate">
                {selectedSpec?.filename}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button 
                    onClick={handleDelete} 
                    className={isAdmin ? "bg-red-600 hover:bg-red-500 text-white border-0" : "bg-amber-600 hover:bg-amber-500 text-white border-0"}
                >
                    {isAdmin ? "Confirm Delete" : "Confirm Archive"}
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};```

##### File: components/TGEDashboard.tsx
##*Size: 12K, Lines: 213, Type: Java source, ASCII text*

```
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Contribution, Profile, ContributionType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Download, Table, Loader2, BarChart3, List, Code, Mic, FileText, Gift } from 'lucide-react';
import { AttributionSimulator } from './tge/AttributionSimulator'; 
import { WaffleChart } from './ui/WaffleChart'; 

export const TGEDashboard: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'raw' | 'model'>('raw');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [contributionsRes, profilesRes] = await Promise.all([
        supabase.from('contributions').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*')
      ]);

      if (contributionsRes.data) setContributions(contributionsRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // -- DATA PREP --
  const counts: Record<string, number> = {
    CODE_MERGE: 0,
    ADR_AUTHOR: 0,
    MEETING_HOST: 0,
    MANUAL_BOUNTY: 0
  };

  contributions.forEach(c => {
    if (counts[c.type] !== undefined) counts[c.type]++;
  });

  const waffleData = [
    { label: 'Code Merge', value: counts.CODE_MERGE, color: 'bg-indigo-500' },
    { label: 'ADR Author', value: counts.ADR_AUTHOR, color: 'bg-emerald-500' },
    { label: 'Meeting Host', value: counts.MEETING_HOST, color: 'bg-amber-500' },
    { label: 'Bounty', value: counts.MANUAL_BOUNTY, color: 'bg-rose-500' },
  ].filter(d => d.value > 0);

  const handleExportCSV = () => {
     const headers = ['ID', 'User', 'Type', 'Weight', 'Date', 'Ref'];
    const rows = contributions.map(c => [
        c.id,
        profiles.find(p => p.id === c.user_id)?.username || 'Unknown',
        c.type,
        c.weight,
        c.created_at,
        c.reference_link
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ioi_tge_raw_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Calculating Token Ledger...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-zinc-50">TGE Evidence & Attribution</h2>
            <p className="text-zinc-400 text-sm">Event ledger and economic simulation engine.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
             <button 
                onClick={() => setMode('raw')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'raw' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <List size={14} /> Raw Evidence
             </button>
             <button 
                onClick={() => setMode('model')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'model' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <BarChart3 size={14} /> Attribution Model
             </button>
          </div>
        </div>

        {/* MODE: ATTRIBUTION MODEL */}
        {mode === 'model' && (
            <AttributionSimulator contributions={contributions} profiles={profiles} />
        )}

        {/* MODE: RAW DATA */}
        {mode === 'raw' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            
            {/* NEW: Stat Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="p-4 rounded-lg bg-indigo-900/10 border border-indigo-900/30 flex items-center gap-3">
                  <div className="p-2 bg-indigo-900/20 rounded text-indigo-400"><Code size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-indigo-100">{counts.CODE_MERGE}</span>
                    <span className="text-[10px] uppercase text-indigo-400/70 tracking-wider">Merges</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-emerald-900/10 border border-emerald-900/30 flex items-center gap-3">
                  <div className="p-2 bg-emerald-900/20 rounded text-emerald-400"><FileText size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-emerald-100">{counts.ADR_AUTHOR}</span>
                    <span className="text-[10px] uppercase text-emerald-400/70 tracking-wider">Specs</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-amber-900/10 border border-amber-900/30 flex items-center gap-3">
                  <div className="p-2 bg-amber-900/20 rounded text-amber-400"><Mic size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-amber-100">{counts.MEETING_HOST}</span>
                    <span className="text-[10px] uppercase text-amber-400/70 tracking-wider">Meetings</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-rose-900/10 border border-rose-900/30 flex items-center gap-3">
                  <div className="p-2 bg-rose-900/20 rounded text-rose-400"><Gift size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-rose-100">{counts.MANUAL_BOUNTY}</span>
                    <span className="text-[10px] uppercase text-rose-400/70 tracking-wider">Bounties</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Visuals & Actions */}
              <div className="space-y-6">
                 <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Memory Block Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {contributions.length > 0 ? (
                         <WaffleChart data={waffleData} />
                       ) : (
                         <div className="h-40 flex items-center justify-center text-zinc-500 text-xs italic">No data blocks found.</div>
                       )}
                    </CardContent>
                 </Card>

                 <Button variant="outline" className="w-full gap-2 text-xs" onClick={handleExportCSV}>
                    <Download size={14} /> Download Ledger CSV
                </Button>
              </div>

              {/* Right Column: Detailed Ledger */}
              <Card className="lg:col-span-2 flex flex-col h-[600px] lg:h-auto bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Raw Event Log</CardTitle>
                  <Table size={16} className="text-zinc-500" />
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-0 custom-scrollbar">
                   <table className="w-full text-left text-sm text-zinc-400">
                     <thead className="bg-zinc-950/50 text-zinc-500 font-medium sticky top-0 backdrop-blur-sm z-10">
                       <tr>
                         <th className="px-6 py-3">Timestamp</th>
                         <th className="px-6 py-3">Contributor</th>
                         <th className="px-6 py-3">Type</th>
                         <th className="px-6 py-3">Reference</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-800/50">
                       {contributions.map(c => {
                           const user = profiles.find(p => p.id === c.user_id);
                           return (
                             <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                               <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                                 {new Date(c.created_at).toISOString().split('T')[0]}
                               </td>
                               <td className="px-6 py-4 font-medium text-zinc-300">{user?.username || 'Unknown'}</td>
                               <td className="px-6 py-4">
                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                   {c.type.replace('_', ' ')}
                                 </span>
                               </td>
                               <td className="px-6 py-4 font-mono text-xs text-indigo-400">{c.reference_link}</td>
                             </tr>
                           );
                         })
                       }
                     </tbody>
                   </table>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};```

#### Directory: contexts

##### File: contexts/AuthContext.tsx
##*Size: 4.0K, Lines: 125, Type: Java source, ASCII text*

```
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Role } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: Profile | null;
  login: (username: string, accessKey: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  addMember: (username: string, role: Role, password: string) => Promise<{ success: boolean; message?: string }>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  login: async () => ({ success: false }), 
  logout: () => {}, 
  addMember: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  loading: true 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check local storage for persisted session
  useEffect(() => {
    const storedId = localStorage.getItem('ioi_nexus_user_id');
    if (storedId) {
      fetchUser(storedId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (id: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data) {
      setUser(data);
    } else {
      // Invalid ID in storage
      localStorage.removeItem('ioi_nexus_user_id');
    }
    setLoading(false);
  };

  const login = async (username: string, accessKey: string) => {
    setLoading(true);
    
    // RPC Call for secure verification via server-side function
    // This prevents password leakage to the frontend
    const { data, error } = await supabase.rpc('login_user', { 
        username_in: username, 
        key_in: accessKey 
    });

    if (error) {
        console.error("Login RPC Error:", error);
        setLoading(false);
        return { success: false, message: 'System Error: ' + error.message };
    }

    if (data && data.length > 0) {
      const profile = data[0];
      setUser(profile);
      localStorage.setItem('ioi_nexus_user_id', profile.id);
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, message: 'Invalid identity or access code.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ioi_nexus_user_id');
  };

  const addMember = async (username: string, role: Role, password: string) => {
    if (!user || user.role !== 'Maintainer') {
        return { success: false, message: 'Unauthorized. Maintainers only.' };
    }

    const { data, error } = await supabase.rpc('create_user_rpc', {
        username_in: username,
        role_in: role,
        password_in: password
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true };
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    if (!user) return { success: false, message: 'Not logged in.' };

    const { data, error } = await supabase.rpc('update_password_rpc', {
        user_id_in: user.id,
        old_password_in: oldPassword,
        new_password_in: newPassword
    });

    if (error) {
        return { success: false, message: error.message };
    }

    if (data === false) {
        return { success: false, message: 'Incorrect existing password.' };
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addMember, updatePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};```

##### File: contexts/NotificationContext.tsx
##*Size: 4.0K, Lines: 112, Type: Java source, ASCII text*

```
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Notification } from '../types';
import { useAuth } from './AuthContext';
import { ToastMessage } from '../components/ui/Toast';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  loading: boolean;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  loading: true,
  toasts: [],
  removeToast: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  useEffect(() => {
    if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
    }

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (data) setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();

    // Realtime Subscription
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newNotif = payload.new as Notification;
          setNotifications((prev) => [newNotif, ...prev]);

          // NEW: Add Toast
          const toastId = Math.random().toString(36);
          let toastType: 'info' | 'success' | 'warning' = 'info';
          if (newNotif.type === 'SUCCESS') toastType = 'success';
          if (newNotif.type === 'ALERT') toastType = 'warning';

          setToasts(prev => [...prev, {
            id: toastId,
            title: newNotif.title,
            message: newNotif.message,
            type: toastType
          }]);

          // Auto-dismiss after 5s
          setTimeout(() => removeToast(toastId), 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (id: string) => {
    // Optimistic
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  };

  const markAllAsRead = async () => {
    // Optimistic
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    if (user) {
        await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, loading, toasts, removeToast }}>
      {children}
    </NotificationContext.Provider>
  );
};```

#### Directory: dist (Large - showing tree only)

##Tree structure:

```
/home/levijosman/depin-network/codebase/ioi-foundation/dist
├── assets
│   ├── index-KSplhl0S.js
│   └── index-SQ_z8fdC.css
├── index.html
└── p7.zip

1 directory, 4 files
```

#### Directory: hooks

##### File: hooks/useLocalStorage.ts
##*Size: 4.0K, Lines: 40, Type: Java source, Unicode text, UTF-8 text*

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}```

##### File: hooks/useQuestData.ts
##*Size: 8.0K, Lines: 157, Type: Java source, ASCII text*

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Quest, Profile } from '../types';

export const useQuestData = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [questsRes, profilesRes] = await Promise.all([
        supabase.from('quests').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*')
      ]);

      if (questsRes.error) throw questsRes.error;
      if (profilesRes.error) throw profilesRes.error;

      setQuests(questsRes.data || []);
      setProfiles(profilesRes.data || []);
    } catch (e: any) {
      console.error('Error fetching data:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();

    // Realtime Subscription
    const channel = supabase
      .channel('public:quests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' }, (payload) => {
         if (payload.eventType === 'INSERT') {
             setQuests(prev => [payload.new as Quest, ...prev]);
         } else if (payload.eventType === 'UPDATE') {
             setQuests(prev => prev.map(q => q.id === payload.new.id ? payload.new as Quest : q));
         } else if (payload.eventType === 'DELETE') {
             setQuests(prev => prev.filter(q => q.id !== payload.old.id));
         }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const createQuest = async (quest: Quest) => {
    // Use RPC for creation to ensure permissions are handled correctly via Security Definer
    const { data, error } = await supabase.rpc('create_quest_rpc', {
        title_in: quest.title,
        desc_in: quest.description,
        diff_in: quest.difficulty,
        tag_in: quest.tag,
        proposer_id_in: quest.proposer_id
    });

    if (error) {
      setError(error.message);
      console.error('Error creating quest:', error);
      alert(`Failed to create proposal: ${error.message}`);
    } else {
        // Optimistic / fetch handles update
        fetchAll();
    }
  };

  const updateQuest = async (id: string, updates: Partial<Quest>) => {
    // Optimistic update
    setQuests(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));

    const { error } = await supabase.from('quests').update(updates).eq('id', id);
    if (error) {
      setError(error.message);
      console.error('Error updating quest:', error);
      fetchAll(); // Revert
    }
  };

  const voteOnQuest = async (questId: string, userId: string, voteType: 'for' | 'against' | 'verify_for' | 'verify_against', reason?: string) => {
    // Optimistic Update
    setQuests(prev => prev.map(q => {
      if (q.id !== questId) return q;

      const newQ = { ...q };
      
      // Helper function to simulate the "Add to target, remove from other" logic of the RPC
      const toggle = (target: string[], other: string[], uid: string): [string[], string[]] => {
        // Ensure UID is in target (dedupe)
        const newTarget = target.includes(uid) ? target : [...target, uid];
        // Ensure UID is NOT in other
        const newOther = other.filter(id => id !== uid);
        return [newTarget, newOther];
      };

      if (voteType === 'for') {
        const [t, o] = toggle(newQ.votes_for, newQ.votes_against, userId);
        newQ.votes_for = t;
        newQ.votes_against = o;
      } else if (voteType === 'against') {
        const [t, o] = toggle(newQ.votes_against, newQ.votes_for, userId);
        newQ.votes_against = t;
        newQ.votes_for = o;
      } else if (voteType === 'verify_for') {
        const [t, o] = toggle(newQ.verification_votes_for || [], newQ.verification_votes_against || [], userId);
        newQ.verification_votes_for = t;
        newQ.verification_votes_against = o;
      } else if (voteType === 'verify_against') {
        const [t, o] = toggle(newQ.verification_votes_against || [], newQ.verification_votes_for || [], userId);
        newQ.verification_votes_against = t;
        newQ.verification_votes_for = o;
      }

      if (reason) {
        newQ.block_reason = reason;
      }
      
      return newQ;
    }));
    
    // RPC Call
    const { error } = await supabase.rpc('toggle_vote', {
      quest_id: questId,
      user_id: userId,
      vote_type: voteType,
      reason: reason || null
    });

    if (error) {
      console.error('Error voting:', error);
      setError(error.message);
      // Revert/Fetch on error
      fetchAll();
    } else {
      // Quietly ensure sync in background, but optimistic UI should hold
      const { data } = await supabase.from('quests').select('*').eq('id', questId).single();
      if (data) {
        setQuests(prev => prev.map(q => q.id === questId ? data : q));
      }
    }
  };

  return { 
    quests, 
    profiles, 
    loading, 
    error, 
    createQuest, 
    updateQuest,
    voteOnQuest,
    refresh: fetchAll
  };
};```

##### File: hooks/useRoute.ts
##*Size: 4.0K, Lines: 30, Type: Java source, ASCII text*

```typescript
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
};```

##### File: hooks/useSignals.ts
##*Size: 4.0K, Lines: 74, Type: Java source, ASCII text*

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Signal } from '../types';

export const useSignals = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchSignals = async () => {
      const { data } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setSignals(data);
      setLoading(false);
    };

    fetchSignals();

    // Realtime subscription
    const channel = supabase
      .channel('public:signals')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'signals' },
        (payload) => {
          const newSignal = payload.new as Signal;
          setSignals((prev) => {
            // Dedupe in case of optimistic update or double firing
            if (prev.some(s => s.id === newSignal.id)) return prev;
            return [newSignal, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'signals' },
        (payload) => {
          const deletedId = payload.old.id;
          setSignals((prev) => prev.filter((s) => s.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createSignal = async (signal: Signal) => {
    // Optimistic update
    setSignals((prev) => [signal, ...prev]);
    const { error } = await supabase.from('signals').insert(signal);
    if (error) {
      console.error('Error broadcasting signal:', error);
      // Rollback
      setSignals((prev) => prev.filter(s => s.id !== signal.id));
    }
  };

  const deleteSignal = async (id: string) => {
    // Optimistic update
    setSignals((prev) => prev.filter((s) => s.id !== id));
    const { error } = await supabase.from('signals').delete().eq('id', id);
    if (error) {
      console.error('Error deleting signal:', error);
      // Revert if failed (simple refetch strategy could also work)
    }
  };

  return { signals, loading, createSignal, deleteSignal };
};```

#### Directory: lib

##### File: lib/supabase.ts
##*Size: 4.0K, Lines: 21, Type: Java source, ASCII text*

```typescript
import { createClient } from '@supabase/supabase-js';

// Safely access environment variables, handling cases where import.meta.env is undefined
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

// Fail hard in production if keys are missing to avoid silent failures
if (env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error("Fatal: Supabase keys missing in production environment. Please check your deployment settings.");
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. App running in offline/demo mode.');
}

// Initialize client with fallback values to prevent runtime crash in dev/test
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);```

#### Directory: node_modules (Large - showing tree only)

##Tree structure:

```
/home/levijosman/depin-network/codebase/ioi-foundation/node_modules
├── @babel
│   ├── code-frame
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── compat-data
│   │   ├── data
│   │   ├── corejs2-built-ins.js
│   │   ├── corejs3-shipped-proposals.js
│   │   ├── LICENSE
│   │   ├── native-modules.js
│   │   ├── overlapping-plugins.js
│   │   ├── package.json
│   │   ├── plugin-bugfixes.js
│   │   ├── plugins.js
│   │   └── README.md
│   ├── core
│   │   ├── lib
│   │   ├── src
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── generator
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-compilation-targets
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-globals
│   │   ├── data
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-module-imports
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-module-transforms
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-plugin-utils
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helpers
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-string-parser
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-validator-identifier
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── helper-validator-option
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── parser
│   │   ├── bin
│   │   ├── lib
│   │   ├── typings
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── plugin-transform-react-jsx-self
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── plugin-transform-react-jsx-source
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── template
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── traverse
│   │   ├── lib
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.overrides.json
│   └── types
│       ├── lib
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── bail
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── baseline-browser-mapping
│   ├── dist
│   │   ├── cli.js
│   │   ├── index.cjs
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── LICENSE.txt
│   ├── package.json
│   └── README.md
├── browserslist
│   ├── browser.js
│   ├── cli.js
│   ├── error.d.ts
│   ├── error.js
│   ├── index.d.ts
│   ├── index.js
│   ├── LICENSE
│   ├── node.js
│   ├── package.json
│   ├── parse.js
│   └── README.md
├── caniuse-lite
│   ├── data
│   │   ├── features
│   │   ├── regions
│   │   ├── agents.js
│   │   ├── browsers.js
│   │   ├── browserVersions.js
│   │   └── features.js
│   ├── dist
│   │   ├── lib
│   │   └── unpacker
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── ccount
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── character-entities
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── character-entities-html4
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── character-entities-legacy
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── character-reference-invalid
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── clsx
│   ├── dist
│   │   ├── clsx.js
│   │   ├── clsx.min.js
│   │   ├── clsx.mjs
│   │   ├── lite.js
│   │   └── lite.mjs
│   ├── clsx.d.mts
│   ├── clsx.d.ts
│   ├── license
│   ├── package.json
│   └── readme.md
├── comma-separated-tokens
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── convert-source-map
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── csstype
│   ├── index.d.ts
│   ├── index.js.flow
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-array
│   ├── dist
│   │   ├── d3-array.js
│   │   └── d3-array.min.js
│   ├── src
│   │   ├── threshold
│   │   ├── array.js
│   │   ├── ascending.js
│   │   ├── bin.js
│   │   ├── bisect.js
│   │   ├── bisector.js
│   │   ├── blur.js
│   │   ├── constant.js
│   │   ├── count.js
│   │   ├── cross.js
│   │   ├── cumsum.js
│   │   ├── descending.js
│   │   ├── deviation.js
│   │   ├── difference.js
│   │   ├── disjoint.js
│   │   ├── every.js
│   │   ├── extent.js
│   │   ├── filter.js
│   │   ├── fsum.js
│   │   ├── greatestIndex.js
│   │   ├── greatest.js
│   │   ├── group.js
│   │   ├── groupSort.js
│   │   ├── identity.js
│   │   ├── index.js
│   │   ├── intersection.js
│   │   ├── leastIndex.js
│   │   ├── least.js
│   │   ├── map.js
│   │   ├── maxIndex.js
│   │   ├── max.js
│   │   ├── mean.js
│   │   ├── median.js
│   │   ├── merge.js
│   │   ├── minIndex.js
│   │   ├── min.js
│   │   ├── mode.js
│   │   ├── nice.js
│   │   ├── number.js
│   │   ├── pairs.js
│   │   ├── permute.js
│   │   ├── quantile.js
│   │   ├── quickselect.js
│   │   ├── range.js
│   │   ├── rank.js
│   │   ├── reduce.js
│   │   ├── reverse.js
│   │   ├── scan.js
│   │   ├── shuffle.js
│   │   ├── some.js
│   │   ├── sort.js
│   │   ├── subset.js
│   │   ├── sum.js
│   │   ├── superset.js
│   │   ├── ticks.js
│   │   ├── transpose.js
│   │   ├── union.js
│   │   ├── variance.js
│   │   └── zip.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-color
│   ├── dist
│   │   ├── d3-color.js
│   │   └── d3-color.min.js
│   ├── src
│   │   ├── color.js
│   │   ├── cubehelix.js
│   │   ├── define.js
│   │   ├── index.js
│   │   ├── lab.js
│   │   └── math.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-ease
│   ├── dist
│   │   ├── d3-ease.js
│   │   └── d3-ease.min.js
│   ├── src
│   │   ├── back.js
│   │   ├── bounce.js
│   │   ├── circle.js
│   │   ├── cubic.js
│   │   ├── elastic.js
│   │   ├── exp.js
│   │   ├── index.js
│   │   ├── linear.js
│   │   ├── math.js
│   │   ├── poly.js
│   │   ├── quad.js
│   │   └── sin.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-format
│   ├── dist
│   │   ├── d3-format.js
│   │   └── d3-format.min.js
│   ├── locale
│   │   ├── ar-001.json
│   │   ├── ar-AE.json
│   │   ├── ar-BH.json
│   │   ├── ar-DJ.json
│   │   ├── ar-DZ.json
│   │   ├── ar-EG.json
│   │   ├── ar-EH.json
│   │   ├── ar-ER.json
│   │   ├── ar-IL.json
│   │   ├── ar-IQ.json
│   │   ├── ar-JO.json
│   │   ├── ar-KM.json
│   │   ├── ar-KW.json
│   │   ├── ar-LB.json
│   │   ├── ar-LY.json
│   │   ├── ar-MA.json
│   │   ├── ar-MR.json
│   │   ├── ar-OM.json
│   │   ├── ar-PS.json
│   │   ├── ar-QA.json
│   │   ├── ar-SA.json
│   │   ├── ar-SD.json
│   │   ├── ar-SO.json
│   │   ├── ar-SS.json
│   │   ├── ar-SY.json
│   │   ├── ar-TD.json
│   │   ├── ar-TN.json
│   │   ├── ar-YE.json
│   │   ├── ca-ES.json
│   │   ├── cs-CZ.json
│   │   ├── da-DK.json
│   │   ├── de-CH.json
│   │   ├── de-DE.json
│   │   ├── en-CA.json
│   │   ├── en-GB.json
│   │   ├── en-IE.json
│   │   ├── en-IN.json
│   │   ├── en-US.json
│   │   ├── es-BO.json
│   │   ├── es-ES.json
│   │   ├── es-MX.json
│   │   ├── fi-FI.json
│   │   ├── fr-CA.json
│   │   ├── fr-FR.json
│   │   ├── he-IL.json
│   │   ├── hu-HU.json
│   │   ├── it-IT.json
│   │   ├── ja-JP.json
│   │   ├── ko-KR.json
│   │   ├── mk-MK.json
│   │   ├── nl-NL.json
│   │   ├── pl-PL.json
│   │   ├── pt-BR.json
│   │   ├── pt-PT.json
│   │   ├── ru-RU.json
│   │   ├── sl-SI.json
│   │   ├── sv-SE.json
│   │   ├── uk-UA.json
│   │   └── zh-CN.json
│   ├── src
│   │   ├── defaultLocale.js
│   │   ├── exponent.js
│   │   ├── formatDecimal.js
│   │   ├── formatGroup.js
│   │   ├── formatNumerals.js
│   │   ├── formatPrefixAuto.js
│   │   ├── formatRounded.js
│   │   ├── formatSpecifier.js
│   │   ├── formatTrim.js
│   │   ├── formatTypes.js
│   │   ├── identity.js
│   │   ├── index.js
│   │   ├── locale.js
│   │   ├── precisionFixed.js
│   │   ├── precisionPrefix.js
│   │   └── precisionRound.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-interpolate
│   ├── dist
│   │   ├── d3-interpolate.js
│   │   └── d3-interpolate.min.js
│   ├── src
│   │   ├── transform
│   │   ├── array.js
│   │   ├── basisClosed.js
│   │   ├── basis.js
│   │   ├── color.js
│   │   ├── constant.js
│   │   ├── cubehelix.js
│   │   ├── date.js
│   │   ├── discrete.js
│   │   ├── hcl.js
│   │   ├── hsl.js
│   │   ├── hue.js
│   │   ├── index.js
│   │   ├── lab.js
│   │   ├── numberArray.js
│   │   ├── number.js
│   │   ├── object.js
│   │   ├── piecewise.js
│   │   ├── quantize.js
│   │   ├── rgb.js
│   │   ├── round.js
│   │   ├── string.js
│   │   ├── value.js
│   │   └── zoom.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-path
│   ├── dist
│   │   ├── d3-path.js
│   │   └── d3-path.min.js
│   ├── src
│   │   ├── index.js
│   │   └── path.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-scale
│   ├── dist
│   │   ├── d3-scale.js
│   │   └── d3-scale.min.js
│   ├── src
│   │   ├── band.js
│   │   ├── colors.js
│   │   ├── constant.js
│   │   ├── continuous.js
│   │   ├── diverging.js
│   │   ├── identity.js
│   │   ├── index.js
│   │   ├── init.js
│   │   ├── linear.js
│   │   ├── log.js
│   │   ├── nice.js
│   │   ├── number.js
│   │   ├── ordinal.js
│   │   ├── pow.js
│   │   ├── quantile.js
│   │   ├── quantize.js
│   │   ├── radial.js
│   │   ├── sequential.js
│   │   ├── sequentialQuantile.js
│   │   ├── symlog.js
│   │   ├── threshold.js
│   │   ├── tickFormat.js
│   │   ├── time.js
│   │   └── utcTime.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-shape
│   ├── dist
│   │   ├── d3-shape.js
│   │   └── d3-shape.min.js
│   ├── src
│   │   ├── curve
│   │   ├── offset
│   │   ├── order
│   │   ├── symbol
│   │   ├── arc.js
│   │   ├── area.js
│   │   ├── areaRadial.js
│   │   ├── array.js
│   │   ├── constant.js
│   │   ├── descending.js
│   │   ├── identity.js
│   │   ├── index.js
│   │   ├── line.js
│   │   ├── lineRadial.js
│   │   ├── link.js
│   │   ├── math.js
│   │   ├── noop.js
│   │   ├── path.js
│   │   ├── pie.js
│   │   ├── point.js
│   │   ├── pointRadial.js
│   │   ├── stack.js
│   │   └── symbol.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-time
│   ├── dist
│   │   ├── d3-time.js
│   │   └── d3-time.min.js
│   ├── src
│   │   ├── day.js
│   │   ├── duration.js
│   │   ├── hour.js
│   │   ├── index.js
│   │   ├── interval.js
│   │   ├── millisecond.js
│   │   ├── minute.js
│   │   ├── month.js
│   │   ├── second.js
│   │   ├── ticks.js
│   │   ├── week.js
│   │   └── year.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-time-format
│   ├── dist
│   │   ├── d3-time-format.js
│   │   └── d3-time-format.min.js
│   ├── locale
│   │   ├── ar-EG.json
│   │   ├── ar-SY.json
│   │   ├── ca-ES.json
│   │   ├── cs-CZ.json
│   │   ├── da-DK.json
│   │   ├── de-CH.json
│   │   ├── de-DE.json
│   │   ├── en-CA.json
│   │   ├── en-GB.json
│   │   ├── en-US.json
│   │   ├── es-ES.json
│   │   ├── es-MX.json
│   │   ├── fa-IR.json
│   │   ├── fi-FI.json
│   │   ├── fr-CA.json
│   │   ├── fr-FR.json
│   │   ├── he-IL.json
│   │   ├── hr-HR.json
│   │   ├── hu-HU.json
│   │   ├── it-IT.json
│   │   ├── ja-JP.json
│   │   ├── ko-KR.json
│   │   ├── mk-MK.json
│   │   ├── nb-NO.json
│   │   ├── nl-BE.json
│   │   ├── nl-NL.json
│   │   ├── pl-PL.json
│   │   ├── pt-BR.json
│   │   ├── ru-RU.json
│   │   ├── sv-SE.json
│   │   ├── tr-TR.json
│   │   ├── uk-UA.json
│   │   ├── zh-CN.json
│   │   └── zh-TW.json
│   ├── src
│   │   ├── defaultLocale.js
│   │   ├── index.js
│   │   ├── isoFormat.js
│   │   ├── isoParse.js
│   │   └── locale.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── d3-timer
│   ├── dist
│   │   ├── d3-timer.js
│   │   └── d3-timer.min.js
│   ├── src
│   │   ├── index.js
│   │   ├── interval.js
│   │   ├── timeout.js
│   │   └── timer.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── debug
│   ├── src
│   │   ├── browser.js
│   │   ├── common.js
│   │   ├── index.js
│   │   └── node.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── decimal.js-light
│   ├── doc
│   │   ├── API.html
│   │   └── decimal.js.map
│   ├── CHANGELOG.md
│   ├── decimal.d.ts
│   ├── decimal.js
│   ├── decimal.min.js
│   ├── decimal.mjs
│   ├── LICENCE.md
│   ├── package.json
│   └── README.md
├── decode-named-character-reference
│   ├── index.dom.d.ts
│   ├── index.dom.d.ts.map
│   ├── index.dom.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── dequal
│   ├── dist
│   │   ├── index.js
│   │   ├── index.min.js
│   │   └── index.mjs
│   ├── lite
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.min.js
│   │   └── index.mjs
│   ├── index.d.ts
│   ├── license
│   ├── package.json
│   └── readme.md
├── devlop
│   ├── lib
│   │   ├── default.js
│   │   ├── development.d.ts
│   │   └── development.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── diff
│   ├── dist
│   │   ├── diff.js
│   │   └── diff.min.js
│   ├── lib
│   │   ├── convert
│   │   ├── diff
│   │   ├── patch
│   │   ├── util
│   │   ├── index.es6.js
│   │   ├── index.js
│   │   └── index.mjs
│   ├── CONTRIBUTING.md
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── release-notes.md
│   └── runtime.js
├── electron-to-chromium
│   ├── chromium-versions.js
│   ├── chromium-versions.json
│   ├── full-chromium-versions.js
│   ├── full-chromium-versions.json
│   ├── full-versions.js
│   ├── full-versions.json
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── versions.js
│   └── versions.json
├── @esbuild
│   └── linux-x64
│       ├── bin
│       ├── package.json
│       └── README.md
├── esbuild
│   ├── bin
│   │   └── esbuild
│   ├── lib
│   │   ├── main.d.ts
│   │   └── main.js
│   ├── install.js
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── escalade
│   ├── dist
│   │   ├── index.js
│   │   └── index.mjs
│   ├── sync
│   │   ├── index.d.mts
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── index.mjs
│   ├── index.d.mts
│   ├── index.d.ts
│   ├── license
│   ├── package.json
│   └── readme.md
├── escape-string-regexp
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── es-toolkit
│   ├── compat
│   │   ├── add.d.ts
│   │   ├── add.js
│   │   ├── after.d.ts
│   │   ├── after.js
│   │   ├── ary.d.ts
│   │   ├── ary.js
│   │   ├── assign.d.ts
│   │   ├── assignIn.d.ts
│   │   ├── assignIn.js
│   │   ├── assignInWith.d.ts
│   │   ├── assignInWith.js
│   │   ├── assign.js
│   │   ├── assignWith.d.ts
│   │   ├── assignWith.js
│   │   ├── at.d.ts
│   │   ├── at.js
│   │   ├── attempt.d.ts
│   │   ├── attempt.js
│   │   ├── before.d.ts
│   │   ├── before.js
│   │   ├── bindAll.d.ts
│   │   ├── bindAll.js
│   │   ├── bind.d.ts
│   │   ├── bind.js
│   │   ├── bindKey.d.ts
│   │   ├── bindKey.js
│   │   ├── camelCase.d.ts
│   │   ├── camelCase.js
│   │   ├── capitalize.d.ts
│   │   ├── capitalize.js
│   │   ├── castArray.d.ts
│   │   ├── castArray.js
│   │   ├── ceil.d.ts
│   │   ├── ceil.js
│   │   ├── chunk.d.ts
│   │   ├── chunk.js
│   │   ├── clamp.d.ts
│   │   ├── clamp.js
│   │   ├── cloneDeep.d.ts
│   │   ├── cloneDeep.js
│   │   ├── cloneDeepWith.d.ts
│   │   ├── cloneDeepWith.js
│   │   ├── clone.d.ts
│   │   ├── clone.js
│   │   ├── cloneWith.d.ts
│   │   ├── cloneWith.js
│   │   ├── compact.d.ts
│   │   ├── compact.js
│   │   ├── concat.d.ts
│   │   ├── concat.js
│   │   ├── cond.d.ts
│   │   ├── cond.js
│   │   ├── conforms.d.ts
│   │   ├── conforms.js
│   │   ├── conformsTo.d.ts
│   │   ├── conformsTo.js
│   │   ├── constant.d.ts
│   │   ├── constant.js
│   │   ├── countBy.d.ts
│   │   ├── countBy.js
│   │   ├── create.d.ts
│   │   ├── create.js
│   │   ├── curry.d.ts
│   │   ├── curry.js
│   │   ├── curryRight.d.ts
│   │   ├── curryRight.js
│   │   ├── debounce.d.ts
│   │   ├── debounce.js
│   │   ├── deburr.d.ts
│   │   ├── deburr.js
│   │   ├── defaultsDeep.d.ts
│   │   ├── defaultsDeep.js
│   │   ├── defaults.d.ts
│   │   ├── defaults.js
│   │   ├── defaultTo.d.ts
│   │   ├── defaultTo.js
│   │   ├── defer.d.ts
│   │   ├── defer.js
│   │   ├── delay.d.ts
│   │   ├── delay.js
│   │   ├── differenceBy.d.ts
│   │   ├── differenceBy.js
│   │   ├── difference.d.ts
│   │   ├── difference.js
│   │   ├── differenceWith.d.ts
│   │   ├── differenceWith.js
│   │   ├── divide.d.ts
│   │   ├── divide.js
│   │   ├── drop.d.ts
│   │   ├── drop.js
│   │   ├── dropRight.d.ts
│   │   ├── dropRight.js
│   │   ├── dropRightWhile.d.ts
│   │   ├── dropRightWhile.js
│   │   ├── dropWhile.d.ts
│   │   ├── dropWhile.js
│   │   ├── each.d.ts
│   │   ├── each.js
│   │   ├── eachRight.d.ts
│   │   ├── eachRight.js
│   │   ├── endsWith.d.ts
│   │   ├── endsWith.js
│   │   ├── eq.d.ts
│   │   ├── eq.js
│   │   ├── escape.d.ts
│   │   ├── escape.js
│   │   ├── escapeRegExp.d.ts
│   │   ├── escapeRegExp.js
│   │   ├── every.d.ts
│   │   ├── every.js
│   │   ├── extend.d.ts
│   │   ├── extend.js
│   │   ├── extendWith.d.ts
│   │   ├── extendWith.js
│   │   ├── fill.d.ts
│   │   ├── fill.js
│   │   ├── filter.d.ts
│   │   ├── filter.js
│   │   ├── find.d.ts
│   │   ├── findIndex.d.ts
│   │   ├── findIndex.js
│   │   ├── find.js
│   │   ├── findKey.d.ts
│   │   ├── findKey.js
│   │   ├── findLast.d.ts
│   │   ├── findLastIndex.d.ts
│   │   ├── findLastIndex.js
│   │   ├── findLast.js
│   │   ├── findLastKey.d.ts
│   │   ├── findLastKey.js
│   │   ├── first.d.ts
│   │   ├── first.js
│   │   ├── flatMapDeep.d.ts
│   │   ├── flatMapDeep.js
│   │   ├── flatMapDepth.d.ts
│   │   ├── flatMapDepth.js
│   │   ├── flatMap.d.ts
│   │   ├── flatMap.js
│   │   ├── flattenDeep.d.ts
│   │   ├── flattenDeep.js
│   │   ├── flattenDepth.d.ts
│   │   ├── flattenDepth.js
│   │   ├── flatten.d.ts
│   │   ├── flatten.js
│   │   ├── flip.d.ts
│   │   ├── flip.js
│   │   ├── floor.d.ts
│   │   ├── floor.js
│   │   ├── flow.d.ts
│   │   ├── flow.js
│   │   ├── flowRight.d.ts
│   │   ├── flowRight.js
│   │   ├── forEach.d.ts
│   │   ├── forEach.js
│   │   ├── forEachRight.d.ts
│   │   ├── forEachRight.js
│   │   ├── forIn.d.ts
│   │   ├── forIn.js
│   │   ├── forInRight.d.ts
│   │   ├── forInRight.js
│   │   ├── forOwn.d.ts
│   │   ├── forOwn.js
│   │   ├── forOwnRight.d.ts
│   │   ├── forOwnRight.js
│   │   ├── fromPairs.d.ts
│   │   ├── fromPairs.js
│   │   ├── functions.d.ts
│   │   ├── functionsIn.d.ts
│   │   ├── functionsIn.js
│   │   ├── functions.js
│   │   ├── get.d.ts
│   │   ├── get.js
│   │   ├── groupBy.d.ts
│   │   ├── groupBy.js
│   │   ├── gt.d.ts
│   │   ├── gte.d.ts
│   │   ├── gte.js
│   │   ├── gt.js
│   │   ├── has.d.ts
│   │   ├── hasIn.d.ts
│   │   ├── hasIn.js
│   │   ├── has.js
│   │   ├── head.d.ts
│   │   ├── head.js
│   │   ├── identity.d.ts
│   │   ├── identity.js
│   │   ├── includes.d.ts
│   │   ├── includes.js
│   │   ├── indexOf.d.ts
│   │   ├── indexOf.js
│   │   ├── initial.d.ts
│   │   ├── initial.js
│   │   ├── inRange.d.ts
│   │   ├── inRange.js
│   │   ├── intersectionBy.d.ts
│   │   ├── intersectionBy.js
│   │   ├── intersection.d.ts
│   │   ├── intersection.js
│   │   ├── intersectionWith.d.ts
│   │   ├── intersectionWith.js
│   │   ├── invertBy.d.ts
│   │   ├── invertBy.js
│   │   ├── invert.d.ts
│   │   ├── invert.js
│   │   ├── invoke.d.ts
│   │   ├── invoke.js
│   │   ├── invokeMap.d.ts
│   │   ├── invokeMap.js
│   │   ├── isArguments.d.ts
│   │   ├── isArguments.js
│   │   ├── isArrayBuffer.d.ts
│   │   ├── isArrayBuffer.js
│   │   ├── isArray.d.ts
│   │   ├── isArray.js
│   │   ├── isArrayLike.d.ts
│   │   ├── isArrayLike.js
│   │   ├── isArrayLikeObject.d.ts
│   │   ├── isArrayLikeObject.js
│   │   ├── isBoolean.d.ts
│   │   ├── isBoolean.js
│   │   ├── isBuffer.d.ts
│   │   ├── isBuffer.js
│   │   ├── isDate.d.ts
│   │   ├── isDate.js
│   │   ├── isElement.d.ts
│   │   ├── isElement.js
│   │   ├── isEmpty.d.ts
│   │   ├── isEmpty.js
│   │   ├── isEqual.d.ts
│   │   ├── isEqual.js
│   │   ├── isEqualWith.d.ts
│   │   ├── isEqualWith.js
│   │   ├── isError.d.ts
│   │   ├── isError.js
│   │   ├── isFinite.d.ts
│   │   ├── isFinite.js
│   │   ├── isFunction.d.ts
│   │   ├── isFunction.js
│   │   ├── isInteger.d.ts
│   │   ├── isInteger.js
│   │   ├── isLength.d.ts
│   │   ├── isLength.js
│   │   ├── isMap.d.ts
│   │   ├── isMap.js
│   │   ├── isMatch.d.ts
│   │   ├── isMatch.js
│   │   ├── isMatchWith.d.ts
│   │   ├── isMatchWith.js
│   │   ├── isNaN.d.ts
│   │   ├── isNaN.js
│   │   ├── isNative.d.ts
│   │   ├── isNative.js
│   │   ├── isNil.d.ts
│   │   ├── isNil.js
│   │   ├── isNull.d.ts
│   │   ├── isNull.js
│   │   ├── isNumber.d.ts
│   │   ├── isNumber.js
│   │   ├── isObject.d.ts
│   │   ├── isObject.js
│   │   ├── isObjectLike.d.ts
│   │   ├── isObjectLike.js
│   │   ├── isPlainObject.d.ts
│   │   ├── isPlainObject.js
│   │   ├── isRegExp.d.ts
│   │   ├── isRegExp.js
│   │   ├── isSafeInteger.d.ts
│   │   ├── isSafeInteger.js
│   │   ├── isSet.d.ts
│   │   ├── isSet.js
│   │   ├── isString.d.ts
│   │   ├── isString.js
│   │   ├── isSymbol.d.ts
│   │   ├── isSymbol.js
│   │   ├── isTypedArray.d.ts
│   │   ├── isTypedArray.js
│   │   ├── isUndefined.d.ts
│   │   ├── isUndefined.js
│   │   ├── isWeakMap.d.ts
│   │   ├── isWeakMap.js
│   │   ├── isWeakSet.d.ts
│   │   ├── isWeakSet.js
│   │   ├── iteratee.d.ts
│   │   ├── iteratee.js
│   │   ├── join.d.ts
│   │   ├── join.js
│   │   ├── kebabCase.d.ts
│   │   ├── kebabCase.js
│   │   ├── keyBy.d.ts
│   │   ├── keyBy.js
│   │   ├── keys.d.ts
│   │   ├── keysIn.d.ts
│   │   ├── keysIn.js
│   │   ├── keys.js
│   │   ├── last.d.ts
│   │   ├── lastIndexOf.d.ts
│   │   ├── lastIndexOf.js
│   │   ├── last.js
│   │   ├── lowerCase.d.ts
│   │   ├── lowerCase.js
│   │   ├── lowerFirst.d.ts
│   │   ├── lowerFirst.js
│   │   ├── lt.d.ts
│   │   ├── lte.d.ts
│   │   ├── lte.js
│   │   ├── lt.js
│   │   ├── map.d.ts
│   │   ├── map.js
│   │   ├── mapKeys.d.ts
│   │   ├── mapKeys.js
│   │   ├── mapValues.d.ts
│   │   ├── mapValues.js
│   │   ├── matches.d.ts
│   │   ├── matches.js
│   │   ├── matchesProperty.d.ts
│   │   ├── matchesProperty.js
│   │   ├── maxBy.d.ts
│   │   ├── maxBy.js
│   │   ├── max.d.ts
│   │   ├── max.js
│   │   ├── meanBy.d.ts
│   │   ├── meanBy.js
│   │   ├── mean.d.ts
│   │   ├── mean.js
│   │   ├── memoize.d.ts
│   │   ├── memoize.js
│   │   ├── merge.d.ts
│   │   ├── merge.js
│   │   ├── mergeWith.d.ts
│   │   ├── mergeWith.js
│   │   ├── method.d.ts
│   │   ├── method.js
│   │   ├── methodOf.d.ts
│   │   ├── methodOf.js
│   │   ├── minBy.d.ts
│   │   ├── minBy.js
│   │   ├── min.d.ts
│   │   ├── min.js
│   │   ├── multiply.d.ts
│   │   ├── multiply.js
│   │   ├── negate.d.ts
│   │   ├── negate.js
│   │   ├── noop.d.ts
│   │   ├── noop.js
│   │   ├── now.d.ts
│   │   ├── now.js
│   │   ├── nthArg.d.ts
│   │   ├── nthArg.js
│   │   ├── nth.d.ts
│   │   ├── nth.js
│   │   ├── omitBy.d.ts
│   │   ├── omitBy.js
│   │   ├── omit.d.ts
│   │   ├── omit.js
│   │   ├── once.d.ts
│   │   ├── once.js
│   │   ├── orderBy.d.ts
│   │   ├── orderBy.js
│   │   ├── overArgs.d.ts
│   │   ├── overArgs.js
│   │   ├── over.d.ts
│   │   ├── overEvery.d.ts
│   │   ├── overEvery.js
│   │   ├── over.js
│   │   ├── overSome.d.ts
│   │   ├── overSome.js
│   │   ├── pad.d.ts
│   │   ├── padEnd.d.ts
│   │   ├── padEnd.js
│   │   ├── pad.js
│   │   ├── padStart.d.ts
│   │   ├── padStart.js
│   │   ├── parseInt.d.ts
│   │   ├── parseInt.js
│   │   ├── partial.d.ts
│   │   ├── partial.js
│   │   ├── partialRight.d.ts
│   │   ├── partialRight.js
│   │   ├── partition.d.ts
│   │   ├── partition.js
│   │   ├── pickBy.d.ts
│   │   ├── pickBy.js
│   │   ├── pick.d.ts
│   │   ├── pick.js
│   │   ├── property.d.ts
│   │   ├── property.js
│   │   ├── propertyOf.d.ts
│   │   ├── propertyOf.js
│   │   ├── pullAllBy.d.ts
│   │   ├── pullAllBy.js
│   │   ├── pullAll.d.ts
│   │   ├── pullAll.js
│   │   ├── pullAllWith.d.ts
│   │   ├── pullAllWith.js
│   │   ├── pullAt.d.ts
│   │   ├── pullAt.js
│   │   ├── pull.d.ts
│   │   ├── pull.js
│   │   ├── random.d.ts
│   │   ├── random.js
│   │   ├── range.d.ts
│   │   ├── range.js
│   │   ├── rangeRight.d.ts
│   │   ├── rangeRight.js
│   │   ├── rearg.d.ts
│   │   ├── rearg.js
│   │   ├── reduce.d.ts
│   │   ├── reduce.js
│   │   ├── reduceRight.d.ts
│   │   ├── reduceRight.js
│   │   ├── reject.d.ts
│   │   ├── reject.js
│   │   ├── remove.d.ts
│   │   ├── remove.js
│   │   ├── repeat.d.ts
│   │   ├── repeat.js
│   │   ├── replace.d.ts
│   │   ├── replace.js
│   │   ├── rest.d.ts
│   │   ├── rest.js
│   │   ├── result.d.ts
│   │   ├── result.js
│   │   ├── reverse.d.ts
│   │   ├── reverse.js
│   │   ├── round.d.ts
│   │   ├── round.js
│   │   ├── sample.d.ts
│   │   ├── sample.js
│   │   ├── sampleSize.d.ts
│   │   ├── sampleSize.js
│   │   ├── set.d.ts
│   │   ├── set.js
│   │   ├── setWith.d.ts
│   │   ├── setWith.js
│   │   ├── shuffle.d.ts
│   │   ├── shuffle.js
│   │   ├── size.d.ts
│   │   ├── size.js
│   │   ├── slice.d.ts
│   │   ├── slice.js
│   │   ├── snakeCase.d.ts
│   │   ├── snakeCase.js
│   │   ├── some.d.ts
│   │   ├── some.js
│   │   ├── sortBy.d.ts
│   │   ├── sortBy.js
│   │   ├── sortedIndexBy.d.ts
│   │   ├── sortedIndexBy.js
│   │   ├── sortedIndex.d.ts
│   │   ├── sortedIndex.js
│   │   ├── sortedIndexOf.d.ts
│   │   ├── sortedIndexOf.js
│   │   ├── sortedLastIndexBy.d.ts
│   │   ├── sortedLastIndexBy.js
│   │   ├── sortedLastIndex.d.ts
│   │   ├── sortedLastIndex.js
│   │   ├── sortedLastIndexOf.d.ts
│   │   ├── sortedLastIndexOf.js
│   │   ├── split.d.ts
│   │   ├── split.js
│   │   ├── spread.d.ts
│   │   ├── spread.js
│   │   ├── startCase.d.ts
│   │   ├── startCase.js
│   │   ├── startsWith.d.ts
│   │   ├── startsWith.js
│   │   ├── stubArray.d.ts
│   │   ├── stubArray.js
│   │   ├── stubFalse.d.ts
│   │   ├── stubFalse.js
│   │   ├── stubObject.d.ts
│   │   ├── stubObject.js
│   │   ├── stubString.d.ts
│   │   ├── stubString.js
│   │   ├── stubTrue.d.ts
│   │   ├── stubTrue.js
│   │   ├── subtract.d.ts
│   │   ├── subtract.js
│   │   ├── sumBy.d.ts
│   │   ├── sumBy.js
│   │   ├── sum.d.ts
│   │   ├── sum.js
│   │   ├── tail.d.ts
│   │   ├── tail.js
│   │   ├── take.d.ts
│   │   ├── take.js
│   │   ├── takeRight.d.ts
│   │   ├── takeRight.js
│   │   ├── takeRightWhile.d.ts
│   │   ├── takeRightWhile.js
│   │   ├── takeWhile.d.ts
│   │   ├── takeWhile.js
│   │   ├── template.d.ts
│   │   ├── template.js
│   │   ├── templateSettings.d.ts
│   │   ├── templateSettings.js
│   │   ├── throttle.d.ts
│   │   ├── throttle.js
│   │   ├── times.d.ts
│   │   ├── times.js
│   │   ├── toArray.d.ts
│   │   ├── toArray.js
│   │   ├── toDefaulted.d.ts
│   │   ├── toDefaulted.js
│   │   ├── toFinite.d.ts
│   │   ├── toFinite.js
│   │   ├── toInteger.d.ts
│   │   ├── toInteger.js
│   │   ├── toLength.d.ts
│   │   ├── toLength.js
│   │   ├── toLower.d.ts
│   │   ├── toLower.js
│   │   ├── toNumber.d.ts
│   │   ├── toNumber.js
│   │   ├── toPairs.d.ts
│   │   ├── toPairsIn.d.ts
│   │   ├── toPairsIn.js
│   │   ├── toPairs.js
│   │   ├── toPath.d.ts
│   │   ├── toPath.js
│   │   ├── toPlainObject.d.ts
│   │   ├── toPlainObject.js
│   │   ├── toSafeInteger.d.ts
│   │   ├── toSafeInteger.js
│   │   ├── toString.d.ts
│   │   ├── toString.js
│   │   ├── toUpper.d.ts
│   │   ├── toUpper.js
│   │   ├── transform.d.ts
│   │   ├── transform.js
│   │   ├── trim.d.ts
│   │   ├── trimEnd.d.ts
│   │   ├── trimEnd.js
│   │   ├── trim.js
│   │   ├── trimStart.d.ts
│   │   ├── trimStart.js
│   │   ├── truncate.d.ts
│   │   ├── truncate.js
│   │   ├── unary.d.ts
│   │   ├── unary.js
│   │   ├── unescape.d.ts
│   │   ├── unescape.js
│   │   ├── unionBy.d.ts
│   │   ├── unionBy.js
│   │   ├── union.d.ts
│   │   ├── union.js
│   │   ├── unionWith.d.ts
│   │   ├── unionWith.js
│   │   ├── uniqBy.d.ts
│   │   ├── uniqBy.js
│   │   ├── uniq.d.ts
│   │   ├── uniq.js
│   │   ├── uniqueId.d.ts
│   │   ├── uniqueId.js
│   │   ├── uniqWith.d.ts
│   │   ├── uniqWith.js
│   │   ├── unset.d.ts
│   │   ├── unset.js
│   │   ├── unzip.d.ts
│   │   ├── unzip.js
│   │   ├── unzipWith.d.ts
│   │   ├── unzipWith.js
│   │   ├── update.d.ts
│   │   ├── update.js
│   │   ├── updateWith.d.ts
│   │   ├── updateWith.js
│   │   ├── upperCase.d.ts
│   │   ├── upperCase.js
│   │   ├── upperFirst.d.ts
│   │   ├── upperFirst.js
│   │   ├── values.d.ts
│   │   ├── valuesIn.d.ts
│   │   ├── valuesIn.js
│   │   ├── values.js
│   │   ├── without.d.ts
│   │   ├── without.js
│   │   ├── words.d.ts
│   │   ├── words.js
│   │   ├── wrap.d.ts
│   │   ├── wrap.js
│   │   ├── xorBy.d.ts
│   │   ├── xorBy.js
│   │   ├── xor.d.ts
│   │   ├── xor.js
│   │   ├── xorWith.d.ts
│   │   ├── xorWith.js
│   │   ├── zip.d.ts
│   │   ├── zip.js
│   │   ├── zipObjectDeep.d.ts
│   │   ├── zipObjectDeep.js
│   │   ├── zipObject.d.ts
│   │   ├── zipObject.js
│   │   ├── zipWith.d.ts
│   │   └── zipWith.js
│   ├── dist
│   │   ├── array
│   │   ├── compat
│   │   ├── error
│   │   ├── function
│   │   ├── _internal
│   │   ├── map
│   │   ├── math
│   │   ├── object
│   │   ├── predicate
│   │   ├── promise
│   │   ├── set
│   │   ├── string
│   │   ├── util
│   │   ├── browser.global.js
│   │   ├── index.d.mts
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── index.mjs
│   ├── src
│   │   └── compat
│   ├── array.d.ts
│   ├── array.js
│   ├── CHANGELOG.md
│   ├── compat.d.ts
│   ├── compat.js
│   ├── error.d.ts
│   ├── error.js
│   ├── function.d.ts
│   ├── function.js
│   ├── LICENSE
│   ├── map.d.ts
│   ├── map.js
│   ├── math.d.ts
│   ├── math.js
│   ├── object.d.ts
│   ├── object.js
│   ├── package.json
│   ├── predicate.d.ts
│   ├── predicate.js
│   ├── promise.d.ts
│   ├── promise.js
│   ├── README.md
│   ├── set.d.ts
│   ├── set.js
│   ├── string.d.ts
│   ├── string.js
│   ├── util.d.ts
│   └── util.js
├── estree-util-is-identifier-name
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── eventemitter3
│   ├── dist
│   │   ├── eventemitter3.esm.js
│   │   ├── eventemitter3.esm.min.js
│   │   ├── eventemitter3.esm.min.js.map
│   │   ├── eventemitter3.umd.js
│   │   ├── eventemitter3.umd.min.js
│   │   └── eventemitter3.umd.min.js.map
│   ├── index.d.ts
│   ├── index.js
│   ├── index.mjs
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── extend
│   ├── CHANGELOG.md
│   ├── component.json
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── fdir
│   ├── dist
│   │   ├── index.cjs
│   │   ├── index.d.cts
│   │   ├── index.d.mts
│   │   └── index.mjs
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── gensync
│   ├── test
│   │   └── index.test.js
│   ├── index.js
│   ├── index.js.flow
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── hast-util-to-jsx-runtime
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── types.d.ts
│   │   └── types.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── hast-util-whitespace
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── html-url-attributes
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── iceberg-js
│   ├── dist
│   │   ├── index.cjs
│   │   ├── index.cjs.map
│   │   ├── index.d.cts
│   │   ├── index.d.ts
│   │   ├── index.mjs
│   │   └── index.mjs.map
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── immer
│   ├── dist
│   │   ├── cjs
│   │   ├── immer.d.ts
│   │   ├── immer.legacy-esm.js
│   │   ├── immer.legacy-esm.js.map
│   │   ├── immer.mjs
│   │   ├── immer.mjs.map
│   │   ├── immer.production.mjs
│   │   └── immer.production.mjs.map
│   ├── src
│   │   ├── core
│   │   ├── plugins
│   │   ├── types
│   │   ├── utils
│   │   ├── immer.ts
│   │   └── internal.ts
│   ├── LICENSE
│   ├── package.json
│   └── readme.md
├── inline-style-parser
│   ├── cjs
│   │   ├── index.d.cts
│   │   ├── index.js
│   │   └── index.js.map
│   ├── dist
│   │   ├── inline-style-parser.js
│   │   ├── inline-style-parser.js.map
│   │   ├── inline-style-parser.min.js
│   │   └── inline-style-parser.min.js.map
│   ├── esm
│   │   ├── index.d.mts
│   │   ├── index.mjs
│   │   └── index.mjs.map
│   ├── index.d.ts
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── internmap
│   ├── dist
│   │   ├── internmap.js
│   │   └── internmap.min.js
│   ├── src
│   │   └── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── is-alphabetical
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-alphanumerical
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-decimal
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-hexadecimal
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-plain-obj
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── @jridgewell
│   ├── gen-mapping
│   │   ├── dist
│   │   ├── src
│   │   ├── types
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── remapping
│   │   ├── dist
│   │   ├── src
│   │   ├── types
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── resolve-uri
│   │   ├── dist
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── sourcemap-codec
│   │   ├── dist
│   │   ├── src
│   │   ├── types
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   └── trace-mapping
│       ├── dist
│       ├── src
│       ├── types
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── jsesc
│   ├── bin
│   │   └── jsesc
│   ├── man
│   │   └── jsesc.1
│   ├── jsesc.js
│   ├── LICENSE-MIT.txt
│   ├── package.json
│   └── README.md
├── json5
│   ├── dist
│   │   ├── index.js
│   │   ├── index.min.js
│   │   ├── index.min.mjs
│   │   └── index.mjs
│   ├── lib
│   │   ├── cli.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── parse.d.ts
│   │   ├── parse.js
│   │   ├── register.js
│   │   ├── require.js
│   │   ├── stringify.d.ts
│   │   ├── stringify.js
│   │   ├── unicode.d.ts
│   │   ├── unicode.js
│   │   ├── util.d.ts
│   │   └── util.js
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── js-tokens
│   ├── CHANGELOG.md
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── longest-streak
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── lru-cache
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── lucide-react
│   ├── dist
│   │   ├── cjs
│   │   ├── esm
│   │   ├── umd
│   │   ├── lucide-react.d.ts
│   │   ├── lucide-react.prefixed.d.ts
│   │   └── lucide-react.suffixed.d.ts
│   ├── dynamic.d.ts
│   ├── dynamicIconImports.d.ts
│   ├── dynamicIconImports.mjs
│   ├── dynamic.mjs
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── markdown-table
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-find-and-replace
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-from-markdown
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── types.d.ts
│   │   └── types.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm-autolink-literal
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm-footnote
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm-strikethrough
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm-table
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-gfm-task-list-item
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-mdx-expression
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-mdxjs-esm
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-mdx-jsx
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-phrasing
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-to-hast
│   ├── lib
│   │   ├── handlers
│   │   ├── footer.d.ts
│   │   ├── footer.d.ts.map
│   │   ├── footer.js
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── revert.d.ts
│   │   ├── revert.d.ts.map
│   │   ├── revert.js
│   │   ├── state.d.ts
│   │   ├── state.d.ts.map
│   │   └── state.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-to-markdown
│   ├── lib
│   │   ├── handle
│   │   ├── util
│   │   ├── configure.d.ts
│   │   ├── configure.d.ts.map
│   │   ├── configure.js
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── join.d.ts
│   │   ├── join.d.ts.map
│   │   ├── join.js
│   │   ├── types.d.ts
│   │   ├── types.js
│   │   ├── unsafe.d.ts
│   │   ├── unsafe.d.ts.map
│   │   └── unsafe.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mdast-util-to-string
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── stream.d.ts
│   │   ├── stream.d.ts.map
│   │   └── stream.js
│   ├── lib
│   │   ├── initialize
│   │   ├── compile.d.ts
│   │   ├── compile.d.ts.map
│   │   ├── compile.js
│   │   ├── constructs.d.ts
│   │   ├── constructs.d.ts.map
│   │   ├── constructs.js
│   │   ├── create-tokenizer.d.ts
│   │   ├── create-tokenizer.d.ts.map
│   │   ├── create-tokenizer.js
│   │   ├── parse.d.ts
│   │   ├── parse.d.ts.map
│   │   ├── parse.js
│   │   ├── postprocess.d.ts
│   │   ├── postprocess.d.ts.map
│   │   ├── postprocess.js
│   │   ├── preprocess.d.ts
│   │   ├── preprocess.d.ts.map
│   │   └── preprocess.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   ├── readme.md
│   ├── stream.d.ts
│   ├── stream.d.ts.map
│   └── stream.js
├── micromark-core-commonmark
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── lib
│   │   ├── attention.d.ts
│   │   ├── attention.d.ts.map
│   │   ├── attention.js
│   │   ├── autolink.d.ts
│   │   ├── autolink.d.ts.map
│   │   ├── autolink.js
│   │   ├── blank-line.d.ts
│   │   ├── blank-line.d.ts.map
│   │   ├── blank-line.js
│   │   ├── block-quote.d.ts
│   │   ├── block-quote.d.ts.map
│   │   ├── block-quote.js
│   │   ├── character-escape.d.ts
│   │   ├── character-escape.d.ts.map
│   │   ├── character-escape.js
│   │   ├── character-reference.d.ts
│   │   ├── character-reference.d.ts.map
│   │   ├── character-reference.js
│   │   ├── code-fenced.d.ts
│   │   ├── code-fenced.d.ts.map
│   │   ├── code-fenced.js
│   │   ├── code-indented.d.ts
│   │   ├── code-indented.d.ts.map
│   │   ├── code-indented.js
│   │   ├── code-text.d.ts
│   │   ├── code-text.d.ts.map
│   │   ├── code-text.js
│   │   ├── content.d.ts
│   │   ├── content.d.ts.map
│   │   ├── content.js
│   │   ├── definition.d.ts
│   │   ├── definition.d.ts.map
│   │   ├── definition.js
│   │   ├── hard-break-escape.d.ts
│   │   ├── hard-break-escape.d.ts.map
│   │   ├── hard-break-escape.js
│   │   ├── heading-atx.d.ts
│   │   ├── heading-atx.d.ts.map
│   │   ├── heading-atx.js
│   │   ├── html-flow.d.ts
│   │   ├── html-flow.d.ts.map
│   │   ├── html-flow.js
│   │   ├── html-text.d.ts
│   │   ├── html-text.d.ts.map
│   │   ├── html-text.js
│   │   ├── label-end.d.ts
│   │   ├── label-end.d.ts.map
│   │   ├── label-end.js
│   │   ├── label-start-image.d.ts
│   │   ├── label-start-image.d.ts.map
│   │   ├── label-start-image.js
│   │   ├── label-start-link.d.ts
│   │   ├── label-start-link.d.ts.map
│   │   ├── label-start-link.js
│   │   ├── line-ending.d.ts
│   │   ├── line-ending.d.ts.map
│   │   ├── line-ending.js
│   │   ├── list.d.ts
│   │   ├── list.d.ts.map
│   │   ├── list.js
│   │   ├── setext-underline.d.ts
│   │   ├── setext-underline.d.ts.map
│   │   ├── setext-underline.js
│   │   ├── thematic-break.d.ts
│   │   ├── thematic-break.d.ts.map
│   │   └── thematic-break.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-autolink-literal
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── html.d.ts
│   │   ├── html.js
│   │   ├── syntax.d.ts
│   │   └── syntax.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-footnote
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── html.d.ts
│   │   ├── html.js
│   │   ├── syntax.d.ts
│   │   └── syntax.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-strikethrough
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── html.d.ts
│   │   ├── html.js
│   │   ├── syntax.d.ts
│   │   └── syntax.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-table
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── edit-map.d.ts
│   │   ├── edit-map.d.ts.map
│   │   ├── edit-map.js
│   │   ├── html.d.ts
│   │   ├── html.d.ts.map
│   │   ├── html.js
│   │   ├── infer.d.ts
│   │   ├── infer.d.ts.map
│   │   ├── infer.js
│   │   ├── syntax.d.ts
│   │   ├── syntax.d.ts.map
│   │   └── syntax.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-tagfilter
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-extension-gfm-task-list-item
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── lib
│   │   ├── html.d.ts
│   │   ├── html.js
│   │   ├── syntax.d.ts
│   │   └── syntax.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-factory-destination
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-factory-label
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-factory-space
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-factory-title
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-factory-whitespace
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-character
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-chunked
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-classify-character
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-combine-extensions
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-decode-numeric-character-reference
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-decode-string
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-encode
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-html-tag-name
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-normalize-identifier
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-resolve-all
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-sanitize-uri
│   ├── dev
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-subtokenize
│   ├── dev
│   │   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── lib
│   │   ├── splice-buffer.d.ts
│   │   ├── splice-buffer.d.ts.map
│   │   └── splice-buffer.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-symbol
│   ├── lib
│   │   ├── codes.d.ts
│   │   ├── codes.d.ts.map
│   │   ├── codes.js
│   │   ├── constants.d.ts
│   │   ├── constants.d.ts.map
│   │   ├── constants.js
│   │   ├── default.d.ts
│   │   ├── default.d.ts.map
│   │   ├── default.js
│   │   ├── types.d.ts
│   │   ├── types.d.ts.map
│   │   ├── types.js
│   │   ├── values.d.ts
│   │   ├── values.d.ts.map
│   │   └── values.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── micromark-util-types
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── ms
│   ├── index.js
│   ├── license.md
│   ├── package.json
│   └── readme.md
├── nanoid
│   ├── async
│   │   ├── index.browser.cjs
│   │   ├── index.browser.js
│   │   ├── index.cjs
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.native.js
│   │   └── package.json
│   ├── bin
│   │   └── nanoid.cjs
│   ├── non-secure
│   │   ├── index.cjs
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── url-alphabet
│   │   ├── index.cjs
│   │   ├── index.js
│   │   └── package.json
│   ├── index.browser.cjs
│   ├── index.browser.js
│   ├── index.cjs
│   ├── index.d.cts
│   ├── index.d.ts
│   ├── index.js
│   ├── LICENSE
│   ├── nanoid.js
│   ├── package.json
│   └── README.md
├── node-releases
│   ├── data
│   │   ├── processed
│   │   └── release-schedule
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── parse-entities
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── node_modules
│   │   └── @types
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── picocolors
│   ├── LICENSE
│   ├── package.json
│   ├── picocolors.browser.js
│   ├── picocolors.d.ts
│   ├── picocolors.js
│   ├── README.md
│   └── types.d.ts
├── picomatch
│   ├── lib
│   │   ├── constants.js
│   │   ├── parse.js
│   │   ├── picomatch.js
│   │   ├── scan.js
│   │   └── utils.js
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── posix.js
│   └── README.md
├── postcss
│   ├── lib
│   │   ├── at-rule.d.ts
│   │   ├── at-rule.js
│   │   ├── comment.d.ts
│   │   ├── comment.js
│   │   ├── container.d.ts
│   │   ├── container.js
│   │   ├── css-syntax-error.d.ts
│   │   ├── css-syntax-error.js
│   │   ├── declaration.d.ts
│   │   ├── declaration.js
│   │   ├── document.d.ts
│   │   ├── document.js
│   │   ├── fromJSON.d.ts
│   │   ├── fromJSON.js
│   │   ├── input.d.ts
│   │   ├── input.js
│   │   ├── lazy-result.d.ts
│   │   ├── lazy-result.js
│   │   ├── list.d.ts
│   │   ├── list.js
│   │   ├── map-generator.js
│   │   ├── node.d.ts
│   │   ├── node.js
│   │   ├── no-work-result.d.ts
│   │   ├── no-work-result.js
│   │   ├── parse.d.ts
│   │   ├── parse.js
│   │   ├── parser.js
│   │   ├── postcss.d.mts
│   │   ├── postcss.d.ts
│   │   ├── postcss.js
│   │   ├── postcss.mjs
│   │   ├── previous-map.d.ts
│   │   ├── previous-map.js
│   │   ├── processor.d.ts
│   │   ├── processor.js
│   │   ├── result.d.ts
│   │   ├── result.js
│   │   ├── root.d.ts
│   │   ├── root.js
│   │   ├── rule.d.ts
│   │   ├── rule.js
│   │   ├── stringifier.d.ts
│   │   ├── stringifier.js
│   │   ├── stringify.d.ts
│   │   ├── stringify.js
│   │   ├── symbols.js
│   │   ├── terminal-highlight.js
│   │   ├── tokenize.js
│   │   ├── warning.d.ts
│   │   ├── warning.js
│   │   └── warn-once.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── property-information
│   ├── lib
│   │   ├── util
│   │   ├── aria.d.ts
│   │   ├── aria.d.ts.map
│   │   ├── aria.js
│   │   ├── find.d.ts
│   │   ├── find.d.ts.map
│   │   ├── find.js
│   │   ├── hast-to-react.d.ts
│   │   ├── hast-to-react.d.ts.map
│   │   ├── hast-to-react.js
│   │   ├── html.d.ts
│   │   ├── html.d.ts.map
│   │   ├── html.js
│   │   ├── normalize.d.ts
│   │   ├── normalize.d.ts.map
│   │   ├── normalize.js
│   │   ├── svg.d.ts
│   │   ├── svg.d.ts.map
│   │   ├── svg.js
│   │   ├── xlink.d.ts
│   │   ├── xlink.d.ts.map
│   │   ├── xlink.js
│   │   ├── xml.d.ts
│   │   ├── xml.d.ts.map
│   │   ├── xml.js
│   │   ├── xmlns.d.ts
│   │   ├── xmlns.d.ts.map
│   │   └── xmlns.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── react
│   ├── cjs
│   │   ├── react-compiler-runtime.development.js
│   │   ├── react-compiler-runtime.production.js
│   │   ├── react-compiler-runtime.profiling.js
│   │   ├── react.development.js
│   │   ├── react-jsx-dev-runtime.development.js
│   │   ├── react-jsx-dev-runtime.production.js
│   │   ├── react-jsx-dev-runtime.profiling.js
│   │   ├── react-jsx-dev-runtime.react-server.development.js
│   │   ├── react-jsx-dev-runtime.react-server.production.js
│   │   ├── react-jsx-runtime.development.js
│   │   ├── react-jsx-runtime.production.js
│   │   ├── react-jsx-runtime.profiling.js
│   │   ├── react-jsx-runtime.react-server.development.js
│   │   ├── react-jsx-runtime.react-server.production.js
│   │   ├── react.production.js
│   │   ├── react.react-server.development.js
│   │   └── react.react-server.production.js
│   ├── compiler-runtime.js
│   ├── index.js
│   ├── jsx-dev-runtime.js
│   ├── jsx-dev-runtime.react-server.js
│   ├── jsx-runtime.js
│   ├── jsx-runtime.react-server.js
│   ├── LICENSE
│   ├── package.json
│   ├── react.react-server.js
│   └── README.md
├── react-dom
│   ├── cjs
│   │   ├── react-dom-client.development.js
│   │   ├── react-dom-client.production.js
│   │   ├── react-dom.development.js
│   │   ├── react-dom.production.js
│   │   ├── react-dom-profiling.development.js
│   │   ├── react-dom-profiling.profiling.js
│   │   ├── react-dom.react-server.development.js
│   │   ├── react-dom.react-server.production.js
│   │   ├── react-dom-server.browser.development.js
│   │   ├── react-dom-server.browser.production.js
│   │   ├── react-dom-server.bun.development.js
│   │   ├── react-dom-server.bun.production.js
│   │   ├── react-dom-server.edge.development.js
│   │   ├── react-dom-server.edge.production.js
│   │   ├── react-dom-server-legacy.browser.development.js
│   │   ├── react-dom-server-legacy.browser.production.js
│   │   ├── react-dom-server-legacy.node.development.js
│   │   ├── react-dom-server-legacy.node.production.js
│   │   ├── react-dom-server.node.development.js
│   │   ├── react-dom-server.node.production.js
│   │   ├── react-dom-test-utils.development.js
│   │   └── react-dom-test-utils.production.js
│   ├── client.js
│   ├── client.react-server.js
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── profiling.js
│   ├── profiling.react-server.js
│   ├── react-dom.react-server.js
│   ├── README.md
│   ├── server.browser.js
│   ├── server.bun.js
│   ├── server.edge.js
│   ├── server.js
│   ├── server.node.js
│   ├── server.react-server.js
│   ├── static.browser.js
│   ├── static.edge.js
│   ├── static.js
│   ├── static.node.js
│   ├── static.react-server.js
│   └── test-utils.js
├── react-is
│   ├── cjs
│   │   ├── react-is.development.js
│   │   └── react-is.production.js
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── react-markdown
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── react-redux
│   ├── dist
│   │   ├── cjs
│   │   ├── react-redux.browser.mjs
│   │   ├── react-redux.browser.mjs.map
│   │   ├── react-redux.d.ts
│   │   ├── react-redux.legacy-esm.js
│   │   ├── react-redux.legacy-esm.js.map
│   │   ├── react-redux.mjs
│   │   ├── react-redux.mjs.map
│   │   ├── rsc.mjs
│   │   └── rsc.mjs.map
│   ├── src
│   │   ├── components
│   │   ├── connect
│   │   ├── hooks
│   │   ├── utils
│   │   ├── exports.ts
│   │   ├── index-rsc.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── react-refresh
│   ├── cjs
│   │   ├── react-refresh-babel.development.js
│   │   ├── react-refresh-babel.production.js
│   │   ├── react-refresh-runtime.development.js
│   │   └── react-refresh-runtime.production.js
│   ├── babel.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── runtime.js
├── recharts
│   ├── es6
│   │   ├── animation
│   │   ├── cartesian
│   │   ├── chart
│   │   ├── component
│   │   ├── container
│   │   ├── context
│   │   ├── polar
│   │   ├── shape
│   │   ├── state
│   │   ├── synchronisation
│   │   ├── util
│   │   ├── zIndex
│   │   ├── hooks.js
│   │   ├── index.js
│   │   └── types.js
│   ├── lib
│   │   ├── animation
│   │   ├── cartesian
│   │   ├── chart
│   │   ├── component
│   │   ├── container
│   │   ├── context
│   │   ├── polar
│   │   ├── shape
│   │   ├── state
│   │   ├── synchronisation
│   │   ├── util
│   │   ├── zIndex
│   │   ├── hooks.js
│   │   ├── index.js
│   │   └── types.js
│   ├── types
│   │   ├── animation
│   │   ├── cartesian
│   │   ├── chart
│   │   ├── component
│   │   ├── container
│   │   ├── context
│   │   ├── polar
│   │   ├── shape
│   │   ├── state
│   │   ├── synchronisation
│   │   ├── util
│   │   ├── zIndex
│   │   ├── hooks.d.ts
│   │   ├── index.d.ts
│   │   └── types.d.ts
│   ├── umd
│   │   ├── Recharts.js
│   │   ├── Recharts.js.LICENSE.txt
│   │   ├── Recharts.js.map
│   │   └── report.html
│   ├── AGENTS.md
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   ├── DEVELOPING.md
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── redux
│   ├── dist
│   │   ├── cjs
│   │   ├── redux.browser.mjs
│   │   ├── redux.browser.mjs.map
│   │   ├── redux.d.ts
│   │   ├── redux.legacy-esm.js
│   │   ├── redux.mjs
│   │   └── redux.mjs.map
│   ├── src
│   │   ├── types
│   │   ├── utils
│   │   ├── applyMiddleware.ts
│   │   ├── bindActionCreators.ts
│   │   ├── combineReducers.ts
│   │   ├── compose.ts
│   │   ├── createStore.ts
│   │   └── index.ts
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── @reduxjs
│   └── toolkit
│       ├── dist
│       ├── node_modules
│       ├── query
│       ├── react
│       ├── src
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── redux-thunk
│   ├── dist
│   │   ├── cjs
│   │   ├── redux-thunk.d.ts
│   │   ├── redux-thunk.legacy-esm.js
│   │   └── redux-thunk.mjs
│   ├── src
│   │   ├── index.ts
│   │   └── types.ts
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── remark-gfm
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── remark-parse
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── remark-rehype
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── remark-stringify
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── reselect
│   ├── dist
│   │   ├── cjs
│   │   ├── reselect.browser.mjs
│   │   ├── reselect.browser.mjs.map
│   │   ├── reselect.d.ts
│   │   ├── reselect.legacy-esm.js
│   │   ├── reselect.legacy-esm.js.map
│   │   ├── reselect.mjs
│   │   └── reselect.mjs.map
│   ├── src
│   │   ├── autotrackMemoize
│   │   ├── devModeChecks
│   │   ├── versionedTypes
│   │   ├── createSelectorCreator.ts
│   │   ├── createStructuredSelector.ts
│   │   ├── index.ts
│   │   ├── lruMemoize.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── weakMapMemoize.ts
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── @rolldown
│   └── pluginutils
│       ├── dist
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── @rollup
│   └── rollup-linux-x64-gnu
│       ├── package.json
│       ├── README.md
│       └── rollup.linux-x64-gnu.node
├── rollup
│   ├── dist
│   │   ├── bin
│   │   ├── es
│   │   ├── shared
│   │   ├── getLogFilter.d.ts
│   │   ├── getLogFilter.js
│   │   ├── loadConfigFile.d.ts
│   │   ├── loadConfigFile.js
│   │   ├── native.js
│   │   ├── parseAst.d.ts
│   │   ├── parseAst.js
│   │   ├── rollup.d.ts
│   │   └── rollup.js
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── scheduler
│   ├── cjs
│   │   ├── scheduler.development.js
│   │   ├── scheduler.native.development.js
│   │   ├── scheduler.native.production.js
│   │   ├── scheduler.production.js
│   │   ├── scheduler-unstable_mock.development.js
│   │   ├── scheduler-unstable_mock.production.js
│   │   ├── scheduler-unstable_post_task.development.js
│   │   └── scheduler-unstable_post_task.production.js
│   ├── index.js
│   ├── index.native.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── unstable_mock.js
│   └── unstable_post_task.js
├── semver
│   ├── bin
│   │   └── semver.js
│   ├── LICENSE
│   ├── package.json
│   ├── range.bnf
│   ├── README.md
│   └── semver.js
├── source-map-js
│   ├── lib
│   │   ├── array-set.js
│   │   ├── base64.js
│   │   ├── base64-vlq.js
│   │   ├── binary-search.js
│   │   ├── mapping-list.js
│   │   ├── quick-sort.js
│   │   ├── source-map-consumer.d.ts
│   │   ├── source-map-consumer.js
│   │   ├── source-map-generator.d.ts
│   │   ├── source-map-generator.js
│   │   ├── source-node.d.ts
│   │   ├── source-node.js
│   │   └── util.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   ├── source-map.d.ts
│   └── source-map.js
├── space-separated-tokens
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── @standard-schema
│   ├── spec
│   │   ├── dist
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   └── utils
│       ├── dist
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── stringify-entities
│   ├── lib
│   │   ├── constant
│   │   ├── util
│   │   ├── core.d.ts
│   │   ├── core.js
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── style-to-js
│   ├── cjs
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── utilities.d.ts
│   │   ├── utilities.d.ts.map
│   │   ├── utilities.js
│   │   └── utilities.js.map
│   ├── src
│   │   ├── index.test.ts
│   │   ├── index.ts
│   │   ├── utilities.test.ts
│   │   └── utilities.ts
│   ├── umd
│   │   ├── style-to-js.js
│   │   ├── style-to-js.js.map
│   │   ├── style-to-js.min.js
│   │   └── style-to-js.min.js.map
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── style-to-object
│   ├── cjs
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   └── index.js.map
│   ├── dist
│   │   ├── style-to-object.js
│   │   ├── style-to-object.js.map
│   │   ├── style-to-object.min.js
│   │   └── style-to-object.min.js.map
│   ├── esm
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── index.mjs
│   │   └── index.mjs.map
│   ├── src
│   │   └── index.ts
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── @supabase
│   ├── auth-js
│   │   ├── dist
│   │   ├── src
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── functions-js
│   │   ├── dist
│   │   ├── src
│   │   ├── package.json
│   │   └── README.md
│   ├── postgrest-js
│   │   ├── dist
│   │   ├── src
│   │   ├── package.json
│   │   └── README.md
│   ├── realtime-js
│   │   ├── dist
│   │   ├── src
│   │   ├── package.json
│   │   └── README.md
│   ├── storage-js
│   │   ├── dist
│   │   ├── src
│   │   ├── package.json
│   │   └── README.md
│   └── supabase-js
│       ├── dist
│       ├── src
│       ├── package.json
│       └── README.md
├── three
│   ├── build
│   │   ├── three.cjs
│   │   ├── three.js
│   │   ├── three.min.js
│   │   ├── three.module.js
│   │   └── three.module.min.js
│   ├── examples
│   │   ├── fonts
│   │   └── jsm
│   ├── src
│   │   ├── animation
│   │   ├── audio
│   │   ├── cameras
│   │   ├── core
│   │   ├── extras
│   │   ├── geometries
│   │   ├── helpers
│   │   ├── lights
│   │   ├── loaders
│   │   ├── materials
│   │   ├── math
│   │   ├── objects
│   │   ├── renderers
│   │   ├── scenes
│   │   ├── textures
│   │   ├── constants.js
│   │   ├── Three.js
│   │   ├── Three.Legacy.js
│   │   └── utils.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── tinyglobby
│   ├── dist
│   │   ├── index.cjs
│   │   ├── index.d.cts
│   │   ├── index.d.mts
│   │   └── index.mjs
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── tiny-invariant
│   ├── dist
│   │   ├── esm
│   │   ├── tiny-invariant.cjs.js
│   │   ├── tiny-invariant.d.ts
│   │   ├── tiny-invariant.esm.js
│   │   ├── tiny-invariant.js
│   │   └── tiny-invariant.min.js
│   ├── src
│   │   ├── tiny-invariant.flow.js
│   │   └── tiny-invariant.ts
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── trim-lines
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── trough
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── tslib
│   ├── modules
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── CopyrightNotice.txt
│   ├── LICENSE.txt
│   ├── package.json
│   ├── README.md
│   ├── SECURITY.md
│   ├── tslib.d.ts
│   ├── tslib.es6.html
│   ├── tslib.es6.js
│   ├── tslib.es6.mjs
│   ├── tslib.html
│   └── tslib.js
├── @types
│   ├── babel__core
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── babel__generator
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── babel__template
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── babel__traverse
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-array
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-color
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-ease
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-interpolate
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-path
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-scale
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-shape
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-time
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── d3-timer
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── debug
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── estree
│   │   ├── flow.d.ts
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── estree-jsx
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── hast
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── mdast
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── ms
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── node
│   │   ├── assert
│   │   ├── compatibility
│   │   ├── dns
│   │   ├── fs
│   │   ├── readline
│   │   ├── stream
│   │   ├── timers
│   │   ├── ts5.6
│   │   ├── web-globals
│   │   ├── assert.d.ts
│   │   ├── async_hooks.d.ts
│   │   ├── buffer.buffer.d.ts
│   │   ├── buffer.d.ts
│   │   ├── child_process.d.ts
│   │   ├── cluster.d.ts
│   │   ├── console.d.ts
│   │   ├── constants.d.ts
│   │   ├── crypto.d.ts
│   │   ├── dgram.d.ts
│   │   ├── diagnostics_channel.d.ts
│   │   ├── dns.d.ts
│   │   ├── domain.d.ts
│   │   ├── events.d.ts
│   │   ├── fs.d.ts
│   │   ├── globals.d.ts
│   │   ├── globals.typedarray.d.ts
│   │   ├── http2.d.ts
│   │   ├── http.d.ts
│   │   ├── https.d.ts
│   │   ├── index.d.ts
│   │   ├── inspector.d.ts
│   │   ├── inspector.generated.d.ts
│   │   ├── LICENSE
│   │   ├── module.d.ts
│   │   ├── net.d.ts
│   │   ├── os.d.ts
│   │   ├── package.json
│   │   ├── path.d.ts
│   │   ├── perf_hooks.d.ts
│   │   ├── process.d.ts
│   │   ├── punycode.d.ts
│   │   ├── querystring.d.ts
│   │   ├── readline.d.ts
│   │   ├── README.md
│   │   ├── repl.d.ts
│   │   ├── sea.d.ts
│   │   ├── sqlite.d.ts
│   │   ├── stream.d.ts
│   │   ├── string_decoder.d.ts
│   │   ├── test.d.ts
│   │   ├── timers.d.ts
│   │   ├── tls.d.ts
│   │   ├── trace_events.d.ts
│   │   ├── tty.d.ts
│   │   ├── url.d.ts
│   │   ├── util.d.ts
│   │   ├── v8.d.ts
│   │   ├── vm.d.ts
│   │   ├── wasi.d.ts
│   │   ├── worker_threads.d.ts
│   │   └── zlib.d.ts
│   ├── phoenix
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── react
│   │   ├── ts5.0
│   │   ├── canary.d.ts
│   │   ├── compiler-runtime.d.ts
│   │   ├── experimental.d.ts
│   │   ├── global.d.ts
│   │   ├── index.d.ts
│   │   ├── jsx-dev-runtime.d.ts
│   │   ├── jsx-runtime.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── unist
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── use-sync-external-store
│   │   ├── shim
│   │   ├── index.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── with-selector.d.ts
│   └── ws
│       ├── index.d.mts
│       ├── index.d.ts
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── typescript
│   ├── bin
│   │   ├── tsc
│   │   └── tsserver
│   ├── lib
│   │   ├── cs
│   │   ├── de
│   │   ├── es
│   │   ├── fr
│   │   ├── it
│   │   ├── ja
│   │   ├── ko
│   │   ├── pl
│   │   ├── pt-br
│   │   ├── ru
│   │   ├── tr
│   │   ├── zh-cn
│   │   ├── zh-tw
│   │   ├── lib.decorators.d.ts
│   │   ├── lib.decorators.legacy.d.ts
│   │   ├── lib.dom.asynciterable.d.ts
│   │   ├── lib.dom.d.ts
│   │   ├── lib.dom.iterable.d.ts
│   │   ├── lib.d.ts
│   │   ├── lib.es2015.collection.d.ts
│   │   ├── lib.es2015.core.d.ts
│   │   ├── lib.es2015.d.ts
│   │   ├── lib.es2015.generator.d.ts
│   │   ├── lib.es2015.iterable.d.ts
│   │   ├── lib.es2015.promise.d.ts
│   │   ├── lib.es2015.proxy.d.ts
│   │   ├── lib.es2015.reflect.d.ts
│   │   ├── lib.es2015.symbol.d.ts
│   │   ├── lib.es2015.symbol.wellknown.d.ts
│   │   ├── lib.es2016.array.include.d.ts
│   │   ├── lib.es2016.d.ts
│   │   ├── lib.es2016.full.d.ts
│   │   ├── lib.es2016.intl.d.ts
│   │   ├── lib.es2017.arraybuffer.d.ts
│   │   ├── lib.es2017.date.d.ts
│   │   ├── lib.es2017.d.ts
│   │   ├── lib.es2017.full.d.ts
│   │   ├── lib.es2017.intl.d.ts
│   │   ├── lib.es2017.object.d.ts
│   │   ├── lib.es2017.sharedmemory.d.ts
│   │   ├── lib.es2017.string.d.ts
│   │   ├── lib.es2017.typedarrays.d.ts
│   │   ├── lib.es2018.asyncgenerator.d.ts
│   │   ├── lib.es2018.asynciterable.d.ts
│   │   ├── lib.es2018.d.ts
│   │   ├── lib.es2018.full.d.ts
│   │   ├── lib.es2018.intl.d.ts
│   │   ├── lib.es2018.promise.d.ts
│   │   ├── lib.es2018.regexp.d.ts
│   │   ├── lib.es2019.array.d.ts
│   │   ├── lib.es2019.d.ts
│   │   ├── lib.es2019.full.d.ts
│   │   ├── lib.es2019.intl.d.ts
│   │   ├── lib.es2019.object.d.ts
│   │   ├── lib.es2019.string.d.ts
│   │   ├── lib.es2019.symbol.d.ts
│   │   ├── lib.es2020.bigint.d.ts
│   │   ├── lib.es2020.date.d.ts
│   │   ├── lib.es2020.d.ts
│   │   ├── lib.es2020.full.d.ts
│   │   ├── lib.es2020.intl.d.ts
│   │   ├── lib.es2020.number.d.ts
│   │   ├── lib.es2020.promise.d.ts
│   │   ├── lib.es2020.sharedmemory.d.ts
│   │   ├── lib.es2020.string.d.ts
│   │   ├── lib.es2020.symbol.wellknown.d.ts
│   │   ├── lib.es2021.d.ts
│   │   ├── lib.es2021.full.d.ts
│   │   ├── lib.es2021.intl.d.ts
│   │   ├── lib.es2021.promise.d.ts
│   │   ├── lib.es2021.string.d.ts
│   │   ├── lib.es2021.weakref.d.ts
│   │   ├── lib.es2022.array.d.ts
│   │   ├── lib.es2022.d.ts
│   │   ├── lib.es2022.error.d.ts
│   │   ├── lib.es2022.full.d.ts
│   │   ├── lib.es2022.intl.d.ts
│   │   ├── lib.es2022.object.d.ts
│   │   ├── lib.es2022.regexp.d.ts
│   │   ├── lib.es2022.string.d.ts
│   │   ├── lib.es2023.array.d.ts
│   │   ├── lib.es2023.collection.d.ts
│   │   ├── lib.es2023.d.ts
│   │   ├── lib.es2023.full.d.ts
│   │   ├── lib.es2023.intl.d.ts
│   │   ├── lib.es2024.arraybuffer.d.ts
│   │   ├── lib.es2024.collection.d.ts
│   │   ├── lib.es2024.d.ts
│   │   ├── lib.es2024.full.d.ts
│   │   ├── lib.es2024.object.d.ts
│   │   ├── lib.es2024.promise.d.ts
│   │   ├── lib.es2024.regexp.d.ts
│   │   ├── lib.es2024.sharedmemory.d.ts
│   │   ├── lib.es2024.string.d.ts
│   │   ├── lib.es5.d.ts
│   │   ├── lib.es6.d.ts
│   │   ├── lib.esnext.array.d.ts
│   │   ├── lib.esnext.collection.d.ts
│   │   ├── lib.esnext.decorators.d.ts
│   │   ├── lib.esnext.disposable.d.ts
│   │   ├── lib.esnext.d.ts
│   │   ├── lib.esnext.float16.d.ts
│   │   ├── lib.esnext.full.d.ts
│   │   ├── lib.esnext.intl.d.ts
│   │   ├── lib.esnext.iterator.d.ts
│   │   ├── lib.esnext.promise.d.ts
│   │   ├── lib.scripthost.d.ts
│   │   ├── lib.webworker.asynciterable.d.ts
│   │   ├── lib.webworker.d.ts
│   │   ├── lib.webworker.importscripts.d.ts
│   │   ├── lib.webworker.iterable.d.ts
│   │   ├── _tsc.js
│   │   ├── tsc.js
│   │   ├── _tsserver.js
│   │   ├── tsserver.js
│   │   ├── tsserverlibrary.d.ts
│   │   ├── tsserverlibrary.js
│   │   ├── typescript.d.ts
│   │   ├── typescript.js
│   │   ├── typesMap.json
│   │   ├── _typingsInstaller.js
│   │   ├── typingsInstaller.js
│   │   └── watchGuard.js
│   ├── LICENSE.txt
│   ├── package.json
│   ├── README.md
│   ├── SECURITY.md
│   └── ThirdPartyNoticeText.txt
├── undici-types
│   ├── agent.d.ts
│   ├── api.d.ts
│   ├── balanced-pool.d.ts
│   ├── cache.d.ts
│   ├── client.d.ts
│   ├── connector.d.ts
│   ├── content-type.d.ts
│   ├── cookies.d.ts
│   ├── diagnostics-channel.d.ts
│   ├── dispatcher.d.ts
│   ├── env-http-proxy-agent.d.ts
│   ├── errors.d.ts
│   ├── eventsource.d.ts
│   ├── fetch.d.ts
│   ├── file.d.ts
│   ├── filereader.d.ts
│   ├── formdata.d.ts
│   ├── global-dispatcher.d.ts
│   ├── global-origin.d.ts
│   ├── handlers.d.ts
│   ├── header.d.ts
│   ├── index.d.ts
│   ├── interceptors.d.ts
│   ├── LICENSE
│   ├── mock-agent.d.ts
│   ├── mock-client.d.ts
│   ├── mock-errors.d.ts
│   ├── mock-interceptor.d.ts
│   ├── mock-pool.d.ts
│   ├── package.json
│   ├── patch.d.ts
│   ├── pool.d.ts
│   ├── pool-stats.d.ts
│   ├── proxy-agent.d.ts
│   ├── readable.d.ts
│   ├── README.md
│   ├── retry-agent.d.ts
│   ├── retry-handler.d.ts
│   ├── util.d.ts
│   ├── webidl.d.ts
│   └── websocket.d.ts
├── @ungap
│   └── structured-clone
│       ├── cjs
│       ├── esm
│       ├── LICENSE
│       ├── package.json
│       ├── README.md
│       └── structured-json.js
├── unified
│   ├── lib
│   │   ├── callable-instance.d.ts
│   │   ├── callable-instance.d.ts.map
│   │   ├── callable-instance.js
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── unist-util-is
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── unist-util-position
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── unist-util-stringify-position
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── unist-util-visit
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── unist-util-visit-parents
│   ├── lib
│   │   ├── color.d.ts
│   │   ├── color.d.ts.map
│   │   ├── color.js
│   │   ├── color.node.d.ts
│   │   ├── color.node.d.ts.map
│   │   ├── color.node.js
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── update-browserslist-db
│   ├── check-npm-version.js
│   ├── cli.js
│   ├── index.d.ts
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── utils.js
├── use-sync-external-store
│   ├── cjs
│   │   ├── use-sync-external-store-shim
│   │   ├── use-sync-external-store.development.js
│   │   ├── use-sync-external-store.production.js
│   │   ├── use-sync-external-store-shim.development.js
│   │   ├── use-sync-external-store-shim.native.development.js
│   │   ├── use-sync-external-store-shim.native.production.js
│   │   ├── use-sync-external-store-shim.production.js
│   │   ├── use-sync-external-store-with-selector.development.js
│   │   └── use-sync-external-store-with-selector.production.js
│   ├── shim
│   │   ├── index.js
│   │   ├── index.native.js
│   │   └── with-selector.js
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── with-selector.js
├── vfile
│   ├── lib
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.js
│   │   ├── minpath.browser.d.ts
│   │   ├── minpath.browser.d.ts.map
│   │   ├── minpath.browser.js
│   │   ├── minpath.d.ts
│   │   ├── minpath.d.ts.map
│   │   ├── minpath.js
│   │   ├── minproc.browser.d.ts
│   │   ├── minproc.browser.d.ts.map
│   │   ├── minproc.browser.js
│   │   ├── minproc.d.ts
│   │   ├── minproc.d.ts.map
│   │   ├── minproc.js
│   │   ├── minurl.browser.d.ts
│   │   ├── minurl.browser.d.ts.map
│   │   ├── minurl.browser.js
│   │   ├── minurl.d.ts
│   │   ├── minurl.d.ts.map
│   │   ├── minurl.js
│   │   ├── minurl.shared.d.ts
│   │   ├── minurl.shared.d.ts.map
│   │   └── minurl.shared.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── vfile-message
│   ├── lib
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── victory-vendor
│   ├── es
│   │   ├── d3-array.js
│   │   ├── d3-color.js
│   │   ├── d3-ease.js
│   │   ├── d3-format.js
│   │   ├── d3-interpolate.js
│   │   ├── d3-path.js
│   │   ├── d3-scale.js
│   │   ├── d3-shape.js
│   │   ├── d3-time-format.js
│   │   ├── d3-time.js
│   │   ├── d3-timer.js
│   │   ├── d3-voronoi.js
│   │   └── internmap.js
│   ├── lib
│   │   ├── d3-array.js
│   │   ├── d3-color.js
│   │   ├── d3-ease.js
│   │   ├── d3-format.js
│   │   ├── d3-interpolate.js
│   │   ├── d3-path.js
│   │   ├── d3-scale.js
│   │   ├── d3-shape.js
│   │   ├── d3-time-format.js
│   │   ├── d3-time.js
│   │   ├── d3-timer.js
│   │   ├── d3-voronoi.js
│   │   └── internmap.js
│   ├── lib-vendor
│   │   ├── d3-array
│   │   ├── d3-color
│   │   ├── d3-ease
│   │   ├── d3-format
│   │   ├── d3-interpolate
│   │   ├── d3-path
│   │   ├── d3-scale
│   │   ├── d3-shape
│   │   ├── d3-time
│   │   ├── d3-time-format
│   │   ├── d3-timer
│   │   ├── d3-voronoi
│   │   └── internmap
│   ├── CHANGELOG.md
│   ├── d3-array.d.ts
│   ├── d3-array.js
│   ├── d3-ease.d.ts
│   ├── d3-ease.js
│   ├── d3-interpolate.d.ts
│   ├── d3-interpolate.js
│   ├── d3-scale.d.ts
│   ├── d3-scale.js
│   ├── d3-shape.d.ts
│   ├── d3-shape.js
│   ├── d3-time.d.ts
│   ├── d3-time.js
│   ├── d3-timer.d.ts
│   ├── d3-timer.js
│   ├── package.json
│   └── README.md
├── vite
│   ├── bin
│   │   ├── openChrome.applescript
│   │   └── vite.js
│   ├── dist
│   │   ├── client
│   │   ├── node
│   │   └── node-cjs
│   ├── misc
│   │   ├── false.js
│   │   └── true.js
│   ├── types
│   │   ├── internal
│   │   ├── customEvent.d.ts
│   │   ├── hmrPayload.d.ts
│   │   ├── hot.d.ts
│   │   ├── importGlob.d.ts
│   │   ├── import-meta.d.ts
│   │   ├── importMeta.d.ts
│   │   ├── metadata.d.ts
│   │   └── package.json
│   ├── client.d.ts
│   ├── index.cjs
│   ├── index.d.cts
│   ├── LICENSE.md
│   ├── package.json
│   └── README.md
├── @vitejs
│   └── plugin-react
│       ├── dist
│       ├── types
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── ws
│   ├── lib
│   │   ├── buffer-util.js
│   │   ├── constants.js
│   │   ├── event-target.js
│   │   ├── extension.js
│   │   ├── limiter.js
│   │   ├── permessage-deflate.js
│   │   ├── receiver.js
│   │   ├── sender.js
│   │   ├── stream.js
│   │   ├── subprotocol.js
│   │   ├── validation.js
│   │   ├── websocket.js
│   │   └── websocket-server.js
│   ├── browser.js
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── wrapper.mjs
├── yallist
│   ├── iterator.js
│   ├── LICENSE
│   ├── package.json
│   ├── README.md
│   └── yallist.js
└── zwitch
    ├── index.d.ts
    ├── index.js
    ├── license
    ├── package.json
    └── readme.md

635 directories, 2936 files
```

#### Directory: tools

##### File: tools/codebase_snapshot.sh
##*Size: 8.0K, Lines: 232, Type: Bourne-Again shell script, ASCII text executable*

```bash
#!/bin/bash
# Script to create a flattened snapshot of a codebase

# Default settings
LINE_THRESHOLD=10000
OUTPUT_FILE="codebase_snapshot.md"
LARGE_DIRS=("pqclean" "node_modules" ".git" "target" "build" "dist" "vectors")
IGNORED_EXTS=("jpg" "jpeg" "png" "gif" "mp4" "mov" "zip" "tar" "gz" "class" "o" "so" "dylib" "a" "exe" "dll")

function print_usage() {
    echo "Usage: $0 [OPTIONS] <path>"
    echo "Creates a flattened snapshot of a codebase."
    echo ""
    echo "Options:"
    echo "  -o, --output FILE    Output file (default: ${OUTPUT_FILE})"
    echo "  -l, --lines NUM      Line threshold for small files (default: ${LINE_THRESHOLD})"
    echo "  -h, --help           Display this help message"
    echo ""
    echo "Examples:"
    echo "  $0 ."
    echo "  $0 --lines 2000 --output my_project_snapshot.md ~/projects/my-project"
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -l|--lines)
            LINE_THRESHOLD="$2"
            shift 2
            ;;
        -h|--help)
            print_usage
            ;;
        *)
            TARGET_PATH="$1"
            shift
            ;;
    esac
done

# Check if target path is provided
if [ -z "$TARGET_PATH" ]; then
    echo "Error: No target path provided."
    print_usage
fi

# Verify target path exists
if [ ! -e "$TARGET_PATH" ]; then
    echo "Error: Target path does not exist: $TARGET_PATH"
    exit 1
fi

# Resolve to absolute path
TARGET_PATH=$(realpath "$TARGET_PATH")

# Function to check if a file should be ignored based on extension
function should_ignore_file() {
    local file="$1"
    local ext="${file##*.}"
    
    # Convert to lowercase
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    for ignored_ext in "${IGNORED_EXTS[@]}"; do
        if [ "$ext" = "$ignored_ext" ]; then
            return 0  # Should ignore
        fi
    done
    
    return 1  # Should not ignore
}

# Function to check if a directory is considered "large"
function is_large_dir() {
    local dir="$1"
    local dirname=$(basename "$dir")
    
    for large_dir in "${LARGE_DIRS[@]}"; do
        if [ "$dirname" = "$large_dir" ]; then
            return 0  # Is large
        fi
    done
    
    return 1  # Is not large
}

# Initialize the output file
echo "# Codebase Snapshot: $(basename "$TARGET_PATH")" > "$OUTPUT_FILE"
echo "Created: $(date)" >> "$OUTPUT_FILE"
echo "Target: $TARGET_PATH" >> "$OUTPUT_FILE"
echo "Line threshold for included files: $LINE_THRESHOLD" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Function to process a directory
function process_directory() {
    local dir="$1"
    local indent="$2"
    local base_dir="$3"
    local relative_path="${dir#$base_dir/}"
    
    # Skip hidden directories
    if [[ $(basename "$dir") == .* && "$dir" != "$TARGET_PATH" ]]; then
        return
    fi
    
    # Check if this is a large directory
    if is_large_dir "$(basename "$dir")"; then
        echo "${indent}## Directory: $relative_path (Large - showing tree only)" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "${indent}Tree structure:" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo '```' >> "$OUTPUT_FILE"
        tree -L 3 --dirsfirst "$dir" >> "$OUTPUT_FILE"
        echo '```' >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        return
    fi
    
    echo "${indent}## Directory: $relative_path" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    local entries=()
    while IFS= read -r -d $'\0' entry; do
        entries+=("$entry")
    done < <(find "$dir" -mindepth 1 -maxdepth 1 -print0 | sort -z)
    
    # Process directories first
    for entry in "${entries[@]}"; do
        if [ -d "$entry" ]; then
            process_directory "$entry" "${indent}#" "$base_dir"
        fi
    done
    
    # Then process files
    for entry in "${entries[@]}"; do
        if [ -f "$entry" ]; then
            process_file "$entry" "$indent" "$base_dir"
        fi
    done
}

# Function to process a file
function process_file() {
    local file="$1"
    local indent="$2"
    local base_dir="$3"
    local relative_path="${file#$base_dir/}"
    
    # Skip hidden files
    if [[ $(basename "$file") == .* ]]; then
        return
    fi
    
    # Skip files with ignored extensions
    if should_ignore_file "$file"; then
        return
    fi
    
    # Get file size and line count
    local size=$(du -h "$file" | cut -f1)
    local lines=$(wc -l < "$file" 2>/dev/null || echo "0")
    local file_type=$(file -b "$file")
    
    echo "${indent}### File: $relative_path" >> "$OUTPUT_FILE"
    echo "${indent}*Size: $size, Lines: $lines, Type: $file_type*" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Check if this is a small text file
    if [ "$lines" -le "$LINE_THRESHOLD" ] && [[ "$file_type" == *text* || "$file_type" == *script* || "$file_type" == *source* ]]; then
        # Determine the language for syntax highlighting
        local ext="${file##*.}"
        local lang=""
        case "$ext" in
            rs)         lang="rust";;
            js)         lang="javascript";;
            ts)         lang="typescript";;
            py)         lang="python";;
            rb)         lang="ruby";;
            c|h)        lang="c";;
            cpp|hpp)    lang="cpp";;
            sh)         lang="bash";;
            java)       lang="java";;
            php)        lang="php";;
            html)       lang="html";;
            css)        lang="css";;
            json)       lang="json";;
            md)         lang="markdown";;
            xml)        lang="xml";;
            yml|yaml)   lang="yaml";;
            toml)       lang="toml";;
            go)         lang="go";;
            swift)      lang="swift";;
            kt|kts)     lang="kotlin";;
            *)          lang="";;
        esac
        
        # Include file content
        echo '```'"$lang" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo '```' >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    else
        echo "${indent}*File content not included (exceeds threshold or non-text file)*" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
}

# Start processing
if [ -d "$TARGET_PATH" ]; then
    # Collect statistics
    total_files=$(find "$TARGET_PATH" -type f | wc -l)
    total_dirs=$(find "$TARGET_PATH" -type d | wc -l)
    
    echo "## Summary Statistics" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "* Total files: $total_files" >> "$OUTPUT_FILE"
    echo "* Total directories: $total_dirs" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Process the target directory
    process_directory "$TARGET_PATH" "#" "$TARGET_PATH"
else
    # It's a single file
    process_file "$TARGET_PATH" "#" "$(dirname "$TARGET_PATH")"
fi

echo "Snapshot created at: $OUTPUT_FILE"
```

#### Directory: types

##### File: types/declarations.d.ts
##*Size: 4.0K, Lines: 11, Type: ASCII text*

```typescript
declare module 'diff' {
  interface Change {
    value: string;
    added?: boolean;
    removed?: boolean;
    count?: number;
  }
  
  export function diffLines(oldText: string, newText: string, options?: any): Change[];
  export function diffWords(oldText: string, newText: string, options?: any): Change[];
  export function diffChars(oldText: string, newText: string, options?: any): Change[];
}```

#### Directory: utils

##### File: utils/backupGenerator.ts
##*Size: 4.0K, Lines: 71, Type: Java source, ASCII text*

```typescript
import { supabase } from '../lib/supabase';

// Helper to escape single quotes for SQL (e.g. "It's" -> "It''s")
const formatValue = (val: any): string => {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return `${val}`;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (Array.isArray(val)) {
    // Convert JS array to Postgres Array string: '{item1,item2}'
    const cleaned = val.map(v => `"${v}"`).join(','); 
    return `'${"{" + cleaned + "}"}'`; 
  }
  // Strings: Escape single quotes
  return `'${val.toString().replace(/'/g, "''")}'`;
};

const generateInsert = (tableName: string, rows: any[]) => {
  if (!rows || rows.length === 0) return '';
  
  const headers = Object.keys(rows[0]).join(', ');
  const values = rows.map(row => {
    const rowValues = Object.values(row).map(formatValue).join(', ');
    return `(${rowValues})`;
  }).join(',\n');

  return `\n-- DATA: ${tableName} --\nINSERT INTO ${tableName} (${headers}) VALUES\n${values};\n`;
};

export const generateMasterBackup = async () => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // 1. Fetch Data in Dependency Order
  // Profiles first (Parent of all)
  const { data: profiles } = await supabase.from('profiles').select('*');
  
  // Specs (Parent of ADRs)
  const { data: specs } = await supabase.from('specs').select('*');
  
  // Quests
  const { data: quests } = await supabase.from('quests').select('*');
  
  // Children
  const { data: signals } = await supabase.from('signals').select('*');
  const { data: meetings } = await supabase.from('meetings').select('*');
  const { data: contributions } = await supabase.from('contributions').select('*');
  const { data: notifications } = await supabase.from('notifications').select('*');

  // NOTE: We generally DO NOT backup 'profile_secrets' (passwords) for security.
  // When restoring, you should run a script to reset passwords to a default.

  let sqlContent = `-- IOI NEXUS MASTER BACKUP\n-- Generated: ${new Date().toISOString()}\n\n`;

  // 2. Build SQL String (Strict Order enforced here)
  if (profiles) sqlContent += generateInsert('profiles', profiles);
  if (specs) sqlContent += generateInsert('specs', specs);
  if (quests) sqlContent += generateInsert('quests', quests);
  if (signals) sqlContent += generateInsert('signals', signals);
  if (meetings) sqlContent += generateInsert('meetings', meetings);
  if (contributions) sqlContent += generateInsert('contributions', contributions);
  if (notifications) sqlContent += generateInsert('notifications', notifications);

  // 3. Trigger Download
  const blob = new Blob([sqlContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ioi_backup_full_${timestamp}.sql`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};```

##### File: utils/economics.ts
##*Size: 4.0K, Lines: 10, Type: Java source, ASCII text*

```typescript
import { Contribution } from '../types';

export const calculateTotalXP = (contributions: Contribution[]): number => {
  return contributions.reduce((total, contribution) => {
    return total + contribution.weight;
  }, 0);
};

export const formatXP = (xp: number): string => {
  return Math.round(xp).toLocaleString();
};```

##### File: utils/questUtils.ts
##*Size: 4.0K, Lines: 33, Type: Java source, ASCII text*

```typescript
import { Quest, Profile } from '../types';

export const getDifficultyConfig = (diff: number) => {
  switch (diff) {
    case 1: return { label: 'THREAD', color: 'text-zinc-500', border: 'border-zinc-800', bg: 'bg-zinc-950' };
    case 2: return { label: 'PROCESS', color: 'text-emerald-400', border: 'border-emerald-900', bg: 'bg-emerald-950' };
    case 3: return { label: 'DAEMON', color: 'text-cyan-400', border: 'border-cyan-900', bg: 'bg-cyan-950' };
    case 5: return { label: 'CLUSTER', color: 'text-amber-400', border: 'border-amber-900', bg: 'bg-amber-950' };
    case 8: return { label: 'KERNEL', color: 'text-rose-400', border: 'border-rose-900', bg: 'bg-rose-950' };
    default: return { label: 'UNKNOWN', color: 'text-zinc-500', border: 'border-zinc-800', bg: 'bg-zinc-950' };
  }
};

export const calculateDaysSinceUpdate = (dateString: string) => {
  const diff = new Date().getTime() - new Date(dateString).getTime();
  return Math.floor(diff / (1000 * 3600 * 24));
};

export const getHealthStatus = (quest: Quest) => {
  if (quest.status !== 'In Progress') return 'Healthy';
  const days = calculateDaysSinceUpdate(quest.last_update_at);
  if (days >= 5) return 'Stale'; 
  if (days >= 3) return 'Warning';
  return 'Healthy';
};

export const calculateConsensus = (votesFor: string[], votesAgainst: string[], totalProfiles: number) => {
  const support = votesFor.length;
  const opposition = votesAgainst.length;
  const isMajority = support > totalProfiles / 2;
  const isOptimistic = support > opposition && support > 0;
  
  return { support, opposition, isMajority, isOptimistic };
};```

#### File: App.tsx
#*Size: 4.0K, Lines: 111, Type: Java source, ASCII text*

```
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SpecViewer } from './components/SpecViewer';
import { QuestBoard } from './components/QuestBoard';
import { Archives } from './components/Archives';
import { TGEDashboard } from './components/TGEDashboard';
import { NotificationCenter } from './components/NotificationCenter';
import { LoginGate } from './components/LoginGate';
import { LandingPage } from './components/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import { View } from './types';
import { ToastContainer } from './components/ui/Toast';
import { Omnibar } from './components/Omnibar';
import { useRoute } from './hooks/useRoute';
import { Menu } from 'lucide-react'; // Import Menu icon

const InternalSystem: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const { toasts, removeToast } = useNotifications();
  const { currentView, navigate } = useRoute('dashboard');
  
  // NEW: Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <LoginGate />;
  }

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-hidden flex">
      
      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-900/90 backdrop-blur border-b border-zinc-800 flex items-center px-4 z-40">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 -ml-2 text-zinc-400 hover:text-white"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
        <span className="ml-2 font-serif font-bold text-zinc-100">IOI Nexus</span>
      </div>

      <Sidebar 
        currentView={currentView} 
        onChangeView={(v) => { navigate(v); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* MAIN CONTENT AREA */}
      {/* 
         - md:ml-64: Margin on desktop to make room for sidebar
         - pt-14: Top padding on mobile for header
         - md:pt-0: No top padding on desktop
      */}
      <main className="flex-1 md:ml-64 h-screen flex flex-col min-w-0 pt-14 md:pt-0 transition-all duration-300">
        <div className="flex-1 p-4 md:p-8 overflow-hidden max-w-[1920px] w-full mx-auto">
          {(() => {
            switch (currentView) {
              case 'dashboard': return <Dashboard onChangeView={navigate} />;
              case 'notifications': return <NotificationCenter onChangeView={navigate} />;
              case 'specs': return <SpecViewer />;
              case 'quests': return <QuestBoard />;
              case 'archives': return <Archives />;
              case 'tge': return <TGEDashboard />;
              default: return <Dashboard onChangeView={navigate} />;
            }
          })()}
        </div>
      </main>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Omnibar onNavigate={navigate} />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(() => {
    return !!localStorage.getItem('ioi_nexus_user_id');
  });

  return (
    <AuthProvider>
      <NotificationProvider>
        {isAppMode ? (
          <InternalSystem onLogout={() => setIsAppMode(false)} />
        ) : (
          <LandingPage onEnterApp={() => setIsAppMode(true)} />
        )}
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;```

#### File: codebase_snapshot.md
#*Size: 400K, Lines: 10726, Type: Java source, ASCII text, with very long lines (552)*

#*File content not included (exceeds threshold or non-text file)*

#### File: constants.ts
#*Size: 4.0K, Lines: 2, Type: ASCII text*

```typescript
// Configuration Constants

export const ONE_DAY = 24 * 60 * 60 * 1000;```

#### File: index.css
#*Size: 4.0K, Lines: 14, Type: ASCII text*

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Reset and base styles just in case local tailwind is used, otherwise this file prevents 404/500 errors */
body {
  margin: 0;
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### File: index.html
#*Size: 4.0K, Lines: 103, Type: HTML document, ASCII text*

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IOI Foundation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              zinc: {
                850: '#1f1f22',
                950: '#09090b',
              }
            },
            fontFamily: {
              sans: ['"IBM Plex Sans"', 'sans-serif'],
              serif: ['"Cormorant Garamond"', 'serif'],
            }
          }
        }
      }
    </script>
    <style>
      body {
        background-color: #09090b; /* zinc-950 */
        color: #d4d4d8; /* zinc-300 */
        margin: 0;
      }
      /* Custom Scrollbar for the IOI look */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #09090b; 
      }
      ::-webkit-scrollbar-thumb {
        background: #27272a; 
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #3f3f46; 
      }
      /* Markdown Specific Overrides for Typography */
      .prose h1, .prose h2, .prose h3, .prose h4 {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 600;
      }
      .prose blockquote {
        border-left-color: #6366f1; /* Indigo-500 */
        font-style: italic;
        background: rgba(99, 102, 241, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 0 0.25rem 0.25rem 0;
      }
      .prose a {
        color: #818cf8;
        text-decoration: none;
        border-bottom: 1px solid rgba(129, 140, 248, 0.3);
      }
      .prose a:hover {
        border-bottom-color: #818cf8;
      }
      .prose code {
        color: #e4e4e7;
        background: #27272a;
        padding: 0.1em 0.3em;
        border-radius: 0.25em;
        font-weight: 400;
      }
      .prose pre {
        background: #18181b;
        border: 1px solid #27272a;
      }
    </style>
  <script type="importmap">
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.4/",
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "lucide-react": "https://esm.sh/lucide-react@^0.563.0",
    "recharts": "https://esm.sh/recharts@^3.7.0",
    "diff": "https://esm.sh/diff@5.2.0",
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@^2.94.0",
    "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.3",
    "vite": "https://esm.sh/vite@^7.3.1",
    "three": "https://esm.sh/three@0.160.0",
    "react-markdown": "https://esm.sh/react-markdown@9.0.1",
    "remark-gfm": "https://esm.sh/remark-gfm@4.0.0"
  }
}
</script>
<link rel="stylesheet" href="/index.css">
</head>
  <body>
    <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>```

#### File: index.tsx
#*Size: 4.0K, Lines: 14, Type: Java source, ASCII text*

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);```

#### File: metadata.json
#*Size: 4.0K, Lines: 4, Type: JSON data*

#*File content not included (exceeds threshold or non-text file)*

#### File: package.json
#*Size: 4.0K, Lines: 30, Type: JSON data*

#*File content not included (exceeds threshold or non-text file)*

#### File: package-lock.json
#*Size: 140K, Lines: 3854, Type: JSON data*

#*File content not included (exceeds threshold or non-text file)*

#### File: README.md
#*Size: 4.0K, Lines: 48, Type: Unicode text, UTF-8 text*

```markdown
# IOI Nexus (Pre-Alpha)

**The Internal Operating System for the IOI Core Team.**

This is the development environment for the IOI Nexus dashboard. It handles specification ratification, quest management, and TGE evidence gathering.

## ⚡️ Developer Quickstart

Assumes a fresh install. No migration paths are currently supported.

### 1. Database Setup (Supabase)

1.  Create a new project at [supabase.com](https://supabase.com).
2.  Navigate to the **SQL Editor**.
3.  **Schema:** Copy the full contents of `schema.sql` and run it. This creates tables, RLS policies, RPC auth functions, and automation triggers.
4.  **Seed:** Copy the contents of `seed.sql` and run it. This generates test users and initial data.

### 2. Local Environment

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run

```bash
npm install
npm run dev
```

## 🔐 Test Credentials

Use these seeded accounts to test Role-Based Access Control (RBAC):

| User Type | Handle | Password | Capability |
| :--- | :--- | :--- | :--- |
| **Maintainer** (Admin) | `heath` | `heath123` | Can Ratify Specs, Finalize Quests, View Secrets |
| **Contributor** (Member) | `perfect` | `perfect123` | Can Propose Specs, Vote, Claim Quests |

## 🛠 Tech Stack

*   **Frontend:** React 19 (RC), Vite, TypeScript
*   **UI:** Tailwind CSS, Lucide Icons, Custom "IOI" Design System
*   **Backend:** Supabase (Postgres, Row Level Security, Edge Functions)
*   **Rendering:** Three.js (Landing Page), Recharts (Analytics)
```

#### File: schema.sql
#*Size: 12K, Lines: 306, Type: ASCII text*

```
-- Enable UUID extension (optional, but good practice if we switch IDs later)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS (Matching types.ts)
DO $$ BEGIN
    CREATE TYPE role_type AS ENUM ('Maintainer', 'Contributor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE spec_status AS ENUM ('Draft', 'Review', 'Ratified', 'Archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE spec_category AS ENUM ('Core', 'Networking', 'Consensus', 'Economic', 'Meta');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quest_status AS ENUM ('Proposed', 'Open', 'In Progress', 'Verification', 'Completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contribution_type AS ENUM ('CODE_MERGE', 'ADR_AUTHOR', 'MEETING_HOST', 'MANUAL_BOUNTY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  role role_type NOT NULL DEFAULT 'Contributor',
  total_xp INTEGER DEFAULT 0,
  avatar_url TEXT
);

-- 2b. PROFILE SECRETS (Secure Credentials)
CREATE TABLE IF NOT EXISTS profile_secrets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  access_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SPECS
CREATE TABLE IF NOT EXISTS specs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  category spec_category NOT NULL,
  content TEXT NOT NULL,
  status spec_status NOT NULL DEFAULT 'Draft',
  author_id TEXT REFERENCES profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER DEFAULT 1,
  target_spec_id TEXT REFERENCES specs(id)
);

-- 4. QUESTS
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty IN (1, 2, 3, 5, 8)),
  status quest_status NOT NULL DEFAULT 'Proposed',
  assignee_id TEXT REFERENCES profiles(id),
  proposer_id TEXT REFERENCES profiles(id) NOT NULL,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_update_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Voting Arrays
  votes_for TEXT[] DEFAULT '{}',
  votes_against TEXT[] DEFAULT '{}',
  
  -- Verification
  pr_link TEXT,
  verification_votes_for TEXT[] DEFAULT '{}',
  verification_votes_against TEXT[] DEFAULT '{}',

  -- Reason for Blocking (The Record)
  block_reason TEXT
);

-- 5. SIGNALS
CREATE TABLE IF NOT EXISTS signals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  area TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONTRIBUTIONS (The Ledger)
CREATE TABLE IF NOT EXISTS contributions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  type contribution_type NOT NULL,
  reference_link TEXT,
  weight INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- 7. MEETINGS
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  title TEXT NOT NULL,
  attendees TEXT[] DEFAULT '{}',
  summary TEXT,
  content TEXT
);

-- 8. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. SPEC VERSION HISTORY
CREATE TABLE IF NOT EXISTS spec_versions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  spec_id TEXT REFERENCES specs(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version INTEGER NOT NULL,
  modified_by TEXT REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  change_summary TEXT
);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE spec_versions ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read specs" ON specs FOR SELECT USING (true);
CREATE POLICY "Public read quests" ON quests FOR SELECT USING (true);
CREATE POLICY "Public read signals" ON signals FOR SELECT USING (true);
CREATE POLICY "Public read contributions" ON contributions FOR SELECT USING (true);
CREATE POLICY "Public read meetings" ON meetings FOR SELECT USING (true);
CREATE POLICY "Lazy Auth read notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Lazy Auth update notifications" ON notifications FOR UPDATE USING (true);
CREATE POLICY "Public read versions" ON spec_versions FOR SELECT USING (true);

-- UPDATED WRITE POLICIES (Allowing 'anon' write for this internal tool architecture)
-- Since we gate access via the Client App using `login_user`, we allow the API Key to write.
DROP POLICY IF EXISTS "Auth write access" ON quests;
CREATE POLICY "Public write quests" ON quests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update quests" ON quests FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Auth write access specs" ON specs;
CREATE POLICY "Public write specs" ON specs FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access signals" ON signals;
CREATE POLICY "Public write signals" ON signals FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access meetings" ON meetings;
CREATE POLICY "Public write meetings" ON meetings FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access versions" ON spec_versions;
CREATE POLICY "Public write versions" ON spec_versions FOR INSERT WITH CHECK (true);

-- 9. FUNCTIONS & TRIGGERS

-- Secure Login RPC
CREATE OR REPLACE FUNCTION login_user(username_in TEXT, key_in TEXT)
RETURNS SETOF profiles AS $$
BEGIN
  RETURN QUERY 
  SELECT p.* 
  FROM profiles p
  JOIN profile_secrets s ON p.id = s.user_id
  WHERE p.username ILIKE username_in 
  AND s.access_key = key_in;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vote Toggle RPC (UPDATED V2)
create or replace function toggle_vote(
  quest_id text,
  user_id text,
  vote_type text,
  reason text default null
)
returns void as $$
declare
  target_col text;
  other_col text;
begin
  if vote_type = 'for' then
    target_col := 'votes_for';
    other_col := 'votes_against';
  elsif vote_type = 'against' then
    target_col := 'votes_against';
    other_col := 'votes_for';
  elsif vote_type = 'verify_for' then
    target_col := 'verification_votes_for';
    other_col := 'verification_votes_against';
  elsif vote_type = 'verify_against' then
    target_col := 'verification_votes_against';
    other_col := 'verification_votes_for';
  end if;

  -- Update arrays
  execute format('update quests set 
    %I = array_append(array_remove(%I, $2), $2),
    %I = array_remove(%I, $2),
    last_update_at = now()
    where id = $1', 
    target_col, target_col, other_col, other_col) 
  using quest_id, user_id;

  -- If reason is provided, set it.
  if reason is not null then
    update quests set block_reason = reason where id = quest_id;
  end if;
  
end;
$$ language plpgsql security definer;

-- Create Quest RPC (Bypasses RLS issues for Proposal Submission)
CREATE OR REPLACE FUNCTION create_quest_rpc(
    title_in text, 
    desc_in text, 
    diff_in int, 
    tag_in text, 
    proposer_id_in text
)
RETURNS jsonb AS $$
DECLARE
    new_id text;
    result jsonb;
BEGIN
    -- Generate simple random ID (3-digit) to match the "Quest #101" aesthetic
    -- In production, a sequence or UUID is better, but this fits the requested style.
    new_id := (floor(random() * 900) + 100)::text;
    
    INSERT INTO quests (
      id, title, description, difficulty, status, proposer_id, tag, 
      created_at, last_update_at, votes_for
    ) VALUES (
      new_id, title_in, desc_in, diff_in, 'Proposed', proposer_id_in, tag_in,
      now(), now(), ARRAY[proposer_id_in]
    ) RETURNING to_jsonb(quests.*) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create User RPC (For Admin Dashboard)
CREATE OR REPLACE FUNCTION create_user_rpc(
    username_in text, 
    role_in role_type, 
    password_in text
)
RETURNS void AS $$
DECLARE
  new_id text;
BEGIN
  new_id := uuid_generate_v4()::text;
  INSERT INTO profiles (id, username, role) VALUES (new_id, username_in, role_in);
  INSERT INTO profile_secrets (user_id, access_key) VALUES (new_id, password_in);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update Password RPC
CREATE OR REPLACE FUNCTION update_password_rpc(
    user_id_in text, 
    old_password_in text, 
    new_password_in text
)
RETURNS boolean AS $$
DECLARE
  valid boolean;
BEGIN
  SELECT EXISTS(SELECT 1 FROM profile_secrets WHERE user_id = user_id_in AND access_key = old_password_in) INTO valid;
  
  IF valid THEN
    UPDATE profile_secrets SET access_key = new_password_in WHERE user_id = user_id_in;
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;```

#### File: seed.sql
#*Size: 8.0K, Lines: 60, Type: ASCII text, with very long lines (708)*

```
-- 1. PROFILES
-- Consolidated to 2 users as requested.
-- 'heath' (Admin/Maintainer) inherits User 1 + User 4 history.
-- 'perfect' (Team Member/Contributor) inherits User 2 + User 3 history.
INSERT INTO profiles (id, username, role, total_xp, avatar_url) VALUES
('user-1', 'heath', 'Maintainer', 650, 'https://ui-avatars.com/api/?name=heath&background=18181b&color=fff'),
('user-2', 'perfect', 'Contributor', 480, 'https://ui-avatars.com/api/?name=perfect&background=3730a3&color=fff');

-- 2. PROFILE SECRETS
INSERT INTO profile_secrets (user_id, access_key) VALUES
('user-1', 'heath123'),
('user-2', 'perfect123');

-- 3. SPECS
INSERT INTO specs (id, title, filename, category, content, status, author_id, updated_at, version, target_spec_id) VALUES
('spec-000', 'The IOI Manifesto', '000-manifesto.md', 'Meta', '# The IOI Manifesto\n\n**Version 1.0**\n\nIOI is not a company. It is a sovereign collective of engineers building the next generation of decentralized infrastructure.\n\n## Principles\n\n1. **Code is Law, Humans are Spirit.**\n2. **Contribution over Speculation.**\n3. **Radical Transparency.**\n\nWe govern ourselves through Proof-of-Contribution (PoC). Every line of code, every ratified specification, and every meeting creates cryptographic evidence of ownership.', 'Ratified', 'user-1', '2023-01-01T10:00:00Z', 1, NULL),

('spec-001', 'Core Network Topology', '001-network-topology.md', 'Networking', '# Core Network Topology\n\n**Status: Stable**\n\nThe IOI Network relies on a randomized mesh topology to ensure redundancy and censorship resistance. Nodes discover peers via a distributed hash table (DHT).\n\n## 1. Node Types\n\n- **Validators:** Propose blocks and maintain the ledger.\n- **Sentinels:** Monitor network health and relay telemetry.\n- **Archives:** Store the full history of the chain.\n\n## 2. Gossip Protocol\n\nWe utilize a modified GossipSub protocol for message propagation, ensuring <500ms latency for block propagation across 95% of the network.', 'Ratified', 'user-1', '2023-10-15T14:00:00Z', 1, NULL),

('spec-002', 'Consensus Mechanism (PoC)', '002-consensus-poc.md', 'Consensus', '# Proof of Contribution (PoC)\n\nUnlike PoS (wealth-based) or PoW (energy-based), IOI uses PoC.\n\n## The XP Token\n\nXP is non-transferable soulbound reputation. It decays over time (halflife: 6 months) to ensure the network is controlled by *active* contributors, not early whales.\n\n## Block Production\n\nThe probability of being selected to propose a block is proportional to your XP relative to the total active XP pool.', 'Ratified', 'user-2', '2023-10-22T16:45:00Z', 2, NULL),

('spec-003', 'Token Economic Model', '003-economics.md', 'Economic', '# Token Economics\n\n## Emission Schedule\n\n(This section is under active revision. See ADR-004)\n\nThe native token is minted per block. 10% goes to the treasury, 90% to the block proposer.\n\n## Staking\n\nValidators must stake a minimum amount to prevent sybil attacks.', 'Ratified', 'user-2', '2023-09-10T09:30:00Z', 1, NULL),

('hist-001', 'Legacy: Proof of Authority', 'ARCHIVE-002-poa-legacy.md', 'Consensus', '# Proof of Authority (Deprecated)\n\nThis was the initial consensus mechanism used in Testnet V0. It relied on 5 trusted keys.', 'Archived', 'user-1', '2022-12-01T00:00:00Z', 0, NULL);

-- Insert ADR after spec-003 exists due to FK
INSERT INTO specs (id, title, filename, category, content, status, author_id, updated_at, version, target_spec_id) VALUES
('adr-004', 'ADR: Dynamic Inflation Curve', 'ADR-004-dynamic-inflation.md', 'Economic', '# Token Economics\n\n## Emission Schedule\n\nThe native token is minted per block using a PID controller based on transaction fees.\n\n- If Fees > Target: Decrease Issuance.\n- If Fees < Target: Increase Issuance.\n\n## Staking\n\nValidators must stake a minimum amount to prevent sybil attacks.', 'Draft', 'user-2', '2023-10-26T12:00:00Z', 0, 'spec-003');

-- 3. QUESTS
-- Redistributed votes and assignments to user-1 and user-2 only
INSERT INTO quests (id, title, description, difficulty, status, assignee_id, proposer_id, tag, created_at, last_update_at, votes_for, votes_against, pr_link, verification_votes_for, verification_votes_against) VALUES
('101', 'Launch Alpha Kernel', 'Deploy the initial kernel to the testnet environment.', 8, 'In Progress', 'user-1', 'user-1', 'Milestone', NOW() - interval '2 days', NOW() - interval '1 day', '{user-1,user-2}', '{}', NULL, '{}', '{}'),

('102', 'Fix UI Typo in Header', 'The header says "IOI Nexux" instead of "Nexus".', 1, 'Open', NULL, 'user-2', 'Good First Issue', NOW() - interval '5 days', NOW() - interval '5 days', '{user-2,user-1}', '{}', NULL, '{}', '{}'),

('103', 'Implement Dark Mode Toggle', 'Allow users to switch themes, though we prefer dark only.', 3, 'Completed', 'user-2', 'user-2', 'Feature', '2023-10-15T10:00:00Z', '2023-10-16T10:00:00Z', '{user-1,user-2}', '{}', 'github.com/ioi/core/pull/99', '{user-1,user-2}', '{}'),

('104', 'Optimize DB Queries', 'Reduce load time for the contribution ledger.', 5, 'In Progress', 'user-2', 'user-2', 'Performance', NOW() - interval '10 days', NOW() - interval '6 days', '{user-2,user-1}', '{}', NULL, '{}', '{}'),

('106', 'Integrate IPFS', 'Storage layer for spec backups.', 5, 'In Progress', 'user-2', 'user-1', 'Infra', NOW() - interval '4 days', NOW() - interval '4 days', '{user-1,user-2}', '{}', NULL, '{}', '{}'),

('105', 'Write Tests for Auth', 'Ensure RBAC is working correctly.', 3, 'Verification', 'user-2', 'user-1', 'Testing', '2023-10-22T10:00:00Z', '2023-10-23T10:00:00Z', '{user-1,user-2}', '{}', 'github.com/ioi/core/pull/105', '{user-2}', '{}');

-- 4. SIGNALS
INSERT INTO signals (id, user_id, area, message, created_at) VALUES
('sig-1', 'user-2', 'auth/middleware.ts', 'Refactoring JWT validation. Do not touch auth routes.', NOW() - interval '30 minutes'),
('sig-2', 'user-1', 'kernel/boot.rs', 'Deploying hotfix for genesis block.', NOW() - interval '2 hours');

-- 5. MEETINGS
INSERT INTO meetings (id, date, title, attendees, summary, content) VALUES
('m-1', '2023-10-25T10:00:00Z', 'Weekly Sync #42', '{user-1,user-2}', 'Discussed Issue #101 timeline. Agreed to freeze features by Friday.', '# Weekly Sync #42\n\n**Date:** Oct 25, 2023\n**Attendees:** @heath, @perfect\n\n## Agenda\n\n1. Alpha Kernel Launch Status\n2. Feature Freeze Timeline\n\n## Decisions\n\n- **Feature Freeze:** Agreed to freeze all non-critical feature work by Friday 5PM UTC.\n- **Testing:** @perfect will lead the QA sprint on the weekend.\n\n## Action Items\n\n- [ ] @heath to merge PR #101 by Thursday.\n- [ ] @perfect to draft the release notes.'),
('m-2', '2023-10-18T10:00:00Z', 'Governance Workshop', '{user-1,user-2}', 'Ratified 001-network-topology.md. Debated the inflation rate for ADR-004.', '# Governance Workshop\n\n**Date:** Oct 18, 2023\n**Attendees:** @heath, @perfect\n\n## Ratifications\n\n- **001-network-topology.md:** Ratified with unanimous support.\n\n## Debates\n\n### ADR-004 (Inflation)\n\n@heath proposed a static 5% inflation.\n@perfect argued for dynamic inflation based on fee volume.\n\n**Conclusion:** We will proceed with drafting the dynamic model for review next week.');

-- 6. CONTRIBUTIONS
INSERT INTO contributions (id, user_id, type, reference_link, weight, created_at, description) VALUES
('c-1', 'user-1', 'CODE_MERGE', 'PR #102', 8, '2023-10-26T11:00:00Z', 'Merged PR: Core Kernel V1'),
('c-2', 'user-2', 'CODE_MERGE', 'PR #99', 3, '2023-10-25T15:30:00Z', 'Merged PR: Dark Mode Logic'),
('c-3', 'user-1', 'ADR_AUTHOR', 'Spec 3.1', 50, '2023-10-24T09:00:00Z', 'Ratified Spec: Network Topology'),
('c-4', 'user-2', 'MEETING_HOST', 'Meeting #42', 5, '2023-10-25T11:00:00Z', 'Attended Weekly Sync'),
('c-5', 'user-1', 'MANUAL_BOUNTY', 'Discord Help', 2, '2023-10-23T14:00:00Z', 'Helped new dev set up environment');```

#### File: tsconfig.json
#*Size: 4.0K, Lines: 28, Type: JSON data*

#*File content not included (exceeds threshold or non-text file)*

#### File: types.ts
#*Size: 4.0K, Lines: 92, Type: ASCII text*

```typescript
export type Role = 'Maintainer' | 'Contributor';

export interface Profile {
  id: string;
  username: string;
  role: Role;
  total_xp: number;
  avatar_url: string;
}

export type SpecStatus = 'Draft' | 'Review' | 'Ratified' | 'Archived';
export type SpecCategory = 'Core' | 'Networking' | 'Consensus' | 'Economic' | 'Meta';

export interface Spec {
  id: string;
  title: string;
  filename: string; 
  category: SpecCategory;
  content: string; // Markdown content
  status: SpecStatus;
  author_id: string;
  updated_at: string;
  version: number;
  target_spec_id?: string; // If this is an ADR, which spec does it modify?
}

export type QuestDifficulty = 1 | 2 | 3 | 5 | 8;
export type QuestStatus = 'Proposed' | 'Open' | 'In Progress' | 'Verification' | 'Completed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  assignee_id?: string;
  proposer_id: string;
  tag: string;
  created_at: string;
  last_update_at: string; // For staleness checks
  
  // Governance & Voting
  votes_for: string[]; // List of Profile IDs
  votes_against: string[]; // List of Profile IDs
  block_reason?: string; // Mandatory rationale for blocking/rejecting
  
  // Verification
  pr_link?: string;
  verification_votes_for?: string[];
  verification_votes_against?: string[];
}

export interface Signal {
  id: string;
  user_id: string;
  area: string; // e.g., "DB Schema", "Auth Logic"
  message: string;
  created_at: string;
}

export interface Meeting {
  id: string;
  date: string;
  title: string;
  attendees: string[]; // List of Profile IDs
  summary: string;
  content?: string; // Full markdown minutes
}

export type ContributionType = 'CODE_MERGE' | 'ADR_AUTHOR' | 'MEETING_HOST' | 'MANUAL_BOUNTY';

export interface Contribution {
  id: string;
  user_id: string;
  type: ContributionType;
  reference_link: string;
  weight: number;
  created_at: string;
  description: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'ALERT' | 'ASSIGNMENT' | 'SUCCESS' | 'INFO';
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export type View = 'dashboard' | 'specs' | 'quests' | 'archives' | 'tge' | 'notifications';```

#### File: vite.config.ts
#*Size: 4.0K, Lines: 9, Type: Java source, ASCII text*

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for libraries that might expect it, though we rely on import.meta.env
    'process.env': {} 
  }
});```

