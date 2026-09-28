import React from 'react';
import { ArrowRight, SignalZero, Compass } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-[#070b14] text-slate-100 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 mx-auto">
          <SignalZero className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Telemetry Error 404
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Signal Lost</h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            The requested route could not be located on the DriftGuard telemetry network.
          </p>
        </div>

        <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
          STATUS: UNRECOGNIZED_TELEMETRY_ENDPOINT · CHANNEL_ID: NULL
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
          >
            Return to Screening Intelligence
          </button>
          <button
            onClick={onLaunchDemo}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono text-slate-300 hover:text-white border border-slate-800 rounded transition-colors"
          >
            Launch SIH'26 Demo
          </button>
        </div>
      </div>
    </div>
  );
};
