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
};