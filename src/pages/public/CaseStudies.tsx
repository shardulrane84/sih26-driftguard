import React from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface CaseStudiesProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Operational Verification</span>
            <span aria-hidden="true">·</span>
            <span>Case Studies & Field Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Case Studies & Verification Records
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            In compliance with our absolute product integrity guidelines, DriftGuard does not fabricate fictitious customers, corporate logos, or unverified testimonials.
          </p>
        </div>

        {/* Structured Placeholder Notice */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 leading-relaxed">
          <strong className="text-cyan-400 uppercase">Integrity Policy:</strong> The case study slots below establish the formal documentation schema for real-world laboratory screening campaigns. Details will be populated following verified institutional testing.
        </div>

        {/* Structured Case Study Slots */}
        <div className="space-y-6">
          {/* Case Study Slot 1 */}
          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Case Study Slot 01: Multi-Wafer Rad-Hard FPGA Screening
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                Status: Pending Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Customer / Lab</div>
                <div className="text-slate-300">To be added after verified deployment</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Problem</div>
                <div className="text-slate-300">To be documented upon trial agreement</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Implementation</div>
                <div className="text-slate-300">To be documented following lab integration</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Empirical Result</div>
                <div className="text-slate-300">To be documented from test telemetry</div>
              </div>
            </div>
          </div>

          {/* Case Study Slot 2 */}
          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Case Study Slot 02: High-Voltage PMIC Screening & Gate Leakage Isolation
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                Status: Pending Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Customer / Lab</div>
                <div className="text-slate-300">To be added after verified deployment</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Problem</div>
                <div className="text-slate-300">To be documented upon trial agreement</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Implementation</div>
                <div className="text-slate-300">To be documented following lab integration</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 mb-1">Empirical Result</div>
                <div className="text-slate-300">To be documented from test telemetry</div>
              </div>
            </div>
          </div>

          {/* Testimonial Placeholder Slot */}
          <div className="p-6 rounded-lg bg-[#0a0f1d] border border-dashed border-slate-800 text-center space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Customer Testimonial Section
            </div>
            <p className="text-xs text-slate-400 italic">
              "Verified customer testimonials will be added here upon formal project evaluation and authorization."
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Test the System with Demonstration Data</h3>
            <p className="text-xs text-slate-400 mt-1">
              Examine the synthetic test scenarios modeled in the SIH'26 demo environment.
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
