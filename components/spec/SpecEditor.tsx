import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from '../ui/Input';
import { SpecCategory } from '../../types';

// Moved templates here as they are only relevant to the editor
export const SPEC_TEMPLATES = {
  BLANK: '',
  STANDARD: `# Specification Title\n\n**Status:** Draft\n**Category:** Core\n**Author:** @username\n\n## 1. Abstract\nA short summary of the technical specification.\n\n## 2. Motivation\nWhy is this needed? What problem does it solve?\n\n## 3. Specification\nThe technical details, schema, and protocol logic.\n\n### 3.1 Data Structures\n\`\`\`typescript\ninterface Example {\n  field: string;\n}\n\`\`\`\n\n## 4. Rationale\nWhy this approach was chosen over alternatives.\n\n## 5. Backwards Compatibility\nDoes this break existing implementations?\n`,
  ADR: `# ADR: [Short Title]\n\n**Status:** Draft\n**Context:** [Reference to Spec ID]\n\n## Context\nThe issue that we are seeing is...\n\n## Decision\nWe have decided to...\n\n## Consequences\n### Positive\n- Easier maintenance...\n\n### Negative\n- Higher latency in...\n`,
  PROCESS: `# Process: [Title]\n\n## Objective\nDescription of the organizational process.\n\n## Roles\n- **Owner:**\n- **Stakeholders:**\n\n## Workflow\n1. [Step 1]\n2. [Step 2]\n`
};

export interface EditorState {
  title: string;
  filename: string;
  category: SpecCategory;
  content: string;
  targetId?: string;
}

interface SpecEditorProps {
  state: EditorState;
  onChange: (newState: EditorState) => void;
}

export const SpecEditor: React.FC<SpecEditorProps> = ({ state, onChange }) => {
  
  const handleTemplateApply = (key: keyof typeof SPEC_TEMPLATES) => {
    if (confirm('This will overwrite current content. Continue?')) {
      onChange({ ...state, content: SPEC_TEMPLATES[key] });
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Left: Inputs */}
      <div className="w-1/2 flex flex-col border-r border-zinc-800 p-6 gap-4 bg-zinc-900/30">
        <div className="grid grid-cols-2 gap-4">
           <Input label="Title" value={state.title} onChange={e => onChange({...state, title: e.target.value})} />
           <Input 
            label="Path / Filename" 
            placeholder="folder/subfolder/file.md"
            value={state.filename} 
            onChange={e => onChange({...state, filename: e.target.value})} 
           />
           <div>
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Category</label>
              <select 
                className="flex h-10 w-full mt-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                value={state.category}
                onChange={(e) => onChange({...state, category: e.target.value as SpecCategory})}
              >
                <option value="Core">Core</option>
                <option value="Networking">Networking</option>
                <option value="Consensus">Consensus</option>
                <option value="Economic">Economic</option>
                <option value="Meta">Meta</option>
              </select>
           </div>
           
           {/* Template Selector */}
           <div>
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Load Scaffolding</label>
              <select 
                className="flex h-10 w-full mt-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                onChange={(e) => {
                  if (e.target.value) handleTemplateApply(e.target.value as keyof typeof SPEC_TEMPLATES);
                  e.target.value = ""; 
                }}
              >
                <option value="">-- Select Template --</option>
                <option value="STANDARD">Technical Spec</option>
                <option value="ADR">Decision Record (ADR)</option>
                <option value="PROCESS">Process Doc</option>
              </select>
           </div>
        </div>
        <div className="flex-1 flex flex-col">
           <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5">Markdown Content</label>
           <textarea 
             className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded p-4 font-mono text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 resize-none custom-scrollbar"
             value={state.content}
             onChange={(e) => onChange({...state, content: e.target.value})}
           />
        </div>
      </div>
      
      {/* Right: Preview */}
      <div className="w-1/2 p-10 overflow-y-auto bg-zinc-950 custom-scrollbar">
        <div className="prose prose-zinc prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{state.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};