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
};