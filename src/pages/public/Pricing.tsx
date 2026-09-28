import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Layers, Wrench, Headphones } from 'lucide-react';

interface PricingProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate, onLaunchDemo }) => {
  const models = [
    {
      title: 'Enterprise Organization License',
      category: 'Annual Organization / Seat-Based',
      icon: Shield,
      summary: 'Designed for space agencies, mission directorates, and multi-program aerospace enterprises.',
      features: [
        'Centralized multi-lot telemetry repository & audit vault',
        'Unlimited screening runs across mission programs',
        'Configurable organization-level prototype threshold presets',
        'Role-based access control (SuperAdmin, Q&R Lead, Test Engineer)',
        'Traceable electronic screening dossiers with immutable IDs',
      ],
      cta: 'Request a Quote',
    },
    {
      title: 'Per-Lab / Per-Site Deployment',
      category: 'Facility & Laboratory Licensing',
      icon: Layers,
      summary: 'Optimized for specialized environmental test facilities, TVAC chambers, and burn-in laboratories.',
      features: [
        'Local laboratory edge appliance or isolated cloud node',
        'Direct connection with automated test equipment (ATE) fixtures',
        'Automated pre-flight Data Quality Index (DQI) validation',
        'Real-time socket acquisition retry and dropout monitoring',
        'Lot-level statistical dispersion and wafer variance reporting',
      ],
      cta: 'Book a Demo',
    },
    {
      title: 'Custom Test Bench Integration',
      category: 'Instrumentation Engineering',
      icon: Wrench,
      summary: 'Engineering services to interface DriftGuard with proprietary test instrumentation and databases.',
      features: [
        'Custom parser pipelines for legacy ATE data formats',
        'FastAPI backend on-premise Docker deployment',
        'Integration with internal Component Engineering databases',
        'Automated batch ingestion from environmental chamber controllers',
        'Dedicated verification test runs against historical lots',
      ],
      cta: 'Request a Quote',
    },
    {
      title: 'Advanced Analytics & Support Tiers',
      category: 'Mission-Critical Engineering Support',
      icon: Headphones,
      summary: 'Support tiers tailored to satellite launch timelines and mission-critical review cycles.',
      features: [
        'Standard Support: Business-day technical triage and updates',
        'Priority Support: 4-hour response during flight lot screening',
        'Mission-Critical Support: 24/7 dedicated engineering coverage during launch campaign burn-in cycles',
        'Model recalibration consultation for novel semiconductor process nodes',
      ],
      cta: 'Book a Demo',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Commercial Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Proposed Business Model</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proposed Business & Deployment Model
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            DriftGuard is structured for institutional aerospace deployment, offering laboratory-level edge deployment, enterprise-wide screening vaults, and mission-critical engineering support.
          </p>

          <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300 text-xs font-mono leading-relaxed">
            <strong className="uppercase">Notice on Commercial Status:</strong> In accordance with strict project integrity guidelines, commercial pricing has not been finalized. The tiers below outline the proposed business model structure. Numeric price figures are not fabricated. All inquiries are evaluated via customized institutional quotes.
          </div>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-slate-900 border border-slate-700/60 px-2 py-0.5 rounded uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Included Capabilities:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="w-full py-2.5 text-xs font-mono font-semibold text-center rounded border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                  >
                    {item.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Tiers Section */}
        <div className="p-6 rounded-lg bg-[#0a0f1d] border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white tracking-tight">
            Technical Support & Mission Readiness Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">Standard Tier</div>
              <div className="text-slate-300">Standard business-day technical assistance, bug fixes, and documentation updates.</div>
            </div>
            <div className="p-4 rounded bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">Priority Tier</div>
              <div className="text-slate-300">4-hour response SLA, dedicated screening engineer liaison, and quarterly model updates.</div>
            </div>
            <div className="p-4 rounded bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-rose-400 font-bold">Mission-Critical Tier</div>
              <div className="text-slate-300">24/7 on-call coverage during critical flight qualification burn-in cycles and launch campaigns.</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Experience the System First-Hand</h3>
            <p className="text-xs text-slate-400 mt-1">
              Evaluate the prototype platform in demo mode without any commercial commitment.
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
