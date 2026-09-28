import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, Cpu, Activity, TrendingUp, AlertTriangle, FileText } from 'lucide-react';

interface StageInfo {
  number: string;
  title: string;
  shortDesc: string;
  icon: any;
  details: {
    input: string;
    processing: string;
    output: string;
    safeguards: string;
  };
}

export const PIPELINE_STAGES: StageInfo[] = [
  {
    number: '01',
    title: 'Raw Burn-in Data',
    shortDesc: 'Ingest time-series measurements across burn-in test intervals.',
    icon: Cpu,
    details: {
      input: 'Time-series telemetry records (0h, 24h, 96h, 168h intervals for Iddq, Leakage, Delay, Temp, Voltage).',
      processing: 'CSV ingestion, schema mapping, unique component ID reconciliation, and timestamp ordering.',
      output: 'Normalized component measurement sequences ready for validation.',
      safeguards: 'Strict data typing; rejects malformed scientific notations or corrupted test equipment exports.',
    },
  },
  {
    number: '02',
    title: 'Data Quality & Validation',
    shortDesc: 'Evaluate completeness, validity, continuity, and consistency.',
    icon: CheckCircle2,
    details: {
      input: 'Raw measurement sequence per device socket.',
      processing: 'Evaluates missing test intervals, checks physical bounds (e.g. thermal soak at 125°C ±3°C), detects duplicate timestamps.',
      output: 'Data Quality Index (DQI) with individual scores for completeness, validity, and continuity.',
      safeguards: 'Components with missing critical stages are flagged for data continuity review rather than silently discarded.',
    },
  },
  {
    number: '03',
    title: 'Feature Engineering',
    shortDesc: 'Derive delta shifts, drift slopes, and cohort baseline distributions.',
    icon: Activity,
    details: {
      input: 'Validated multi-hour parameter measurements across the entire wafer/lot cohort.',
      processing: 'Calculates Delta_24h, Delta_96h, Delta_168h, parameter trajectory slope, lot median, and Median Absolute Deviation (MAD).',
      output: 'High-dimensional feature vector containing rate-of-change, lot deviation, and thermal correlation features.',
      safeguards: 'Uses robust non-parametric estimators (MAD, median) resistant to extreme single-socket outliers.',
    },
  },
  {
    number: '04',
    title: 'Anomaly Detection',
    shortDesc: 'Isolate abnormal electrical behavior relative to lot baseline.',
    icon: AlertTriangle,
    details: {
      input: 'Standardized parametric feature vectors across lot cohort.',
      processing: 'Ensemble anomaly detection combining Robust Z-score scoring and Isolation Forest multi-dimensional tree isolation.',
      output: 'Continuous anomaly score (0.0 to 1.0) and outlier classification.',
      safeguards: 'Prevents false alarms by cross-checking against chamber-wide environmental sensor shifts.',
    },
  },
  {
    number: '05',
    title: 'Drift Prediction',
    shortDesc: 'Model expected parameter evolution toward 168h and beyond.',
    icon: TrendingUp,
    details: {
      input: 'Early stage trajectories (0h, 24h, 96h) and historical degradation profiles.',
      processing: 'Gradient boosted regression (XGBoost prototype model) to project 168h parameter values and trajectory curvature.',
      output: 'Predicted terminal parameter value and trajectory deviation ratio.',
      safeguards: 'Transparent prediction limits; never hallucinates certainty without empirical convergence.',
    },
  },
  {
    number: '06',
    title: 'Risk Scoring',
    shortDesc: 'Synthesize multi-factor risk into a transparent 0–100 scale.',
    icon: ShieldCheck,
    details: {
      input: 'Anomaly score, drift slope excess, predicted boundary proximity, and lot deviation.',
      processing: 'Configurable prototype risk engine weighting drift slope (40%), anomaly score (35%), and lot deviation (25%).',
      output: 'Transparent composite Risk Score (0–100) categorized into LOW, MEDIUM, HIGH, or CRITICAL bands.',
      safeguards: 'All scoring thresholds are explicitly adjustable prototype parameters, not unverified aerospace constants.',
    },
  },
  {
    number: '07',
    title: 'Explainable Screening Recommendation',
    shortDesc: 'Provide clear engineering rationale and decision-support disposition.',
    icon: FileText,
    details: {
      input: 'Component risk profile, dominant feature contributions, and threshold breaches.',
      processing: 'Dynamic rule-based natural language explanation engine linking specific telemetry shifts to screening recommendations.',
      output: 'Decision-support disposition: PASS, REVIEW, or REJECT, accompanied by auditable evidence.',
      safeguards: 'Explicitly labeled as a decision-support recommendation to assist qualified engineering judgement, not flight certification.',
    },
  },
];

interface PipelineVisualProps {
  interactive?: boolean;
  activeStage?: number;
  onSelectStage?: (idx: number) => void;
}

export const PipelineVisual: React.FC<PipelineVisualProps> = ({
  interactive = true,
  activeStage: controlledActive,
  onSelectStage,
}) => {
  const [internalActive, setInternalActive] = useState<number>(0);
  const activeIdx = controlledActive !== undefined ? controlledActive : internalActive;

  const handleSelect = (idx: number) => {
    if (controlledActive === undefined) {
      setInternalActive(idx);
    }
    if (onSelectStage) {
      onSelectStage(idx);
    }
  };

  const currentStage = PIPELINE_STAGES[activeIdx] || PIPELINE_STAGES[0];
  const IconComponent = currentStage.icon;

  return (
    <div className="w-full">
      {/* Horizontal Step Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isSelected = activeIdx === idx;
          const StageIcon = stage.icon;

          return (
            <button
              key={stage.number}
              onClick={() => interactive && handleSelect(idx)}
              className={`text-left p-3 rounded border transition-all duration-200 relative ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono tracking-wider ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                  STAGE {stage.number}
                </span>
                <StageIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>
              <div className={`text-xs font-semibold leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Stage Inspector Card */}
      {interactive && (
        <div className="mt-4 p-5 rounded-lg border border-slate-800 bg-[#0c1322] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  PIPELINE STAGE {currentStage.number}
                </span>
                <h4 className="text-base font-bold text-white">{currentStage.title}</h4>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md">{currentStage.shortDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
            <div className="p-3 rounded bg-slate-900/80 border border-slate-800/60">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Inputs</div>
              <p className="text-slate-200 leading-relaxed">{currentStage.details.input}</p>
            </div>
            <div className="p-3 rounded bg-slate-900/80 border border-slate-800/60">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Processing</div>
              <p className="text-slate-200 leading-relaxed">{currentStage.details.processing}</p>
            </div>
            <div className="p-3 rounded bg-slate-900/80 border border-slate-800/60">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Output</div>
              <p className="text-slate-200 leading-relaxed">{currentStage.details.output}</p>
            </div>
            <div className="p-3 rounded bg-slate-900/80 border border-slate-800/60">
              <div className="text-[10px] font-mono uppercase text-amber-400/90 mb-1">Engineering Safeguards</div>
              <p className="text-slate-300 leading-relaxed">{currentStage.details.safeguards}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
