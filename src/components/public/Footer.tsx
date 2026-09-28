import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <footer className="w-full bg-[#060910] border-t border-slate-800/80 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs" aria-hidden="true" />
              <span className="text-base font-bold text-white tracking-tight">DRIFTGUARD</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-driven screening and anomaly-detection decision-support platform for space-grade electronic components undergoing burn-in and screening tests.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              Smarter Screening. Safer Space.
            </div>
            <div className="pt-2">
              <button
                onClick={onLaunchDemo}
                className="px-3 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
              >
                Launch SIH'26 Demo
              </button>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/product')} className="hover:text-white transition-colors">Screening Pipeline</button></li>
              <li><button onClick={() => onNavigate('/product')} className="hover:text-white transition-colors">Anomaly Detection</button></li>
              <li><button onClick={() => onNavigate('/product')} className="hover:text-white transition-colors">Drift Prediction</button></li>
              <li><button onClick={() => onNavigate('/product')} className="hover:text-white transition-colors">Explainability Engine</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors">Proposed Business Model</button></li>
            </ul>
          </div>

          {/* Solutions & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold tracking-wider">Solutions & Insights</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/solutions')} className="hover:text-white transition-colors">Satellite Electronics</button></li>
              <li><button onClick={() => onNavigate('/solutions')} className="hover:text-white transition-colors">Launch Vehicle Hardware</button></li>
              <li><button onClick={() => onNavigate('/who-its-for')} className="hover:text-white transition-colors">Who It’s Designed For</button></li>
              <li><button onClick={() => onNavigate('/market')} className="hover:text-white transition-colors">Market & Space Economy</button></li>
              <li><button onClick={() => onNavigate('/case-studies')} className="hover:text-white transition-colors">Deployment Case Studies</button></li>
              <li><button onClick={() => onNavigate('/resources')} className="hover:text-white transition-colors">Technical Briefs</button></li>
            </ul>
          </div>

          {/* Project & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold tracking-wider">Project & Governance</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">About DriftGuard</button></li>
              <li><button onClick={() => onNavigate('/careers')} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">Contact / Book Demo</button></li>
              <li><button onClick={() => onNavigate('/legal/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/legal/terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('/legal/cookies')} className="hover:text-white transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Project Integrity Disclaimers */}
        <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-400">SIH'26 Project Demonstration Disclaimer:</strong> DriftGuard is a research and engineering prototype developed in the context of the Smart India Hackathon 2026 (SIH'26). It is an engineering decision-support tool designed to assist qualified reliability engineers in evaluating burn-in test telemetry.
          </p>
          <p>
            DriftGuard is not an official software platform of ISRO, NASA, or any government agency, and does not issue formal flight-worthiness certifications or regulatory approvals. All screening labels (PASS / REVIEW / REJECT) are analytical recommendations intended for qualified human engineering oversight.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 text-slate-500 border-t border-slate-900 gap-2">
            <div>© 2026 DriftGuard Project. All rights reserved.</div>
            <div className="font-mono text-[10px]">SIH'26 Technology Prototype · Version 1.0</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
