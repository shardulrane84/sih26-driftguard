import {
  ComponentData,
  LotData,
  AlertItem,
  ReportItem,
  DataQualityReport,
  PrototypeThresholds,
  AuditLogEntry,
  DemoLeadForm,
  ScreeningDecision,
} from '../types';
import {
  DEMO_LOTS,
  DEMO_COMPONENTS,
  DEMO_ALERTS,
  DEMO_REPORTS,
  DEMO_AUDIT_LOGS,
  DEFAULT_PROTOTYPE_THRESHOLDS,
  calculateDataQualityReport,
} from '../mock/demoData';

// Environment-aware API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';

// In-memory state for prototype session modifications (e.g. updating screening decisions, threshold tweaks)
let componentsState: ComponentData[] = [...DEMO_COMPONENTS];
let lotsState: LotData[] = [...DEMO_LOTS];
let alertsState: AlertItem[] = [...DEMO_ALERTS];
let reportsState: ReportItem[] = [...DEMO_REPORTS];
let auditLogsState: AuditLogEntry[] = [...DEMO_AUDIT_LOGS];
let thresholdsState: PrototypeThresholds = { ...DEFAULT_PROTOTYPE_THRESHOLDS };

export const api = {
  isDemoMode: () => IS_DEMO_MODE,
  getBaseUrl: () => API_BASE_URL,

  getOverviewMetrics: async () => {
    // Computes metrics dynamically from current components dataset
    const totalComponents = componentsState.length;
    const passCount = componentsState.filter((c) => c.status === 'PASS').length;
    const reviewCount = componentsState.filter((c) => c.status === 'REVIEW').length;
    const rejectCount = componentsState.filter((c) => c.status === 'REJECT').length;
    const criticalAlertsCount = alertsState.filter((a) => a.severity === 'CRITICAL' && a.status === 'ACTIVE').length;
    const dqReport = calculateDataQualityReport(componentsState);

    return {
      totalScreened: totalComponents,
      requiringReview: reviewCount,
      passed: passCount,
      rejected: rejectCount,
      criticalAlerts: criticalAlertsCount,
      activeAlertsTotal: alertsState.filter((a) => a.status === 'ACTIVE').length,
      dataQualityIndex: dqReport.overallScore,
      totalLots: lotsState.length,
      dataSource: IS_DEMO_MODE ? 'SYNTHETIC_DEMO' : 'LIVE_BACKEND',
    };
  },

  getLots: async (): Promise<LotData[]> => {
    // Recompute lot aggregates dynamically
    return lotsState.map((lot) => {
      const lotComps = componentsState.filter((c) => c.lotId === lot.id);
      const passed = lotComps.filter((c) => c.status === 'PASS').length;
      const review = lotComps.filter((c) => c.status === 'REVIEW').length;
      const reject = lotComps.filter((c) => c.status === 'REJECT').length;
      const avgRisk = lotComps.length > 0 ? +(lotComps.reduce((acc, c) => acc + c.riskScore, 0) / lotComps.length).toFixed(1) : 0;
      const avgDrift = lotComps.length > 0 ? +(lotComps.reduce((acc, c) => acc + Math.abs(c.driftSlope), 0) / lotComps.length).toFixed(3) : 0;

      return {
        ...lot,
        componentCount: lotComps.length,
        passedCount: passed,
        reviewCount: review,
        rejectedCount: reject,
        avgRisk,
        avgDrift,
      };
    });
  },

  getLotById: async (lotId: string): Promise<{ lot: LotData | undefined; components: ComponentData[] }> => {
    const lot = lotsState.find((l) => l.id === lotId);
    const components = componentsState.filter((c) => c.lotId === lotId);
    return { lot, components };
  },

  getComponents: async (filters?: {
    lotId?: string;
    status?: ScreeningDecision;
    search?: string;
    riskBand?: string;
    primaryParam?: string;
  }): Promise<ComponentData[]> => {
    let result = [...componentsState];

    if (filters?.lotId && filters.lotId !== 'ALL') {
      result = result.filter((c) => c.lotId === filters.lotId);
    }
    if (filters?.status && filters.status !== 'ALL' as any) {
      result = result.filter((c) => c.status === filters.status);
    }
    if (filters?.riskBand && filters.riskBand !== 'ALL') {
      result = result.filter((c) => c.riskBand === filters.riskBand);
    }
    if (filters?.primaryParam && filters.primaryParam !== 'ALL') {
      result = result.filter((c) => c.primaryParameter === filters.primaryParam);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.id.toLowerCase().includes(query) ||
          c.lotId.toLowerCase().includes(query) ||
          c.partType.toLowerCase().includes(query)
      );
    }

    return result;
  },

  getComponentById: async (componentId: string): Promise<ComponentData | undefined> => {
    return componentsState.find((c) => c.id === componentId);
  },

  updateComponentDecision: async (
    componentId: string,
    decision: ScreeningDecision,
    notes: string,
    author: string = 'Screening Engineer'
  ): Promise<ComponentData> => {
    const index = componentsState.findIndex((c) => c.id === componentId);
    if (index === -1) throw new Error('Component not found');

    const updated = {
      ...componentsState[index],
      status: decision,
      engineerNotes: notes,
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    };
    componentsState[index] = updated;

    // Log to audit trail
    auditLogsState.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user: author,
      action: 'SCREENING_DECISION_UPDATED',
      targetId: componentId,
      details: `Screening decision updated to ${decision}. Notes: ${notes || 'No notes supplied'}`,
    });

    return updated;
  },

  getAlerts: async (filters?: { severity?: string; status?: string }): Promise<AlertItem[]> => {
    let result = [...alertsState];
    if (filters?.severity && filters.severity !== 'ALL') {
      result = result.filter((a) => a.severity === filters.severity);
    }
    if (filters?.status && filters.status !== 'ALL') {
      result = result.filter((a) => a.status === filters.status);
    }
    return result;
  },

  updateAlertStatus: async (alertId: string, newStatus: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED'): Promise<AlertItem> => {
    const alert = alertsState.find((a) => a.id === alertId);
    if (!alert) throw new Error('Alert not found');
    alert.status = newStatus;
    return alert;
  },

  getDataQualityReport: async (): Promise<DataQualityReport> => {
    return calculateDataQualityReport(componentsState);
  },

  getReports: async (): Promise<ReportItem[]> => {
    return [...reportsState];
  },

  generateReport: async (payload: {
    type: 'LOT_SCREENING' | 'COMPONENT_RISK' | 'DATA_QUALITY' | 'ANOMALY_ANALYSIS';
    targetId?: string;
    title: string;
    author: string;
  }): Promise<ReportItem> => {
    const repId = `REP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const auditId = `AUD-${Date.now().toString().slice(-4)}`;

    const metrics = {
      screenedCount: payload.type === 'COMPONENT_RISK' ? 1 : componentsState.length,
      passCount: componentsState.filter((c) => c.status === 'PASS').length,
      reviewCount: componentsState.filter((c) => c.status === 'REVIEW').length,
      rejectCount: componentsState.filter((c) => c.status === 'REJECT').length,
      avgRiskScore: +(componentsState.reduce((a, b) => a + b.riskScore, 0) / componentsState.length).toFixed(1),
      dataQualityIndex: calculateDataQualityReport(componentsState).overallScore,
    };

    const newReport: ReportItem = {
      id: repId,
      title: payload.title,
      type: payload.type,
      lotId: payload.type === 'LOT_SCREENING' ? payload.targetId : undefined,
      componentId: payload.type === 'COMPONENT_RISK' ? payload.targetId : undefined,
      generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      status: 'COMPLETED',
      author: payload.author || 'Lead Reliability Engineer',
      summary: `Automated ${payload.type.toLowerCase().replace('_', ' ')} generated for decision-support evaluation under prototype thresholds.`,
      metrics,
      auditTrailId: auditId,
    };

    reportsState.unshift(newReport);

    auditLogsState.unshift({
      id: auditId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user: payload.author || 'Lead Reliability Engineer',
      action: 'REPORT_GENERATED',
      targetId: repId,
      details: `Generated traceable report "${payload.title}" (${payload.type})`,
    });

    return newReport;
  },

  getAuditLogs: async (): Promise<AuditLogEntry[]> => {
    return [...auditLogsState];
  },

  getPrototypeThresholds: async (): Promise<PrototypeThresholds> => {
    return { ...thresholdsState };
  },

  updatePrototypeThresholds: async (newThresholds: Partial<PrototypeThresholds>): Promise<PrototypeThresholds> => {
    thresholdsState = { ...thresholdsState, ...newThresholds };

    // Recompute component risk scores dynamically based on updated thresholds
    componentsState = componentsState.map((c) => {
      // If drift slope exceeds user threshold, elevate score
      const driftExcessRatio = Math.max(0, (c.driftSlope - thresholdsState.iddqMaxDriftSlope) / thresholdsState.iddqMaxDriftSlope);
      let calculatedScore = Math.min(
        100,
        Math.round(
          c.anomalyScore * 100 * thresholdsState.riskWeightAnomaly +
            (driftExcessRatio * 50 + (c.driftSlope > 0 ? 30 : 5)) * thresholdsState.riskWeightDrift +
            (c.driftRatio > 1.2 ? 40 : 10) * thresholdsState.riskWeightLotDev
        )
      );
      if (c.status === 'PASS' && calculatedScore > 40) calculatedScore = 28; // preserve stable golden units

      const riskBand: any = calculatedScore >= 80 ? 'CRITICAL' : calculatedScore >= 60 ? 'HIGH' : calculatedScore >= 30 ? 'MEDIUM' : 'LOW';
      return {
        ...c,
        riskScore: calculatedScore,
        riskBand,
      };
    });

    return { ...thresholdsState };
  },

  submitContactLead: async (formData: DemoLeadForm): Promise<{ success: boolean; message: string; leadId: string }> => {
    // In production, sends POST to /api/contact
    const leadId = `LEAD-${Date.now().toString().slice(-5)}`;
    // Client-side simulation of successful dispatch to secure backend queue
    return {
      success: true,
      message: 'Demo inquiry registered. Our technical team will coordinate via your verified organization email.',
      leadId,
    };
  },

  submitSupportInquiry: async (ticket: {
    type: string;
    componentId?: string;
    lotId?: string;
    description: string;
    contactEmail: string;
  }): Promise<{ ticketId: string; status: string }> => {
    const ticketId = `TCK-${Date.now().toString().slice(-4)}`;
    return {
      ticketId,
      status: 'LOGGED_IN_QUEUE',
    };
  },

  resetDemoState: () => {
    componentsState = [...DEMO_COMPONENTS];
    lotsState = [...DEMO_LOTS];
    alertsState = [...DEMO_ALERTS];
    reportsState = [...DEMO_REPORTS];
    auditLogsState = [...DEMO_AUDIT_LOGS];
    thresholdsState = { ...DEFAULT_PROTOTYPE_THRESHOLDS };
  },
};
