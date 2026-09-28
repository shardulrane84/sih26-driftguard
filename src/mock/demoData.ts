import {
  ComponentData,
  LotData,
  AlertItem,
  ReportItem,
  DataQualityReport,
  PrototypeThresholds,
  AuditLogEntry,
  Measurement,
  ScreeningDecision,
  RiskBand,
  ParameterName,
} from '../types';

export const DEFAULT_PROTOTYPE_THRESHOLDS: PrototypeThresholds = {
  iddqMaxDriftSlope: 0.075, // uA / hour
  leakageMaxDriftSlope: 0.12, // nA / hour
  propDelayMaxShift: 0.30, // ns total shift
  robustZScoreCutoff: 2.5, // Standard MAD-based threshold
  riskWeightDrift: 0.40,
  riskWeightAnomaly: 0.35,
  riskWeightLotDev: 0.25,
};

// Configurable prototype baseline reference parameters
export const BASELINE_PROTOTYPES: Record<ParameterName, { nominal: number; stdDev: number; unit: string; label: string }> = {
  iddq: { nominal: 12.2, stdDev: 0.85, unit: 'µA', label: 'Quiescent Current (Iddq)' },
  leakageCurrent: { nominal: 1.15, stdDev: 0.15, unit: 'nA', label: 'Leakage Current' },
  propagationDelay: { nominal: 3.42, stdDev: 0.12, unit: 'ns', label: 'Propagation Delay' },
  temperature: { nominal: 125.0, stdDev: 1.2, unit: '°C', label: 'Junction Temperature' },
  voltage: { nominal: 3.30, stdDev: 0.02, unit: 'V', label: 'Supply Voltage (Vdd)' },
};

// Generate 5 realistic lots
export const DEMO_LOTS: LotData[] = [
  {
    id: 'LOT-A23',
    name: 'Lot Alpha-23 (Rad-Hard Flight Candidate)',
    waferBatch: 'WF-2026-0881',
    componentCount: 32,
    passedCount: 26,
    reviewCount: 5,
    rejectedCount: 1,
    avgRisk: 28.4,
    avgDrift: 0.024,
    avgDataQuality: 98.6,
    healthStatus: 'DEVIATION_DETECTED',
    dominantIssue: 'Progressive Iddq drift on 3 peripheral dice (e.g. CMP-1048)',
  },
  {
    id: 'LOT-B17',
    name: 'Lot Bravo-17 (High-Rel ASIC Processing)',
    waferBatch: 'WF-2026-0914',
    componentCount: 26,
    passedCount: 20,
    reviewCount: 4,
    rejectedCount: 2,
    avgRisk: 34.2,
    avgDrift: 0.038,
    avgDataQuality: 97.4,
    healthStatus: 'ELEVATED_RISK',
    dominantIssue: 'Parametric gate leakage surge at 96h stage (CMP-1082)',
  },
  {
    id: 'LOT-C09',
    name: 'Lot Charlie-09 (PMIC Space-Grade)',
    waferBatch: 'WF-2026-0790',
    componentCount: 22,
    passedCount: 19,
    reviewCount: 3,
    rejectedCount: 0,
    avgRisk: 21.6,
    avgDrift: 0.016,
    avgDataQuality: 94.2,
    healthStatus: 'HEALTHY',
    dominantIssue: 'Data telemetry continuity gaps on 1 test channel (CMP-1033)',
  },
  {
    id: 'LOT-D44',
    name: 'Lot Delta-44 (Telemetry Interface ADC)',
    waferBatch: 'WF-2026-0942',
    componentCount: 18,
    passedCount: 12,
    reviewCount: 5,
    rejectedCount: 1,
    avgRisk: 41.5,
    avgDrift: 0.046,
    avgDataQuality: 96.8,
    healthStatus: 'DEVIATION_DETECTED',
    dominantIssue: 'Elevated wafer-level variance across propagation delay',
  },
  {
    id: 'LOT-E51',
    name: 'Lot Echo-51 (FPGA Golden Flight Batch)',
    waferBatch: 'WF-2026-1011',
    componentCount: 14,
    passedCount: 14,
    reviewCount: 0,
    rejectedCount: 0,
    avgRisk: 14.2,
    avgDrift: 0.008,
    avgDataQuality: 99.4,
    healthStatus: 'HEALTHY',
    dominantIssue: 'Nominal baseline conformance across all 14 units',
  },
];

