import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { Calendar, Loader2, Clock, FileText, ChevronRight, Plus, Save, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Meeting, Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Archives: React.FC = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    summary: '',
    content: '## Agenda\n\n1. \n2. \n\n## Decisions\n\n- ',
    attendees: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [meetingsRes, profilesRes] = await Promise.all([
      supabase.from('meetings').select('*').order('date', { ascending: false }),
      supabase.from('profiles').select('*')
    ]);

    if (meetingsRes.data) setMeetings(meetingsRes.data);
    if (profilesRes.data) setProfiles(profilesRes.data);
    setLoading(false);
  };

  const handleCreate = async () => {
    const timestamp = new Date(`${formData.date}T${formData.time}:00`).toISOString();
    
    const newMeeting = {
        id: `m-${Date.now()}`,
        title: formData.title,
        date: timestamp,
        summary: formData.summary,
        content: formData.content,
        attendees: formData.attendees
    };

    const { error } = await supabase.from('meetings').insert(newMeeting);
    
    if (!error) {
        setMeetings([newMeeting, ...meetings]);
        setIsCreateOpen(false);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            summary: '',
            content: '## Agenda\n\n1. \n2. \n\n## Decisions\n\n- ',
            attendees: []
        });
    } else {
        console.error("Failed to archive:", error);
    }
  };

  const toggleAttendee = (id: string) => {
    setFormData(prev => {
        const exists = prev.attendees.includes(id);
        return {
            ...prev,
            attendees: exists 
                ? prev.attendees.filter(a => a !== id)
                : [...prev.attendees, id]
        };
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p>Retrieving Archival Records...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
         <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-zinc-50">The Archives</h2>
            <p className="text-zinc-400 mt-1">Tribal knowledge, consensus records, and meeting minutes.</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-0">
            <Plus size={16} /> Archive Record
          </Button>
        </div>

        <div className="grid gap-3">
          {meetings.length === 0 ? (
            <div className="text-zinc-500 text-sm italic py-12 text-center border border-dashed border-zinc-800 rounded-lg">
                No meeting minutes recorded yet.
            </div>
          ) : (
            meetings.map((meeting) => {
                const dateObj = new Date(meeting.date);
                const day = dateObj.toLocaleDateString(undefined, { day: 'numeric' });
                const month = dateObj.toLocaleDateString(undefined, { month: 'short' });
                const year = dateObj.getFullYear();
                const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <Card key={meeting.id} className="group hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300">
                    <div className="p-5 flex flex-col sm:flex-row gap-5">
                      {/* Left: Date Block */}
                      <div className="flex-shrink-0 flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:w-16 sm:border-r border-zinc-800 sm:pr-4">
                        <div className="text-center">
                          <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">{month}</span>
                          <span className="block text-2xl font-serif font-bold text-zinc-200 leading-none my-1">{day}</span>
                          <span className="block text-[10px] text-zinc-500">{year}</span>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                        <div>
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium text-zinc-100 group-hover:text-indigo-300 transition-colors truncate pr-4">
                                    {meeting.title}
                                </h3>
                                <Badge variant="outline" className="flex-shrink-0 text-[10px] gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Clock size={10} /> {time}
                                </Badge>
                            </div>
                            <p className="text-zinc-400 text-sm mt-1 leading-relaxed line-clamp-2">
                                {meeting.summary}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            {/* Attendees */}
                            <div className="flex -space-x-2.5 overflow-visible">
                                {meeting.attendees?.map(id => {
                                    const p = profiles.find(pr => pr.id === id);
                                    if(!p) return null;
                                    return (
                                        <Tooltip key={id} content={p.username}>
                                            <img src={p.avatar_url} className="w-6 h-6 rounded-full border border-zinc-900 ring-1 ring-zinc-800" alt={p.username} />
                                        </Tooltip>
                                    );
                                })}
                            </div>

                            {/* Interaction */}
                            <button 
                                onClick={() => setViewMeeting(meeting)}
                                className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <FileText size={14} /> View Minutes <ChevronRight size={14} />
                            </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
            })
          )}
        </div>
      </div>

      {/* --- VIEW MODAL (The Reader) --- */}
      <Modal 
        isOpen={!!viewMeeting} 
        onClose={() => setViewMeeting(null)} 
        title={viewMeeting?.title || ''}
      >
        <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-800 pb-4">
                <span className="flex items-center gap-1"><Calendar size={12}/> {viewMeeting && new Date(viewMeeting.date).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Users size={12}/> {viewMeeting?.attendees?.length || 0} Attendees</span>
            </div>
            <div className="prose prose-zinc prose-invert prose-sm max-w-none max-h-[60vh] overflow-y-auto custom-scrollbar">
                {viewMeeting?.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{viewMeeting.content}</ReactMarkdown>
                ) : (
                    <p className="italic text-zinc-600 text-center py-8">No detailed minutes recorded for this session.</p>
                )}
            </div>
            <div className="flex justify-end pt-4 border-t border-zinc-800">
                <Button variant="ghost" onClick={() => setViewMeeting(null)}>Close Record</Button>
            </div>
        </div>
      </Modal>

      {/* --- CREATE MODAL (The Scribe) --- */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Scribe New Record">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
            <Input 
                label="Meeting Title" 
                placeholder="e.g. Weekly Sync #55"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
            />
            <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                <Input type="time" label="Time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            
            {/* Attendee Selector */}
            <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Attendees</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {profiles.map(p => (
                        <button
                            key={p.id}
                            onClick={() => toggleAttendee(p.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${
                                formData.attendees.includes(p.id) 
                                ? 'bg-indigo-900/40 border-indigo-500 text-indigo-200' 
                                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-zinc-500'
                            }`}
                        >
                            <img src={p.avatar_url} className="w-3 h-3 rounded-full" alt={p.username}/>
                            {p.username}
                        </button>
                    ))}
                </div>
            </div>

            <TextArea 
                label="Executive Summary (Short)" 
                placeholder="Brief overview for the archive card..."
                value={formData.summary} 
                onChange={e => setFormData({...formData, summary: e.target.value})} 
            />
            
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Detailed Minutes (Markdown)</label>
                <textarea 
                    className="flex min-h-[200px] w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 font-mono focus:ring-2 focus:ring-indigo-500/50 custom-scrollbar focus:outline-none"
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={!formData.title} className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2">
                    <Save size={16} /> Save to Archive
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};