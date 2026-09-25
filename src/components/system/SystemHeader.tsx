import React, { useState, useEffect } from 'react';
import { useGraphics } from '../../context/GraphicsContext';
import { Sliders, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'LAB', href: '#lab' },
  { label: 'RANGE', href: '#range' },
  { label: 'THE CUBE', href: '#cube' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TERMINAL', href: '#terminal' },
  { label: 'CONTACT', href: '#contact' },
];

export const SystemHeader: React.FC = () => {
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
        className="fixed top-0 left-0 h-[2px] bg-[#FF1A1A] z-50 transition-all duration-75"
        style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono text-xs ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#1c1c1c] py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Callout */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-[#F2F2F2] hover:text-[#FF1A1A] transition-colors tracking-widest font-bold"
          >
            <span className="w-2 h-2 bg-[#FF1A1A] inline-block" />
            <span>BERNARDO.RIBEIRO</span>
            <span className="text-[10px] text-[#666] hidden md:inline">// SYS_READY</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[#858585]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F2F2F2] transition-colors relative py-1 text-[11px] tracking-wider after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF1A1A] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: FPS + SYSTEM Button */}
          <div className="flex items-center gap-3">
            {/* Live FPS metric */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#0c0c0c] border border-[#222] text-[10px] text-[#858585]">
              <span className="text-[#FF1A1A] font-bold">FPS</span>
              <span>{fps}</span>
            </div>

            {/* System config trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111111] hover:bg-[#FF1A1A] text-[#F2F2F2] hover:text-white border border-[#2b2b2b] hover:border-[#FF1A1A] transition-all text-[11px] tracking-wider cursor-pointer"
              title="Open Graphics Settings"
            >
              <Sliders className="w-3 h-3 text-[#FF1A1A] group-hover:text-white" />
              <span>SYSTEM</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#858585] hover:text-white border border-[#222]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080808] border-b border-[#222] px-6 py-4 space-y-3 font-mono text-xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#aaa] hover:text-[#FF1A1A] py-1 border-b border-[#161616]"
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
