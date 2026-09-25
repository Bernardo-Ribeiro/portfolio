import React from 'react';
import { User, GraduationCap, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const TIMELINE = [
    {
      period: '2024 — PRESENT',
      role: 'SYSTEMS & CREATIVE GRAPHICS DEVELOPER',
      focus: 'Range Engine Shaders, BGUI component library, Volumetric raymarching, and Full-Stack ERP architecture.'
    },
    {
      period: '2024 — 2026',
      role: 'TADS (ANALYSIS & SYSTEMS DEVELOPMENT)',
      focus: 'IFSul - Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (Santana do Livramento).'
    },
    {
      period: 'OPEN SOURCE',
      role: 'COMMUNITY & TOOLING CREATOR',
      focus: 'Author of open-source GLSL post-processing libraries, Python GUI toolkits, and game prototypes.'
    }
  ];

  const FOCUS_AREAS = [
    { name: 'COMPUTER GRAPHICS', desc: 'GLSL, OpenGL, Shaders, Multi-Pass Post-Processing, Screen Filters' },
    { name: 'GAME DEVELOPMENT', desc: 'Range Engine, Python, Real-Time Physics, Camera Controllers' },
    { name: '3D & CREATIVE DEV', desc: 'Three.js, WebGL2, WebGPU / vgpu, Interactive Math, Topology' },
    { name: 'SOFTWARE ENGINEERING', desc: 'React, TypeScript, Python / FastAPI, PostgreSQL, Clean Architecture' },
    { name: 'UI & TOOLING', desc: 'Modular GUI Systems (BGUI), Developer Tooling, Design Systems' },
  ];

  return (
    <section id="about" className="w-full py-28 bg-[#050505] border-t border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 border-b border-[#1c1c1c] pb-8">
          <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#FF1A1A]" />
            <span>[ SECTION 08 ] // PROFILE &amp; TRAJECTORY</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black font-display tracking-tight text-[#F2F2F2] uppercase leading-[0.88]">
            BERNARDO<br />
            RIBEIRO
          </h2>
          <div className="mt-6 font-mono text-base sm:text-lg text-[#F2F2F2] max-w-2xl border-l-2 border-[#FF1A1A] pl-4">
            &ldquo;Software developer interested in the intersection between software, graphics, 3D and interactive experiences.&rdquo;
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Factual Bio & Key Stats */}
          <div className="lg:col-span-6 space-y-8 font-mono text-xs">
            <div className="bg-[#080808] border border-[#1f1f1f] corner-bracket p-6 space-y-4">
              <div className="text-[11px] text-[#666] border-b border-[#181818] pb-2 flex justify-between">
                <span>IDENTITY / CONTEXT</span>
                <span className="text-[#00FF66]">NOMINAL</span>
              </div>

              <div className="space-y-3 text-sm font-sans text-[#aaa] leading-relaxed">
                <p>
                  Based in Santana do Livramento, Brazil. Focused on exploring real-time rendering constraints, authoring low-level shader passes, and building reliable tools for interactive 3D ecosystems.
                </p>
                <p>
                  Believes that true creative development requires understanding the mechanics beneath the surface: from rasterizer pipelines and GPU uniform buffers to architectural separation of concerns.
                </p>
              </div>

              <div className="pt-3 border-t border-[#181818] space-y-2 text-xs font-mono text-[#858585]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF1A1A]" />
                  <span>LOCATION: Santana do Livramento, RS, Brazil</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF1A1A]" />
                  <span>INSTITUTION: IFSul - Santana do Livramento (TADS)</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="text-[#FF1A1A] font-bold tracking-wider mb-4 flex items-center gap-2">
                <span>► TIMELINE &amp; MILESTONES</span>
              </div>
              <div className="space-y-4">
                {TIMELINE.map((t, idx) => (
                  <div key={idx} className="p-4 bg-[#090909] border border-[#1a1a1a]">
                    <div className="text-[10px] text-[#FF1A1A] tracking-wider mb-1">{t.period}</div>
                    <div className="text-[#F2F2F2] font-bold text-xs">{t.role}</div>
                    <div className="text-[#888] text-[11px] mt-1">{t.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Focus Areas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-xs text-[#FF1A1A] font-bold tracking-wider mb-4 flex items-center gap-2">
              <span>► PRIMARY DOMAINS</span>
            </div>

            <div className="space-y-3 font-mono">
              {FOCUS_AREAS.map((area, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#080808] border border-[#1c1c1c] hover:border-[#FF1A1A]/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm tracking-wide">
                      {area.name}
                    </span>
                    <span className="text-[10px] text-[#555]">0{idx + 1}</span>
                  </div>
                  <div className="text-xs text-[#858585] mt-2 font-sans">
                    {area.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Systems telemetry footnote */}
            <div className="p-4 bg-[#050505] border border-[#181818] font-mono text-[11px] text-[#666] flex justify-between items-center">
              <span>ENVIRONMENT: LINUX ARCH // MESA 26.2</span>
              <span className="text-[#FF1A1A]">STATUS: AVAILABLE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
