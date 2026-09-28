import React from 'react';
import { TrendingUp, BarChart3, Globe, Shield, ArrowRight } from 'lucide-react';

interface MarketProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Market: React.FC<MarketProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Macro Economic Context</span>
            <span aria-hidden="true">·</span>
            <span>Indian & Global Space Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Market & Industry Context
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            As the Indian space sector expands with commercial satellite constellations, private launch vehicles, and domestic manufacturing, reliable component screening becomes a vital mission assurance enabler.
          </p>
        </div>

        {/* Verified Market Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400">Indian Space Economy (2022)</div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">₹80,564 Cr</div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Established baseline economic activity across upstream and downstream space sectors.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/40 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">Projected Economy (2033)</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-300 tabular-nums">₹4.22 Lakh Cr</div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Anticipated expansion driven by private commercial spaceflight and domestic manufacturing.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400">Export Opportunity (2033)</div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">₹1.06 Lakh Cr</div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Projected international export volume for Indian space components and subsystem services.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400">IN-SPACe Private Entities</div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">~1,050</div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Registered space tech enterprises, suppliers, and academic innovators as of Jan 2026.
            </p>
          </div>
        </div>

        {/* Strict Mandatory Source Attribution & TAM Clarification Banner */}
        <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-700/80 space-y-2">
          <div className="text-xs font-mono text-slate-300">
            <strong className="text-cyan-400">Official Source Attribution:</strong> IN-SPACe Decadal Vision & Strategy; Government of India / PIB, Jan 2026. INR conversions based on ₹95.91/USD.
          </div>
          <div className="text-xs font-mono font-bold text-amber-400">
            IMPORTANT CLARIFICATION: ₹4.22 lakh crore is the projected overall Indian space economy — NOT DriftGuard's TAM or projected revenue.
          </div>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            These figures are provided solely to illustrate the macroeconomic expansion of space-grade hardware development, satellite fabrication, and component manufacturing in India.
          </p>
        </div>

        {/* Industrial Reliability Driver Analysis */}
        <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Why Component Screening Intelligence Is Critical
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm">Surge in Satellite Constellations</h3>
              <p>
                With private NewSpace enterprises building multi-satellite constellations, volume screening demands rapid, automated data quality verification and multi-hour telemetry trend evaluation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm">Commercial-Off-The-Shelf (COTS+) Upscreening</h3>
              <p>
                To lower satellite deployment costs while preserving reliability, programs increasingly evaluate ruggedized industrial and automotive grade semiconductors undergoing rigorous thermal burn-in screening.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm">Eliminating Latent Dielectric Failures</h3>
              <p>
                Unlike terrestrial consumer devices, on-orbit satellite electronics cannot be physically repaired. Detecting subtle parametric drift during 168h burn-in protects against premature on-orbit mission loss.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-lg bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Inspect DriftGuard’s Decision Support Engine</h3>
            <p className="text-xs text-slate-400 mt-1">
              Explore how our synthetic screening models detect subtle wafer lot shifts and parametric drift.
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
