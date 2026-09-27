import React, { useRef } from 'react';
import { ArrowDown, Layers, FlaskConical, Mail, Command, Sparkles } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';

interface HeroSectionProps {
  onOpenCommandBar?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCommandBar }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Prioritize hero title for immediate Largest Contentful Paint (LCP)
    gsap.fromTo(
      '.hero-title-line',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
      }
    );

    gsap.fromTo(
      ['.hero-status', '.hero-badge'],
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
      }
    );

    gsap.fromTo(
      ['.hero-tag', '.hero-actions', '.hero-bottom'],
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'all',
        delay: 0.1,
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[680px] flex items-center justify-between overflow-hidden bg-transparent tech-grid"
    >
      {/* Hero Foreground Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-between h-full pt-24 pb-12 pointer-events-none">
        
        {/* Top Technical Status Ribbon */}
        <div className="hero-status pointer-events-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-slate-200 font-semibold tracking-wider">
              ONLINE // AVAILABLE FOR PROJECTS
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>LOCATION: <strong className="text-slate-200 font-normal">BRAZIL</strong></span>
            <span className="hidden sm:inline">STACK: <strong className="text-slate-200 font-normal">WEBGL / SHADERS / PYTHON</strong></span>
          </div>
        </div>

        {/* Central Typographic Hero */}
        <div className="my-auto py-6">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 mb-5 bg-white/[0.04] border border-white/[0.1] text-slate-300 font-mono text-xs tracking-wider rounded-sm pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
            <span>CREATIVE DEVELOPER &amp; GRAPHICS PROGRAMMER</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-[#F1F5F9] uppercase leading-[0.88] select-none">
            <span className="hero-title-line block">BERNARDO</span>
            <span
              className="hero-title-line block text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(241, 245, 249, 0.85)' }}
            >
              RIBEIRO
            </span>
          </h1>

          {/* Clean Focus Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400 pointer-events-auto">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span>FOCUS:</span>
            </span>
            {[
              'Computer Graphics',
              '3D & GLSL Shaders',
              'Range Engine',
              'Software Engineering',
            ].map((tag) => (
              <span
                key={tag}
                className="hero-tag px-2.5 py-1 bg-white/[0.03] border border-slate-800 text-slate-300 rounded-sm hover:border-[#FF2B2B] hover:text-white transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bencho Interactive Action Buttons (High Prominence) */}
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-3 pointer-events-auto font-mono text-xs">
            <BenchoMagneticButton
              href="#work"
              strength={0.3}
              className="px-5 py-2.5 bg-[#FF2B2B] hover:bg-[#ff4d4d] text-white font-semibold rounded-sm shadow-[0_0_20px_rgba(255,43,43,0.35)]"
            >
              <Layers className="w-4 h-4" />
              <span>EXPLORE WORK</span>
            </BenchoMagneticButton>

            <BenchoMagneticButton
              href="#lab"
              strength={0.3}
              className="px-4 py-2.5 bg-[#11141D] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 rounded-sm"
            >
              <FlaskConical className="w-4 h-4 text-[#FF2B2B]" />
              <span>REAL-TIME LAB</span>
            </BenchoMagneticButton>

            <BenchoMagneticButton
              href="#contact"
              strength={0.3}
              className="px-4 py-2.5 bg-[#11141D] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 rounded-sm"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>GET IN TOUCH</span>
            </BenchoMagneticButton>

            {onOpenCommandBar && (
              <BenchoMagneticButton
                onClick={onOpenCommandBar}
                strength={0.25}
                className="px-3.5 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border border-slate-800 rounded-sm hidden sm:inline-flex"
              >
                <Command className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>⌘K COMMANDS</span>
              </BenchoMagneticButton>
            )}
          </div>
        </div>

        {/* Bottom Bar: Concept & Scroll Indicator */}
        <div className="hero-bottom pointer-events-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-slate-800/80 font-mono text-xs text-slate-400">
          <div className="max-w-md">
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              &ldquo;Building digital experiences through code, real-time shaders and 3D graphics.&rdquo;
            </p>
          </div>

          <a
            href="#build"
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors py-1 group cursor-pointer"
          >
            <span className="tracking-widest">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 text-[#FF2B2B] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
