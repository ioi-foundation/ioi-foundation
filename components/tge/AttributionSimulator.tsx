import React, { useState, useMemo } from 'react';
import { Contribution, Profile, ContributionType } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Calculator, Coins, PieChart as PieIcon, Save } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AttributionSimulatorProps {
  contributions: Contribution[];
  profiles: Profile[];
}

// Default weights based on standard protocol values
const DEFAULT_WEIGHTS: Record<ContributionType, number> = {
  CODE_MERGE: 10,
  ADR_AUTHOR: 50,
  MEETING_HOST: 5,
  MANUAL_BOUNTY: 1
};

export const AttributionSimulator: React.FC<AttributionSimulatorProps> = ({ contributions, profiles }) => {
  const [totalSupply, setTotalSupply] = useState<number>(10000000); // 10M Tokens
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // --- THE MODEL LOGIC ---
  const simulationResults = useMemo(() => {
    const userScores: Record<string, number> = {};
    let totalNetworkScore = 0;

    // 1. Calculate weighted scores
    contributions.forEach(c => {
      // Base weight from DB * Multiplier from UI
      const score = c.weight * (weights[c.type] || 1);
      
      userScores[c.user_id] = (userScores[c.user_id] || 0) + score;
      totalNetworkScore += score;
    });

    // 2. Calculate Allocation
    const results = profiles.map(p => {
      const score = userScores[p.id] || 0;
      const share = totalNetworkScore > 0 ? score / totalNetworkScore : 0;
      const allocation = share * totalSupply;

      return {
        id: p.id,
        username: p.username,
        score: Math.round(score),
        share: (share * 100).toFixed(2),
        allocation: Math.floor(allocation)
      };
    }).sort((a, b) => b.score - a.score);

    return { results, totalNetworkScore };
  }, [contributions, profiles, weights, totalSupply]);

  const handleWeightChange = (type: ContributionType, val: string) => {
    const num = parseFloat(val);
    setWeights(prev => ({ ...prev, [type]: isNaN(num) ? 0 : num }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* CONTROLS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Global Parameters */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
              <Coins size={16} className="text-amber-400" /> Supply Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                label="Total Token Supply" 
                type="number"
                value={totalSupply} 
                onChange={e => setTotalSupply(Number(e.target.value))}
                className="font-mono text-lg text-amber-400"
              />
              <div className="p-3 rounded bg-zinc-950/50 border border-zinc-800 text-xs text-zinc-500">
                <div className="flex justify-between mb-1">
                  <span>Network Score:</span>
                  <span className="font-mono text-zinc-300">{Math.round(simulationResults.totalNetworkScore).toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="font-mono text-zinc-300">{profiles.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Weight Multipliers */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
              <Calculator size={16} className="text-indigo-400" /> Weight Multipliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(DEFAULT_WEIGHTS) as ContributionType[]).map(type => (
                <div key={type} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">{type.replace('_', ' ')}</label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={weights[type]}
                    onChange={(e) => handleWeightChange(type, e.target.value)}
                    className="font-mono text-center text-indigo-300 border-zinc-700 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-600 italic">
              * Adjusting multipliers simulates the relative value of different labor types in the protocol.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RESULTS VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
                <PieIcon size={16} /> Distribution Projection
             </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulationResults.results} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="username" type="category" width={60} tick={{fill: '#71717a', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#e4e4e7' }}
                  formatter={(value: number) => [Math.round(value).toLocaleString(), 'Score']}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                   {simulationResults.results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#3f3f46'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Ledger */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800 flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center">
             <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
                <Save size={16} /> Final Allocation Table
             </CardTitle>
             <Badge variant="outline" className="font-mono text-amber-500 border-amber-900/50 bg-amber-900/10">SIMULATION MODE</Badge>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/50 text-zinc-500 font-medium text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-3">Identity</th>
                  <th className="px-6 py-3 text-right">Adj. Score</th>
                  <th className="px-6 py-3 text-right">Network %</th>
                  <th className="px-6 py-3 text-right text-indigo-400">Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {simulationResults.results.map(r => (
                  <tr key={r.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-zinc-300">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                         {r.username}
                       </div>
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-zinc-400">{r.score.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-mono text-zinc-500">{r.share}%</td>
                    <td className="px-6 py-3 text-right font-mono font-bold text-amber-400">
                      {r.allocation.toLocaleString()} <span className="text-[10px] text-amber-500/50">IOI</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};