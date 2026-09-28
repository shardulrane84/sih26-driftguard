import React from 'react';
import { Target, AlertCircle, Compass, Users } from 'lucide-react';
import labBenchImg from '../../assets/images/burnin_chamber_lab_1790607582522.jpg';

interface AboutProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>SIH'26</span>
            <span aria-hidden="true">·</span>
            <span>About DriftGuard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Advancing Space Electronics Reliability Through Empirical Intelligence
          </h1>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            DriftGuard is an AI-driven screening and anomaly-detection decision-support platform designed to assist reliability engineers during burn-in testing of space-grade electronic components.
          </p>
        </div>

        {/* Lab image context */}
        <div className="relative rounded-lg border border-slate-800 overflow-hidden">
          <img
            src={labBenchImg}
            alt="Aerospace component burn-in thermal chamber instrumentation test bench"
            className="w-full h-64 sm:h-80 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/50 to-transparent flex items-end p-6">
            <div className="text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">BURN-IN CONTEXT:</span> High-temperature dynamic burn-in screening (125°C, 168h standard test intervals) for mission-critical semiconductors.
            </div>
          </div>
        </div>

        {/* 1. Mission */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <Target className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white tracking-tight">Project Mission</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our mission is to make burn-in screening analysis more structured, explainable, and auditable. Rather than relying solely on coarse pass/fail static boundary checks at test conclusion, DriftGuard monitors intermediate telemetry stages (0h, 24h, 96h, 168h) to identify subtle rate-of-change degradation and lot-level statistical anomalies before components are integrated into satellite subsystems.
          </p>
        </section>

        {/* 2. Problem Statement */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400">
            <AlertCircle className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white tracking-tight">The Engineering Challenge</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Space-grade semiconductor screening involves hundreds of components subjected to extended thermal and electrical burn-in stresses. Manual analysis of multi-dimensional time-series data presents severe bottlenecks:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded bg-[#0c1322] border border-slate-800">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase mb-1">Gradual Drift Masquerading as Nominal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Components may remain nominally within static datasheet bounds at 168h, yet exhibit steep monotonic parameter trajectories indicating latent dielectric or oxide breakdown.
              </p>
            </div>
            <div className="p-4 rounded bg-[#0c1322] border border-slate-800">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase mb-1">Lot-Level Inhomogeneity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subtle wafer fabrication variations can shift entire lot distributions, making static universal thresholds either too permissive or excessively punitive.
              </p>
            </div>
            <div className="p-4 rounded bg-[#0c1322] border border-slate-800">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase mb-1">Telemetry Hygiene & Missing Data</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Socket acquisition errors, retry anomalies, and thermal fluctuations can obscure true component behavior if data quality is not rigorously pre-validated.
              </p>
            </div>
            <div className="p-4 rounded bg-[#0c1322] border border-slate-800">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase mb-1">Black-Box ML Mistrust</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aerospace flight review boards cannot act on opaque AI probability scores without transparent parametric explanations and audit trails.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Vision */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <Compass className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white tracking-tight">Long-Term Vision</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            We envision an ecosystem where automated test equipment (ATE) pipelines seamlessly stream burn-in telemetry directly into explainable decision-support algorithms. This will enable component test engineers to isolate high-risk devices earlier in the screening cycle, minimizing wasted burn-in chamber hours and preventing mission-compromising on-orbit failures.
          </p>
        </section>

        {/* 4. Team (Strict Rule: No fake portraits or fake names) */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2.5 text-slate-400">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Project Team</h2>
          </div>
          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-3">
            <div className="text-sm font-semibold text-white">SIH'26 Development Team</div>
            <div className="text-xs font-mono text-cyan-400">
              Smart India Hackathon 2026 · Problem Statement: Space Electronics Burn-in Screening Analytics
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              DriftGuard was conceived and developed by the SIH'26 project team focusing on mathematical anomaly detection, statistical reliability engineering, and explainable decision support for space applications.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 italic">
              Project team members, institutional affiliations, and mentor details will be added after official project verification.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
