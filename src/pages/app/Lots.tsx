import React, { useState, useEffect } from 'react';
import { Boxes, ArrowRight, RefreshCw, BarChart2, ShieldCheck, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { LotData, ComponentData } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';

interface LotsProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Lots: React.FC<LotsProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [lots, setLots] = useState<LotData[]>([]);
  const [selectedLotId, setSelectedLotId] = useState<string>('LOT-A23');
  const [lotComponents, setLotComponents] = useState<ComponentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = async () => {
    setIsLoading(true);
    const data = await api.getLots();
    setLots(data);
    const { components } = await api.getLotById('LOT-A23');
    setLotComponents(components);
    setIsLoading(false);
  };

  const handleSelectLot = async (lotId: string) => {
    setSelectedLotId(lotId);
    const { components } = await api.getLotById(lotId);
    setLotComponents(components);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
        Loading wafer lots from demonstration state...
      </div>
    );
  }

  const activeLot = lots.find((l) => l.id === selectedLotId) || lots[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Cohort Dispersion & Wafer Health</span>
            <span aria-hidden="true">·</span>
            <span>5 Lots / 112 Units</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Wafer Lot Screening Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluate cohort statistical dispersion, wafer-level drift distributions, and out-of-family dice clusters.
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Selected Lot: <span className="text-cyan-400 font-bold">{selectedLotId}</span>
        </div>
      </div>

      {/* Lot Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {lots.map((lot) => {
          const isSelected = lot.id === selectedLotId;
          return (
            <button
              key={lot.id}
              onClick={() => handleSelectLot(lot.id)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                  : 'bg-[#0c1322] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className={`font-bold text-xs ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                  {lot.id}
                </span>
                <span className="text-[10px] text-slate-400">{lot.componentCount} Units</span>
              </div>
              <div className="text-[11px] text-slate-300 line-clamp-1 mb-2">
                {lot.name.replace(/\(.*?\)/g, '')}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-slate-800/80">
                <span className="text-slate-400">Risk: {lot.avgRisk}/100</span>
                <span
                  className={
                    lot.healthStatus === 'HEALTHY'
                      ? 'text-emerald-400'
                      : lot.healthStatus === 'DEVIATION_DETECTED'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  {lot.healthStatus === 'HEALTHY' ? 'NOMINAL' : 'FLAGGED'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Lot Deep Dive Banner */}
      {activeLot && (
        <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-mono">{activeLot.id}</h2>
                <span className="text-sm text-slate-300">— {activeLot.name}</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Wafer Fab Batch: <span className="text-slate-200">{activeLot.waferBatch}</span> · Primary Issue Profile: <span className="text-amber-300">{activeLot.dominantIssue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">DQI: </span>
                <span className="text-emerald-400 font-bold">{activeLot.avgDataQuality}%</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Avg Drift: </span>
                <span className="text-cyan-400 font-bold">{activeLot.avgDrift} µA/h</span>
              </div>
            </div>
          </div>

          {/* Screening Distribution in this Lot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded flex justify-between items-center">
              <span className="text-emerald-300">PASS RECOMMENDATION</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">
                {activeLot.passedCount} ({Math.round((activeLot.passedCount / activeLot.componentCount) * 100)}%)
              </span>
            </div>
            <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded flex justify-between items-center">
              <span className="text-amber-300">REVIEW RECOMMENDATION</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">
                {activeLot.reviewCount} ({Math.round((activeLot.reviewCount / activeLot.componentCount) * 100)}%)
              </span>
            </div>
            <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded flex justify-between items-center">
              <span className="text-rose-300">REJECT RECOMMENDATION</span>
              <span className="text-base font-bold text-rose-400 tabular-nums">
                {activeLot.rejectedCount} ({Math.round((activeLot.rejectedCount / activeLot.componentCount) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Components in Active Lot Table */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Components in {selectedLotId} ({lotComponents.length} Devices)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Click component to view full telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Device ID</th>
                <th className="py-2.5 px-3">Part Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Drift Slope</th>
                <th className="py-2.5 px-3">168h Value</th>
                <th className="py-2.5 px-3">Anomaly</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {lotComponents.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => {
                    onSelectComponent(c.id);
                    onNavigateTab('component-detail');
                  }}
                  className={`hover:bg-slate-900/80 cursor-pointer transition-colors ${
                    c.id === 'CMP-1048' ? 'bg-amber-950/20 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 text-white font-bold flex items-center gap-1.5">
                    {c.id === 'CMP-1048' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    <span>{c.id}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{c.partType}</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-2.5 px-3">
                    <RiskBadge score={c.riskScore} band={c.riskBand} size="sm" />
                  </td>
                  <td className="py-2.5 px-3 tabular-nums">
                    <span className={c.driftSlope > 0.075 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                      {c.driftSlope > 0 ? `+${c.driftSlope}` : c.driftSlope} µA/h
                    </span>
                  </td>
                  <td className="py-2.5 px-3 tabular-nums text-slate-200">
                    {c.predicted168hValue.toFixed(2)} µA
                  </td>
                  <td className="py-2.5 px-3 tabular-nums text-slate-400">
                    {c.anomalyScore.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
