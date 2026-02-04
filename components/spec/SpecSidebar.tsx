import React from 'react';
import { Search, Layout, Folder, Plus, FilePlus, Download, FolderOpen, GitPullRequest, History, File, ScrollText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SpecTreeItem } from './SpecTreeItem';
import { Spec } from '../../types';

interface SpecSidebarProps {
  mode: 'governance' | 'tree';
  setMode: (m: 'governance' | 'tree') => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  
  // Data
  fileTree: any;
  ratifiedSpecs: Spec[];
  activeProposals: Spec[];
  historySpecs: Spec[];
  
  selectedSpecId?: string;
  onSelect: (s: Spec) => void;
  
  // Actions
  isAdmin: boolean;
  onStartCreate: () => void;
  onOpenADRModal: () => void;
  onDownloadBackup: () => void;
}

export const SpecSidebar: React.FC<SpecSidebarProps> = ({
  mode, setMode, searchTerm, setSearchTerm,
  fileTree, ratifiedSpecs, activeProposals, historySpecs,
  selectedSpecId, onSelect,
  isAdmin, onStartCreate, onOpenADRModal, onDownloadBackup
}) => {
  return (
    <div className="w-80 flex-shrink-0 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-zinc-50">Documentation</h2>
        <div className="flex gap-1">
            <Button size="sm" className="text-xs h-7 gap-1 bg-indigo-600 hover:bg-indigo-500 text-white border-0" onClick={onStartCreate}>
              <Plus size={12} /> Std
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={onOpenADRModal}>
              <FilePlus size={12} /> ADR
            </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex p-1 bg-zinc-900 rounded-md border border-zinc-800">
          <button 
            onClick={() => setMode('governance')}
            className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-sm transition-colors ${mode === 'governance' ? 'bg-zinc-800 text-zinc-200 font-medium shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layout size={12} /> Governance
          </button>
          <button 
            onClick={() => setMode('tree')}
            className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-sm transition-colors ${mode === 'tree' ? 'bg-zinc-800 text-zinc-200 font-medium shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Folder size={12} /> File System
          </button>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
        <input 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-9 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Search specs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        
        {/* VIEW: FILE TREE */}
        {mode === 'tree' && (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-2 pl-2">Root</div>
              {Object.keys(fileTree).sort().map(key => (
                <SpecTreeItem 
                  key={key} 
                  name={key} 
                  node={fileTree[key]} 
                  level={0} 
                  selectedSpecId={selectedSpecId} 
                  onSelect={onSelect}
                />
              ))}
              {Object.keys(fileTree).length === 0 && <div className="text-xs text-zinc-600 px-3 italic">Empty repository</div>}
            </div>
        )}

        {/* VIEW: GOVERNANCE */}
        {mode === 'governance' && (
          <>
            {/* Section: Ratified */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <FolderOpen size={14} />
                <span>Living Standard (v1.0)</span>
              </div>
              <div className="space-y-1">
                {ratifiedSpecs.map(spec => (
                  <button 
                    key={spec.id}
                    onClick={() => onSelect(spec)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${
                      selectedSpecId === spec.id 
                        ? 'bg-zinc-800 text-zinc-100 font-medium' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    <File size={14} className="opacity-70 flex-shrink-0" />
                    <span className="truncate flex-1">{spec.filename}</span>
                  </button>
                ))}
                {ratifiedSpecs.length === 0 && <div className="text-xs text-zinc-600 px-3 italic">No matching specs</div>}
              </div>
            </div>

            {/* Section: Active */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <GitPullRequest size={14} />
                <span>Active Proposals</span>
              </div>
              <div className="space-y-2">
                {activeProposals.map(spec => (
                  <div 
                    key={spec.id}
                    onClick={() => onSelect(spec)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSpecId === spec.id 
                        ? 'bg-zinc-900 border-indigo-500/50 ring-1 ring-indigo-500/20' 
                        : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-xs font-mono text-zinc-500 uppercase">{spec.category}</span>
                      <Badge variant={spec.status === 'Review' ? 'warning' : 'outline'} className="text-[10px] h-5">{spec.status}</Badge>
                    </div>
                    <h4 className="font-medium text-zinc-200 text-sm line-clamp-2 leading-snug">{spec.title}</h4>
                  </div>
                ))}
                {activeProposals.length === 0 && (
                  <div className="text-xs text-zinc-600 italic px-3">No active proposals</div>
                )}
              </div>
            </div>

            {/* Section: Archive */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
                <History size={14} />
                <span>Archive</span>
              </div>
              <div className="space-y-1">
                {historySpecs.map(spec => (
                  <button 
                  key={spec.id}
                  onClick={() => onSelect(spec)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${
                    selectedSpecId === spec.id 
                      ? 'bg-zinc-800 text-zinc-100 font-medium' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                  }`}
                >
                  <ScrollText size={14} className="opacity-50 flex-shrink-0" />
                  <span className="truncate flex-1 line-through opacity-70">{spec.filename}</span>
                </button>
                ))}
              </div>
            </div>
          </>
        )}

        {isAdmin && (
          <div className="pt-4 border-t border-zinc-800/50">
              <Button variant="secondary" size="sm" className="w-full h-8 text-xs gap-2" onClick={onDownloadBackup}>
              <Download size={14} /> Backup Specs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};