// Helper to generate consistent components
function generateSyntheticComponents(): ComponentData[] {
  const components: ComponentData[] = [];

  // Special Highlight 1: CMP-1048 (Flagship SIH Walkthrough Component: LOT-A23, Strong progressive Iddq drift, REVIEW, Risk 87)
  components.push({
    id: 'CMP-1048',
    lotId: 'LOT-A23',
    partType: 'Rad-Hard FPGA Controller',
    packageType: 'CQFP-208',
    status: 'REVIEW',
    riskScore: 87,
    riskBand: 'CRITICAL',
    driftSlope: 0.098, // uA/h (Exceeds configured 0.075 uA/h)
    predicted168hValue: 28.65,
    baseline168hExpected: 13.80,
    driftRatio: 2.08,
    anomalyScore: 0.88,
    primaryParameter: 'iddq',
    dataQualityScore: 99.1,
    measurements: [
      { hour: 0, iddq: 12.35, leakageCurrent: 1.12, propagationDelay: 3.41, temperature: 125.1, voltage: 3.30 },
      { hour: 24, iddq: 14.12, leakageCurrent: 1.18, propagationDelay: 3.43, temperature: 124.9, voltage: 3.30 },
      { hour: 96, iddq: 19.80, leakageCurrent: 1.34, propagationDelay: 3.48, temperature: 125.2, voltage: 3.31 },
      { hour: 168, iddq: 28.65, leakageCurrent: 1.62, propagationDelay: 3.56, temperature: 125.0, voltage: 3.29 },
    ],
    explanations: [
      'Iddq increased monotonically across all burn-in stages (+132% from 0h baseline).',
      'Calculated drift slope (0.098 µA/h) exceeds the configured prototype threshold of 0.075 µA/h.',
      'Component deviates +3.82 standard deviations from Lot A23 baseline median.',
      'Extrapolated parameter trajectory indicates potential degradation toward risk boundary at extended mission hours.',
    ],
    featureContributions: [
      { feature: 'Drift Slope (Iddq)', importance: 0.42, effect: 'elevates_risk', description: 'Monotonic upward drift across 24h, 96h, and 168h burn-in intervals.' },
      { feature: 'Lot Baseline Deviation', importance: 0.28, effect: 'elevates_risk', description: 'Iddq diverges from Lot Alpha-23 cluster mean by 3.82 standard deviations.' },
      { feature: 'Absolute Parametric Shift', importance: 0.18, effect: 'elevates_risk', description: 'Total delta of +16.30 µA exceeds prototype screening allowance.' },
      { feature: 'Temperature Correlation', importance: 0.08, effect: 'neutral', description: 'Chamber temperature remained stable (125.0°C ± 0.2°C); drift is not thermally induced.' },
      { feature: 'Data Telemetry Continuity', importance: 0.04, effect: 'reduces_risk', description: 'All 4 test hours (0h, 24h, 96h, 168h) present with zero missing records.' },
    ],
    flaggedReasons: ['Progressive Iddq Drift', 'Lot Median Divergence', 'Prototype Boundary Proximity'],
    engineerNotes: 'Flagged for engineering review during Lot A23 screening. Recommend physical cross-sectioning or extended 240h test bench characterization.',
    lastUpdated: '2026-09-28 06:40 UTC',
  });

  // Special Highlight 2: CMP-1082 (Sudden leakage surge at 96h, LOT-B17, REJECT, Risk 94)
  components.push({
    id: 'CMP-1082',
    lotId: 'LOT-B17',
    partType: 'Rad-Tolerant ASIC Buffer',
    packageType: 'CLCC-68',
    status: 'REJECT',
    riskScore: 94,
    riskBand: 'CRITICAL',
    driftSlope: 0.224, // nA/h
    predicted168hValue: 38.40,
    baseline168hExpected: 1.45,
    driftRatio: 26.48,
    anomalyScore: 0.96,
    primaryParameter: 'leakageCurrent',
    dataQualityScore: 98.4,
    measurements: [
      { hour: 0, iddq: 12.18, leakageCurrent: 1.14, propagationDelay: 3.39, temperature: 125.0, voltage: 3.30 },
      { hour: 24, iddq: 12.45, leakageCurrent: 1.28, propagationDelay: 3.40, temperature: 125.1, voltage: 3.30 },
      { hour: 96, iddq: 16.20, leakageCurrent: 14.80, propagationDelay: 3.52, temperature: 125.3, voltage: 3.30 },
      { hour: 168, iddq: 22.40, leakageCurrent: 38.40, propagationDelay: 3.74, temperature: 124.8, voltage: 3.29 },
    ],
    explanations: [
      'Severe non-linear leakage surge detected between 24h and 96h test intervals.',
      '168h leakage value (38.40 nA) is >25x higher than the Lot B17 baseline median (1.45 nA).',
      'Robust Z-score of 8.42 signifies critical dielectric or oxide integrity deviation.',
    ],
    featureContributions: [
      { feature: 'Surge Magnitude (Leakage)', importance: 0.48, effect: 'elevates_risk', description: 'Sudden order-of-magnitude surge at 96h test stage.' },
      { feature: 'Lot Distribution Outlier', importance: 0.32, effect: 'elevates_risk', description: 'Z-score exceeds 8.0 relative to Lot B17 cohort.' },
      { feature: 'Propagation Shift Coupling', importance: 0.12, effect: 'elevates_risk', description: 'Concurrent propagation delay increased from 3.39ns to 3.74ns.' },
      { feature: 'Chamber Uniformity', importance: 0.08, effect: 'neutral', description: 'Thermal environment maintained within specification.' },
    ],
    flaggedReasons: ['Abrupt Parametric Surge', 'Critical Oxide Anomaly', 'Extreme Lot Outlier'],
    engineerNotes: 'High risk of premature gate oxide breakdown. Prototype recommendation: REJECT.',
    lastUpdated: '2026-09-28 07:15 UTC',
  });

  // Special Highlight 3: CMP-1015 (Golden nominal baseline, LOT-A23, PASS, Risk 12)
  components.push({
    id: 'CMP-1015',
    lotId: 'LOT-A23',
    partType: 'Rad-Hard FPGA Controller',
    packageType: 'CQFP-208',
    status: 'PASS',
    riskScore: 12,
    riskBand: 'LOW',
    driftSlope: 0.007,
    predicted168hValue: 12.95,
    baseline168hExpected: 12.90,
    driftRatio: 1.00,
    anomalyScore: 0.08,
    primaryParameter: 'iddq',
    dataQualityScore: 99.8,
    measurements: [
      { hour: 0, iddq: 12.10, leakageCurrent: 1.10, propagationDelay: 3.40, temperature: 125.0, voltage: 3.30 },
      { hour: 24, iddq: 12.25, leakageCurrent: 1.11, propagationDelay: 3.41, temperature: 125.0, voltage: 3.30 },
      { hour: 96, iddq: 12.60, leakageCurrent: 1.14, propagationDelay: 3.42, temperature: 125.1, voltage: 3.30 },
      { hour: 168, iddq: 12.95, leakageCurrent: 1.16, propagationDelay: 3.42, temperature: 125.0, voltage: 3.30 },
    ],
    explanations: [
      'Minimal parametric change over 168 burn-in hours (+0.85 µA total shift).',
      'Drift slope is well below prototype warning limit of 0.075 µA/h.',
      'Conforms tightly to Lot Alpha-23 baseline median across all 5 test parameters.',
    ],
    featureContributions: [
      { feature: 'Parameter Stability', importance: 0.45, effect: 'reduces_risk', description: 'Iddq variance across 168h is under 7% of nominal range.' },
      { feature: 'Lot Baseline Concordance', importance: 0.35, effect: 'reduces_risk', description: 'Within 0.3 standard deviations of lot central tendency.' },
      { feature: 'Leakage Flatness', importance: 0.15, effect: 'reduces_risk', description: 'Sub-nanoamp leakage stability confirms dielectric robustness.' },
      { feature: 'Complete Telemetry', importance: 0.05, effect: 'reduces_risk', description: 'Zero gaps in test telemetry.' },
    ],
    flaggedReasons: [],
    engineerNotes: 'Nominal burn-in behavior. Demonstrates expected space-grade stabilization profile.',
    lastUpdated: '2026-09-28 05:22 UTC',
  });

  // Special Highlight 4: CMP-1033 (Data continuity gap, LOT-C09, REVIEW, Risk 62, missing 96h)
  components.push({
    id: 'CMP-1033',
    lotId: 'LOT-C09',
    partType: 'PMIC Space-Grade',
    packageType: 'QFN-48',
    status: 'REVIEW',
    riskScore: 62,
    riskBand: 'HIGH',
    driftSlope: 0.038,
    predicted168hValue: 14.80,
    baseline168hExpected: 13.10,
    driftRatio: 1.13,
    anomalyScore: 0.65,
    primaryParameter: 'voltage',
    dataQualityScore: 74.0, // Reduced due to missing stage
    measurements: [
      { hour: 0, iddq: 12.20, leakageCurrent: 1.15, propagationDelay: 3.42, temperature: 125.0, voltage: 3.30 },
      { hour: 24, iddq: 12.80, leakageCurrent: 1.19, propagationDelay: 3.44, temperature: 125.1, voltage: 3.28 },
      // Note: 96h reading was skipped or unrecorded in test socket
      { hour: 96, iddq: 13.40, leakageCurrent: 1.25, propagationDelay: 3.46, temperature: 125.0, voltage: 3.25 },
      { hour: 168, iddq: 14.80, leakageCurrent: 1.38, propagationDelay: 3.51, temperature: 125.2, voltage: 3.21 },
    ],
    explanations: [
      'Data telemetry continuity warning: Stage 96h telemetry was flagged with socket acquisition retry.',
      'Slight downward bias in regulated output voltage (-90 mV delta from 0h baseline).',
      'Data Quality Index penalized to 74.0% due to telemetry interval irregularity.',
    ],
    featureContributions: [
      { feature: 'Data Telemetry Continuity', importance: 0.40, effect: 'elevates_risk', description: 'Telemetry interval gap between 24h and 168h reduces model confidence.' },
      { feature: 'Voltage Regulation Drift', importance: 0.35, effect: 'elevates_risk', description: 'Output voltage drift approaches configured 3% load limit.' },
      { feature: 'Iddq Conformance', importance: 0.25, effect: 'neutral', description: 'Quiescent current remains within permissible cohort bounds.' },
    ],
    flaggedReasons: ['Telemetry Continuity Gap', 'Parametric Voltage Sag'],
    engineerNotes: 'Recommend socket contact inspection and re-test at 168h before final screening disposition.',
    lastUpdated: '2026-09-28 06:10 UTC',
  });

  // Special Highlight 5: CMP-1065 (Lot D44 deviation: propagation delay drift)
  components.push({
    id: 'CMP-1065',
    lotId: 'LOT-D44',
    partType: 'Telemetry Interface ADC',
    packageType: 'SSOP-28',
    status: 'REVIEW',
    riskScore: 73,
    riskBand: 'HIGH',
    driftSlope: 0.052,
    predicted168hValue: 4.12,
    baseline168hExpected: 3.55,
    driftRatio: 1.16,
    anomalyScore: 0.76,
    primaryParameter: 'propagationDelay',
    dataQualityScore: 98.2,
    measurements: [
      { hour: 0, iddq: 12.05, leakageCurrent: 1.12, propagationDelay: 3.42, temperature: 125.0, voltage: 3.30 },
      { hour: 24, iddq: 12.30, leakageCurrent: 1.18, propagationDelay: 3.65, temperature: 125.1, voltage: 3.30 },
      { hour: 96, iddq: 12.90, leakageCurrent: 1.25, propagationDelay: 3.92, temperature: 125.0, voltage: 3.30 },
      { hour: 168, iddq: 13.40, leakageCurrent: 1.34, propagationDelay: 4.12, temperature: 125.0, voltage: 3.30 },
    ],
    explanations: [
      'Propagation delay increased +0.70 ns over 168h, exceeding the configured 0.30 ns limit.',
      'Indicates potential channel carrier mobility degradation under thermal burn-in stress.',
      'Component exhibits slowest response time in Lot Delta-44.',
    ],
    featureContributions: [
      { feature: 'Propagation Delay Delta', importance: 0.44, effect: 'elevates_risk', description: 'Shift of +0.70 ns exceeds maximum recommended timing budget.' },
      { feature: 'Lot Delta-44 Timing Dispersion', importance: 0.30, effect: 'elevates_risk', description: 'Separates from lot cluster into upper 95th percentile.' },
      { feature: 'Iddq Stability', importance: 0.26, effect: 'neutral', description: 'Current metrics remain reasonably well-behaved.' },
    ],
    flaggedReasons: ['Propagation Delay Drift', 'Timing Budget Violation'],
    engineerNotes: 'May degrade clock edge margin at sub-zero operating temperatures.',
    lastUpdated: '2026-09-28 04:45 UTC',
  });

  // Now systematically populate remaining ~107 components across all 5 lots
  const lotConfigs = [
    { lotId: 'LOT-A23', count: 29, startId: 1001, partType: 'Rad-Hard FPGA Controller', pkg: 'CQFP-208' },
    { lotId: 'LOT-B17', count: 24, startId: 1070, partType: 'Rad-Tolerant ASIC Buffer', pkg: 'CLCC-68' },
    { lotId: 'LOT-C09', count: 20, startId: 1100, partType: 'PMIC Space-Grade', pkg: 'QFN-48' },
    { lotId: 'LOT-D44', count: 16, startId: 1130, partType: 'Telemetry Interface ADC', pkg: 'SSOP-28' },
    { lotId: 'LOT-E51', count: 14, startId: 1160, partType: 'FPGA Golden Flight Batch', pkg: 'CQFP-208' },
  ];

  let seq = 0;
  for (const config of lotConfigs) {
    for (let i = 0; i < config.count; i++) {
      seq++;
      const compNum = config.startId + i;
      const compId = `CMP-${compNum}`;

      // Skip already defined components
      if (['CMP-1048', 'CMP-1082', 'CMP-1015', 'CMP-1033', 'CMP-1065'].includes(compId)) {
        continue;
      }

      // Determine profile based on position
      const isReview = (seq % 9 === 0) || (config.lotId === 'LOT-D44' && i < 4);
      const isReject = (config.lotId === 'LOT-B17' && i === 12);
      const status: ScreeningDecision = isReject ? 'REJECT' : isReview ? 'REVIEW' : 'PASS';

      // Generate realistic measurements
      const iddqBase = 12.0 + (seq % 7) * 0.15;
      const iddqDriftFactor = isReject ? 0.085 : isReview ? 0.045 : 0.008;
      const m0_iddq = +(iddqBase).toFixed(2);
      const m24_iddq = +(iddqBase + 24 * iddqDriftFactor + (Math.sin(seq) * 0.08)).toFixed(2);
      const m96_iddq = +(iddqBase + 96 * iddqDriftFactor + (Math.cos(seq) * 0.12)).toFixed(2);
      const m168_iddq = +(iddqBase + 168 * iddqDriftFactor + (Math.sin(seq * 2) * 0.15)).toFixed(2);

      const leakBase = 1.10 + (seq % 5) * 0.04;
      const leakFactor = isReject ? 0.12 : isReview ? 0.006 : 0.001;
      const m0_leak = +(leakBase).toFixed(2);
      const m24_leak = +(leakBase + 24 * leakFactor).toFixed(2);
      const m96_leak = +(leakBase + 96 * leakFactor + (isReject ? 8.5 : 0)).toFixed(2);
      const m168_leak = +(leakBase + 168 * leakFactor + (isReject ? 19.2 : 0)).toFixed(2);

      const propBase = 3.38 + (seq % 6) * 0.03;
      const propShift = isReview ? 0.22 : 0.04;
      const m0_prop = +(propBase).toFixed(2);
      const m24_prop = +(propBase + propShift * 0.15).toFixed(2);
      const m96_prop = +(propBase + propShift * 0.6).toFixed(2);
      const m168_prop = +(propBase + propShift).toFixed(2);

      const driftSlope = +((m168_iddq - m0_iddq) / 168).toFixed(3);
      const riskScore = isReject ? 84 + (seq % 10) : isReview ? 48 + (seq % 22) : 10 + (seq % 20);
      const riskBand: RiskBand = riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'HIGH' : riskScore >= 30 ? 'MEDIUM' : 'LOW';
      const anomalyScore = +(riskScore / 100).toFixed(2);

      const explanations: string[] = [];
      const flaggedReasons: string[] = [];

      if (status === 'PASS') {
        explanations.push('Component exhibits nominal parametric stability within lot distribution tolerances.');
        explanations.push(`Observed drift slope of ${driftSlope} µA/h remains well inside prototype threshold.`);
      } else if (status === 'REVIEW') {
        explanations.push(`Mild parametric divergence observed in ${driftSlope > 0.04 ? 'Iddq' : 'propagation delay'}.`);
        explanations.push('Approaches configured prototype warning boundary; secondary engineering review advised.');
        flaggedReasons.push(driftSlope > 0.04 ? 'Mild Iddq Drift' : 'Timing Variance');
      } else {
        explanations.push('Non-linear parametric excursion detected exceeding screening tolerances.');
        explanations.push('Significant risk score calculated by anomaly detection ensemble.');
        flaggedReasons.push('Parametric Excursion', 'Critical Lot Outlier');
      }

      components.push({
        id: compId,
        lotId: config.lotId,
        partType: config.partType,
        packageType: config.pkg,
        status,
        riskScore,
        riskBand,
        driftSlope,
        predicted168hValue: m168_iddq,
        baseline168hExpected: +(iddqBase + 168 * 0.008).toFixed(2),
        driftRatio: +(m168_iddq / (iddqBase + 168 * 0.008)).toFixed(2),
        anomalyScore,
        primaryParameter: isReject ? 'leakageCurrent' : isReview && seq % 2 === 0 ? 'propagationDelay' : 'iddq',
        dataQualityScore: +(97.5 + (seq % 5) * 0.5).toFixed(1),
        measurements: [
          { hour: 0, iddq: m0_iddq, leakageCurrent: m0_leak, propagationDelay: m0_prop, temperature: 125.0, voltage: 3.30 },
          { hour: 24, iddq: m24_iddq, leakageCurrent: m24_leak, propagationDelay: m24_prop, temperature: 125.1, voltage: 3.30 },
          { hour: 96, iddq: m96_iddq, leakageCurrent: m96_leak, propagationDelay: m96_prop, temperature: 125.0, voltage: 3.30 },
          { hour: 168, iddq: m168_iddq, leakageCurrent: m168_leak, propagationDelay: m168_prop, temperature: 125.0, voltage: 3.30 },
        ],
        explanations,
        featureContributions: [
          { feature: 'Parametric Trajectory', importance: 0.40, effect: status === 'PASS' ? 'reduces_risk' : 'elevates_risk', description: 'Calculated slope across 0h-168h intervals.' },
          { feature: 'Lot Central Tendency', importance: 0.35, effect: status === 'PASS' ? 'reduces_risk' : 'elevates_risk', description: `Conformance to ${config.lotId} baseline distribution.` },
          { feature: 'Chamber Consistency', importance: 0.15, effect: 'neutral', description: 'Uniform 125°C thermal soak.' },
          { feature: 'Telemetry Completeness', importance: 0.10, effect: 'reduces_risk', description: 'All test hour records present and verified.' },
        ],
        flaggedReasons,
        lastUpdated: `2026-09-28 0${(seq % 8) + 1}:1${seq % 10} UTC`,
      });
    }
  }

  return components;
}

