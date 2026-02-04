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
}