import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Contribution, Profile, ContributionType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Download, Table, Loader2, BarChart3, List, Code, Mic, FileText, Gift } from 'lucide-react';
import { AttributionSimulator } from './tge/AttributionSimulator'; 
import { WaffleChart } from './ui/WaffleChart'; 

export const TGEDashboard: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'raw' | 'model'>('raw');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [contributionsRes, profilesRes] = await Promise.all([
        supabase.from('contributions').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*')
      ]);

      if (contributionsRes.data) setContributions(contributionsRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // -- DATA PREP --
  const counts: Record<string, number> = {
    CODE_MERGE: 0,
    ADR_AUTHOR: 0,
    MEETING_HOST: 0,
    MANUAL_BOUNTY: 0
  };

  contributions.forEach(c => {
    if (counts[c.type] !== undefined) counts[c.type]++;
  });

  const waffleData = [
    { label: 'Code Merge', value: counts.CODE_MERGE, color: 'bg-indigo-500' },
    { label: 'ADR Author', value: counts.ADR_AUTHOR, color: 'bg-emerald-500' },
    { label: 'Meeting Host', value: counts.MEETING_HOST, color: 'bg-amber-500' },
    { label: 'Bounty', value: counts.MANUAL_BOUNTY, color: 'bg-rose-500' },
  ].filter(d => d.value > 0);

  const handleExportCSV = () => {
     const headers = ['ID', 'User', 'Type', 'Weight', 'Date', 'Ref'];
    const rows = contributions.map(c => [
        c.id,
        profiles.find(p => p.id === c.user_id)?.username || 'Unknown',
        c.type,
        c.weight,
        c.created_at,
        c.reference_link
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ioi_tge_raw_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Calculating Token Ledger...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-zinc-50">TGE Evidence & Attribution</h2>
            <p className="text-zinc-400 text-sm">Event ledger and economic simulation engine.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
             <button 
                onClick={() => setMode('raw')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'raw' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <List size={14} /> Raw Evidence
             </button>
             <button 
                onClick={() => setMode('model')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'model' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <BarChart3 size={14} /> Attribution Model
             </button>
          </div>
        </div>

        {/* MODE: ATTRIBUTION MODEL */}
        {mode === 'model' && (
            <AttributionSimulator contributions={contributions} profiles={profiles} />
        )}

        {/* MODE: RAW DATA */}
        {mode === 'raw' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            
            {/* NEW: Stat Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="p-4 rounded-lg bg-indigo-900/10 border border-indigo-900/30 flex items-center gap-3">
                  <div className="p-2 bg-indigo-900/20 rounded text-indigo-400"><Code size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-indigo-100">{counts.CODE_MERGE}</span>
                    <span className="text-[10px] uppercase text-indigo-400/70 tracking-wider">Merges</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-emerald-900/10 border border-emerald-900/30 flex items-center gap-3">
                  <div className="p-2 bg-emerald-900/20 rounded text-emerald-400"><FileText size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-emerald-100">{counts.ADR_AUTHOR}</span>
                    <span className="text-[10px] uppercase text-emerald-400/70 tracking-wider">Specs</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-amber-900/10 border border-amber-900/30 flex items-center gap-3">
                  <div className="p-2 bg-amber-900/20 rounded text-amber-400"><Mic size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-amber-100">{counts.MEETING_HOST}</span>
                    <span className="text-[10px] uppercase text-amber-400/70 tracking-wider">Meetings</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg bg-rose-900/10 border border-rose-900/30 flex items-center gap-3">
                  <div className="p-2 bg-rose-900/20 rounded text-rose-400"><Gift size={18} /></div>
                  <div>
                    <span className="block text-xl font-bold text-rose-100">{counts.MANUAL_BOUNTY}</span>
                    <span className="text-[10px] uppercase text-rose-400/70 tracking-wider">Bounties</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Visuals & Actions */}
              <div className="space-y-6">
                 <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Memory Block Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {contributions.length > 0 ? (
                         <WaffleChart data={waffleData} />
                       ) : (
                         <div className="h-40 flex items-center justify-center text-zinc-500 text-xs italic">No data blocks found.</div>
                       )}
                    </CardContent>
                 </Card>

                 <Button variant="outline" className="w-full gap-2 text-xs" onClick={handleExportCSV}>
                    <Download size={14} /> Download Ledger CSV
                </Button>
              </div>

              {/* Right Column: Detailed Ledger */}
              <Card className="lg:col-span-2 flex flex-col h-[600px] lg:h-auto bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Raw Event Log</CardTitle>
                  <Table size={16} className="text-zinc-500" />
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-0 custom-scrollbar">
                   <table className="w-full text-left text-sm text-zinc-400">
                     <thead className="bg-zinc-950/50 text-zinc-500 font-medium sticky top-0 backdrop-blur-sm z-10">
                       <tr>
                         <th className="px-6 py-3">Timestamp</th>
                         <th className="px-6 py-3">Contributor</th>
                         <th className="px-6 py-3">Type</th>
                         <th className="px-6 py-3">Reference</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-800/50">
                       {contributions.map(c => {
                           const user = profiles.find(p => p.id === c.user_id);
                           return (
                             <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                               <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                                 {new Date(c.created_at).toISOString().split('T')[0]}
                               </td>
                               <td className="px-6 py-4 font-medium text-zinc-300">{user?.username || 'Unknown'}</td>
                               <td className="px-6 py-4">
                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                   {c.type.replace('_', ' ')}
                                 </span>
                               </td>
                               <td className="px-6 py-4 font-mono text-xs text-indigo-400">{c.reference_link}</td>
                             </tr>
                           );
                         })
                       }
                     </tbody>
                   </table>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};