export const DEMO_COMPONENTS: ComponentData[] = generateSyntheticComponents();

// System alerts derived from flagged demo components
export const DEMO_ALERTS: AlertItem[] = [
  {
    id: 'ALT-801',
    componentId: 'CMP-1048',
    lotId: 'LOT-A23',
    parameter: 'iddq',
    alertType: 'PROGRESSIVE_DRIFT',
    severity: 'HIGH',
    riskScore: 87,
    timestamp: '2026-09-28 06:40:12 UTC',
    status: 'ACTIVE',
    details: 'Calculated Iddq drift slope (0.098 µA/h) exceeds prototype threshold (0.075 µA/h).',
  },
  {
    id: 'ALT-802',
    componentId: 'CMP-1082',
    lotId: 'LOT-B17',
    parameter: 'leakageCurrent',
    alertType: 'PARAMETRIC_SURGE',
    severity: 'CRITICAL',
    riskScore: 94,
    timestamp: '2026-09-28 07:15:30 UTC',
    status: 'ACTIVE',
    details: 'Abrupt non-linear surge in leakage current at 96h stage (14.8 nA) and 168h stage (38.4 nA).',
  },
  {
    id: 'ALT-803',
    componentId: 'CMP-1033',
    lotId: 'LOT-C09',
    parameter: 'voltage',
    alertType: 'DATA_CONTINUITY',
    severity: 'MEDIUM',
    riskScore: 62,
    timestamp: '2026-09-28 06:10:04 UTC',
    status: 'ACTIVE',
    details: 'Telemetry stage 96h required acquisition retry; potential telemetry continuity penalty.',
  },
  {
    id: 'ALT-804',
    componentId: 'CMP-1065',
    lotId: 'LOT-D44',
    parameter: 'propagationDelay',
    alertType: 'LOT_DEVIATION',
    severity: 'HIGH',
    riskScore: 73,
    timestamp: '2026-09-28 04:45:19 UTC',
    status: 'ACKNOWLEDGED',
    details: 'Propagation delay timing shift (+0.70 ns) separates from Lot Delta-44 cohort median.',
  },
  {
    id: 'ALT-805',
    componentId: 'CMP-1077',
    lotId: 'LOT-B17',
    parameter: 'iddq',
    alertType: 'EARLY_DEGRADATION',
    severity: 'MEDIUM',
    riskScore: 56,
    timestamp: '2026-09-28 03:20:45 UTC',
    status: 'ACTIVE',
    details: 'Early non-linear rate of change detected in quiescent current between 0h and 24h intervals.',
  },
];

