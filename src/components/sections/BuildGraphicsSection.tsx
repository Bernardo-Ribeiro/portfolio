import React, { useState, useRef } from 'react';
import type { ShaderRenderMode, CompanionShapeType } from '../../types/graphics';
import { useGraphics } from '../../context/GraphicsContext';
import { useGSAP, gsap } from '../../lib/gsap';
import { Sparkles, Terminal, Layers, Box, Cpu } from 'lucide-react';
import { BenchoTiltCard } from '../bencho/BenchoTiltCard';
import { IsoWireframePattern, InterferenceMeshPattern } from '../textures/BookOfShapesTextures';

interface DisciplineItem {
  id: string;
  label: string;
  sublabel: string;
  mode: ShaderRenderMode;
  shape: CompanionShapeType;
  desc: string;
  badge: string;
  formula: string;
}

export const BuildGraphicsSection: React.FC = () => {
  const [activeWordMode, setActiveWordMode] = useState<ShaderRenderMode>('WIREFRAME');
  const { updateCompanionState } = useGraphics();
  const sectionRef = useRef<HTMLElement>(null);

  const DISCIPLINES: DisciplineItem[] = [
    {
      id: '01',
      label: 'GRAPHICS',
      sublabel: 'PBR BRDF',
      mode: 'DEFAULT',
      shape: 'cube',
      desc: 'Physically-based microfacet rendering with Cook-Torrance specular and diffuse BRDF.',
      badge: 'CORE',
      formula: 'f_r = k_d * (c / π) + k_s * (D * F * G) / (4 * (n·v)(n·l))'
    },
    {
      id: '02',
      label: '3D TOPOLOGY',
      sublabel: 'RASTER WIRE',
      mode: 'WIREFRAME',
      shape: 'octahedron',
      desc: 'Direct Euclidean edge rasterization and triangle strip primitives for spatial analysis.',
      badge: 'GEOMETRY',
      formula: 'V - E + F = 2 (Euler-Poincaré Characteristic)'
    },
    {
      id: '03',
      label: 'PROCEDURAL SHADERS',
      sublabel: 'SIMPLEX NOISE',
      mode: 'CUSTOM',
      shape: 'torusKnot',
      desc: 'Hardware-accelerated 3D Simplex noise vertex perturbation in local normal coordinate space.',
      badge: 'GLSL',
      formula: 'P_displaced = P_orig + N * simplex3D(P * freq + time)'
    },
    {
      id: '04',
      label: 'ISO LATTICE',
      sublabel: 'BOOK OF SHAPES',
      mode: 'ISO_LATTICE',
      shape: 'dodecahedron',
      desc: 'Algorithmic isometric cube wireframe lattice texture inspired by Book of Shapes (iso-cube-wireframe).',
      badge: 'SHAPE ART',
      formula: 'IsoCoord = vec2(x * √3 - y, y * 2.0)'
    },
    {
      id: '05',
      label: 'INTERFERENCE MESH',
      sublabel: 'BOOK OF SHAPES',
      mode: 'INTERFERENCE',
      shape: 'icosahedron',
      desc: 'Wave harmonic moiré interference pattern inspired by Book of Shapes (interference-mesh & resonance).',
      badge: 'PHYSICS',
      formula: 'I(x,y,t) = 0.5 * (sin(d1·ω - t) + sin(d2·ω + t))'
    },
  ];

  const activeItem = DISCIPLINES.find((d) => d.mode === activeWordMode) || DISCIPLINES[0];

  const handleSelect = (d: DisciplineItem) => {
    setActiveWordMode(d.mode);
    updateCompanionState({
      mode: d.mode,
      shape: d.shape,
      rotationSpeed: 1.2,
    });
  };

  useGSAP(() => {
    // Robust GSAP animation that never traps elements at opacity: 0
    gsap.fromTo(
      '.build-header-anim',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.discipline-btn',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.build-card',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="build"
      className="w-full min-h-screen py-24 bg-transparent border-t border-slate-800/80 relative flex items-center overflow-hidden"
    >
      {/* Book of Shapes Generative Background Textures */}
      <IsoWireframePattern opacity={0.05} strokeColor="#FF2B2B" />
      <InterferenceMeshPattern opacity={0.03} strokeColor="#94A3B8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-20">
        {/* Left: Capability Matrix & Discipline Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center select-none">
          <div className="build-header-anim font-mono text-xs text-slate-400 tracking-widest mb-4 flex items-center gap-2">
            <span className="text-slate-200 font-semibold">[ 01 ]</span>
            <span className="w-6 h-[1px] bg-slate-700" />
            <span>CORE DISCIPLINE &amp; SHAPE LAB</span>
          </div>

          <div className="build-header-anim mb-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-slate-500 uppercase leading-[0.95]">
              <span className="text-slate-400 block text-xs sm:text-sm font-mono tracking-widest mb-2 font-normal">
                REAL-TIME GRAPHICS ENGINEERING
              </span>
              <span className="text-slate-200">I BUILD </span>
              <span className="text-[#FF2B2B] inline-block">
                {activeItem.label}.
              </span>
            </h2>
          </div>

          <p className="build-header-anim text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-6">
            Building software at the intersection of low-level graphics, shaders, and real-time interactive systems. Select any discipline to morph the 3D entity and switch render pipelines:
          </p>

          {/* Prominent Tactile Interactive Discipline Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {DISCIPLINES.map((d) => {
              const isSelected = activeWordMode === d.mode;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleSelect(d)}
                  onMouseEnter={() => handleSelect(d)}
                  className={`discipline-btn group relative px-4 py-3.5 rounded-sm border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#FF2B2B] bg-[#141824] shadow-[0_0_24px_rgba(255,43,43,0.25)] translate-x-1'
                      : 'border-slate-800/90 bg-[#0E1119]/90 hover:border-slate-600 hover:bg-[#151924]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#FF2B2B] shadow-[0_0_10px_#FF2B2B] scale-110'
                          : 'bg-slate-700 group-hover:bg-slate-400'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">{d.id} //</span>
                        <span
                          className={`font-mono text-xs font-bold tracking-wider truncate ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}
                        >
                          {d.label}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 truncate mt-0.5">
                        {d.sublabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs border tracking-wider ${
                        isSelected
                          ? 'bg-[#FF2B2B]/20 border-[#FF2B2B]/60 text-[#FF8585]'
                          : 'bg-white/[0.03] border-slate-700/80 text-slate-400'
                      }`}
                    >
                      {d.badge}
                    </span>
                    <span
                      className={`font-mono text-xs transition-transform ${
                        isSelected ? 'text-[#FF2B2B] translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      ►
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="build-header-anim max-w-lg font-mono text-xs text-slate-400 border-l-2 border-[#FF2B2B]/60 pl-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="font-semibold">Interactive Reactive Geometry</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Click or hover on any button above to morph the 3D entity in real-time, apply custom GLSL shaders, or switch to Book of Shapes generative textures.
            </p>
          </div>
        </div>

        {/* Right: Modern Telemetry Readout Card with Bencho Tilt */}
        <div className="build-card lg:col-span-5 relative z-20">
          <BenchoTiltCard
            maxTilt={6}
            spotlightColor="rgba(255, 43, 43, 0.12)"
            className="bg-[#11141D]/95 backdrop-blur-md border border-slate-800 rounded-sm p-6 space-y-5 font-mono text-xs corner-bracket shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Terminal className="w-4 h-4 text-[#FF2B2B]" />
                <span>TELEMETRY // PIPELINE INSPECTOR</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-[#FF2B2B]/10 border border-[#FF2B2B]/30 text-[#FF8585] rounded-sm font-bold">
                {activeWordMode}
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-slate-400 text-xs flex items-center justify-between">
                <span>MATHEMATICAL SPECIFICATION:</span>
                <span className="text-[10px] text-slate-500 font-mono">GLSL ES 3.0</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm font-sans leading-relaxed">
                {activeItem.desc}
              </p>
            </div>

            <div className="p-3 bg-black/40 border border-slate-800/90 rounded-xs space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#FF2B2B]" />
                <span>SHADER / MESH EQUATION:</span>
              </div>
              <div className="text-[11px] text-[#FF6B6B] font-mono break-all font-semibold">
                {activeItem.formula}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-[11px]">
              <div>
                <span className="text-slate-500 block">3D PRIMITIVE:</span>
                <span className="text-slate-200 font-bold uppercase flex items-center gap-1 mt-0.5">
                  <Box className="w-3 h-3 text-[#FF2B2B]" />
                  {activeItem.shape}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">RENDER CONTEXT:</span>
                <span className="text-slate-200 font-bold uppercase flex items-center gap-1 mt-0.5">
                  <Layers className="w-3 h-3 text-[#FF2B2B]" />
                  {activeItem.badge}
                </span>
              </div>
            </div>
          </BenchoTiltCard>
        </div>
      </div>
    </section>
  );
};
