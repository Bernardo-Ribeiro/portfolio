import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { useGraphics } from '../../context/GraphicsContext';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { fps, triangles } = useGraphics();

  return (
    <section id="hero" className="relative w-full h-screen min-h-[640px] flex items-center justify-between overflow-hidden bg-[#050505] tech-grid">
      {/* Real-time 3D Scene with the Red Cube */}
      <HeroCanvas />

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none flex flex-col justify-between h-full pt-20 pb-10">
        
        {/* Top Technical Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#858585] border-b border-[#1c1c1c] pb-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF1A1A] animate-pulse" />
            <span className="text-white font-bold">RANGE_ENVIRONMENT // ONLINE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FPS: <strong className="text-white">{fps}</strong></span>
            <span>TRIS: <strong className="text-white">{triangles}</strong></span>
            <span>API: <strong className="text-[#FF1A1A]">WEBGL2 / VGPU</strong></span>
            <span className="hidden sm:inline">SCENE: <strong className="text-white">RANGE_DEFAULT_00</strong></span>
          </div>
        </div>

        {/* Central Typographic Hero */}
        <div className="my-auto py-8">
          <div className="inline-block px-2.5 py-1 mb-4 bg-[#FF1A1A]/10 border border-[#FF1A1A]/40 text-[#FF1A1A] font-mono text-[11px] tracking-wider pointer-events-auto">
            [ CREATIVE DEVELOPER &amp; GRAPHICS PROGRAMMER ]
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter text-[#F2F2F2] uppercase leading-[0.88] select-none">
            BERNARDO<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #F2F2F2' }}>RIBEIRO</span>
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 font-mono text-xs sm:text-sm text-[#858585]">
            <span className="text-[#FF1A1A] font-bold">► FOCUS:</span>
            <span>COMPUTER GRAPHICS</span>
            <span className="text-[#444] hidden sm:inline">/</span>
            <span>3D &amp; GLSL SHADERS</span>
            <span className="text-[#444] hidden sm:inline">/</span>
            <span>RANGE ENGINE</span>
            <span className="text-[#444] hidden sm:inline">/</span>
            <span>SOFTWARE ENGINEERING</span>
          </div>
        </div>

        {/* Bottom Bar: Concept & Scroll Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-[#1c1c1c] font-mono text-xs text-[#858585]">
          <div className="max-w-md">
            <p className="text-[11px] text-[#aaa] leading-relaxed">
              &ldquo;BUILDING DIGITAL EXPERIENCES THROUGH CODE, GRAPHICS AND 3D.&rdquo;
            </p>
            <div className="text-[10px] text-[#555] mt-1">
              REAL-TIME RENDERING ENVIRONMENT // EST. 2026
            </div>
          </div>

          <a
            href="#build"
            className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-[#F2F2F2] hover:text-[#FF1A1A] transition-colors py-1 group"
          >
            <span className="tracking-widest">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 text-[#FF1A1A] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Decorative Technical Reticles in Corners */}
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-[#FF1A1A] pointer-events-none" />
      <div className="absolute top-24 right-6 w-3 h-3 border-t border-r border-[#FF1A1A] pointer-events-none" />
    </section>
  );
};
