import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate, onLaunchDemo }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie & Telemetry Policy',
  };

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Governance</span>
            <span aria-hidden="true">·</span>
            <span>{titles[type]}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{titles[type]}</h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: SIH'26 Technology Demonstration Edition · Last Updated: September 2026
          </p>
        </div>

        {/* Mandatory Legal Template Disclosure */}
        <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300 text-xs font-mono leading-relaxed">
          <strong className="uppercase">Notice:</strong> Template legal content — requires legal review before publication. This page serves as the architectural placeholder for production institutional legal compliance.
        </div>

        <div className="p-8 rounded-lg bg-[#0c1322] border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
          {type === 'privacy' && (
            <>
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  1. Information Collection & Telemetry Scope
                </h2>
                <p>
                  In this demonstration environment, DriftGuard processes synthetic component test telemetry (voltage, temperature, quiescent current, leakage current, propagation delay) generated specifically for testing and evaluation. In commercial deployments, institutional data remains strictly bounded to customer-designated tenant databases.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  2. Demonstration Mode Isolation
                </h2>
                <p>
                  Demo interactions do not transmit proprietary laboratory data to external third parties. All lead form submissions are processed securely through backend environment proxies.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  3. Auditability & Retention
                </h2>
                <p>
                  Engineering decisions, report exports, and threshold modifications are logged with pseudonymous audit trail IDs to ensure traceability without storing unauthorized personal identifiers.
                </p>
              </section>
            </>
          )}

          {type === 'terms' && (
            <>
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  1. Demonstration Prototype Scope
                </h2>
                <p>
                  DriftGuard is presented as a technology prototype for the Smart India Hackathon 2026. It is designed solely as an engineering decision-support tool. It does not provide, nor does it purport to provide, official aerospace flight-worthiness certifications or regulatory approvals.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  2. Decision-Support Boundary
                </h2>
                <p>
                  All analytical indicators—including PASS, REVIEW, and REJECT recommendations, risk scores, and anomaly indices—are intended solely to assist qualified human reliability engineers in their evaluation of component burn-in behavior. The final disposition of any component or lot remains the exclusive responsibility of qualified engineering personnel.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  3. Intellectual Property
                </h2>
                <p>
                  The algorithms, interface designs, and architecture of DriftGuard are the intellectual property of the SIH'26 project team.
                </p>
              </section>
            </>
          )}

          {type === 'cookies' && (
            <>
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  1. Essential Session Telemetry Only
                </h2>
                <p>
                  DriftGuard does not deploy third-party advertising trackers or commercial remarketing pixels. The platform utilizes only essential in-memory state and local session identifiers necessary to maintain demo state and threshold configurations.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  2. Demonstration State Management
                </h2>
                <p>
                  Evaluator adjustments to prototype risk thresholds and component review notes are persisted locally within the active browser session for demonstration continuity.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Back Link */}
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            ← Return to DriftGuard Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
