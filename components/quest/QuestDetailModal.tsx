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
};