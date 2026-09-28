import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { DemoLeadForm } from '../../types';

interface ContactProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate, onLaunchDemo }) => {
  const [formData, setFormData] = useState<DemoLeadForm>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    orgType: 'Space Agency / Lab',
    interestArea: 'Burn-in Drift Detection',
    message: '',
    preferredDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; leadId?: string } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Rigorous client-side validation
    if (!formData.name.trim() || !formData.organization.trim() || !formData.email.trim()) {
      setValidationError('Please complete all required fields (Name, Organization, Work Email).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setValidationError('Please provide a valid organizational email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContactLead(formData);
      setIsSubmitting(false);
      setSubmitResult({ success: true, leadId: res.leadId });
    } catch (err) {
      setIsSubmitting(false);
      setValidationError('Failed to record inquiry. Please check network connection.');
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Project Engagement</span>
            <span aria-hidden="true">·</span>
            <span>Contact & Demo Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Schedule a Technical Walkthrough
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Request an in-depth demonstration of DriftGuard's time-series screening algorithms with our SIH'26 engineering team.
          </p>
        </div>

        {submitResult?.success ? (
          <div className="p-8 rounded-lg bg-[#0c1322] border border-cyan-500/50 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Inquiry Registered Successfully</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for your interest in DriftGuard. Your inquiry has been routed to our project lead queue under registration token:
            </p>
            <div className="inline-block p-2 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-cyan-400 font-bold">
              {submitResult.leadId}
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onLaunchDemo}
                className="px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
              >
                Launch SIH'26 Demo Now
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-lg bg-[#0c1322] border border-slate-800 space-y-6 text-xs font-sans"
          >
            {validationError && (
              <div className="p-3 rounded bg-rose-950/30 border border-rose-800/60 text-rose-300 flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">
                  Organization / Entity <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Space Component Test Facility"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">
                  Work / Institutional Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. engineer@institution.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Organization Type</label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                >
                  <option>Space Agency / Department of Space Lab</option>
                  <option>NewSpace Satellite Manufacturer</option>
                  <option>Semiconductor Testing Laboratory</option>
                  <option>Defense / Avionics Contractor</option>
                  <option>Academic / Research Institution</option>
                  <option>Other Aerospace Entity</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Primary Area of Interest</label>
                <select
                  value={formData.interestArea}
                  onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                >
                  <option>Burn-in Progressive Drift Detection</option>
                  <option>Lot-Level Statistical Dispersion Analysis</option>
                  <option>Data Quality & ATE Ingestion Validation</option>
                  <option>Custom Lab Test Bench Integration</option>
                  <option>SIH'26 Hackathon Technical Review</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Specific Requirements or Message</label>
              <textarea
                rows={3}
                placeholder="Describe your component test setup, parameters measured (e.g. Iddq, propagation delay), or test bench formats..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Data Integrity Note: We do not share inquiries. Destination routing is configured server-side.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Transmitting Request...' : 'Submit Walkthrough Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