// Audit trail logs
export const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-28 07:30:15 UTC',
    user: 'Lead Reliability Engineer',
    action: 'SCREENING_DECISION_UPDATED',
    targetId: 'CMP-1048',
    details: 'Decision support recommendation flagged as REVIEW. Physical cross-section requested.',
  },
  {
    id: 'AUD-902',
    timestamp: '2026-09-28 07:18:40 UTC',
    user: 'Automated Screening Pipeline',
    action: 'ANOMALY_PIPELINE_EXECUTED',
    targetId: 'LOT-B17',
    details: 'Completed Isolation Forest and Robust Z-score scoring for 26 components in Lot Bravo-17.',
  },
  {
    id: 'AUD-903',
    timestamp: '2026-09-28 06:55:00 UTC',
    user: 'Component Test Engineer',
    action: 'DATA_QUALITY_VERIFIED',
    targetId: 'LOT-A23',
    details: 'Data Quality Index computed at 98.6%. 32 components ingested across 4 test stages.',
  },
  {
    id: 'AUD-904',
    timestamp: '2026-09-28 05:40:22 UTC',
    user: 'Lead Reliability Engineer',
    action: 'REPORT_EXPORTED',
    targetId: 'REP-2026-041',
    details: 'Generated and signed PDF screening summary for Lot Alpha-23 flight review.',
  },
];

