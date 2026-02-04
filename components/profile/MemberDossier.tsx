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
};