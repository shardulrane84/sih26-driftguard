export interface Measurement {
  hour: 0 | 24 | 96 | 168;
  iddq: number; // in microamps (uA)
  leakageCurrent: number; // in nanoamps (nA)
  propagationDelay: number; // in nanoseconds (ns)
  temperature: number; // in Celsius (C)
  voltage: number; // in Volts (V)
}

export type ScreeningDecision = 'PASS' | 'REVIEW' | 'REJECT';
export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ParameterName = 'iddq' | 'leakageCurrent' | 'propagationDelay' | 'temperature' | 'voltage';

export interface FeatureContribution {
  feature: string;
  importance: number; // 0 to 1
  effect: 'elevates_risk' | 'reduces_risk' | 'neutral';
  description: string;
}

export interface ComponentData {
  id: string;
  lotId: string;
  partType: string;
  packageType: string;
  status: ScreeningDecision;
  riskScore: number; // 0 to 100
  riskBand: RiskBand;
  driftSlope: number; // calculated slope across test hours
  predicted168hValue: number;
  baseline168hExpected: number;
  driftRatio: number;
  anomalyScore: number; // 0 to 1
  primaryParameter: ParameterName;
  measurements: Measurement[];
  explanations: string[];
  featureContributions: FeatureContribution[];
  dataQualityScore: number;
  flaggedReasons: string[];
  engineerNotes?: string;
  lastUpdated: string;
}

export interface LotData {
  id: string;
  name: string;
  waferBatch: string;
  componentCount: number;
  passedCount: number;
  reviewCount: number;
  rejectedCount: number;
  avgRisk: number;
  avgDrift: number;
  avgDataQuality: number;
  healthStatus: 'HEALTHY' | 'DEVIATION_DETECTED' | 'ELEVATED_RISK';
  dominantIssue?: string;
}

export interface AlertItem {
  id: string;
  componentId: string;
  lotId: string;
  parameter: ParameterName;
  alertType: 'PROGRESSIVE_DRIFT' | 'LOT_DEVIATION' | 'PARAMETRIC_SURGE' | 'DATA_CONTINUITY' | 'EARLY_DEGRADATION';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  riskScore: number;
  timestamp: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  details: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: 'LOT_SCREENING' | 'COMPONENT_RISK' | 'DATA_QUALITY' | 'ANOMALY_ANALYSIS';
  lotId?: string;
  componentId?: string;
  generatedAt: string;
  status: 'COMPLETED' | 'GENERATING';
  author: string;
  summary: string;
  metrics: {
    screenedCount: number;
    passCount: number;
    reviewCount: number;
    rejectCount: number;
    avgRiskScore: number;
    dataQualityIndex: number;
  };
  auditTrailId: string;
}

export interface DataQualityReport {
  overallScore: number;
  completeness: number;
  validity: number;
  consistency: number;
  continuity: number;
  missingStagesCount: number;
  duplicateCount: number;
  outOfRangeCount: number;
  totalRecordsChecked: number;
  issues: {
    componentId: string;
    lotId: string;
    stage: string;
    issueType: string;
    severity: 'WARNING' | 'ERROR';
  }[];
}

export interface PrototypeThresholds {
  iddqMaxDriftSlope: number; // e.g. 0.08 uA/h
  leakageMaxDriftSlope: number; // e.g. 0.12 nA/h
  propDelayMaxShift: number; // e.g. 0.35 ns
  robustZScoreCutoff: number; // e.g. 2.5
  riskWeightDrift: number; // 0.40
  riskWeightAnomaly: number; // 0.35
  riskWeightLotDev: number; // 0.25
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetId: string;
  details: string;
}

export interface DemoLeadForm {
  name: string;
  organization: string;
  email: string;
  phone?: string;
  orgType: string;
  interestArea: string;
  message: string;
  preferredDate?: string;
}
