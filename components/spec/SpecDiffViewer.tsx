import React from 'react';
import { diffLines } from 'diff';

interface SpecDiffViewerProps {
  oldText: string;
  newText: string;
}

export const SpecDiffViewer: React.FC<SpecDiffViewerProps> = ({ oldText, newText }) => {
  const diff = diffLines(oldText, newText);

  return (
    <div className="font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap bg-zinc-950 p-4 rounded border border-zinc-800">
      {diff.map((part: any, index: number) => {
        if (part.added) {
          return (
            <div key={index} className="bg-green-900/30 text-green-200 border-l-2 border-green-600 pl-4 pr-2 py-1 select-all">
              {part.value}
            </div>
          );
        }
        if (part.removed) {
          return (
            <div key={index} className="bg-red-900/20 text-red-300/50 line-through border-l-2 border-red-900 pl-4 pr-2 py-1 select-none">
              {part.value}
            </div>
          );
        }
        return <span key={index} className="text-zinc-400 opacity-60">{part.value}</span>;
      })}
    </div>
  );
};