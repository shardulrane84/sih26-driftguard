import React from 'react';
import { Rocket, Satellite, Radio, Activity, BarChart2, ShieldAlert, ArrowRight } from 'lucide-react';
import waferImg from '../../assets/images/wafer_component_inspection_1790607593845.jpg';

interface SolutionsProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onNavigate, onLaunchDemo }) => {
  const useCases = [
    {
      title: 'Satellite On-Board Electronics Screening',
      icon: Satellite,
      tag: 'Potential / Intended Use Case',
      desc: 'Pre-flight screening of payload processors, telemetry transponders, power distribution modules, and onboard FPGAs subject to multi-year orbital life requirements.',
      application:
        'Identifies subtle quiescent current (Iddq) drift and threshold voltage shifts that predict early radiation sensitivity or vacuum outgassing breakdown.',
    },
    {
      title: 'Launch Vehicle Avionics & Guidance Systems',
      icon: Rocket,
      tag: 'Potential / Intended Use Case',
      desc: 'Burn-in analysis for flight computers, inertial measurement units (IMUs), and actuator drive controllers operating under extreme dynamic launch vibration and thermal gradients.',
      application:
        'Catches sudden parametric surges and propagation delay shifts in high-speed buffers before harness and flight computer assembly.',
    },
    {
      title: 'Ground Support & Mission Control Hardware',
      icon: Radio,
      tag: 'Potential / Intended Use Case',
      desc: 'High-availability screening for continuous-duty ground stations, tracking radars, and mission operations center telecommand interface electronics.',
      application:
        'Ensures 24/7 ground infrastructure avoids unpredicted infant-mortality component dropouts during critical launch windows.',
    },
    {
      title: 'High-Temperature Burn-in Chamber Analytics',
      icon: Activity,
      tag: 'Potential / Intended Use Case',
      desc: 'Direct integration with thermal-vacuum (TVAC) and automated burn-in ovens (125°C - 150°C) measuring time-series parameter evolution at 24h, 96h, and 168h intervals.',
      application:
        'Replaces manual spreadsheet inspection with automated multi-stage drift slope regression and real-time out-of-family detection.',
    },
    {
      title: 'Lot-Level Quality & Wafer Dispersion Analysis',
      icon: BarChart2,
      tag: 'Potential / Intended Use Case',
      desc: 'Multi-device cohort statistical benchmarking across entire wafer manufacturing batches and packaging lots.',
      application:
        'Isolates lot-wide distribution skew and wafer-edge effects, preventing entire batches with elevated variance from being accepted without waivers.',
    },
    {
      title: 'Screening Decision Support & Waiver Justification',
      icon: ShieldAlert,
      tag: 'Potential / Intended Use Case',
      desc: 'Standardized dossier generation for engineering review boards evaluating marginal components or technical waiver requests.',
      application:
        'Provides defensible, mathematical evidence and feature contribution attribution to support informed human engineering dispositions.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Operational Context</span>
            <span aria-hidden="true">·</span>
            <span>Intended Engineering Applications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Potential & Intended Use Cases
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Explore the targeted aerospace and defense engineering domains where DriftGuard's time-series screening analytics can enhance component reliability.
          </p>

          <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300 text-xs font-mono leading-relaxed">
            <strong>NOTICE ON USE CASE CLASSIFICATION:</strong> The applications outlined below represent potential and intended use cases designed into the DriftGuard architecture. In accordance with strict project integrity guidelines, these use cases are not presented as active commercial deployments.
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative rounded-lg border border-slate-800 overflow-hidden">
          <img
            src={waferImg}
            alt="Space-grade radiation-hardened microelectronics component testing"
            className="w-full h-56 sm:h-72 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/60 to-transparent flex items-end p-6">
            <div className="text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">SILICON INSPECTION:</span> Space-grade ceramic and hermetic packages evaluated under extended dynamic stress protocols.
            </div>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 border border-amber-800/60 bg-amber-950/30 px-2 py-0.5 rounded">
                      {uc.tag}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-white">{uc.title}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">{uc.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span className="text-cyan-400 block mb-0.5">ANALYTIC CAPABILITY:</span>
                  <span className="text-slate-300 font-sans">{uc.application}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Evaluate with Sample Space-Grade Lots</h3>
            <p className="text-xs text-slate-400 mt-1">
              Launch the demonstration dashboard to inspect synthetic screening telemetry across 5 realistic lots.
            </p>
          </div>
          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded whitespace-nowrap transition-colors"
          >
            <span>Launch SIH'26 Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
