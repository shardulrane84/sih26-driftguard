import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders,
  FileText,
} from 'lucide-react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TelemetryChart } from '../../components/common/TelemetryChart';
import { DataQualityGauge } from '../../components/common/DataQualityGauge';
import { ComponentData, LotData, AlertItem, ParameterName } from '../../types';

interface OverviewProps {
  onSelectComponent: (componentId: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [lots, setLots] = useState<LotData[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [flaggedComponent, setFlaggedComponent] = useState<ComponentData | null>(null);
  const [selectedParam, setSelectedParam] = useState<ParameterName>('iddq');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const m = await api.getOverviewMetrics();
    const l = await api.getLots();
    const a = await api.getAlerts({ severity: 'ALL', status: 'ACTIVE' });
    const comp1048 = await api.getComponentById('CMP-1048');

    setMetrics(m);
    setLots(l);
    setAlerts(a.slice(0, 5));
    setFlaggedComponent(comp1048 || null);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading || !metrics) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
        Acquiring screening telemetry from demo state...
      </div>
    );
  }

  // Calculate recommendation ratios for pie representation
  const total = metrics.totalScreened || 1;
  const passPercent = Math.round((metrics.passed / total) * 100);
  const reviewPercent = Math.round((metrics.requiringReview / total) * 100);
  const rejectPercent = Math.round((metrics.rejected / total) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Header / Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Burn-in Telemetry Analysis</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Station #4 Active</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Screening Intelligence Console
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor burn-in behaviour, detect anomalies, predict progressive component drift, and support screening dispositions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded hover:border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh State</span>
          </button>
          <button
            onClick={() => onNavigateTab('reports')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Components Screened</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
            {metrics.totalScreened}
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between">
            <span>5 Active Lots Ingested</span>
            <span className="text-emerald-400">100% Parsed</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-lg bg-[#0c1322] border border-amber-900/40 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Requiring Review</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 tabular-nums">
            {metrics.requiringReview}
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Decision support: Engineering inspection advised
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-lg bg-[#0c1322] border border-rose-900/40 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-rose-400">
            <span>Critical Alerts</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
            {metrics.criticalAlerts}
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Surge / rapid slope violations detected
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Data Quality Index</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
            {metrics.dataQualityIndex}%
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Proposed DriftGuard application metric
          </div>
        </div>
      </div>

      {/* 3. Walkthrough Highlight Card: The Primary Evaluator Anchor (CMP-1048) */}
      {flaggedComponent && (
        <div className="p-5 rounded-lg bg-gradient-to-r from-[#0c1629] via-[#0e1c36] to-[#0c1629] border border-cyan-500/50 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    SIH'26 Walkthrough Highlight
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 border border-slate-700 px-1.5 rounded">
                    DEMO DATA
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Flagged Device: {flaggedComponent.id} (Lot {flaggedComponent.lotId})
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={flaggedComponent.status} />
              <RiskBadge score={flaggedComponent.riskScore} band={flaggedComponent.riskBand} />
              <button
                onClick={() => onSelectComponent(flaggedComponent.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
              >
                <span>Inspect Device Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Observed Telemetry Behaviour:</span>
              <p className="text-slate-200 font-sans leading-relaxed">
                Monotonic Iddq upward drift from 12.35 µA (0h) to 28.65 µA (168h). Drift slope of 0.098 µA/h breaches prototype threshold (0.075 µA/h).
              </p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Lot Alpha-23 Baseline Comparison:</span>
              <p className="text-slate-200 font-sans leading-relaxed">
                Diverges +3.82 standard deviations above lot cohort median. Peripheral dice position indicates potential silicon edge stress.
              </p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Decision Support Disposition:</span>
              <p className="text-amber-300 font-sans leading-relaxed">
                REVIEW recommended. Device requires benchtop parametric re-test or secondary physical cross-section prior to flight packaging.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Telemetry Trajectory Stage & Screening Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Telemetry Chart */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Burn-in Health & Parameter Trajectory
              </h2>
              <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-1.5 rounded">
                Configured prototype threshold
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              Active Device: {flaggedComponent?.id || 'CMP-1048'}
            </span>
          </div>

          {flaggedComponent && (
            <TelemetryChart
              measurements={flaggedComponent.measurements}
              selectedParam={selectedParam}
              onParamChange={(p) => setSelectedParam(p)}
              componentId={flaggedComponent.id}
            />
          )}
        </div>

        {/* Right: Screening Recommendation Distribution & DQI */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recommendation Breakdown Card */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold uppercase">Screening Dispositions</span>
              <span className="text-slate-500">112 Units</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-emerald-400 font-semibold">PASS (Nominal Conformance)</span>
                  <span className="text-white tabular-nums">{metrics.passed} ({passPercent}%)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: `${passPercent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-amber-400 font-semibold">REVIEW (Engineering Review)</span>
                  <span className="text-white tabular-nums">{metrics.requiringReview} ({reviewPercent}%)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: `${reviewPercent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-rose-400 font-semibold">REJECT (Exceeds Prototype Limits)</span>
                  <span className="text-white tabular-nums">{metrics.rejected} ({rejectPercent}%)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full" style={{ width: `${rejectPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[10px] font-mono text-slate-400 leading-relaxed">
              * Recommendations are calculated from synthetic demo data to assist qualified engineering judgement. Never flight certifications.
            </div>
          </div>

          {/* Data Quality Gauge Card */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold uppercase">Multi-Lot Data Hygiene</span>
              <button
                onClick={() => onNavigateTab('data-quality')}
                className="text-cyan-400 hover:text-cyan-300 text-[11px]"
              >
                Inspect DQI →
              </button>
            </div>
            <DataQualityGauge score={metrics.dataQualityIndex} size="md" />
          </div>
        </div>
      </div>

      {/* 5. Lot Health Cards & Active Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lot Health Summary */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Demonstration Lot Health Breakdown
            </h2>
            <button
              onClick={() => onNavigateTab('lots')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
            >
              View All 5 Lots →
            </button>
          </div>

          <div className="space-y-2.5">
            {lots.map((lot) => (
              <div
                key={lot.id}
                onClick={() => onNavigateTab('lots')}
                className="p-3 rounded-lg bg-[#0c1322] border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{lot.id}</span>
                    <span className="text-slate-400">{lot.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Wafer: {lot.waferBatch} · Units: {lot.componentCount} · Avg Drift: {lot.avgDrift}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right font-mono text-[11px]">
                    <div className="text-slate-300">
                      <span className="text-emerald-400">{lot.passedCount}P</span> ·{' '}
                      <span className="text-amber-400">{lot.reviewCount}R</span> ·{' '}
                      <span className="text-rose-400">{lot.rejectedCount}X</span>
                    </div>
                    <div className="text-slate-500">Risk: {lot.avgRisk}/100</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                      lot.healthStatus === 'HEALTHY'
                        ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                        : lot.healthStatus === 'DEVIATION_DETECTED'
                        ? 'bg-amber-950 border-amber-800 text-amber-400'
                        : 'bg-rose-950 border-rose-800 text-rose-400'
                    }`}
                  >
                    {lot.healthStatus === 'HEALTHY' ? 'NOMINAL' : lot.healthStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Telemetry Alerts */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Active Screening Alerts
            </h2>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
            >
              Alert Dashboard →
            </button>
          </div>

          <div className="space-y-2.5">
            {alerts.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  onSelectComponent(a.componentId);
                  onNavigateTab('component-detail');
                }}
                className="p-3 rounded-lg bg-[#0c1322] border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        a.severity === 'CRITICAL' ? 'bg-rose-400' : a.severity === 'HIGH' ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                    />
                    <span className="font-mono font-bold text-white">{a.componentId}</span>
                    <span className="text-slate-400 font-mono text-[11px]">({a.lotId})</span>
                  </div>
                  <RiskBadge score={a.riskScore} size="sm" />
                </div>
                <p className="text-slate-300 text-xs font-sans leading-relaxed line-clamp-1">
                  {a.details}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>PARAMETER: {a.parameter}</span>
                  <span>{a.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
