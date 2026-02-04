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
};