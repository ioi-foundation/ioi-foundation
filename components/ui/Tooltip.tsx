import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, className = '' }) => {
  return (
    <div className={`relative flex items-center group/tooltip ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-50 w-max max-w-[200px] pointer-events-none">
        <div className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-2 py-1.5 rounded shadow-xl animate-in fade-in zoom-in-95 duration-200">
          {content}
          {/* Little triangle arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-800"></div>
        </div>
      </div>
    </div>
  );
};