import React from 'react';
import { ScreeningDecision } from '../../types';

interface StatusBadgeProps {
  status: ScreeningDecision;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showSubtitle = false,
}) => {
  const configs = {
    PASS: {
      label: 'PASS',
      subtitle: 'Nominal screening conformance',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-700/60',
      dotColor: 'bg-emerald-400 ring-2 ring-emerald-500/30',
      symbol: '✓',
    },
    REVIEW: {
      label: 'REVIEW',
      subtitle: 'Engineering review recommended',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-700/60',
      dotColor: 'bg-amber-400 ring-2 ring-amber-500/30',
      symbol: '▲',
    },
    REJECT: {
      label: 'REJECT',
      subtitle: 'Exceeds prototype tolerance limits',
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-700/60',
      dotColor: 'bg-rose-400 ring-2 ring-rose-500/30',
      symbol: '✕',
    },
  };

  const cfg = configs[status] || configs.REVIEW;
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 gap-2',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2.5',
  };

  return (
    <div className="inline-flex flex-col">
      <div
        className={`inline-flex items-center rounded-sm border ${cfg.bgColor} ${cfg.borderColor} ${cfg.textColor} ${sizeClasses[size]} font-mono uppercase tracking-wider`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} aria-hidden="true" />
        <span className="font-semibold">{cfg.label}</span>
      </div>
      {showSubtitle && (
        <span className="text-[10px] text-slate-400 mt-1 font-sans">{cfg.subtitle}</span>
      )}
    </div>
  );
};
