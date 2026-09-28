import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  CheckCircle2,
  Boxes,
  Cpu,
  AlertTriangle,
  FileText,
  Headphones,
  Sliders,
  LogOut,
  ChevronRight,
  Search,
  Bell,
  Activity,
  Layers,
  Shield,
} from 'lucide-react';
import { ThresholdSettingsModal } from '../common/ThresholdSettingsModal';

export type AppTab =
  | 'overview'
  | 'add-data'
  | 'data-quality'
  | 'lots'
  | 'components'
  | 'component-detail'
  | 'alerts'
  | 'reports'
  | 'support';

interface AppLayoutProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onExitDemo: () => void;
  selectedComponentId?: string;
  onSelectComponent: (id: string) => void;
  userRole?: string;
  activeAlertCount?: number;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitDemo,
  selectedComponentId,
  onSelectComponent,
  userRole = 'Lead Reliability Engineer',
  activeAlertCount = 5,
  children,
}) => {
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const navItems: { tab: AppTab; label: string; icon: any; count?: number }[] = [
    { tab: 'overview', label: 'Screening Overview', icon: LayoutDashboard },
    { tab: 'add-data', label: 'Add Burn-in Data', icon: PlusCircle },
    { tab: 'data-quality', label: 'Data Quality (DQI)', icon: CheckCircle2 },
    { tab: 'lots', label: 'Wafer Lots', icon: Boxes },
    { tab: 'components', label: 'Components', icon: Cpu },
    { tab: 'alerts', label: 'Risk Alerts', icon: AlertTriangle, count: activeAlertCount },
    { tab: 'reports', label: 'Dossiers & Reports', icon: FileText },
    { tab: 'support', label: 'Lab Support & QA', icon: Headphones },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toUpperCase().trim();
    if (query.startsWith('CMP-')) {
      onSelectComponent(query);
      onSelectTab('component-detail');
      setSearchQuery('');
    } else {
      onSelectTab('components');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans">
      {/* 1. PERSISTENT SIDEBAR */}
      <aside className="w-64 shrink-0 bg-[#080d19] border-r border-slate-800 flex flex-col justify-between select-none">
        {/* Top: Brand & Demo Mode Pill */}
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs" aria-hidden="true" />
              <span className="font-bold text-base text-white tracking-tight">DRIFTGUARD</span>
            </div>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-bold tracking-wider">
              DEMO MODE
            </div>
          </div>

          {/* Quick Demo Context Badge */}
          <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>SIH'26 | ISRO Context</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab || (item.tab === 'components' && currentTab === 'component-detail');
              const Icon = item.icon;

              return (
                <button
                  key={item.tab}
                  onClick={() => onSelectTab(item.tab)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-all ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 border border-slate-700/80 shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-950 border border-rose-800 text-rose-300 font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Engineering Status, Model Health, Threshold Settings, User */}
        <div className="p-3 border-t border-slate-800 space-y-2 bg-[#060a12]">
          {/* Telemetry Status Widget */}
          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between items-center">
              <span>SYSTEM STATUS:</span>
              <span className="text-emerald-400 font-bold">OPERATIONAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span>MODEL ENGINE:</span>
              <span className="text-cyan-400">XGB + Robust Z</span>
            </div>
            <div className="flex justify-between items-center">
              <span>ACTIVE DATASET:</span>
              <span className="text-slate-300">5 Lots / 112 Units</span>
            </div>
          </div>

          {/* Quick Threshold Configuration Button */}
          <button
            onClick={() => setIsThresholdModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-2.5 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Prototype Thresholds</span>
          </button>

          {/* User Profile & Exit Demo */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-semibold text-white truncate text-[11px]">{userRole}</span>
              <span className="text-[10px] font-mono text-slate-500">Screening Station #4</span>
            </div>
            <button
              onClick={onExitDemo}
              title="Exit Engineering Demo to Public Website"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Instrumentation Navigation Bar */}
        <header className="h-14 shrink-0 bg-[#080d19] border-b border-slate-800 px-6 flex items-center justify-between gap-4 select-none">
          {/* Breadcrumb & Global Context */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">DRIFTGUARD CONSOLE</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold uppercase tracking-wider">
              {currentTab === 'component-detail' ? `COMPONENT ${selectedComponentId || 'CMP-1048'}` : currentTab.replace('-', ' ')}
            </span>
          </div>

          {/* Global Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID (e.g. CMP-1048, LOT-A23)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </form>

          {/* Top Actions: Notifications, Threshold Trigger, Exit */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('alerts')}
              className="relative p-2 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="View Active Screening Alerts"
            >
              <Bell className="w-4 h-4" />
              {activeAlertCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
              )}
            </button>

            <button
              onClick={() => setIsThresholdModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/40 rounded hover:bg-cyan-500/10 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Config Limits</span>
            </button>

            <button
              onClick={onExitDemo}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 transition-colors"
            >
              Exit to Website
            </button>
          </div>
        </header>

        {/* Synthetic Demonstration Data Banner (Strict Policy: Visible, Transparent, Non-intrusive) */}
        <div className="bg-[#0b1220] border-b border-cyan-950 px-6 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>
              <strong className="text-cyan-400 uppercase">DEMO DATA:</strong> Synthetic demonstration data — not representative of actual ISRO, NASA, manufacturer, or flight hardware specifications.
            </span>
          </div>
          <span className="hidden lg:inline text-slate-500">
            Decision-support analysis · Not flight certification
          </span>
        </div>

        {/* Scrollable Viewport Stage */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#070b14]">
          {children}
        </main>
      </div>

      {/* Prototype Thresholds Modal */}
      <ThresholdSettingsModal
        isOpen={isThresholdModalOpen}
        onClose={() => setIsThresholdModalOpen(false)}
        onSaved={() => {
          // Re-render handled by API state
        }}
      />
    </div>
  );
};
