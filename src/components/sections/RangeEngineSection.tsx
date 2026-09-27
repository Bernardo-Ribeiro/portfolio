import React, { useRef } from 'react';
import { RangeScene } from '../3d/RangeScene';
import { useGraphics } from '../../context/GraphicsContext';
import type { ShaderRenderMode } from '../../types/graphics';
import { RotateCcw, Box, Sun, Layers } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import { IsoWireframePattern } from '../textures/BookOfShapesTextures';

const SHADER_OPTIONS: { id: ShaderRenderMode; label: string }[] = [
  { id: 'DEFAULT', label: 'DEFAULT (PBR)' },
  { id: 'WIREFRAME', label: 'WIREFRAME' },
  { id: 'TOON', label: 'TOON / CEL' },
  { id: 'FRESNEL', label: 'FRESNEL RIM' },
  { id: 'GLITCH', label: 'GLITCH' },
  { id: 'DISSOLVE', label: 'DISSOLVE' },
  { id: 'CUSTOM', label: 'CUSTOM GLSL' },
  { id: 'ISO_LATTICE', label: 'ISO LATTICE (SHAPES)' },
  { id: 'INTERFERENCE', label: 'INTERFERENCE (MOIRÉ)' },
];

export const RangeEngineSection: React.FC = () => {
  const { rangeSettings, updateRangeSettings, resetRangeSettings, updateCompanionState } = useGraphics();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.range-heading',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  const handleShaderChange = (mode: ShaderRenderMode) => {
    updateRangeSettings({ shaderMode: mode });
    updateCompanionState({ mode });
  };

  return (
    <section
      ref={sectionRef}
      id="range"
      className="w-full py-24 bg-transparent border-t border-slate-800/80 relative overflow-hidden"
    >
      <IsoWireframePattern opacity={0.04} strokeColor="#94A3B8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Section Heading */}
        <div className="range-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800/80 pb-6">
          <div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mb-2 flex items-center gap-2">
              <span className="text-slate-200 font-semibold">[ 04 ]</span>
              <span className="w-6 h-[1px] bg-slate-700" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F1F5F9] uppercase">
              RANGE ENGINE
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs sm:text-sm text-slate-400">
            <p className="text-slate-300 leading-relaxed font-sans">
              &ldquo;Exploring real-time graphics, shaders, tools and interactive systems.&rdquo;
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Active viewport simulated from Range Engine scene graph and material pipeline.
            </p>
          </div>
        </div>

        {/* Interactive Workspace Grid: 3D Viewport + Settings Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 3D Viewport (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col h-[520px] lg:h-[620px]">
            <RangeScene />
          </div>

          {/* Settings Inspector Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-5 font-mono text-xs flex flex-col justify-between corner-bracket">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Box className="w-4 h-4 text-[#FF2B2B]" />
                  <span>SCENE // CUBE_INSPECTOR</span>
                </div>
                <button
                  onClick={resetRangeSettings}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              </div>

              {/* Shaders Selection */}
              <div className="mb-5">
                <div className="text-slate-400 text-[11px] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#FF2B2B]" />
                  <span>SHADER PIPELINE</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {SHADER_OPTIONS.map((opt) => {
                    const isSelected = rangeSettings.shaderMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleShaderChange(opt.id)}
                        className={`w-full text-left px-3 py-2 border rounded-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#FF2B2B] bg-[#FF2B2B]/10 text-white font-semibold'
                            : 'border-slate-800/80 bg-[#161A26] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-[#FF2B2B]' : 'bg-slate-700'
                            }`}
                          />
                          {opt.label}
                        </span>
                        {isSelected && <span className="text-[10px] text-[#FF2B2B]">ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lighting & PBR Sliders */}
              <div className="space-y-3.5 mb-4">
                <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Sun className="w-3 h-3 text-[#FF2B2B]" />
                  <span>LIGHTING &amp; MATERIAL PARAMETERS</span>
                </div>

                {/* Ambient Light */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>AMBIENT</span>
                    <span className="text-[#FF2B2B]">{rangeSettings.ambient.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.ambient}
                    onChange={(e) => updateRangeSettings({ ambient: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Exposure */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>EXPOSURE</span>
                    <span className="text-[#FF2B2B]">{rangeSettings.exposure.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={rangeSettings.exposure}
                    onChange={(e) => updateRangeSettings({ exposure: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Roughness */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>ROUGHNESS</span>
                    <span className="text-[#FF2B2B]">{rangeSettings.roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.roughness}
                    onChange={(e) => updateRangeSettings({ roughness: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Metallic */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>METALLIC</span>
                    <span className="text-[#FF2B2B]">{rangeSettings.metallic.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.metallic}
                    onChange={(e) => updateRangeSettings({ metallic: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Panel Bottom Telemetry */}
            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
              <span>UNIFORMS LINKED</span>
              <span className="text-[#00FF88]">REAL-TIME SYNC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
