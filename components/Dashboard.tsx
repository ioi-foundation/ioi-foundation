import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { calculateTotalXP, formatXP } from '../utils/economics';
import { Activity, FileText, Zap, Users, GitMerge, Loader2, Plus, Shield, ArrowRight, PlayCircle, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Contribution, Profile, Quest, Spec, Role, View } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { MyFocus } from './dashboard/MyFocus';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { MemberDossier } from './profile/MemberDossier';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

// NEW: Mission Briefing Component (Internal Helper)
const MissionBriefing: React.FC<{ role: Role; onNavigate: (v: View) => void }> = ({ role, onNavigate }) => {
  const isMaintainer = role === 'Maintainer';

  return (
    <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-indigo-900/20 to-zinc-900/50 border border-indigo-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Shield size={100} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-serif font-bold text-zinc-100 mb-2 flex items-center gap-2">
          {isMaintainer ? "Commander's Briefing" : "Operative's Directive"}
        </h3>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed mb-4">
          {isMaintainer 
            ? "The protocol requires direction. Review pending specifications for ratification or provision new quests for the team." 
            : "Your queue is empty. Access the Quest Board to claim an open task, or draft a new standard in the Spec module."}
        </p>
        
        <div className="flex gap-3">
          {isMaintainer ? (
            <>
              <Button onClick={() => onNavigate('quests')} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                <Shield size={16} /> Manage Quests
              </Button>
               <Button onClick={() => onNavigate('specs')} variant="secondary" className="gap-2">
                <BookOpen size={16} /> Review Specs
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => onNavigate('quests')} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                <PlayCircle size={16} /> Claim Quest
              </Button>
              <Button onClick={() => onNavigate('specs')} variant="secondary" className="gap-2">
                <Plus size={16} /> Draft Spec
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const { user, addMember } = useAuth();
  const { notifications } = useNotifications();
  const [data, setData] = useState<{
    contributions: Contribution[];
    quests: Quest[];
    specs: Spec[];
    profiles: Profile[];
  }>({ contributions: [], quests: [], specs: [], profiles: [] });
  
  const [loading, setLoading] = useState(true);

  // Add Member State
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newMember, setNewMember] = useState({ username: '', role: 'Contributor' as Role, password: '' });
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);

  // Profile Dossier State
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [contributionsRes, questsRes, specsRes, profilesRes] = await Promise.all([
        supabase.from('contributions').select('*').order('created_at', { ascending: false }),
        supabase.from('quests').select('*'),
        supabase.from('specs').select('*'),
        supabase.from('profiles').select('*')
      ]);

      setData({
        contributions: contributionsRes.data || [],
        quests: questsRes.data || [],
        specs: specsRes.data || [],
        profiles: profilesRes.data || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddMember = async () => {
    if (newMember.password.length < 6) {
        setInviteStatus("Password must be at least 6 characters.");
        return;
    }
    const res = await addMember(newMember.username, newMember.role, newMember.password);
    if (res.success) {
        setIsInviteOpen(false);
        setNewMember({ username: '', role: 'Contributor', password: '' });
        setInviteStatus(null);
        fetchDashboardData(); // Refresh list
    } else {
        setInviteStatus(res.message || "Failed to add user.");
    }
  };

  const totalContribs = data.contributions.length;
  const activeQuests = data.quests.filter(q => q.status === 'In Progress').length;
  const ratifiedSpecs = data.specs.filter(s => s.status === 'Ratified').length;

  // Calculate contribution counts and Total XP per profile
  const profileStats = data.profiles.map(p => {
    const userContributions = data.contributions.filter(c => c.user_id === p.id);
    const totalXP = calculateTotalXP(userContributions);
    return {
      ...p,
      contributionCount: userContributions.length,
      totalXP
    };
  }).sort((a, b) => b.totalXP - a.totalXP);

  // LOGIC: Does this user have active work?
  const myWork = data.quests.filter(q => q.assignee_id === user?.id && q.status === 'In Progress');
  const needsBriefing = myWork.length === 0;

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Syncing Operations Center...</p>
      </div>
    );
  }

  const isAdmin = user?.role === 'Maintainer';

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-zinc-50">Operations Center</h2>
            <p className="text-zinc-400 mt-1">Welcome back, {user?.username}. System status: Nominal.</p>
          </div>
          <div className="text-right">
             <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Your XP</span>
             <span className="block text-2xl font-mono text-indigo-400">{formatXP(profileStats.find(p => p.id === user?.id)?.totalXP || 0)}</span>
          </div>
        </div>

        {/* CONDITION: Show Mission Briefing OR My Focus */}
        {needsBriefing ? (
           <MissionBriefing role={user?.role || 'Contributor'} onNavigate={onChangeView} />
        ) : (
           <MyFocus 
             user={user}
             quests={data.quests}
             notifications={notifications}
             onNavigate={onChangeView}
           />
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Total Contributions</p>
                <h3 className="text-2xl font-bold text-zinc-100">{totalContribs}</h3>
              </div>
              <Activity className="text-indigo-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Ratified Specs</p>
                <h3 className="text-2xl font-bold text-zinc-100">{ratifiedSpecs}</h3>
              </div>
              <FileText className="text-green-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Active Quests</p>
                <h3 className="text-2xl font-bold text-zinc-100">{activeQuests}</h3>
              </div>
              <Zap className="text-amber-500" />
            </CardContent>
          </Card>
          <Card className="relative group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Core Members</p>
                <h3 className="text-2xl font-bold text-zinc-100">{data.profiles.length}</h3>
              </div>
              <Users className="text-blue-500" />
            </CardContent>
            {isAdmin && (
                <button 
                  onClick={() => setIsInviteOpen(true)}
                  className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-zinc-100 font-medium gap-2 cursor-pointer"
                >
                    <Plus size={16} /> Manage Team
                </button>
            )}
          </Card>
        </div>

        {/* Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contribution Ledger</CardTitle>
            </CardHeader>
            <CardContent>
              {data.contributions.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm italic">
                  No contributions recorded yet.
                </div>
              ) : (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                  {data.contributions.map((c) => {
                    const user = data.profiles.find(p => p.id === c.user_id);
                    return (
                      <div key={c.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 group-[.is-active]:bg-zinc-800 group-[.is-active]:border-zinc-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-zinc-400">
                          <GitMerge size={16} />
                        </div>
                        
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-zinc-800 bg-zinc-900/50 shadow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-zinc-200 text-sm">{user?.username || 'Unknown'}</span>
                            <time className="font-mono text-xs text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</time>
                          </div>
                          <p className="text-zinc-300 text-sm">{c.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">{c.reference_link}</span>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500">{c.type.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mini Team Leaderboard */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Total XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileStats.map((profile, i) => (
                  <div 
                    key={profile.id} 
                    onClick={() => setSelectedProfile(profile)}
                    className="flex items-center gap-3 pb-3 border-b border-zinc-800/50 last:border-0 last:pb-0 cursor-pointer hover:bg-zinc-900/50 p-2 rounded transition-colors -mx-2 px-2"
                  >
                    <div className="font-mono text-zinc-500 w-4">{i + 1}</div>
                    <img src={profile.avatar_url} alt={profile.username} className="w-8 h-8 rounded-full bg-zinc-800" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-zinc-200">{profile.username}</span>
                        <div className="text-right">
                           <span className="block text-xs font-bold text-indigo-400">{formatXP(profile.totalXP)} XP</span>
                           <span className="block text-[10px] text-zinc-600">{profile.contributionCount} Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin: Add Member Modal */}
      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Provision New Member">
        <div className="space-y-4">
            <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded text-xs text-amber-200 flex gap-2">
                <Shield size={16} className="shrink-0" />
                <p>You are about to grant access to the internal kernel. Ensure this individual has signed the contributor covenant.</p>
            </div>
            
            <Input 
                label="Username / Handle"
                placeholder="e.g. neo_matrix"
                value={newMember.username}
                onChange={e => setNewMember({...newMember, username: e.target.value})}
            />

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Clearance Level</label>
                <select 
                    className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value as Role})}
                >
                    <option value="Contributor">Contributor (Standard)</option>
                    <option value="Maintainer">Maintainer (Admin)</option>
                </select>
            </div>

            <Input 
                label="Initial Access Key"
                placeholder="Min 6 characters"
                value={newMember.password}
                onChange={e => setNewMember({...newMember, password: e.target.value})}
            />

            {inviteStatus && (
                <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">{inviteStatus}</div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMember} disabled={!newMember.username || !newMember.password}>Provision Identity</Button>
            </div>
        </div>
      </Modal>

      {/* Member Dossier Modal */}
      <MemberDossier 
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        contributions={data.contributions}
        quests={data.quests}
      />
    </div>
  );
};