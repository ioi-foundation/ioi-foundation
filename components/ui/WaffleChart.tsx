import React from 'react';
import { Tooltip } from './Tooltip';

interface DataPoint {
  label: string;
  value: number;
  color: string; // Tailwind class like 'bg-indigo-500'
}

interface WaffleChartProps {
  data: DataPoint[];
}

export const WaffleChart: React.FC<WaffleChartProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  
  // Calculate blocks (total 100)
  // We map the data to an array of 100 items representing the distribution
  let blocks: { color: string; label: string; value: number }[] = [];
  
  data.forEach(item => {
    // Calculate percentage, floor it to ensure we don't overflow easily
    const count = Math.round((item.value / total) * 100);
    for (let i = 0; i < count; i++) {
      if (blocks.length < 100) {
        blocks.push({ color: item.color, label: item.label, value: item.value });
      }
    }
  });

  // Fill remaining spots with 'empty' if rounding errors occur
  while (blocks.length < 100) {
    blocks.push({ color: 'bg-zinc-800', label: 'Unallocated', value: 0 });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* The Grid */}
      <div className="grid grid-cols-10 gap-1 aspect-square w-full max-w-[300px] mx-auto">
        {blocks.map((block, i) => (
          <Tooltip key={i} content={`${block.label}: ${Math.round((block.value / total) * 100)}%`}>
            <div className={`w-full h-full rounded-sm ${block.color} hover:opacity-80 transition-opacity cursor-crosshair`} />
          </Tooltip>
        ))}
      </div>

      {/* The Legend */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 rounded-sm ${item.color}`} />
            <span className="text-zinc-400">{item.label}</span>
            <span className="ml-auto font-mono text-zinc-300">{Math.round((item.value/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};