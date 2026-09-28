import React, { useState } from 'react';
import { Shield, Key, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface LoginProps {
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
  onLoginSuccess: (role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLaunchDemo, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Lead Reliability Engineer' | 'Component Test Engineer' | 'Mission Director'>('Lead Reliability Engineer');

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="w-full flex flex-col bg-[#070b14] text-slate-100 py-16">
      <div className="max-w-md mx-auto px-4 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            DriftGuard Access Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure authentication for screening laboratories & evaluator demonstration access.
          </p>
        </div>

        {/* SIH'26 Demo Direct Access Box (Primary Evaluator Route) */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-slate-900 via-[#0c1829] to-slate-900 border border-cyan-500/60 shadow-xl space-y-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SIH'26 Evaluator Instant Access</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluators can enter the fully pre-populated engineering dashboard immediately without configuring credentials.
          </p>
          <button
            onClick={onLaunchDemo}
            className="w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Pre-Populated Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Client Login Form */}
        <form
          onSubmit={handleClientLogin}
          className="p-6 rounded-lg bg-[#0c1322] border border-slate-800 space-y-4 text-xs font-sans"
        >
          <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
            Client Organization Login
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Organization User Email</label>
            <input
              type="email"
              required
              placeholder="engineer@agency-lab.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-slate-300 font-medium">Password</label>
              <span className="text-[10px] text-slate-500 font-mono">Demo: Any password</span>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Role Profile Simulation</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
            >
              <option>Lead Reliability Engineer</option>
              <option>Component Test Engineer</option>
              <option>Mission Director</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-mono font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            Authenticate Client Session
          </button>

          <div className="pt-2 text-[10px] font-mono text-slate-500 text-center">
            Enterprise SAML/SSO authentication is planned for production enterprise deployment.
          </div>
        </form>
      </div>
    </div>
  );
};
