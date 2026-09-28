import React, { useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLaunchDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onLaunchDemo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', path: '/product' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Who It’s For', path: '/who-its-for' },
    { label: 'Market Context', path: '/market' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: 3 Zones */}
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs" aria-hidden="true" />
              <span>DriftGuard</span>
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-slate-400 border-l border-slate-800 pl-3">
              SIH'26 | ISRO Context
            </span>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                      : 'hover:text-white text-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('/login')}
              className="text-xs font-mono font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Client Login
            </button>
            <button
              onClick={onLaunchDemo}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-sm transition-all shadow-sm shadow-cyan-950"
            >
              <span>Launch SIH'26 Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090e1a] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-2 px-3 rounded ${
                  currentPath === link.path ? 'bg-slate-800 text-cyan-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('/login');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center text-xs font-mono py-2 text-slate-300 border border-slate-800 rounded"
            >
              Client Login
            </button>
            <button
              onClick={() => {
                onLaunchDemo();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center text-xs font-mono font-semibold py-2.5 text-slate-950 bg-cyan-400 rounded"
            >
              Launch SIH'26 Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