// Demo reports
export const DEMO_REPORTS: ReportItem[] = [
  {
    id: 'REP-2026-041',
    title: 'Lot Alpha-23 Screening Intelligence Report',
    type: 'LOT_SCREENING',
    lotId: 'LOT-A23',
    generatedAt: '2026-09-28 05:40 UTC',
    status: 'COMPLETED',
    author: 'Lead Reliability Engineer (Demo)',
    summary: 'Comprehensive screening telemetry analysis for 32 FPGA controllers in Lot Alpha-23. Identified 26 PASS, 5 REVIEW, 1 REJECT recommendations.',
    metrics: {
      screenedCount: 32,
      passCount: 26,
      reviewCount: 5,
      rejectCount: 1,
      avgRiskScore: 28.4,
      dataQualityIndex: 98.6,
    },
    auditTrailId: 'AUD-904',
  },
  {
    id: 'REP-2026-042',
    title: 'CMP-1048 Component Drift & Anomaly Dossier',
    type: 'COMPONENT_RISK',
    componentId: 'CMP-1048',
    lotId: 'LOT-A23',
    generatedAt: '2026-09-28 07:05 UTC',
    status: 'COMPLETED',
    author: 'Automated Screening Pipeline',
    summary: 'Detailed single-device telemetry breakdown for CMP-1048. Demonstrates progressive Iddq drift slope of 0.098 µA/h with +3.82 standard deviation departure.',
    metrics: {
      screenedCount: 1,
      passCount: 0,
      reviewCount: 1,
      rejectCount: 0,
      avgRiskScore: 87.0,
      dataQualityIndex: 99.1,
    },
    auditTrailId: 'AUD-901',
  },
  {
    id: 'REP-2026-043',
    title: 'Lot Bravo-17 Parametric Surge Diagnostic',
    type: 'ANOMALY_ANALYSIS',
    lotId: 'LOT-B17',
    generatedAt: '2026-09-28 07:22 UTC',
    status: 'COMPLETED',
    author: 'Lead Reliability Engineer (Demo)',
    summary: 'Investigation into gate oxide leakage spike observed at 96h and 168h test stages across Lot Bravo-17 ASICs.',
    metrics: {
      screenedCount: 26,
      passCount: 20,
      reviewCount: 4,
      rejectCount: 2,
      avgRiskScore: 34.2,
      dataQualityIndex: 97.4,
    },
    auditTrailId: 'AUD-902',
  },
  {
    id: 'REP-2026-044',
    title: 'Pre-Screening Data Quality Audit (All 5 Lots)',
    type: 'DATA_QUALITY',
    generatedAt: '2026-09-28 04:15 UTC',
    status: 'COMPLETED',
    author: 'Data Quality Engine',
    summary: 'Multi-lot data hygiene audit covering 112 components and 448 stage measurement intervals. Overall Data Quality Index: 97.3%.',
    metrics: {
      screenedCount: 112,
      passCount: 91,
      reviewCount: 17,
      rejectCount: 4,
      avgRiskScore: 28.1,
      dataQualityIndex: 97.3,
    },
    auditTrailId: 'AUD-903',
  },
];

