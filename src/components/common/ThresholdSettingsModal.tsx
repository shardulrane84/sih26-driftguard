import React, { useState, useEffect } from 'react';
import { X, Sliders, CheckCircle, RotateCcw } from 'lucide-react';
import { PrototypeThresholds } from '../../types';
import { api } from '../../services/api';
import { DEFAULT_PROTOTYPE_THRESHOLDS } from '../../mock/demoData';

interface ThresholdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const ThresholdSettingsModal: React.FC<ThresholdSettingsModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [thresholds, setThresholds] = useState<PrototypeThresholds>(DEFAULT_PROTOTYPE_THRESHOLDS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getPrototypeThresholds().then((t) => setThresholds(t));
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await api.updatePrototypeThresholds(thresholds);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      if (onSaved) onSaved();
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setThresholds({ ...DEFAULT_PROTOTYPE_THRESHOLDS });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#0b1220] border border-slate-700/80 rounded-lg max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070b14]">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">Prototype Threshold Configuration</h3>
              <p className="text-xs text-slate-400">Configure engineering boundaries used for synthetic risk calculations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 space-y-5 text-xs font-sans max-h-[75vh] overflow-y-auto">
          <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300 text-[11px] leading-relaxed">
            <strong className="font-semibold uppercase font-mono">Prototype Threshold Notice:</strong> These values represent prototype baseline screening limits configured for this demonstration. They do not constitute official qualification limits established by ISRO, NASA, or any component manufacturer.
          </div>

          {/* Threshold 1: Iddq Drift Slope */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center font-mono">
              <label className="text-slate-300 font-semibold">Iddq Max Drift Slope Limit (µA/h)</label>
              <span className="text-cyan-400 font-bold tabular-nums">{thresholds.iddqMaxDriftSlope} µA/h</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.20"
              step="0.005"
              value={thresholds.iddqMaxDriftSlope}
              onChange={(e) => setThresholds({ ...thresholds, iddqMaxDriftSlope: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">
              Components exceeding this slope trigger progressive drift alerts (Default: 0.075 µA/h).
            </span>
          </div>

          {/* Threshold 2: Leakage Drift Slope */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center font-mono">
              <label className="text-slate-300 font-semibold">Leakage Current Slope Limit (nA/h)</label>
              <span className="text-cyan-400 font-bold tabular-nums">{thresholds.leakageMaxDriftSlope} nA/h</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.30"
              step="0.01"
              value={thresholds.leakageMaxDriftSlope}
              onChange={(e) => setThresholds({ ...thresholds, leakageMaxDriftSlope: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">
              Maximum allowable dielectric leakage rise rate before triggering REJECT recommendation.
            </span>
          </div>

          {/* Threshold 3: Robust Z-Score Cutoff */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center font-mono">
              <label className="text-slate-300 font-semibold">Robust Z-Score Cutoff (|Z_mad|)</label>
              <span className="text-cyan-400 font-bold tabular-nums">{thresholds.robustZScoreCutoff} σ</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="4.0"
              step="0.1"
              value={thresholds.robustZScoreCutoff}
              onChange={(e) => setThresholds({ ...thresholds, robustZScoreCutoff: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">
              Median Absolute Deviation multiplier to isolate statistical cohort outliers.
            </span>
          </div>

          {/* Weights Distribution */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-slate-200 font-semibold mb-2 font-mono text-[11px] uppercase tracking-wider">
              Risk Engine Weighting Distribution
            </h4>
            <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-slate-400 mb-1">Drift Slope</div>
                <div className="text-white font-bold tabular-nums">{(thresholds.riskWeightDrift * 100).toFixed(0)}%</div>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-slate-400 mb-1">Anomaly Score</div>
                <div className="text-white font-bold tabular-nums">{(thresholds.riskWeightAnomaly * 100).toFixed(0)}%</div>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-slate-400 mb-1">Lot Deviation</div>
                <div className="text-white font-bold tabular-nums">{(thresholds.riskWeightLotDev * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#070b14]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors disabled:opacity-50"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-900" />
                  <span>Recalculated!</span>
                </>
              ) : isSaving ? (
                <span>Recalculating...</span>
              ) : (
                <span>Apply & Recalculate</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
