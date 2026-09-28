import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { DataQualityReport } from '../../types';
import { DataQualityGauge } from '../../components/common/DataQualityGauge';

interface DataQualityProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const DataQuality: React.FC<DataQualityProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [report, setReport] = useState<DataQualityReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDataQualityReport().then((r) => {
      setReport(r);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !report) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
        Computing Data Quality metrics across multi-stage telemetry...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Pre-Screening Hygiene Audit</span>
            <span aria-hidden="true">·</span>
            <span>448 Stage Records Evaluated</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Data Quality Index (DQI)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Proposed DriftGuard application metric evaluating completeness, validity, consistency, and continuity.
          </p>
        </div>

        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-[11px] font-mono text-slate-400">
          <strong className="text-cyan-400">Notice:</strong> DQI is an internal prototype metric, not an official aerospace regulatory standard.
        </div>
      </div>

      {/* Main Score & 4 Dimension Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gauge Card */}
        <div className="lg:col-span-4 p-6 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Overall Data Quality Index
          </div>
          <DataQualityGauge score={report.overallScore} size="lg" showDetails={false} />
          <div className="text-center text-xs text-slate-300">
            Weighted composite across 112 components and 5 wafer lots.
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 gap-4">
          {/* Completeness */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">1. Completeness</span>
              <span className="text-emerald-400 font-bold tabular-nums">{report.completeness}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${report.completeness}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Verifies all required burn-in intervals (0h, 24h, 96h, 168h) are present with no unrecorded sockets.
            </p>
          </div>

          {/* Validity */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">2. Validity</span>
              <span className="text-emerald-400 font-bold tabular-nums">{report.validity}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${report.validity}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Checks readings against physical bounds (e.g. thermal chamber stability at 125°C ±2°C and Vdd 3.30V).
            </p>
          </div>

          {/* Consistency */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">3. Consistency</span>
              <span className="text-cyan-400 font-bold tabular-nums">{report.consistency}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${report.consistency}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Audits monotonically increasing test timestamps and eliminates duplicate socket recordings.
            </p>
          </div>

          {/* Continuity */}
          <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">4. Continuity</span>
              <span className="text-cyan-400 font-bold tabular-nums">{report.continuity}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${report.continuity}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Identifies socket acquisition retries or irregular test hour delta intervals.
            </p>
          </div>
        </div>
      </div>

      {/* Ideal vs Yours Stage Gap Comparison */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white font-mono tracking-tight uppercase">
          Ideal Protocol vs. Ingested Dataset Telemetry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <div className="text-cyan-400 font-bold mb-1">0h Initial Characterization</div>
            <div className="text-slate-300">Expected: 112 units</div>
            <div className="text-emerald-400">Recorded: 112 (100% matched)</div>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <div className="text-cyan-400 font-bold mb-1">24h Early Soak Check</div>
            <div className="text-slate-300">Expected: 112 units</div>
            <div className="text-emerald-400">Recorded: 112 (100% matched)</div>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-amber-800/60">
            <div className="text-amber-400 font-bold mb-1">96h Mid-Point Interim</div>
            <div className="text-slate-300">Expected: 112 units</div>
            <div className="text-amber-300">Recorded: 111 (1 retry gap in CMP-1033)</div>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <div className="text-cyan-400 font-bold mb-1">168h Qualification EOT</div>
            <div className="text-slate-300">Expected: 112 units</div>
            <div className="text-emerald-400">Recorded: 112 (100% matched)</div>
          </div>
        </div>
      </div>

      {/* Isolated Data Quality Issues Table */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-mono tracking-tight uppercase">
            Isolated Telemetry Hygiene Flags ({report.issues.length})
          </h2>
          <span className="text-xs font-mono text-slate-400">Components isolated for review</span>
        </div>

        <div className="divide-y divide-slate-800 border border-slate-800 rounded overflow-hidden">
          {report.issues.map((issue, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-white">{issue.componentId}</span>
                    <span className="text-slate-400">({issue.lotId})</span>
                    <span className="text-cyan-400">Stage: {issue.stage}</span>
                  </div>
                  <p className="text-slate-300 mt-0.5 font-sans">{issue.issueType}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectComponent(issue.componentId);
                  onNavigateTab('component-detail');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 hover:text-white bg-slate-900 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                <span>Inspect Device</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
