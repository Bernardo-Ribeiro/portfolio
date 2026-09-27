import React, { useRef } from 'react';
import { User, GraduationCap, MapPin } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import { BenchoTiltCard } from '../bencho/BenchoTiltCard';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    { name: '3D & CREATIVE DEV', desc: 'Three.js, WebGL2, WebGPU, Interactive Math, Topology' },
    { name: 'SOFTWARE ENGINEERING', desc: 'React, TypeScript, Python / FastAPI, PostgreSQL, Clean Architecture' },
    { name: 'UI & TOOLING', desc: 'Modular GUI Systems (BGUI), Developer Tooling, Design Systems' },
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.about-heading',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.about-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full py-28 bg-transparent border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Section Header */}
        <div className="about-heading max-w-4xl mb-16 border-b border-slate-800/80 pb-8">
          <div className="font-mono text-xs text-slate-400 tracking-widest mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#FF2B2B]" />
            <span className="text-slate-200 font-semibold">[ 05 ]</span>
            <span className="w-6 h-[1px] bg-slate-700" />
            <span>PROFILE &amp; TRAJECTORY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F1F5F9] uppercase leading-[0.92]">
            BERNARDO<br />
            RIBEIRO
          </h2>
          <div className="mt-6 font-mono text-base sm:text-lg text-slate-300 max-w-2xl border-l-2 border-[#FF2B2B] pl-4">
            &ldquo;Software developer interested in the intersection between software, graphics, 3D and interactive experiences.&rdquo;
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Factual Bio & Key Stats */}
          <div className="about-card lg:col-span-6 space-y-8 font-mono text-xs">
            <BenchoTiltCard
              maxTilt={5}
              spotlightColor="rgba(255, 43, 43, 0.08)"
              className="bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-6 space-y-4 corner-bracket shadow-lg"
            >
              <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
                <span>IDENTITY / CONTEXT</span>
                <span className="text-[#00FF88]">ACTIVE</span>
              </div>

              <div className="space-y-3 text-sm font-sans text-slate-300 leading-relaxed">
                <p>
                  Based in Santana do Livramento, Brazil. Focused on exploring real-time rendering constraints, authoring low-level shader passes, and building reliable tools for interactive 3D ecosystems.
                </p>
                <p>
                  Believes that true creative development requires understanding the mechanics beneath the surface: from rasterizer pipelines and GPU uniform buffers to architectural separation of concerns.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF2B2B]" />
                  <span>LOCATION: Santana do Livramento, RS, Brazil</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF2B2B]" />
                  <span>INSTITUTION: IFSul - Santana do Livramento (TADS)</span>
                </div>
              </div>
            </BenchoTiltCard>

            {/* Timeline */}
            <div>
              <div className="text-slate-300 font-semibold tracking-wider mb-4 flex items-center gap-2">
                <span className="text-[#FF2B2B]">►</span>
                <span>TIMELINE &amp; MILESTONES</span>
              </div>
              <div className="space-y-3">
                {TIMELINE.map((t, idx) => (
                  <div key={idx} className="p-4 bg-[#11141D]/80 border border-slate-800 rounded-sm">
                    <div className="text-[10px] text-[#FF2B2B] tracking-wider mb-1">{t.period}</div>
                    <div className="text-slate-200 font-bold text-xs">{t.role}</div>
                    <div className="text-slate-400 text-[11px] mt-1 font-sans">{t.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Focus Areas */}
          <div className="about-card lg:col-span-6 space-y-6">
            <div className="font-mono text-xs text-slate-300 font-semibold tracking-wider mb-4 flex items-center gap-2">
              <span className="text-[#FF2B2B]">►</span>
              <span>PRIMARY DOMAINS</span>
            </div>

            <div className="space-y-3 font-mono">
              {FOCUS_AREAS.map((area, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#11141D]/80 border border-slate-800 rounded-sm hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-bold text-sm tracking-wide">
                      {area.name}
                    </span>
                    <span className="text-[10px] text-slate-400">0{idx + 1}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2 font-sans">
                    {area.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
