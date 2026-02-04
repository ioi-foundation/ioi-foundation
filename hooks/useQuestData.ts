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
};