import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  headerAction?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title, headerAction }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-matrix-border bg-matrix-glass backdrop-blur-md shadow-lg ${className}`}>
      {/* Decorative Matrix Lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-matrix-gold opacity-50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-matrix-gold opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-matrix-gold opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-matrix-gold opacity-50"></div>

      {(title || headerAction) && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-matrix-border bg-white/5">
          {title && <h3 className="text-matrix-gold font-bold uppercase tracking-wider text-sm">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};