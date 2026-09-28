import React, { useState } from 'react';
import { Headphones, Send, CheckCircle2, HelpCircle, FileQuestion, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

interface SupportProps {
  onSelectComponent: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Support: React.FC<SupportProps> = ({ onSelectComponent, onNavigateTab }) => {
  const [ticketType, setTicketType] = useState('REPORT_BAD_QUALITY_DATA');
  const [componentId, setComponentId] = useState('');
  const [lotId, setLotId] = useState('LOT-A23');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState<{ id: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !contactEmail.trim()) return;

    setIsSubmitting(true);
    const res = await api.submitSupportInquiry({
      type: ticketType,
      componentId,
      lotId,
      description,
      contactEmail,
    });
    setIsSubmitting(false);
    setTicketSubmitted({ id: res.ticketId });
  };

  const faqs = [
    {
      q: 'Why does DriftGuard label outcomes as "Recommendations" rather than "Certifications"?',
      a: 'DriftGuard is designed strictly as an engineering decision-support tool. It assists qualified reliability and mission assurance engineers by detecting anomalies, modeling drift, and synthesizing risk. Formal flight-worthiness certification is a sovereign regulatory process requiring qualified human judgment.',
    },
    {
      q: 'How does DriftGuard handle missing test stages or socket retry drops?',
      a: 'The pre-flight Data Quality Index (DQI) audits telemetry completeness, validity, consistency, and continuity before running machine learning models. If a critical intermediate stage (e.g. 96h) is missing, the component is isolated with a continuity flag rather than evaluated with missing data assumptions.',
    },
    {
      q: 'Can prototype drift slope thresholds be customized for different semiconductor technologies?',
      a: 'Yes. Prototype thresholds for Iddq drift slope, leakage current surges, and robust Z-score cutoffs can be adjusted directly through the "Config Limits" panel or enterprise organization settings.',
    },
    {
      q: 'How can our laboratory export screening dossiers to internal flight review committees?',
      a: 'The "Dossiers & Reports" tab provides one-click PDF export and printable dossiers containing executive summaries, full telemetry trajectories, mathematical feature contributions, and immutable audit IDs.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          <span>Laboratory Assistance & Knowledge</span>
          <span aria-hidden="true">·</span>
          <span>Technical Support Queue</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Lab Support & Telemetry Triage
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Submit data quality anomalies, report platform issues, or review screening engineering FAQs.
        </p>
      </div>

      {/* Support Submission Form */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Submit Engineering Support Ticket
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Routed to SIH'26 Technical Lead Queue
          </span>
        </div>

        {ticketSubmitted ? (
          <div className="p-6 rounded bg-slate-900 border border-cyan-500/40 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Support Ticket Logged</h3>
            <p className="text-xs text-slate-300">
              Your inquiry has been assigned queue tracking reference:
            </p>
            <div className="inline-block p-2 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-cyan-400 font-bold">
              {ticketSubmitted.id}
            </div>
            <div className="pt-2">
              <button
                onClick={() => setTicketSubmitted(null)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300">Issue Category</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
                >
                  <option value="REPORT_BAD_QUALITY_DATA">Report Bad Quality / Corrupt Data</option>
                  <option value="REPORT_APPLICATION_ISSUE">Report Application / Calculation Issue</option>
                  <option value="REQUEST_TECHNICAL_ASSISTANCE">Request Technical Assistance</option>
                  <option value="THRESHOLD_CONSULTATION">Threshold Calibration Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Component ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. CMP-1048"
                  value={componentId}
                  onChange={(e) => setComponentId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Lot ID</label>
                <select
                  value={lotId}
                  onChange={(e) => setLotId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
                >
                  <option value="LOT-A23">LOT-A23</option>
                  <option value="LOT-B17">LOT-B17</option>
                  <option value="LOT-C09">LOT-C09</option>
                  <option value="LOT-D44">LOT-D44</option>
                  <option value="LOT-E51">LOT-E51</option>
                  <option value="OTHER">Other / General</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Engineer Contact Email</label>
              <input
                type="email"
                required
                placeholder="screening-engineer@lab.institution.org"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Technical Description</label>
              <textarea
                rows={3}
                required
                placeholder="Describe observed telemetry discrepancy, ATE parser error, or threshold calibration question..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">
                * No personal email addresses are fabricated. Destination handled via environment proxy.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting Ticket...' : 'Dispatch Ticket to Queue'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Frequently Asked Technical Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded bg-slate-900/70 border border-slate-800 space-y-1.5">
              <h3 className="text-xs font-bold text-white font-mono">{faq.q}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
