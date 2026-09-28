import React, { useState, useEffect } from 'react';
import { Search, Filter, Cpu, ArrowRight, RefreshCw, Sliders } from 'lucide-react';
import { api } from '../../services/api';
import { ComponentData, ScreeningDecision } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';

interface ComponentsProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Components: React.FC<ComponentsProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLot, setSelectedLot] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedRiskBand, setSelectedRiskBand] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComponents();
  }, [search, selectedLot, selectedStatus, selectedRiskBand]);

  const loadComponents = async () => {
    setIsLoading(true);
    const data = await api.getComponents({
      lotId: selectedLot,
      status: selectedStatus as any,
      riskBand: selectedRiskBand,
      search,
    });
    setComponents(data);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Component Registry</span>
            <span aria-hidden="true">·</span>
            <span>Individual Telemetry & Screening Dispositions</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Component Screening Registry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter, search, and isolate devices across all 5 wafer lots undergoing burn-in testing.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{components.length}</span> devices
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Device ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs w-48"
            />
          </div>

          {/* Lot Filter */}
          <select
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Lots (5 Lots)</option>
            <option value="LOT-A23">Lot Alpha-23 (Rad-Hard FPGA)</option>
            <option value="LOT-B17">Lot Bravo-17 (ASIC Buffer)</option>
            <option value="LOT-C09">Lot Charlie-09 (PMIC)</option>
            <option value="LOT-D44">Lot Delta-44 (Telemetry ADC)</option>
            <option value="LOT-E51">Lot Echo-51 (Golden Batch)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Dispositions</option>
            <option value="PASS">PASS (Nominal)</option>
            <option value="REVIEW">REVIEW (Recommended)</option>
            <option value="REJECT">REJECT (Outlier)</option>
          </select>

          {/* Risk Band Filter */}
          <select
            value={selectedRiskBand}
            onChange={(e) => setSelectedRiskBand(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Risk Bands</option>
            <option value="LOW">LOW Risk (0-30)</option>
            <option value="MEDIUM">MEDIUM Risk (31-60)</option>
            <option value="HIGH">HIGH Risk (61-80)</option>
            <option value="CRITICAL">CRITICAL Risk (81-100)</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearch('');
            setSelectedLot('ALL');
            setSelectedStatus('ALL');
            setSelectedRiskBand('ALL');
          }}
          className="text-slate-400 hover:text-white"
        >
          Reset Filters
        </button>
      </div>

      {/* Components Table */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center text-slate-400 font-mono text-xs">
            <RefreshCw className="w-5 h-5 animate-spin mr-2 text-cyan-400" />
            Filtering registry records...
          </div>
        ) : components.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-mono text-xs">
            No components match the active filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Component ID</th>
                  <th className="py-2.5 px-3">Lot ID</th>
                  <th className="py-2.5 px-3">Part Type</th>
                  <th className="py-2.5 px-3">Recommendation</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Primary Parameter</th>
                  <th className="py-2.5 px-3">Drift Slope</th>
                  <th className="py-2.5 px-3">168h Value</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {components.map((c) => (
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
                    <td className="py-2.5 px-3 text-slate-400">{c.lotId}</td>
                    <td className="py-2.5 px-3 text-slate-300">{c.partType}</td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-3">
                      <RiskBadge score={c.riskScore} band={c.riskBand} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 uppercase">
                      {c.primaryParameter}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums">
                      <span className={c.driftSlope > 0.075 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {c.driftSlope > 0 ? `+${c.driftSlope}` : c.driftSlope}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-slate-200">
                      {c.predicted168hValue.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
