import React from 'react';
import { Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';

interface CareersProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Careers: React.FC<CareersProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Project Governance</span>
            <span aria-hidden="true">·</span>
            <span>Careers & Collaboration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Careers & Technical Opportunities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            DriftGuard is currently an active technology demonstration prototype developed within the Smart India Hackathon 2026 (SIH'26).
          </p>
        </div>

        {/* Mandatory Truthful Representation Notice */}
        <div className="p-8 rounded-lg bg-[#0c1322] border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">No Public Openings Currently Listed</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              In accordance with our strict product integrity rules, we do not fabricate fictitious job listings or invented human resources contact addresses.
            </p>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 max-w-lg mx-auto text-[11px] font-mono text-slate-400">
            Formal engineering fellowships, research opportunities, or recruitment notices will be announced through verified institutional channels following hackathon completion.
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Have Questions About the Technical Architecture?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Reach out to our project team via the official contact and demo booking form.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/10 rounded whitespace-nowrap transition-colors"
          >
            <span>Contact Project Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
