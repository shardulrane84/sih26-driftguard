import React from 'react';
import { RiskBand } from '../../types';

interface RiskBadgeProps {
  score: number;
  band?: RiskBand;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  score,
  band,
  size = 'md',
  showScore = true,
}) => {
  const resolvedBand: RiskBand =
    band || (score >= 80 ? 'CRITICAL' : score >= 60 ? 'HIGH' : score >= 30 ? 'MEDIUM' : 'LOW');

  const configs: Record<RiskBand, { label: string; text: string; bg: string; border: string }> = {
    LOW: {
      label: 'LOW RISK',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/30',
      border: 'border-emerald-800/50',
    },
    MEDIUM: {
      label: 'MEDIUM RISK',
      text: 'text-cyan-400',
      bg: 'bg-cyan-950/30',
      border: 'border-cyan-800/50',
    },
    HIGH: {
      label: 'HIGH RISK',
      text: 'text-amber-400',
      bg: 'bg-amber-950/30',
      border: 'border-amber-800/50',
    },
    CRITICAL: {
      label: 'CRITICAL RISK',
      text: 'text-rose-400',
      bg: 'bg-rose-950/30',
      border: 'border-rose-800/50',
    },
  };

  const cfg = configs[resolvedBand];

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono rounded-sm border ${cfg.bg} ${cfg.border} ${cfg.text} ${
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-0.5'
      }`}
    >
      <span className="font-semibold">{cfg.label}</span>
      {showScore && (
        <span className="text-slate-400 opacity-90 tabular-nums">
          [{score}/100]
        </span>
      )}
    </div>
  );
};
