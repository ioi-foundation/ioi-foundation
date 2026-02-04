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
};