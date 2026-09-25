import React from 'react';
import { RangeScene } from '../3d/RangeScene';
import { useGraphics } from '../../context/GraphicsContext';
import type { ShaderRenderMode } from '../../types/graphics';
import { RotateCcw, Box, Sun, Layers } from 'lucide-react';

const SHADER_OPTIONS: { id: ShaderRenderMode; label: string }[] = [
  { id: 'DEFAULT', label: 'DEFAULT (PBR)' },
  { id: 'WIREFRAME', label: 'WIREFRAME' },
  { id: 'TOON', label: 'TOON / CEL' },
  { id: 'FRESNEL', label: 'FRESNEL RIM' },
  { id: 'GLITCH', label: 'GLITCH' },
  { id: 'DISSOLVE', label: 'DISSOLVE (POINTS)' },
  { id: 'CUSTOM', label: 'CUSTOM GLSL' },
];

export const RangeEngineSection: React.FC = () => {
  const { rangeSettings, updateRangeSettings, resetRangeSettings } = useGraphics();

  return (
    <section id="range" className="w-full py-24 bg-[#050505] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1c1c1c] pb-6">
          <div>
            <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-2 flex items-center gap-2">
              <span>[ SECTION 03 ]</span>
              <span className="w-8 h-[1px] bg-[#FF1A1A]" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F2F2F2] uppercase">
              RANGE ENGINE
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs sm:text-sm text-[#858585]">
            <p className="text-[#F2F2F2] leading-relaxed">
              &ldquo;Exploring real-time graphics, shaders, tools and interactive systems.&rdquo;
            </p>
            <p className="text-[11px] text-[#666] mt-1">
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
          <div className="lg:col-span-4 bg-[#080808] border border-[#222222] corner-bracket p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c] mb-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Box className="w-4 h-4 text-[#FF1A1A]" />
                  <span>SCENE // CUBE_INSPECTOR</span>
                </div>
                <button
                  onClick={resetRangeSettings}
                  className="flex items-center gap-1 text-[10px] text-[#888] hover:text-[#FF1A1A] transition-colors cursor-pointer"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              </div>

              {/* Shaders Selection */}
              <div className="mb-5">
                <div className="text-[#858585] text-[11px] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#FF1A1A]" />
                  <span>SHADER PIPELINE</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {SHADER_OPTIONS.map((opt) => {
                    const isSelected = rangeSettings.shaderMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => updateRangeSettings({ shaderMode: opt.id })}
                        className={`w-full text-left px-2.5 py-1.5 border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                            : 'border-[#1a1a1a] bg-[#0c0c0c] text-[#858585] hover:border-[#333] hover:text-[#ddd]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FF1A1A]' : 'bg-[#333]'}`} />
                          {opt.label}
                        </span>
                        {isSelected && <span className="text-[10px] text-[#FF1A1A]">ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lighting & PBR Sliders */}
              <div className="space-y-3.5 mb-4">
                <div className="text-[#858585] text-[11px] flex items-center gap-1.5">
                  <Sun className="w-3 h-3 text-[#FF1A1A]" />
                  <span>LIGHTING &amp; MATERIAL PARAMETERS</span>
                </div>

                {/* Ambient Light */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#aaa] mb-1">
                    <span>AMBIENT</span>
                    <span className="text-[#FF1A1A]">{rangeSettings.ambient.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.ambient}
                    onChange={(e) => updateRangeSettings({ ambient: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Exposure */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#aaa] mb-1">
                    <span>EXPOSURE</span>
                    <span className="text-[#FF1A1A]">{rangeSettings.exposure.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={rangeSettings.exposure}
                    onChange={(e) => updateRangeSettings({ exposure: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Roughness */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#aaa] mb-1">
                    <span>ROUGHNESS</span>
                    <span className="text-[#FF1A1A]">{rangeSettings.roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.roughness}
                    onChange={(e) => updateRangeSettings({ roughness: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Metallic */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#aaa] mb-1">
                    <span>METALLIC</span>
                    <span className="text-[#FF1A1A]">{rangeSettings.metallic.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.metallic}
                    onChange={(e) => updateRangeSettings({ metallic: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Bloom */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#aaa] mb-1">
                    <span>BLOOM / EMISSION</span>
                    <span className="text-[#FF1A1A]">{rangeSettings.bloom.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rangeSettings.bloom}
                    onChange={(e) => updateRangeSettings({ bloom: parseFloat(e.target.value) })}
                    className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Panel Bottom Telemetry */}
            <div className="pt-3 border-t border-[#1c1c1c] text-[10px] text-[#666] flex justify-between">
              <span>DRIVER: RANGE_DIRECTX/GL</span>
              <span className="text-[#00FF66]">UNIFORMS SYNCHRONIZED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
