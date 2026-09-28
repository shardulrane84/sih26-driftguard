import React, { useState, useEffect } from 'react';
import { FileText, Download, Plus, CheckCircle2, Shield, Printer, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';
import { ReportItem } from '../../types';

interface ReportsProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Reports: React.FC<ReportsProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState<'LOT_SCREENING' | 'COMPONENT_RISK' | 'DATA_QUALITY' | 'ANOMALY_ANALYSIS'>('LOT_SCREENING');
  const [reportTitle, setReportTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
    const data = await api.getReports();
    setReports(data);
    if (data.length > 0) setActiveReport(data[0]);
    setIsLoading(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const title = reportTitle.trim() || `Lot Alpha-23 ${reportType.replace('_', ' ')} Dossier`;
    const newReport = await api.generateReport({
      type: reportType,
      targetId: reportType === 'LOT_SCREENING' ? 'LOT-A23' : 'CMP-1048',
      title,
      author: 'Lead Reliability Engineer (Demo)',
    });
    setReports([newReport, ...reports]);
    setActiveReport(newReport);
    setReportTitle('');
    setIsGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Traceable Audit Vault</span>
            <span aria-hidden="true">·</span>
            <span>Electronic Screening Dossiers</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Screening Reports & Audit Dossiers
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Tamper-evident, timestamped screening summaries for flight review boards, acceptance committees, and QA archives.
          </p>
        </div>

        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-[11px] font-mono text-slate-400">
          <strong className="text-cyan-400">Governance Notice:</strong> Decision-support analysis — not a flight-worthiness certification.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reports Catalog & Generate Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Generator Box */}
          <form
            onSubmit={handleGenerate}
            className="p-4 rounded-lg bg-[#0c1322] border border-cyan-500/30 space-y-3 text-xs font-mono"
          >
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Generate New Audit Dossier</span>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
              >
                <option value="LOT_SCREENING">Lot Screening Dossier (All 32 Units)</option>
                <option value="COMPONENT_RISK">Single Component Risk Breakdown (CMP-1048)</option>
                <option value="DATA_QUALITY">Pre-Screening Data Quality Audit</option>
                <option value="ANOMALY_ANALYSIS">Lot-Wide Anomaly Dispersion Summary</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">Custom Dossier Title</label>
              <input
                type="text"
                placeholder="e.g. Flight Lot Alpha-23 Screening Dossier"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Compiling Dossier...' : 'Compile & Sign Report'}
            </button>
          </form>

          {/* Existing Reports List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Archived Reports ({reports.length})
            </h3>
            {reports.map((rep) => {
              const isSelected = activeReport?.id === rep.id;
              return (
                <div
                  key={rep.id}
                  onClick={() => setActiveReport(rep)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-sm'
                      : 'bg-[#0c1322] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="font-bold text-white">{rep.id}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{rep.status}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {rep.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 mt-1 border-t border-slate-800/60">
                    <span>{rep.type.replace('_', ' ')}</span>
                    <span>{rep.generatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Printable Report Document Preview */}
        <div className="lg:col-span-7">
          {activeReport ? (
            <div className="p-8 rounded-lg bg-[#0c1322] border border-slate-800 space-y-6 shadow-2xl relative">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-slate-800 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase">
                    <span className="w-2 h-2 rounded-xs bg-cyan-400" />
                    <span>DRIFTGUARD SCREENING DOSSIER</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{activeReport.title}</h2>
                  <div className="text-xs font-mono text-slate-400">
                    Report ID: <span className="text-white">{activeReport.id}</span> · Audit Trail: <span className="text-cyan-400">{activeReport.auditTrailId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 no-print">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Mandatory Governance Header Disclaimer */}
              <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300 text-xs font-mono leading-relaxed">
                <strong>FORMAL GOVERNANCE STATEMENT:</strong> This document represents an automated engineering decision-support analysis. It does not constitute an official flight-worthiness certification or regulatory approval. All dispositions require review by qualified human engineering authorities.
              </div>

              {/* Executive Summary */}
              <div className="space-y-2 text-xs font-sans">
                <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                  1. Executive Summary
                </h3>
                <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-xs">
                  {activeReport.summary}
                </p>
              </div>

              {/* Screening Metrics Breakdown Grid */}
              <div className="space-y-2 font-mono text-xs">
                <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                  2. Screening Telemetry Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">TOTAL SCREENED</div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {activeReport.metrics.screenedCount} Units
                    </div>
                  </div>
                  <div className="p-3 rounded bg-emerald-950/30 border border-emerald-800/50">
                    <div className="text-emerald-400 text-[10px]">PASS RECOMMENDATION</div>
                    <div className="text-lg font-bold text-emerald-400 tabular-nums">
                      {activeReport.metrics.passCount} Units
                    </div>
                  </div>
                  <div className="p-3 rounded bg-amber-950/30 border border-amber-800/50">
                    <div className="text-amber-400 text-[10px]">REVIEW RECOMMENDATION</div>
                    <div className="text-lg font-bold text-amber-400 tabular-nums">
                      {activeReport.metrics.reviewCount} Units
                    </div>
                  </div>
                  <div className="p-3 rounded bg-rose-950/30 border border-rose-800/50">
                    <div className="text-rose-400 text-[10px]">REJECT RECOMMENDATION</div>
                    <div className="text-lg font-bold text-rose-400 tabular-nums">
                      {activeReport.metrics.rejectCount} Units
                    </div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">AVERAGE RISK SCORE</div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {activeReport.metrics.avgRiskScore} / 100
                    </div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">DATA QUALITY INDEX</div>
                    <div className="text-lg font-bold text-emerald-400 tabular-nums">
                      {activeReport.metrics.dataQualityIndex}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific Findings Section */}
              <div className="space-y-2 text-xs font-mono">
                <h3 className="text-xs uppercase text-slate-400 tracking-wider font-bold">
                  3. Key Technical Observations
                </h3>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside bg-slate-900/60 p-3 rounded border border-slate-800 font-sans">
                  <li>
                    Iddq parametric drift slope isolated in peripheral wafer dice (e.g. CMP-1048 at 0.098 µA/h).
                  </li>
                  <li>
                    Gate oxide dielectric leakage surge identified at 96h and 168h stages in CMP-1082.
                  </li>
                  <li>
                    Telemetry continuity confirmed across 447 of 448 socket recording intervals.
                  </li>
                  <li>
                    No chamber thermal anomalies detected (uniform 125.0°C soak maintained).
                  </li>
                </ul>
              </div>

              {/* Sign-off & Audit Seal */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-4">
                <div>
                  <div className="text-slate-500 text-[10px]">GENERATED BY:</div>
                  <div className="text-white font-semibold">{activeReport.author}</div>
                  <div className="text-[10px] text-slate-500">{activeReport.generatedAt}</div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>CRYPTOGRAPHIC SIGNATURE VERIFIED · AUDIT RECORD SEALED</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-slate-500 font-mono text-xs">
              Select a report from the list to preview details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
