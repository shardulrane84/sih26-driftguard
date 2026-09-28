import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Database, Layers } from 'lucide-react';
import { PIPELINE_STAGES, PipelineVisual } from '../../components/common/PipelineVisual';

interface ProductProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Product: React.FC<ProductProps> = ({ onNavigate, onLaunchDemo }) => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const extendedStageDetails = [
    {
      title: 'Stage 1: Raw Burn-in Data Ingestion',
      subtitle: 'Multi-hour time-series acquisition from ATE sockets',
      content:
        'Telemetry records captured at discrete burn-in stages (0h, 24h, 96h, 168h) are ingested into the platform. DriftGuard supports standardized CSV test bench exports containing component IDs, wafer lot identifiers, test intervals, and parametric measurements including Iddq, Leakage Current, Propagation Delay, Junction Temperature, and Supply Voltage.',
      technicalSpec: 'Supports batch sizes up to 10,000 devices per wafer lot with nanosecond/microamp floating-point precision.',
    },
    {
      title: 'Stage 2: Data Validation & Data Quality Index (DQI)',
      subtitle: 'Rigorous pre-flight hygiene checks before ML inference',
      content:
        'Calculates the proposed DriftGuard Data Quality Index across four key dimensions: Completeness (verifying all expected 0h-168h test stages exist), Validity (flagging readings outside physical physics-of-failure bounds), Consistency (identifying socket timestamp anomalies), and Continuity (detecting test bench acquisition dropouts).',
      technicalSpec: 'Outputs component and lot-level DQI scores (0–100%). Any device with missing critical intervals is isolated.',
    },
    {
      title: 'Stage 3: Statistical Feature Engineering',
      subtitle: 'Derivation of rate-of-change, delta shifts, and cohort dispersion',
      content:
        'Extracts dynamic trajectory vectors including Delta_24h, Delta_96h, and Delta_168h. Computes linear and non-linear parameter drift slopes, lot-level medians, and Median Absolute Deviation (MAD) to establish robust non-parametric baselines unaffected by extreme socket anomalies.',
      technicalSpec: 'Calculates robust Z-scores: Z_mad = 0.6745 * (x - median) / MAD for every measured electrical parameter.',
    },
    {
      title: 'Stage 4: Multi-Model Anomaly Detection',
      subtitle: 'Isolation Forest and Robust Z-score ensemble',
      content:
        'Identifies multi-dimensional parametric outliers that deviate from the cohort baseline. The ensemble combines tree-based spatial isolation (Isolation Forest) with robust statistical distance metrics, capturing both single-parameter spikes and subtle multi-parameter multivariate coupling.',
      technicalSpec: 'Produces a continuous Anomaly Score normalized from 0.00 (conforming) to 1.00 (extreme multivariate outlier).',
    },
    {
      title: 'Stage 5: Predictive Drift Regression',
      subtitle: 'Projecting 168h and end-of-life parameter degradation',
      content:
        'Using early burn-in intervals (0h, 24h, 96h), gradient boosted regression models project the terminal 168h parameter value. The algorithm detects accelerated wear-out trajectories that may not yet have breached static test limits during early test hours.',
      technicalSpec: 'XGBoost regression architecture trained on degradation dynamics with explicit trajectory curvature derivation.',
    },
    {
      title: 'Stage 6: Multi-Factor Risk Scoring',
      subtitle: 'Transparent, calibrated composite index (0–100)',
      content:
        'Synthesizes anomaly scores, drift slope excess, lot deviation, and telemetry continuity into a single auditable score. Configurable prototype weights assign 40% to drift slope, 35% to anomaly score, and 25% to lot baseline deviation.',
      technicalSpec: 'Risk Bands: LOW (0–30), MEDIUM (31–60), HIGH (61–80), CRITICAL (81–100). All weights are user-configurable.',
    },
    {
      title: 'Stage 7: Dynamic Explainability Engine',
      subtitle: 'Natural language and feature contribution rationale',
      content:
        'Translates complex mathematical feature vectors into plain, actionable engineering explanations. Quantifies the percentage contribution of drift slope, lot baseline deviation, and temperature stability to the overall risk disposition.',
      technicalSpec: 'Model feature attribution with explicit disclaimer: describes model behavior rather than claiming causal certainty.',
    },
    {
      title: 'Stage 8: Decision-Support Recommendation',
      subtitle: 'Structured screening disposition for engineering review boards',
      content:
        'Generates an actionable recommendation: PASS (nominal stability), REVIEW (borderline drift or lot anomaly requiring physical inspection), or REJECT (severe parametric excursion exceeding configured prototype tolerances). Accompanied by full audit history.',
      technicalSpec: 'Always positioned as decision support to assist qualified engineering judgement; never as flight certification.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400">
            <span>Product Architecture</span>
            <span aria-hidden="true">·</span>
            <span>How DriftGuard Works</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The 8-Stage Screening Intelligence Pipeline
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore how DriftGuard ingests raw automated test equipment burn-in data and systematically transforms it into explainable screening recommendations.
          </p>
        </div>

        {/* Visual Pipeline Navigator */}
        <PipelineVisual
          interactive={true}
          activeStage={selectedStage}
          onSelectStage={(idx) => setSelectedStage(idx)}
        />

        {/* Detailed 8-Stage Deep Dive Accordion / Cards */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              In-Depth Stage Specifications
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Click stage to expand details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extendedStageDetails.map((stage, idx) => {
              const isSelected = selectedStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedStage(idx)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0f172a] border-cyan-400/80 shadow-lg shadow-cyan-950/30'
                      : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-700 text-cyan-300 px-2 py-0.5 rounded">
                        Active View
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{stage.title}</h3>
                  <div className="text-xs font-mono text-slate-400 mb-2">{stage.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{stage.content}</p>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                    <span className="text-slate-400">SPEC: </span>
                    {stage.technicalSpec}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Callout to Engineering Application */}
        <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">See the Pipeline in Action</h3>
            <p className="text-xs text-slate-400 mt-1">
              Launch the SIH'26 demo environment with 112 pre-loaded components undergoing dynamic burn-in screening.
            </p>
          </div>
          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded whitespace-nowrap transition-colors"
          >
            <span>Launch Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
