import React, { useState } from 'react';
import { Upload, FileUp, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Database } from 'lucide-react';
import { DataQualityGauge } from '../../components/common/DataQualityGauge';

interface AddDataProps {
  onNavigateTab: (tab: any) => void;
  onSelectComponent: (id: string) => void;
}

export const AddData: React.FC<AddDataProps> = ({ onNavigateTab, onSelectComponent }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    rows: number;
    cols: number;
    missingCount: number;
    duplicateCount: number;
    invalidCount: number;
    dqi: number;
  } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setPipelineStep(1);

    // Realistic processing timeline (Upload -> Validate -> Feature Engineering -> Anomaly Detection -> Drift Prediction -> Risk Scoring -> Result)
    setTimeout(() => setPipelineStep(2), 500);
    setTimeout(() => setPipelineStep(3), 1000);
    setTimeout(() => setPipelineStep(4), 1500);
    setTimeout(() => setPipelineStep(5), 2000);
    setTimeout(() => setPipelineStep(6), 2500);
    setTimeout(() => {
      setPipelineStep(7);
      setIsProcessing(false);
      setUploadedFile({
        name: 'FLIGHT_LOT_A23_BURNIN_168H_EXPORT.csv',
        size: '1.42 MB',
        rows: 448,
        cols: 8,
        missingCount: 1,
        duplicateCount: 0,
        invalidCount: 0,
        dqi: 98.6,
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          <span>Ingestion & Validation Pipeline</span>
          <span aria-hidden="true">·</span>
          <span>Automated Test Equipment Interface</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Add Burn-in Telemetry Data
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Ingest raw time-series measurements across burn-in test intervals (0h, 24h, 96h, 168h) for automated quality validation and anomaly analysis.
        </p>
      </div>

      {/* Expected Schema Specification Notice */}
      <div className="p-4 rounded-lg bg-[#0c1322] border border-slate-800 space-y-2 text-xs font-mono">
        <div className="text-cyan-400 font-bold uppercase tracking-wider">
          Expected ATE Field Schema:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Component_ID (Text)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Lot_ID (Text)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Test_Hour (0,24,96,168)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Iddq (µA, Float)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Leakage_Current (nA)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Prop_Delay (ns, Float)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Temperature (°C, Float)</div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">Voltage (V, Float)</div>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      {!uploadedFile && !isProcessing && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleSimulatedUpload();
          }}
          onClick={handleSimulatedUpload}
          className={`p-12 rounded-lg border-2 border-dashed cursor-pointer text-center space-y-4 transition-all ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/20'
              : 'border-slate-700 bg-[#0c1322] hover:border-cyan-500/60 hover:bg-slate-900/60'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 mx-auto flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              Drag & Drop ATE Burn-in CSV File Here
            </h3>
            <p className="text-xs text-slate-400">
              or click to browse test chamber data files from local disk
            </p>
          </div>
          <div className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
            Click anywhere to load sample: FLIGHT_LOT_A23_BURNIN_168H_EXPORT.csv
          </div>
        </div>
      )}

      {/* Realistic Analysis Pipeline Animation */}
      {isProcessing && (
        <div className="p-8 rounded-lg bg-[#0c1322] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-bold uppercase">
              Executing Screening Pipeline...
            </span>
            <span className="text-slate-400">STAGE {pipelineStep} OF 7</span>
          </div>

          {/* Stepper Visualization */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono">
            {[
              'UPLOAD',
              'VALIDATE',
              'FEATURE ENG',
              'ANOMALY DET',
              'DRIFT PRED',
              'RISK SCORE',
              'RESULT',
            ].map((step, idx) => {
              const isPast = pipelineStep > idx;
              const isCurrent = pipelineStep === idx + 1;
              return (
                <div
                  key={step}
                  className={`p-2 rounded border transition-all ${
                    isCurrent
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                      : isPast
                      ? 'bg-slate-900 border-slate-700 text-slate-400'
                      : 'bg-slate-950 border-slate-900 text-slate-600'
                  }`}
                >
                  {step}
                </div>
              );
            })}
          </div>

          <div className="text-center font-mono text-xs text-slate-400 animate-pulse">
            Processing 448 measurement intervals across 32 components in Lot Alpha-23...
          </div>
        </div>
      )}

      {/* Uploaded File Summary & Verification Actions */}
      {uploadedFile && (
        <div className="p-6 rounded-lg bg-[#0c1322] border border-cyan-500/40 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white">{uploadedFile.name}</h3>
                <span className="text-xs font-mono text-slate-400">{uploadedFile.size} · Ingestion Completed</span>
              </div>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Upload Another Batch
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Rows Detected</div>
              <div className="text-lg font-bold text-white tabular-nums">{uploadedFile.rows}</div>
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Columns Detected</div>
              <div className="text-lg font-bold text-white tabular-nums">{uploadedFile.cols}</div>
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Missing Values</div>
              <div className="text-lg font-bold text-amber-400 tabular-nums">{uploadedFile.missingCount}</div>
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Data Quality Index</div>
              <div className="text-lg font-bold text-emerald-400 tabular-nums">{uploadedFile.dqi}%</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={() => onNavigateTab('data-quality')}
              className="w-full sm:w-auto px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded transition-colors"
            >
              Run Detailed Data Quality Check
            </button>
            <button
              onClick={() => {
                onSelectComponent('CMP-1048');
                onNavigateTab('component-detail');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
            >
              <span>Analyze with DriftGuard (Inspect CMP-1048)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
