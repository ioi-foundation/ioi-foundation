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
};