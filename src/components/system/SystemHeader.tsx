import React, { useState, useEffect } from 'react';
import { useGraphics } from '../../context/GraphicsContext';
import { Sliders, Menu, X, Command } from 'lucide-react';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';

interface SystemHeaderProps {
  onOpenCommandBar?: () => void;
}

const NAV_LINKS = [
  { label: 'DISCIPLINE', href: '#build' },
  { label: 'WORK', href: '#work' },
  { label: 'THE CUBE', href: '#cube' },
  { label: 'RANGE ENGINE', href: '#range' },
  { label: 'GRAPHICS LAB', href: '#lab' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export const SystemHeader: React.FC<SystemHeaderProps> = ({ onOpenCommandBar }) => {
  const { fps, setIsSettingsOpen, scrollProgress } = useGraphics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#FF2B2B] z-50 transition-all duration-75 shadow-[0_0_8px_rgba(255,43,43,0.5)]"
        style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono text-xs ${
          scrolled
            ? 'bg-[#0B0D13]/85 backdrop-blur-md border-b border-slate-800/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Callout */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-[#F1F5F9] hover:text-[#FF2B2B] transition-colors tracking-widest font-bold"
          >
            <span className="w-2 h-2 bg-[#FF2B2B] inline-block rounded-xs shadow-[0_0_6px_rgba(255,43,43,0.6)]" />
            <span>BERNARDO.RIBEIRO</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-slate-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-slate-100 transition-colors relative py-1 text-[11px] tracking-wider after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF2B2B] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: FPS + Command Bar + SYSTEM Button */}
          <div className="flex items-center gap-2.5">
            {/* Live FPS metric */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-slate-800/80 rounded-sm text-[10px] text-slate-400">
              <span className="text-[#FF2B2B] font-bold">FPS</span>
              <span className="text-slate-200">{fps}</span>
            </div>

            {/* Bencho Command Bar Trigger */}
            {onOpenCommandBar && (
              <button
                onClick={onOpenCommandBar}
                type="button"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500 transition-all text-[11px] rounded-sm cursor-pointer"
                title="Open Command Bar (⌘K)"
              >
                <Command className="w-3 h-3 text-[#00FF88]" />
                <span className="font-semibold">⌘K</span>
              </button>
            )}

            {/* System config trigger */}
            <BenchoMagneticButton
              onClick={() => setIsSettingsOpen(true)}
              strength={0.2}
              className="px-3 py-1 bg-white/[0.04] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 rounded-sm text-[11px] tracking-wider"
            >
              <Sliders className="w-3 h-3 text-[#FF2B2B]" />
              <span>SYSTEM</span>
            </BenchoMagneticButton>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white border border-slate-800 rounded-sm cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1017] border-b border-slate-800 px-6 py-4 space-y-3 font-mono text-xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-[#FF2B2B] py-1 border-b border-slate-800/50"
              >
                ► {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
