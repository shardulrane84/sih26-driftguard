import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, RefreshCw, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { AlertItem } from '../../types';
import { RiskBadge } from '../../components/common/RiskBadge';

interface AlertsProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Alerts: React.FC<AlertsProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, [severityFilter, statusFilter]);

  const loadAlerts = async () => {
    setIsLoading(true);
    const data = await api.getAlerts({
      severity: severityFilter,
      status: statusFilter,
    });
    setAlerts(data);
    setIsLoading(false);
  };

  const handleAcknowledge = async (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    await api.updateAlertStatus(alertId, 'ACKNOWLEDGED');
    loadAlerts();
  };

  const handleResolve = async (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    await api.updateAlertStatus(alertId, 'RESOLVED');
    loadAlerts();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Automated Drift & Anomaly Alarms</span>
            <span aria-hidden="true">·</span>
            <span>Real-time Telemetry Monitor</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Screening Alerts & Anomaly Feed
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time notifications triggered when components exceed configured prototype drift slopes, lot baseline deviations, or data continuity thresholds.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Active Alerts: <span className="text-rose-400 font-bold">{alerts.filter(a => a.status === 'ACTIVE').length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">CRITICAL (Surges & Hard Faults)</option>
            <option value="HIGH">HIGH (Steep Monotonic Drift)</option>
            <option value="MEDIUM">MEDIUM (Moderate Lot Deviation)</option>
            <option value="LOW">LOW (Mild Variance)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE Alarms</option>
            <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSeverityFilter('ALL');
            setStatusFilter('ALL');
          }}
          className="text-slate-400 hover:text-white"
        >
          Reset Filters
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center text-slate-400 font-mono text-xs">
            <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
            Loading active alarms...
          </div>
        ) : alerts.length === 0 ? (
          <div className="p-8 text-center bg-[#0c1322] border border-slate-800 rounded-lg text-slate-400 font-mono text-xs">
            No alarms match the selected filter criteria.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                onSelectComponent(alert.componentId);
                onNavigateTab('component-detail');
              }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'bg-rose-950/20 border-rose-900/60 hover:border-rose-700'
                  : alert.severity === 'HIGH'
                  ? 'bg-amber-950/20 border-amber-900/60 hover:border-amber-700'
                  : 'bg-[#0c1322] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800/80 gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-950 border-rose-800 text-rose-400'
                        : alert.severity === 'HIGH'
                        ? 'bg-amber-950 border-amber-800 text-amber-400'
                        : 'bg-cyan-950 border-cyan-800 text-cyan-400'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-white">{alert.componentId}</span>
                    <span className="text-slate-400">({alert.lotId})</span>
                    <span className="text-cyan-400 font-semibold">{alert.alertType.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RiskBadge score={alert.riskScore} size="sm" />
                  <span className="text-[11px] font-mono text-slate-500">{alert.timestamp}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-slate-200 font-sans leading-relaxed">{alert.details}</p>

                <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                  {alert.status === 'ACTIVE' && (
                    <button
                      onClick={(e) => handleAcknowledge(e, alert.id)}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  {alert.status !== 'RESOLVED' && (
                    <button
                      onClick={(e) => handleResolve(e, alert.id)}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                    >
                      Resolve
                    </button>
                  )}
                  <span className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
