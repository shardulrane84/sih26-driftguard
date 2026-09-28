import React from 'react';
import { ShieldCheck, Cpu, Microscope, Building2, CheckSquare, ArrowRight } from 'lucide-react';

interface WhoItsForProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const WhoItsFor: React.FC<WhoItsForProps> = ({ onNavigate, onLaunchDemo }) => {
  const audiences = [
    {
      title: 'ISRO & Department of Space Screening Teams',
      icon: ShieldCheck,
      description:
        'Designed to assist institutional component screening facilities processing critical lots for launch vehicles, satellites, and scientific payloads.',
      benefits: [
        'Multi-stage burn-in tracking to replace single static boundary tests',
        'Standardized lot-level anomaly isolation across wafer shipments',
        'Auditable screening dossiers for flight hardware acceptance committees',
      ],
      note: 'DriftGuard is designed for space agency screening workflows; this project does not claim official agency deployment or endorsement.',
    },
    {
      title: 'Quality & Reliability Engineers (Q&R)',
      icon: Microscope,
      description:
        'Built for reliability specialists tasked with physics-of-failure analysis, acceleration factor verification, and premature degradation mitigation.',
      benefits: [
        'Early detection of non-linear parameter drift (Iddq, gate leakage, propagation delay)',
        'Robust statistical Z-scores and Median Absolute Deviation calculations',
        'Transparent feature attribution linking telemetry deltas to physical failure modes',
      ],
    },
    {
      title: 'Component Test Engineers & ATE Operators',
      icon: Cpu,
      description:
        'Tailored for laboratory operators managing thermal-vacuum and high-temperature burn-in chambers with automated test equipment.',
      benefits: [
        'Automated pre-flight Data Quality Index (DQI) checking for missing test stages',
        'Rapid socket acquisition anomaly detection and retry tracking',
        'CSV/ATE export ingestion with instant validation feedback',
      ],
    },
    {
      title: 'Space-Grade Semiconductor Manufacturers',
      icon: Building2,
      description:
        'Conceived for high-reliability semiconductor fabrication and packaging vendors delivering flight-qualified Class S and Class V devices.',
      benefits: [
        'Lot-to-lot baseline stability benchmarking across production runs',
        'Early identification of peripheral wafer dice showing anomalous drift',
        'Exportable customer screening summaries with transparent evidence',
      ],
    },
    {
      title: 'Mission Assurance & Project Directorate Teams',
      icon: CheckSquare,
      description:
        'Created for mission directors requiring defensible, quantitative decision support when evaluating waiver requests or marginal component lots.',
      benefits: [
        'Synthesized 0–100 risk scoring with configurable prototype safety margins',
        'Clear separation of PASS, REVIEW, and REJECT recommendations',
        'Traceable audit trail documenting all engineer dispositions and notes',
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Target Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>Who It's Designed For</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Space-Grade Reliability Workflows
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            DriftGuard is tailored for engineering teams who require deep empirical insight into component behavior under extended thermal and electrical stress.
          </p>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-semibold uppercase">[POSITIONING NOTICE]</span> Sections below describe the intended engineering workflows and user profiles DriftGuard is designed to serve. These organizations are not cited as verified commercial customers.
          </div>
        </div>

        {/* Audience Cards */}
        <div className="space-y-6">
          {audiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="pl-12 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Key Workflow Capabilities:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {item.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {item.note && (
                    <div className="mt-3 p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Explore the Engineering Dashboard</h3>
            <p className="text-xs text-slate-400 mt-1">
              Experience the platform from the perspective of a lead screening engineer.
            </p>
          </div>
          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors whitespace-nowrap"
          >
            <span>Launch Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
