import React, { useState } from 'react';
import { ArrowRight, Activity, TrendingUp, ShieldCheck, Cpu, Database, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { PipelineVisual } from '../../components/common/PipelineVisual';
import heroTelemetryImg from '../../assets/images/hero_telemetry_board_1790607570366.jpg';

interface HomeProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onLaunchDemo }) => {
  const [telemetryTime, setTelemetryTime] = useState<'0h' | '24h' | '96h' | '168h'>('168h');

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 border-b border-slate-800/80 overflow-hidden">
        {/* Subtle background radial lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-950/20 via-slate-900/10 to-transparent pointer-events-none blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Context Kicker (NO PILLS: clean unboxed text) */}
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>SIH'26</span>
                <span aria-hidden="true">·</span>
                <span>Space-Grade Reliability Decision Support</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Prototype V1.0</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                  DRIFTGUARD
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold text-cyan-300 tracking-tight">
                  Smarter Screening. Safer Space.
                </p>
              </div>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                AI-driven screening intelligence for detecting abnormal behaviour, progressive drift, and risk patterns in space-grade electronic component burn-in data.
              </p>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold shrink-0">[SCOPE]</span>
                <span>
                  Engineering decision-support system designed for screening analytics — not a replacement for qualified engineering judgement or regulatory certification.
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onLaunchDemo}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded shadow-lg shadow-cyan-950/50 transition-all font-mono"
                >
                  <span>Launch SIH'26 Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/product')}
                  className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded transition-colors"
                >
                  See How It Works
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Book a Demo
                </button>
              </div>
            </div>

            {/* Right Hero Visual: Sophisticated Technical Telemetry Visualization */}
            <div className="lg:col-span-6">
              <div className="relative rounded-lg border border-slate-700/80 bg-[#0a0f1d] shadow-2xl overflow-hidden p-4">
                {/* Visual Top Telemetry Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-white font-semibold">SIGNAL TELEMETRY: CMP-1048</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-semibold uppercase">
                    Drift Separation Detected
                  </div>
                </div>

                {/* Interactive SVG Signal Trajectory */}
                <div className="my-3 bg-[#070b14] rounded border border-slate-800/80 p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-2">
                    <span>PARAMETER: Iddq (Quiescent Current)</span>
                    <span className="text-cyan-400 tabular-nums">STAGE: 0h → 24h → 96h → 168h</span>
                  </div>

                  <svg viewBox="0 0 500 210" className="w-full h-auto select-none">
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="40" y1="30" x2="480" y2="30" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="40" y1="80" x2="480" y2="80" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="40" y1="180" x2="480" y2="180" stroke="#1e293b" />

                    {/* Y-axis labels */}
                    <text x="32" y="34" textAnchor="end" className="fill-slate-500 font-mono text-[9px]">30 µA</text>
                    <text x="32" y="84" textAnchor="end" className="fill-slate-500 font-mono text-[9px]">20 µA</text>
                    <text x="32" y="134" textAnchor="end" className="fill-slate-500 font-mono text-[9px]">14 µA</text>
                    <text x="32" y="184" textAnchor="end" className="fill-slate-500 font-mono text-[9px]">10 µA</text>

                    {/* Critical threshold line */}
                    <line x1="40" y1="45" x2="480" y2="45" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
                    <text x="475" y="40" textAnchor="end" className="fill-rose-400 font-mono text-[9px]">Prototype Risk Boundary</text>

                    {/* Reference Nominal Band */}
                    <polygon
                      points="60,140 180,136 320,132 460,128 460,148 320,150 180,152 60,154"
                      fill="#06b6d4"
                      fillOpacity="0.12"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />

                    {/* Nominal Golden Baseline */}
                    <path
                      d="M 60 147 L 180 144 L 320 141 L 460 138"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />

                    {/* Actual Drifting Component Trajectory (CMP-1048) */}
                    <path
                      d="M 60 146 L 180 132 L 320 85 L 460 38"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    <circle cx="60" cy="146" r="4" fill="#22d3ee" />
                    <circle cx="180" cy="132" r="4" fill="#22d3ee" />
                    <circle cx="320" cy="85" r="4.5" fill="#f59e0b" />
                    <circle cx="460" cy="38" r="5" fill="#f43f5e" />

                    {/* Callout box for drift separation */}
                    <g transform="translate(305, 96)">
                      <rect width="160" height="42" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" rx="3" />
                      <text x="8" y="16" className="fill-amber-400 font-mono text-[10px] font-bold">▲ DRIFT DETECTED</text>
                      <text x="8" y="32" className="fill-slate-300 font-mono text-[9px]">Slope: +0.098 µA/h (&gt; limit)</text>
                    </g>
                  </svg>
                </div>

                {/* Sub-hud metrics */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center text-xs">
                  <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Anomaly Score</span>
                    <span className="text-cyan-400 font-bold tabular-nums">0.88 / 1.00</span>
                  </div>
                  <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Risk Score</span>
                    <span className="text-amber-400 font-bold tabular-nums">87 / 100</span>
                  </div>
                  <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Recommendation</span>
                    <span className="text-amber-400 font-bold">REVIEW</span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-slate-500 font-mono text-center">
                  * Live demonstration plot calculated from synthetic prototype telemetry dataset.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE PRODUCT PIPELINE */}
      <section className="py-16 border-b border-slate-800/80 bg-[#080d19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Engineering Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              The DriftGuard Screening Pipeline
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transforming raw burn-in socket data into structured, explainable, and traceable decision-support recommendations.
            </p>
          </div>

          <PipelineVisual />
        </div>
      </section>

      {/* 3. PRODUCT DIFFERENTIATORS */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              Engineered for Rigorous Decision Support
            </h2>
            <p className="text-sm text-slate-400">
              Six foundational pillars built specifically for high-reliability component testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">01. Detect Abnormal Behaviour</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Isolate non-linear parametric excursions, sudden dielectric surges, and early electrical anomalies during dynamic burn-in soak.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">02. Track Progressive Drift</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quantify parameter degradation rates across 0h, 24h, 96h, and 168h intervals to catch subtle drift before it breaches static limits.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">03. Compare Lot Distributions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Benchmark individual components against cohort baselines to isolate wafer-level dispersion and lot-to-lot manufacturing shifts.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">04. Explain Every Flag</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide transparent engineering rationale for every flagged device with feature contributions and parameter delta breakdowns.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">05. Trace Audit History</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate timestamped, tamper-evident screening dossiers with immutable record IDs for flight review boards and QA audits.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 bg-[#0c1322] border border-slate-800 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">06. Support Engineering Decisions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Empower mission assurance teams with quantitative recommendations without ever usurping qualified engineering judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MARKET & INDUSTRIAL CONTEXT (Strict Requirement: Exact figures, official source, TAM disclaimer) */}
      <section className="py-16 border-b border-slate-800/80 bg-[#090e1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Market Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The Expanding Indian Space Economy
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/market')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>View Full Market Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded bg-[#0c1322] border border-slate-800">
              <div className="text-xs text-slate-400 font-mono mb-1">Indian Space Economy (2022)</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">₹80,564 Cr</div>
              <div className="text-[11px] text-slate-500 mt-1">Baseline domestic economic activity</div>
            </div>

            <div className="p-5 rounded bg-[#0c1322] border border-slate-800">
              <div className="text-xs text-slate-400 font-mono mb-1">Projected Economy (2033)</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300 tabular-nums">₹4.22 Lakh Cr</div>
              <div className="text-[11px] text-slate-500 mt-1">IN-SPACe decadal trajectory</div>
            </div>

            <div className="p-5 rounded bg-[#0c1322] border border-slate-800">
              <div className="text-xs text-slate-400 font-mono mb-1">Export Opportunity (2033)</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">₹1.06 Lakh Cr</div>
              <div className="text-[11px] text-slate-500 mt-1">Projected international export volume</div>
            </div>

            <div className="p-5 rounded bg-[#0c1322] border border-slate-800">
              <div className="text-xs text-slate-400 font-mono mb-1">IN-SPACe Private Entities</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">~1,050</div>
              <div className="text-[11px] text-slate-500 mt-1">Registered ecosystem as of Jan 2026</div>
            </div>
          </div>

          {/* Mandatory Attribution & TAM Disclaimer */}
          <div className="mt-4 p-4 rounded bg-slate-900/60 border border-slate-800/80 space-y-1 text-xs font-mono text-slate-400">
            <div>
              <strong className="text-slate-300">Source:</strong> IN-SPACe Decadal Vision & Strategy; Government of India / PIB, Jan 2026. INR conversions based on ₹95.91/USD.
            </div>
            <div className="text-amber-400/90 font-semibold">
              * Note: ₹4.22 lakh crore is the projected overall Indian space economy — NOT DriftGuard's TAM or projected revenue.
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIMARY DEMO INVITATION CALLOUT */}
      <section className="py-16 bg-[#070b14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-lg bg-gradient-to-r from-slate-900 via-[#0c1629] to-slate-900 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>INTERACTIVE SIH'26 EVALUATOR DEMO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Experience the DriftGuard Engineering Console
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Step through the pre-populated demonstration environment with 5 lots, 100+ space-grade components, live telemetry charts, drift slope regression, and auditable screening report generation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onLaunchDemo}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold font-mono text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded shadow-md transition-all"
                >
                  <span>Launch SIH'26 Demo Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/product')}
                  className="px-4 py-3 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Review 8-Stage Pipeline Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
