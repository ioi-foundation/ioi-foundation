import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useSignals } from '../hooks/useSignals';
import { Spec, SpecStatus, Profile, SpecCategory } from '../types';
import { GitPullRequest, CheckCircle2, AlertCircle, File, History, ArrowRight, Copy, Check, Loader2, Edit3, Save, X, Send, Trash2, AlertTriangle, Lock, Clock, RotateCcw, FolderOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// New Imports
import { SpecDiffViewer } from './spec/SpecDiffViewer';
import { SpecEditor, SPEC_TEMPLATES, EditorState } from './spec/SpecEditor';
import { SpecSidebar } from './spec/SpecSidebar';

const specStatusToIcon = (status: SpecStatus) => {
  switch (status) {
    case 'Ratified': return <CheckCircle2 size={14} className="inline mr-1 text-green-400" />;
    case 'Review': return <AlertCircle size={14} className="inline mr-1 text-amber-400" />;
    case 'Draft': return <File size={14} className="inline mr-1 text-zinc-400" />;
    case 'Archived': return <History size={14} className="inline mr-1 text-zinc-500" />;
    default: return <File size={14} className="inline mr-1" />;
  }
};

export const SpecViewer: React.FC = () => {
  const { user } = useAuth();
  const { signals, createSignal, deleteSignal } = useSignals();
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // -- View Mode State --
  const [sidebarMode, setSidebarMode] = useState<'governance' | 'tree'>('governance');

  // -- Selection & Editor State --
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    filename: '',
    category: 'Core',
    content: ''
  });

  // -- Modal State --
  const [isADRModalOpen, setIsADRModalOpen] = useState(false);
  const [newADR, setNewADR] = useState<{ title: string; targetId: string; content: string }>({ title: '', targetId: '', content: '' });
  const [hasCopied, setHasCopied] = useState(false);
  
  // -- Deletion State --
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // -- History / Version Control State --
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [viewingVersion, setViewingVersion] = useState<any | null>(null);

  // -- SOFT LOCK LOGIC --
  const activeLock = selectedSpec ? signals.find(s => 
    s.area === `Spec: ${selectedSpec.filename}` && 
    s.user_id !== user?.id
  ) : null;

  const lockerName = activeLock ? profiles.find(p => p.id === activeLock.user_id)?.username : 'Unknown';

  useEffect(() => {
    let signalId: string | null = null;
    if (isEditing && selectedSpec && user) {
      signalId = `lock-${selectedSpec.id}`;
      createSignal({
        id: signalId,
        user_id: user.id,
        area: `Spec: ${selectedSpec.filename}`,
        message: 'Currently editing this specification.',
        created_at: new Date().toISOString()
      });
    }
    return () => { if (signalId) deleteSignal(signalId); };
  }, [isEditing, selectedSpec?.id, selectedSpec?.filename, user]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [specsRes, profilesRes] = await Promise.all([
        supabase.from('specs').select('*').order('filename', { ascending: true }),
        supabase.from('profiles').select('*')
      ]);

      if (specsRes.data) setSpecs(specsRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  // Filtering & Tree Building
  const filteredSpecs = specs.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ratifiedSpecs = filteredSpecs.filter(s => s.status === 'Ratified').sort((a,b) => a.filename.localeCompare(b.filename));
  const activeProposals = filteredSpecs.filter(s => ['Draft', 'Review'].includes(s.status));
  const historySpecs = filteredSpecs.filter(s => s.status === 'Archived');

  const buildTree = (specList: Spec[]) => {
    const root: any = {};
    specList.forEach(spec => {
      const parts = spec.filename.split('/'); 
      let current = root;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = { __file: true, ...spec };
        } else {
          current[part] = current[part] || { __folder: true };
          current = current[part];
        }
      });
    });
    return root;
  };

  const fileTree = buildTree(filteredSpecs);

  const isAdmin = user?.role === 'Maintainer';
  const author = profiles.find(p => p.id === selectedSpec?.author_id);
  const targetSpec = selectedSpec?.target_spec_id ? specs.find(s => s.id === selectedSpec.target_spec_id) : null;

  // -- Handlers --
  const handleSelectSpec = (spec: Spec) => {
    setSelectedSpec(spec);
    setIsEditing(false);
    setIsCreating(false);
    setEditorState({
      title: spec.title,
      filename: spec.filename,
      category: spec.category,
      content: spec.content,
      targetId: spec.target_spec_id
    });
  };

  const handleStartCreate = () => {
    setSelectedSpec(null);
    setIsEditing(true);
    setIsCreating(true);
    setEditorState({
      title: 'New Standard',
      filename: 'core/new-standard.md', 
      category: 'Core',
      content: SPEC_TEMPLATES.STANDARD
    });
  };

  const handleSave = async () => {
    if (!user) return;

    if (isCreating) {
      const newId = `spec-${Date.now()}`;
      const newSpec: Spec = {
        id: newId,
        title: editorState.title,
        filename: editorState.filename,
        category: editorState.category,
        content: editorState.content,
        status: 'Draft',
        author_id: user.id,
        updated_at: new Date().toISOString(),
        version: 1
      };
      
      const { error } = await supabase.from('specs').insert(newSpec);
      if (error) { alert('Failed to create spec: ' + error.message); return; }
      
      setSpecs([...specs, newSpec]);
      setSelectedSpec(newSpec);
      setIsCreating(false);
      setIsEditing(false);

    } else if (selectedSpec) {
      // 1. SNAPSHOT
      await supabase.from('spec_versions').insert({
        spec_id: selectedSpec.id,
        content: selectedSpec.content,
        version: selectedSpec.version,
        modified_by: selectedSpec.author_id 
      });

      // 2. UPDATE
      const nextVersion = (selectedSpec.version || 1) + 1;
      const { error } = await supabase.from('specs').update({
        title: editorState.title,
        filename: editorState.filename,
        category: editorState.category,
        content: editorState.content,
        updated_at: new Date().toISOString(),
        version: nextVersion
      }).eq('id', selectedSpec.id);

      if (error) { alert('Failed to save changes: ' + error.message); return; }

      const updated = { ...selectedSpec, ...editorState, version: nextVersion, updated_at: new Date().toISOString() };
      setSpecs(specs.map(s => s.id === selectedSpec.id ? updated : s));
      setSelectedSpec(updated);
      setIsEditing(false);
    }
  };

  const fetchHistory = async () => {
    if (!selectedSpec) return;
    const { data } = await supabase
      .from('spec_versions')
      .select('*, profiles(username)')
      .eq('spec_id', selectedSpec.id)
      .order('version', { ascending: false });
    
    if (data) setHistory(data);
    setIsHistoryOpen(true);
    setViewingVersion(null); 
  };

  const updateSpecStatus = async (specId: string, status: SpecStatus) => {
    const { error } = await supabase.from('specs').update({ status, updated_at: new Date().toISOString() }).eq('id', specId);
    if (error) { alert('Error updating status'); return; }
    
    setSpecs(prev => prev.map(s => s.id === specId ? { ...s, status } : s));
    if (selectedSpec?.id === specId) setSelectedSpec(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = async () => {
    if (!selectedSpec) return;
    if (isAdmin) {
        const { error } = await supabase.from('specs').delete().eq('id', selectedSpec.id);
        if (error) { alert("Failed to delete: " + error.message); return; }
        setSpecs(prev => prev.filter(s => s.id !== selectedSpec.id));
        setSelectedSpec(null);
    } else {
        await updateSpecStatus(selectedSpec.id, 'Archived');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCopy = () => {
    if (selectedSpec) {
      navigator.clipboard.writeText(selectedSpec.content);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(specs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ioi-specs-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateADR = async () => {
    if (!newADR.targetId || !user) return;
    const target = specs.find(s => s.id === newADR.targetId);
    const idStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    const newSpec: Spec = {
      id: `adr-${Date.now()}`,
      title: newADR.title,
      filename: `decisions/${target?.category.toLowerCase()}/ADR-${idStr}-${target?.filename.replace('.md', '') || 'unknown'}`,
      category: target?.category || 'Core',
      content: newADR.content,
      status: 'Draft',
      author_id: user.id,
      updated_at: new Date().toISOString(),
      version: 0,
      target_spec_id: newADR.targetId
    };

    setSpecs([...specs, newSpec]);
    handleSelectSpec(newSpec); 
    setIsADRModalOpen(false);
    setNewADR({ title: '', targetId: '', content: '' });
    await supabase.from('specs').insert(newSpec);
  };

  if (loading) {
     return (
       <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-3">
         <Loader2 className="animate-spin text-indigo-500" size={32} />
         <p>Loading Documentation...</p>
       </div>
     );
   }

  return (
    <div className="h-full flex gap-6">
      {/* --- SIDEBAR --- */}
      <SpecSidebar 
        mode={sidebarMode}
        setMode={setSidebarMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fileTree={fileTree}
        ratifiedSpecs={ratifiedSpecs}
        activeProposals={activeProposals}
        historySpecs={historySpecs}
        selectedSpecId={selectedSpec?.id}
        onSelect={handleSelectSpec}
        isAdmin={!!isAdmin}
        onStartCreate={handleStartCreate}
        onOpenADRModal={() => setIsADRModalOpen(true)}
        onDownloadBackup={handleDownloadBackup}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
         <Card className="flex-1 flex flex-col overflow-hidden bg-zinc-950 border-zinc-800">
           {selectedSpec || isCreating ? (
             <>
               {/* HEADER ACTION BAR */}
               <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                 {/* Left Side Info */}
                 <div className="flex items-center gap-4">
                   {isEditing ? (
                      <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                        <Edit3 size={16} />
                        <span>{isCreating ? 'Creating New Standard' : `Editing: ${selectedSpec?.filename}`}</span>
                      </div>
                   ) : (
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-xl font-serif font-bold text-zinc-50">{selectedSpec?.title}</h1>
                          <Badge variant="outline" className="font-mono">{specStatusToIcon(selectedSpec!.status)} {selectedSpec?.filename} <span className="opacity-50 ml-1">v{selectedSpec?.version}</span></Badge>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span>Authored by <span className="text-zinc-200">{author?.username || 'Unknown'}</span></span>
                          {targetSpec && (
                            <>
                              <span>•</span>
                              <ArrowRight size={12} />
                              <span className="text-indigo-400">Modifies {targetSpec.filename}</span>
                            </>
                          )}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Lock Banner */}
                 {!isEditing && activeLock && (
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-950/30 border border-amber-900/50 rounded text-xs text-amber-200 animate-pulse">
                     <Lock size={12} />
                     <span>Editing locked by <span className="font-bold">{lockerName}</span></span>
                   </div>
                 )}

                 {/* Right Side Buttons */}
                 <div className="flex gap-2">
                    {!isEditing && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
                          {hasCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" onClick={fetchHistory} title="View Version History">
                          <Clock size={14} />
                        </Button>
                      </>
                    )}

                    {selectedSpec?.status === 'Draft' && !isEditing && (
                       <Button variant="secondary" size="sm" className="gap-2" onClick={() => updateSpecStatus(selectedSpec.id, 'Review')}>
                         <Send size={14} /> Request Review
                       </Button>
                    )}

                    {!isEditing && selectedSpec && (selectedSpec.status === 'Draft' || selectedSpec.status === 'Review' || isAdmin) && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => { setIsEditing(true); setEditorState({ ...selectedSpec } as EditorState); }}
                        disabled={!!activeLock}
                        title={activeLock ? `File is being edited by ${lockerName}` : 'Edit File'}
                      >
                        {activeLock ? <Lock size={14} /> : <Edit3 size={14} />} Edit
                      </Button>
                    )}

                    {isEditing && (
                       <>
                         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setIsCreating(false); if (selectedSpec) handleSelectSpec(selectedSpec); }}>
                            <X size={14} /> Cancel
                         </Button>
                         <Button variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-500 border-0 gap-2" onClick={handleSave}>
                           <Save size={14} /> Save Changes
                         </Button>
                       </>
                    )}

                    {!isEditing && selectedSpec && selectedSpec.status !== 'Ratified' && selectedSpec.status !== 'Archived' && isAdmin && (
                       <Button variant="primary" size="sm" className="bg-green-700 hover:bg-green-600 text-white border-0 gap-2" onClick={() => updateSpecStatus(selectedSpec.id, 'Ratified')}>
                        <CheckCircle2 size={14} /> Ratify
                      </Button>
                    )}

                    {!isEditing && selectedSpec && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-2 ${isAdmin ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                            onClick={() => setIsDeleteModalOpen(true)}
                            title={isAdmin ? "Permanently Delete" : "Archive"}
                        >
                            <Trash2 size={14} />
                        </Button>
                    )}
                 </div>
               </div>
               
               {/* CONTENT AREA */}
               <div className="flex-1 flex overflow-hidden">
                 {isEditing ? (
                    <SpecEditor state={editorState} onChange={setEditorState} />
                 ) : (
                    // STANDARD VIEW
                    <div className="w-full h-full overflow-y-auto custom-scrollbar p-10">
                       {selectedSpec?.target_spec_id && targetSpec && selectedSpec.status !== 'Ratified' ? (
                          // Diff View for ADRs
                          <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded p-4 mb-8">
                              <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                <GitPullRequest size={14} /> 
                                Proposed Changes
                              </h3>
                              <p className="text-xs text-zinc-500 mb-4">Comparing Draft against <span className="text-zinc-300 font-mono">{targetSpec.filename}</span></p>
                              <SpecDiffViewer oldText={targetSpec.content} newText={selectedSpec.content} />
                            </div>
                          </div>
                       ) : (
                          // Render Markdown
                          <div className="prose prose-zinc prose-invert max-w-3xl mx-auto">
                             <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({node, inline, className, children, ...props}: any) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <div className="not-prose my-6 relative group">
                                                <div className="absolute right-2 top-2 text-[10px] text-zinc-500 font-mono uppercase opacity-50 group-hover:opacity-100 transition-opacity select-none">
                                                    {match[1]}
                                                </div>
                                                <pre className="bg-[#1e1e1e] border border-zinc-800 rounded-lg p-4 overflow-x-auto shadow-sm">
                                                    <code className={`${className} font-mono text-sm`} {...props}>
                                                        {children}
                                                    </code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <code className="bg-zinc-800/50 text-zinc-200 px-1.5 py-0.5 rounded border border-zinc-700/50 text-[0.85em] font-mono" {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                               {selectedSpec!.content}
                             </ReactMarkdown>
                          </div>
                       )}
                    </div>
                 )}
               </div>
             </>
           ) : (
             // EMPTY STATE
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/20">
               <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-600">
                  <FolderOpen size={32} />
               </div>
               <h3 className="text-xl font-serif font-bold text-zinc-200 mb-2">No Specification Selected</h3>
               <p className="text-zinc-500 max-w-md text-center mb-8">Select a module from the registry to view its details, or initialize a new standard for the protocol.</p>
               <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 gap-2" onClick={handleStartCreate}>
                 <Edit3 size={16} /> Initialize New Standard
               </Button>
             </div>
           )}
         </Card>
      </div>

      {/* Legacy Create ADR Modal */}
      <Modal isOpen={isADRModalOpen} onClose={() => setIsADRModalOpen(false)} title="Create Architecture Decision Record (ADR)">
        <div className="space-y-4">
          <Input 
            label="Title" 
            placeholder="e.g., Update Staking Parameters"
            value={newADR.title}
            onChange={(e) => setNewADR({...newADR, title: e.target.value})} 
          />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Target Spec</label>
            <select 
              className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              value={newADR.targetId}
              onChange={(e) => {
                const target = specs.find(s => s.id === e.target.value);
                setNewADR({
                  ...newADR,
                  targetId: e.target.value,
                  content: target ? target.content : ''
                });
              }}
            >
              <option value="">-- Select a Standard to Amend --</option>
              {ratifiedSpecs.map(s => (
                <option key={s.id} value={s.id}>{s.filename} ({s.title})</option>
              ))}
            </select>
          </div>
          <TextArea 
            label="Content (Markdown)" 
            className="font-mono text-xs min-h-[300px]"
            value={newADR.content}
            onChange={(e) => setNewADR({...newADR, content: e.target.value})}
          />
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsADRModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateADR} disabled={!newADR.targetId || !newADR.title}>Propose ADR</Button>
          </div>
        </div>
      </Modal>

      {/* HISTORY MODAL */}
      <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title={`History: ${selectedSpec?.filename}`}>
        <div className="flex h-[60vh] gap-4">
          {/* List of Versions */}
          <div className="w-1/3 border-r border-zinc-800 pr-2 overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Previous Snapshots</h4>
            {history.length === 0 && <p className="text-xs text-zinc-600 italic">No history recorded.</p>}
            {history.map((ver) => (
              <div 
                key={ver.id}
                onClick={() => setViewingVersion(ver)}
                className={`p-3 rounded cursor-pointer border mb-2 transition-all ${
                  viewingVersion?.id === ver.id 
                    ? 'bg-zinc-800 border-indigo-500/50' 
                    : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="outline">v{ver.version}</Badge>
                  <span className="text-[10px] text-zinc-500">{new Date(ver.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">
                   Snapshot before update
                </p>
              </div>
            ))}
          </div>

          {/* Diff View */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950 p-4 rounded border border-zinc-800">
            {viewingVersion ? (
              <>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                   <div>
                     <span className="text-xs font-bold text-red-400 block">Comparing v{viewingVersion.version} (Old)</span>
                     <span className="text-xs font-bold text-green-400 block">Against v{selectedSpec?.version} (Current)</span>
                   </div>
                   {isAdmin && (
                     <Button 
                       size="sm" 
                       className="h-6 text-xs gap-1 bg-amber-900/30 text-amber-200 border border-amber-900 hover:bg-amber-900/50"
                       onClick={() => {
                         if(confirm("Revert to this version? Current changes will be lost.")) {
                           setEditorState({ ...selectedSpec, content: viewingVersion.content } as EditorState);
                           setIsHistoryOpen(false);
                           setIsEditing(true);
                         }
                       }}
                     >
                       <RotateCcw size={10} /> Revert
                     </Button>
                   )}
                </div>
                <SpecDiffViewer oldText={viewingVersion.content} newText={selectedSpec?.content || ''} />
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <Clock size={32} className="mb-2 opacity-20" />
                <p>Select a version to inspect changes.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title={isAdmin ? "Delete Specification" : "Archive Specification"}>
        <div className="space-y-4">
            <div className={`p-4 rounded border flex items-start gap-3 ${isAdmin ? 'bg-red-950/20 border-red-900/50 text-red-200' : 'bg-amber-950/20 border-amber-900/50 text-amber-200'}`}>
                <AlertTriangle className="shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm">{isAdmin ? 'Permanent Deletion' : 'Propose Archival'}</h4>
                    <p className="text-xs opacity-80 mt-1">
                        {isAdmin 
                            ? "You are about to permanently destroy this record. This action cannot be undone." 
                            : "You are proposing to move this specification to the Archive. It will no longer be considered active."}
                    </p>
                </div>
            </div>
            
            <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-sm text-zinc-400 truncate">
                {selectedSpec?.filename}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button 
                    onClick={handleDelete} 
                    className={isAdmin ? "bg-red-600 hover:bg-red-500 text-white border-0" : "bg-amber-600 hover:bg-amber-500 text-white border-0"}
                >
                    {isAdmin ? "Confirm Delete" : "Confirm Archive"}
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};