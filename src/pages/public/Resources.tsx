import React from 'react';
import { BookOpen, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface ResourcesProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onNavigate, onLaunchDemo }) => {
  const articles = [
    {
      id: 'RES-01',
      category: 'Reliability Engineering Brief',
      date: 'Sept 2026',
      title: 'Dynamic Burn-in Telemetry vs. Static EOT Boundary Limits',
      summary:
        'A technical overview comparing end-of-test (EOT) scalar screening against multi-stage time-series rate-of-change drift detection in space-grade microelectronics.',
      readTime: '6 min read',
    },
    {
      id: 'RES-02',
      category: 'Mathematical Architecture',
      date: 'Sept 2026',
      title: 'Robust Non-Parametric Estimators for Wafer Lot Dispersion',
      summary:
        'Examining the implementation of Median Absolute Deviation (MAD) and robust Z-scores to isolate subtle out-of-family dice without bias from extreme socket anomalies.',
      readTime: '8 min read',
    },
    {
      id: 'RES-03',
      category: 'Decision-Support Frameworks',
      date: 'Sept 2026',
      title: 'Explainable Screening Dispositions for Aerospace Review Boards',
      summary:
        'Why black-box neural networks are rejected by mission assurance committees, and how transparent feature attribution provides defensible rationale for component dispositions.',
      readTime: '5 min read',
    },
    {
      id: 'RES-04',
      category: 'Quality Assurance Protocol',
      date: 'Sept 2026',
      title: 'Data Hygiene in Automated Test Equipment (ATE) Environments',
      summary:
        'Developing pre-flight Data Quality Index (DQI) metrics covering telemetry completeness, timestamp continuity, and thermal soak consistency.',
      readTime: '7 min read',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Knowledge Base</span>
            <span aria-hidden="true">·</span>
            <span>Technical Briefs & Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Resources & Architecture Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Explore engineering whitepapers and mathematical documentation covering time-series burn-in telemetry analysis, robust anomaly detection, and explainable decision support.
          </p>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold uppercase">[INTEGRITY POLICY]</span> Articles are structured technical drafts representing the mathematical and operational principles behind the DriftGuard architecture. No fabricated research statistics are presented.
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-400 font-semibold">{item.category}</span>
                  <span className="text-slate-500">{item.date}</span>
                </div>
                <h2 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{item.readTime}</span>
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                  Read Technical Draft →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Review Applied Code in Demo</h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspect how these algorithms behave in real-time across the SIH'26 demonstration dataset.
            </p>
          </div>
          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded whitespace-nowrap transition-colors"
          >
            <span>Launch Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
