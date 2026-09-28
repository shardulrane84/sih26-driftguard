import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  FileText,
  Sliders,
  RefreshCw,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { api } from '../../services/api';
import { ComponentData, ParameterName, ScreeningDecision } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TelemetryChart } from '../../components/common/TelemetryChart';

interface ComponentDetailProps {
  componentId: string;
  onBack: () => void;
  onNavigateTab: (tab: any) => void;
}

export const ComponentDetail: React.FC<ComponentDetailProps> = ({
  componentId,
  onBack,
  onNavigateTab,
}) => {
  const [component, setComponent] = useState<ComponentData | null>(null);
  const [selectedParam, setSelectedParam] = useState<ParameterName>('iddq');
  const [notes, setNotes] = useState('');
  const [selectedDecision, setSelectedDecision] = useState<ScreeningDecision>('REVIEW');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComponent();
  }, [componentId]);

  const loadComponent = async () => {
    setIsLoading(true);
    const data = await api.getComponentById(componentId);
    if (data) {
      setComponent(data);
      setSelectedParam(data.primaryParameter);
      setSelectedDecision(data.status);
      setNotes(data.engineerNotes || '');
    }
    setIsLoading(false);
  };

  const handleUpdateDisposition = async () => {
    if (!component) return;
    setIsUpdating(true);
    const updated = await api.updateComponentDecision(
      component.id,
      selectedDecision,
      notes,
      'Lead Reliability Engineer (Demo)'
    );
    setComponent(updated);
    setIsUpdating(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 2000);
  };

  if (isLoading || !component) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
        Acquiring telemetry record for {componentId}...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Navigation Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Device Telemetry Dossier
              </span>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-1.5 rounded">
                DEMO DATA
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 font-mono">
              <span>{component.id}</span>
              <span className="text-slate-400 text-base font-normal">({component.lotId})</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={component.status} showSubtitle={false} size="lg" />
          <RiskBadge score={component.riskScore} band={component.riskBand} size="lg" />
          <button
            onClick={() => onNavigateTab('reports')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 2. Device Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-3 bg-[#0c1322] border border-slate-800 rounded">
          <span className="text-slate-400 block mb-1">Part / Package</span>
          <span className="text-white font-semibold">{component.partType}</span>
          <span className="text-[10px] text-slate-500 block">{component.packageType}</span>
        </div>
        <div className="p-3 bg-[#0c1322] border border-slate-800 rounded">
          <span className="text-slate-400 block mb-1">Drift Slope (Iddq)</span>
          <span className={component.driftSlope > 0.075 ? 'text-amber-400 font-bold' : 'text-white'}>
            {component.driftSlope > 0 ? `+${component.driftSlope}` : component.driftSlope} µA/h
          </span>
          <span className="text-[10px] text-slate-500 block">Limit: 0.075 µA/h</span>
        </div>
        <div className="p-3 bg-[#0c1322] border border-slate-800 rounded">
          <span className="text-slate-400 block mb-1">Predicted 168h Value</span>
          <span className="text-cyan-400 font-bold tabular-nums">
            {component.predicted168hValue.toFixed(2)} µA
          </span>
          <span className="text-[10px] text-slate-500 block">Baseline: {component.baseline168hExpected.toFixed(2)} µA</span>
        </div>
        <div className="p-3 bg-[#0c1322] border border-slate-800 rounded">
          <span className="text-slate-400 block mb-1">Anomaly Score</span>
          <span className="text-white font-bold tabular-nums">
            {component.anomalyScore.toFixed(2)} / 1.00
          </span>
          <span className="text-[10px] text-slate-500 block">Robust Z Ensemble</span>
        </div>
        <div className="p-3 bg-[#0c1322] border border-slate-800 rounded">
          <span className="text-slate-400 block mb-1">Prediction Confidence</span>
          <span className="text-slate-400 italic">Not available</span>
          <span className="text-[10px] text-slate-500 block">* Model without uncertainty</span>
        </div>
      </div>

      {/* 3. Primary Interactive Telemetry Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Burn-in Signal Telemetry (0h → 24h → 96h → 168h)
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Hover points to inspect exact stage readings
          </span>
        </div>
        <TelemetryChart
          measurements={component.measurements}
          selectedParam={selectedParam}
          onParamChange={(p) => setSelectedParam(p)}
          componentId={component.id}
        />
      </div>

      {/* 4. Explainability: Why Was This Component Flagged? */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Why was this component flagged?
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Dynamically synthesized from computed telemetry metrics
          </span>
        </div>

        {/* Dynamic Plain-Language Bullet Points */}
        <div className="space-y-2 text-xs font-sans">
          {component.explanations.map((exp, idx) => (
            <div
              key={idx}
              className="p-3 rounded bg-slate-900/90 border border-slate-800/80 flex items-start gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <p className="text-slate-200 leading-relaxed font-sans">{exp}</p>
            </div>
          ))}
        </div>

        {/* Feature Contribution Breakdown */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Model Feature Contributions
            </h4>
            <span className="text-[10px] font-mono text-slate-500">
              * Describes model behaviour; not scientifically validated causal certainty.
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {component.featureContributions.map((fc, idx) => (
              <div key={idx} className="p-3 bg-slate-900/50 rounded border border-slate-800/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        fc.effect === 'elevates_risk'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : fc.effect === 'reduces_risk'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {fc.effect.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-white">{fc.feature}</span>
                  </div>
                  <span className="text-slate-400 tabular-nums">
                    {(fc.importance * 100).toFixed(0)}% weight
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      fc.effect === 'elevates_risk'
                        ? 'bg-rose-400'
                        : fc.effect === 'reduces_risk'
                        ? 'bg-emerald-400'
                        : 'bg-slate-500'
                    }`}
                    style={{ width: `${fc.importance * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {fc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Engineer Decision-Support Disposition & Review Notes */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Screening Recommendation Disposition
            </h3>
            <p className="text-xs text-slate-400">
              Record engineer disposition and append to immutable audit log.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Last Updated: {component.lastUpdated}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setSelectedDecision('PASS')}
            className={`p-3 rounded border text-left transition-all ${
              selectedDecision === 'PASS'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold mb-1">PASS RECOMMENDATION</div>
            <div className="text-[10px] text-slate-400 font-sans">Nominal screening conformance</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedDecision('REVIEW')}
            className={`p-3 rounded border text-left transition-all ${
              selectedDecision === 'REVIEW'
                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold mb-1">REVIEW RECOMMENDATION</div>
            <div className="text-[10px] text-slate-400 font-sans">Requires secondary engineering review</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedDecision('REJECT')}
            className={`p-3 rounded border text-left transition-all ${
              selectedDecision === 'REJECT'
                ? 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold mb-1">REJECT RECOMMENDATION</div>
            <div className="text-[10px] text-slate-400 font-sans">Exceeds prototype tolerance limits</div>
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300">
            Engineering Disposition Notes & Physics-of-Failure Hypothesis
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record technical rationale for review board (e.g. recommend 240h extended test bench or physical cross-section)..."
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-slate-500">
            * Updates create a timestamped entry in the audit trail.
          </span>
          <button
            onClick={handleUpdateDisposition}
            disabled={isUpdating}
            className="px-5 py-2 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors disabled:opacity-50"
          >
            {updateSuccess ? 'Disposition Saved & Logged!' : isUpdating ? 'Recording...' : 'Save Screening Disposition'}
          </button>
        </div>
      </div>
    </div>
  );
};
