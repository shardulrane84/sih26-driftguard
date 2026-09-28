import React from 'react';

interface DataQualityGaugeProps {
  score: number;
  completeness?: number;
  validity?: number;
  consistency?: number;
  continuity?: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const DataQualityGauge: React.FC<DataQualityGaugeProps> = ({
  score,
  completeness = 99.2,
  validity = 98.4,
  consistency = 97.8,
  continuity = 96.5,
  size = 'md',
  showDetails = true,
}) => {
  const radius = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const stroke = size === 'sm' ? 4 : size === 'lg' ? 6 : 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorClass =
    score >= 95 ? 'text-emerald-400 stroke-emerald-400' : score >= 85 ? 'text-cyan-400 stroke-cyan-400' : 'text-amber-400 stroke-amber-400';

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform"
        >
          <circle
            stroke="#1e293b"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={`transition-all duration-700 ease-out ${colorClass}`}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-mono font-bold tabular-nums text-white ${
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-base'
          }`}>
            {score}%
          </span>
          {size !== 'sm' && (
            <span className="text-[9px] uppercase font-mono text-slate-400 -mt-0.5">DQI</span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 w-full text-[11px] font-mono">
          <div className="flex justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Completeness:</span>
            <span className="text-slate-200 tabular-nums">{completeness}%</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Validity:</span>
            <span className="text-slate-200 tabular-nums">{validity}%</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Consistency:</span>
            <span className="text-slate-200 tabular-nums">{consistency}%</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Continuity:</span>
            <span className="text-slate-200 tabular-nums">{continuity}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