// Calculated Overall Data Quality Report
export function calculateDataQualityReport(components: ComponentData[]): DataQualityReport {
  let totalMeasurements = 0;
  let missingStages = 0;
  let outOfRange = 0;

  for (const c of components) {
    totalMeasurements += 4; // 0h, 24h, 96h, 168h
    if (c.measurements.length < 4) {
      missingStages += (4 - c.measurements.length);
    }
    for (const m of c.measurements) {
      if (m.temperature < 120 || m.temperature > 130) outOfRange++;
      if (m.voltage < 3.20 || m.voltage > 3.40) outOfRange++;
    }
  }

  const completeness = +(100 - (missingStages / totalMeasurements) * 100).toFixed(1);
  const validity = +(100 - (outOfRange / totalMeasurements) * 100).toFixed(1);
  const consistency = 98.4;
  const continuity = 96.8;
  const overallScore = +((completeness * 0.35 + validity * 0.25 + consistency * 0.20 + continuity * 0.20)).toFixed(1);

  return {
    overallScore,
    completeness,
    validity,
    consistency,
    continuity,
    missingStagesCount: missingStages,
    duplicateCount: 0,
    outOfRangeCount: outOfRange,
    totalRecordsChecked: totalMeasurements,
    issues: [
      {
        componentId: 'CMP-1033',
        lotId: 'LOT-C09',
        stage: '96h',
        issueType: 'Telemetry acquisition retry gap',
        severity: 'WARNING',
      },
      {
        componentId: 'CMP-1082',
        lotId: 'LOT-B17',
        stage: '168h',
        issueType: 'Parameter value out of typical 3-sigma range (38.40 nA)',
        severity: 'WARNING',
      },
    ],
  };
}
