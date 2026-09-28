import React, { useState } from 'react';
import { ParameterName, Measurement } from '../../types';
import { BASELINE_PROTOTYPES } from '../../mock/demoData';

interface TelemetryChartProps {
  measurements: Measurement[];
  selectedParam: ParameterName;
  onParamChange?: (param: ParameterName) => void;
  componentId?: string;
  showLotBand?: boolean;
  interactive?: boolean;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  measurements,
  selectedParam,
  onParamChange,
  componentId,
  showLotBand = true,
  interactive = true,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);

  const paramConfig = BASELINE_PROTOTYPES[selectedParam] || BASELINE_PROTOTYPES.iddq;

  // Test stage hours mapping
  const stages = [0, 24, 96, 168];

  // Values from component measurements
  const values = stages.map((h) => {
    const m = measurements.find((item) => item.hour === h);
    return m ? m[selectedParam] : paramConfig.nominal;
  });

  // Calculate dynamic chart scales
  const allValues = [...values];
  const nominalVal = paramConfig.nominal;

  // Prototype thresholds calculation (for demonstration of prototype boundaries)
  let warningLimit = nominalVal * 1.35;
  let criticalLimit = nominalVal * 1.8;

  if (selectedParam === 'temperature') {
    warningLimit = 127.5;
    criticalLimit = 130.0;
  } else if (selectedParam === 'voltage') {
    warningLimit = 3.22;
    criticalLimit = 3.15;
  } else if (selectedParam === 'propagationDelay') {
    warningLimit = nominalVal + 0.30;
    criticalLimit = nominalVal + 0.60;
  } else if (selectedParam === 'leakageCurrent') {
    warningLimit = nominalVal * 3;
    criticalLimit = nominalVal * 10;
  }

  allValues.push(warningLimit, criticalLimit, nominalVal * 0.9);
  const minVal = Math.max(0, Math.min(...allValues) * 0.92);
  const maxVal = Math.max(...allValues) * 1.08;

  // Chart dimensions
  const width = 640;
  const height = 280;
  const padding = { top: 32, right: 36, bottom: 44, left: 64 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Coordinate transforms
  const getX = (hour: number) => {
    // Non-linear visual spacing for realistic inspection: 0h, 24h, 96h, 168h equally spaced across axes
    const stageIdx = stages.indexOf(hour);
    const frac = stageIdx >= 0 ? stageIdx / (stages.length - 1) : hour / 168;
    return padding.left + frac * chartW;
  };

  const getY = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const frac = (clamped - minVal) / (maxVal - minVal || 1);
    return padding.top + chartH - frac * chartH;
  };

  // Generate SVG paths
  const actualPath = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(stages[i])} ${getY(v)}`)
    .join(' ');

  // Reference baseline nominal curve
  const baselinePath = stages
    .map((h, i) => {
      const baseVal =
        selectedParam === 'iddq'
          ? nominalVal + (h * 0.008)
          : selectedParam === 'leakageCurrent'
          ? nominalVal + (h * 0.001)
          : nominalVal;
      return `${i === 0 ? 'M' : 'L'} ${getX(h)} ${getY(baseVal)}`;
    })
    .join(' ');

  // Tolerance band polygon
  const toleranceUpper = stages.map((h) => {
    const baseVal =
      selectedParam === 'iddq'
        ? nominalVal + (h * 0.008)
        : selectedParam === 'leakageCurrent'
        ? nominalVal + (h * 0.001)
        : nominalVal;
    const tol = paramConfig.stdDev * 1.5;
    return `${getX(h)},${getY(baseVal + tol)}`;
  });

  const toleranceLower = [...stages]
    .reverse()
    .map((h) => {
      const baseVal =
        selectedParam === 'iddq'
          ? nominalVal + (h * 0.008)
          : selectedParam === 'leakageCurrent'
          ? nominalVal + (h * 0.001)
          : nominalVal;
      const tol = paramConfig.stdDev * 1.5;
      return `${getX(h)},${getY(Math.max(0, baseVal - tol))}`;
    });

  const toleranceBandPoints = [...toleranceUpper, ...toleranceLower].join(' ');

  // Current active value for HUD
  const activeStage = activeStageIndex !== null ? stages[activeStageIndex] : stages[stages.length - 1];
  const activeVal = activeStageIndex !== null ? values[activeStageIndex] : values[values.length - 1];
  const initialVal = values[0];
  const deltaFromStart = +(activeVal - initialVal).toFixed(3);
  const percentDelta = initialVal !== 0 ? +((deltaFromStart / initialVal) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col bg-[#0c1322] border border-slate-800 rounded-lg p-4">
      {/* Parameter Selection & Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          {onParamChange ? (
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded">
              {(['iddq', 'leakageCurrent', 'propagationDelay', 'temperature', 'voltage'] as ParameterName[]).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => onParamChange(p)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                      selectedParam === p
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p === 'iddq'
                      ? 'Iddq'
                      : p === 'leakageCurrent'
                      ? 'Leakage'
                      : p === 'propagationDelay'
                      ? 'Prop Delay'
                      : p === 'temperature'
                      ? 'Temp'
                      : 'Voltage'}
                  </button>
                )
              )}
            </div>
          ) : (
            <span className="text-xs font-mono font-medium text-cyan-300 uppercase tracking-wider">
              {paramConfig.label}
            </span>
          )}
        </div>

        {/* Real-time Monospace HUD Telemetry Reader */}
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
          <div className="text-slate-400">
            STAGE: <span className="text-white font-semibold">{activeStage}h</span>
          </div>
          <div className="text-slate-400">
            VALUE:{' '}
            <span className="text-cyan-400 font-bold">
              {activeVal.toFixed(3)} {paramConfig.unit}
            </span>
          </div>
          <div className="text-slate-400 hidden sm:block">
            DELTA:{' '}
            <span
              className={
                deltaFromStart > 0
                  ? 'text-amber-400 font-semibold'
                  : deltaFromStart < 0
                  ? 'text-cyan-400 font-semibold'
                  : 'text-slate-300'
              }
            >
              {deltaFromStart >= 0 ? `+${deltaFromStart}` : deltaFromStart} {paramConfig.unit} ({percentDelta >= 0 ? `+${percentDelta}%` : `${percentDelta}%`})
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[300px] select-none"
          style={{ minWidth: '460px' }}
        >
          <defs>
            <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect
            x={padding.left}
            y={padding.top}
            width={chartW}
            height={chartH}
            fill="url(#gridPattern)"
            className="opacity-40"
          />

          {/* Y-Axis Grid Lines & Ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
            const yVal = minVal + frac * (maxVal - minVal);
            const yPos = getY(yVal);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={padding.left + chartW}
                  y2={yPos}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="2,4"
                />
                <text
                  x={padding.left - 8}
                  y={yPos + 3}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[10px] tabular-nums"
                >
                  {yVal.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* X-Axis Ticks & Stage Guidelines */}
          {stages.map((hour, idx) => {
            const xPos = getX(hour);
            return (
              <g key={idx}>
                <line
                  x1={xPos}
                  y1={padding.top}
                  x2={xPos}
                  y2={padding.top + chartH}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={xPos}
                  y={padding.top + chartH + 18}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono text-[11px] font-semibold"
                >
                  {hour}h
                </text>
              </g>
            );
          })}

          {/* Configured Prototype Threshold Lines */}
          {warningLimit <= maxVal && (
            <g>
              <line
                x1={padding.left}
                y1={getY(warningLimit)}
                x2={padding.left + chartW}
                y2={getY(warningLimit)}
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="4,3"
                className="opacity-80"
              />
              <text
                x={padding.left + chartW - 4}
                y={getY(warningLimit) - 4}
                textAnchor="end"
                className="fill-amber-400 font-mono text-[9px] uppercase tracking-wider"
              >
                Prototype Warning ({warningLimit.toFixed(2)})
              </text>
            </g>
          )}

          {criticalLimit <= maxVal && (
            <g>
              <line
                x1={padding.left}
                y1={getY(criticalLimit)}
                x2={padding.left + chartW}
                y2={getY(criticalLimit)}
                stroke="#f43f5e"
                strokeWidth="1.2"
                strokeDasharray="3,3"
                className="opacity-80"
              />
              <text
                x={padding.left + chartW - 4}
                y={getY(criticalLimit) - 4}
                textAnchor="end"
                className="fill-rose-400 font-mono text-[9px] uppercase tracking-wider"
              >
                Prototype Critical ({criticalLimit.toFixed(2)})
              </text>
            </g>
          )}

          {/* Lot Tolerance Band (Expected Cohort Range) */}
          {showLotBand && (
            <polygon
              points={toleranceBandPoints}
              fill="#06b6d4"
              fillOpacity="0.08"
              stroke="#0891b2"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          )}

          {/* Reference Baseline Nominal Path */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />

          {/* Actual Component Trajectory */}
          <path
            d={actualPath}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stage Data Points & Interactive Touch Anchors */}
          {stages.map((hour, idx) => {
            const xPos = getX(hour);
            const val = values[idx];
            const yPos = getY(val);
            const isHovered = activeStageIndex === idx;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => interactive && setActiveStageIndex(idx)}
                onMouseLeave={() => interactive && setActiveStageIndex(null)}
              >
                {/* Crosshair guide on hover */}
                {isHovered && (
                  <>
                    <line
                      x1={xPos}
                      y1={padding.top}
                      x2={xPos}
                      y2={padding.top + chartH}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1={padding.left}
                      y1={yPos}
                      x2={padding.left + chartW}
                      y2={yPos}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </>
                )}

                {/* Halo */}
                <circle
                  cx={xPos}
                  cy={yPos}
                  r={isHovered ? 8 : 5}
                  fill="#06b6d4"
                  fillOpacity={isHovered ? 0.35 : 0.2}
                />
                {/* Core dot */}
                <circle
                  cx={xPos}
                  cy={yPos}
                  r={3.5}
                  fill={isHovered ? '#ffffff' : '#22d3ee'}
                  stroke="#083344"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Calibration Footnote */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
            <span>Actual Component {componentId ? `(${componentId})` : ''}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-3 h-0.5 bg-slate-500 border-t border-dashed border-slate-300 inline-block" />
            <span>Lot Baseline Nominal</span>
          </div>
          {showLotBand && (
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-3 h-2 bg-cyan-500/20 border border-cyan-500/40 inline-block rounded-xs" />
              <span>Lot Reference Band (±1.5σ)</span>
            </div>
          )}
        </div>

        <div className="font-mono text-[10px] text-slate-500 italic">
          * Warning/Critical boundaries represent configured prototype thresholds.
        </div>
      </div>
    </div>
  );
};
