import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FileText as FileTextIcon } from 'lucide-react';
import { Spec } from '../../types';

interface TreeItemProps {
  name: string;
  node: any;
  level: number;
  selectedSpecId?: string;
  onSelect: (spec: Spec) => void;
}

export const SpecTreeItem: React.FC<TreeItemProps> = ({ name, node, level, selectedSpecId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.__folder;
  const isFile = node.__file;

  if (isFolder) {
    return (
      <div className="select-none">
        <div 
          className="flex items-center gap-1 py-1 px-2 hover:bg-zinc-900/50 rounded cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors"
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Folder size={14} className="text-zinc-600" />
          <span className="text-sm font-medium truncate">{name}</span>
        </div>
        {isOpen && (
          <div>
            {Object.keys(node).filter(k => k !== '__folder').sort().map(childName => (
              <SpecTreeItem 
                key={childName} 
                name={childName} 
                node={node[childName]} 
                level={level + 1} 
                selectedSpecId={selectedSpecId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isFile) {
    return (
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
          selectedSpecId === node.id 
            ? 'bg-zinc-800 text-zinc-100 font-medium' 
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
        }`}
        style={{ paddingLeft: `${level * 12 + 20}px` }}
        onClick={() => onSelect(node)}
      >
        <FileTextIcon size={13} />
        <span className="text-sm truncate">{name}</span>
      </div>
    );
  }

  return null;
};