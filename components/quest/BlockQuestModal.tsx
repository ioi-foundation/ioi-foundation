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
};