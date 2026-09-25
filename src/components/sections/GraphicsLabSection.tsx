import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { LabProceduralMesh, LabLightingScene, LabTopologyScene } from '../3d/LabCanvas';
import { WebGPUInspector } from '../3d/WebGPUInspector';
import { useGraphics } from '../../context/GraphicsContext';
import { FlaskConical, Sliders, Box, Sun, Tv } from 'lucide-react';

export const GraphicsLabSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<'001' | '002' | '003' | '004' | 'VGPU'>('001');
  const { labSettings, updateLabSettings, quality } = useGraphics();

  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  return (
    <section id="lab" className="w-full py-24 bg-[#050505] border-t border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1c1c1c] pb-6">
          <div>
            <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-2 flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>[ SECTION 04 ] // SHADER BENCHMARK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F2F2F2] uppercase">
              GRAPHICS LAB
            </h2>
            <div className="font-mono text-xs text-[#858585] mt-1 tracking-widest">
              SUBTITLE // REAL-TIME EXPERIMENTS
            </div>
          </div>
          
          <div className="font-mono text-xs text-[#858585] max-w-md">
            Interactive GLSL kernels, post-processing filters, raytraced shadows, and WebGPU pipeline reflection.
            No mockups: every pixel is calculated by the GPU in real time.
          </div>
        </div>

        {/* Experiment Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8 font-mono text-xs">
          {[
            { id: '001', label: 'EXP 001: GLSL PROCEDURAL' },
            { id: '002', label: 'EXP 002: POST-PROCESSING' },
            { id: '003', label: 'EXP 003: LIGHTING & SHADOW' },
            { id: '004', label: 'EXP 004: TOPOLOGY MODES' },
            { id: 'VGPU', label: 'RUNTIME: VGPU / WEBGPU' },
          ].map((tab) => {
            const isActive = activeExp === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveExp(tab.id as any)}
                className={`p-3 border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                    : 'border-[#1a1a1a] bg-[#090909] text-[#858585] hover:border-[#333] hover:text-[#ddd]'
                }`}
              >
                <div className="text-[10px] text-[#666]">{tab.id === 'VGPU' ? 'CORE' : 'EXPERIMENT'}</div>
                <div className="mt-1 truncate">{tab.label}</div>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 001: GLSL PROCEDURAL                      */}
        {/* ---------------------------------------------------- */}
        {activeExp === '001' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#040404] border border-[#222] corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-[#858585]">
                <span className="text-[#FF1A1A] font-bold">SHADER:</span> SIMPLEX_3D_DISPLACEMENT.VERT
              </div>
              <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={dpr as [number, number]}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[4, 5, 4]} intensity={1.5} />
                <LabProceduralMesh />
              </Canvas>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666]">
                UNIFORMS: uDistortion={labSettings.distortion} | uNoiseScale={labSettings.noiseScale}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#080808] border border-[#222] p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white font-bold pb-3 border-b border-[#1c1c1c] mb-4">
                  <Sliders className="w-4 h-4 text-[#FF1A1A]" />
                  <span>EXPERIMENT 001 // CONTROLS</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>DISTORTION</span>
                      <span className="text-[#FF1A1A]">{labSettings.distortion.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={labSettings.distortion}
                      onChange={(e) => updateLabSettings({ distortion: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>NOISE SCALE</span>
                      <span className="text-[#FF1A1A]">{labSettings.noiseScale.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="6.0"
                      step="0.2"
                      value={labSettings.noiseScale}
                      onChange={(e) => updateLabSettings({ noiseScale: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>SPEED</span>
                      <span className="text-[#FF1A1A]">{labSettings.noiseSpeed.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2.0"
                      step="0.1"
                      value={labSettings.noiseSpeed}
                      onChange={(e) => updateLabSettings({ noiseSpeed: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>INTENSITY</span>
                      <span className="text-[#FF1A1A]">{labSettings.intensity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.5"
                      step="0.1"
                      value={labSettings.intensity}
                      onChange={(e) => updateLabSettings({ intensity: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#666] pt-4 border-t border-[#1c1c1c]">
                GLSL vertex shader samples analytical 3D noise directly on GPU memory buffers.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 002: POST-PROCESSING FILTERS              */}
        {/* ---------------------------------------------------- */}
        {activeExp === '002' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Simulation Viewport with interactive CSS filter stack simulating Range Engine Filters */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#040404] border border-[#222] corner-bracket relative overflow-hidden flex items-center justify-center">
              {/* Scanlines layer */}
              {labSettings.scanlines && (
                <div className="absolute inset-0 scanlines-overlay z-20 pointer-events-none" />
              )}

              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${labSettings.vignette}) 95%)`,
                }}
              />

              {/* Chromatic aberration split simulation */}
              <div
                className="relative z-0 w-full h-full flex items-center justify-center"
                style={{
                  filter: `drop-shadow(${labSettings.chromaticAberration * 6}px 0 0 rgba(255, 0, 0, 0.7)) drop-shadow(-${labSettings.chromaticAberration * 6}px 0 0 rgba(0, 255, 255, 0.7))`,
                }}
              >
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={dpr as [number, number]}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[4, 5, 4]} intensity={1.8} />
                  <LabProceduralMesh />
                </Canvas>
              </div>

              <div className="absolute top-3 left-3 z-30 font-mono text-xs text-[#858585]">
                <span className="text-[#FF1A1A] font-bold">FILTERS:</span> RANGE_POSTPROCESS_PIPELINE
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#080808] border border-[#222] p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white font-bold pb-3 border-b border-[#1c1c1c] mb-4">
                  <Tv className="w-4 h-4 text-[#FF1A1A]" />
                  <span>EXPERIMENT 002 // POST-FX</span>
                </div>

                <div className="space-y-4">
                  {/* Scanlines toggle */}
                  <div className="flex items-center justify-between p-2.5 bg-[#0d0d0d] border border-[#1a1a1a]">
                    <span>SCANLINES</span>
                    <button
                      onClick={() => updateLabSettings({ scanlines: !labSettings.scanlines })}
                      className={`px-3 py-1 border text-xs cursor-pointer ${
                        labSettings.scanlines
                          ? 'border-[#FF1A1A] bg-[#FF1A1A] text-black font-bold'
                          : 'border-[#333] text-[#888]'
                      }`}
                    >
                      {labSettings.scanlines ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* Chromatic Aberration */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>CHROMATIC ABERRATION</span>
                      <span className="text-[#FF1A1A]">{labSettings.chromaticAberration.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.0"
                      step="0.05"
                      value={labSettings.chromaticAberration}
                      onChange={(e) => updateLabSettings({ chromaticAberration: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* Vignette */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>VIGNETTE DARKNESS</span>
                      <span className="text-[#FF1A1A]">{labSettings.vignette.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.95"
                      step="0.05"
                      value={labSettings.vignette}
                      onChange={(e) => updateLabSettings({ vignette: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#666] pt-4 border-t border-[#1c1c1c]">
                Derived from Bernardo&apos;s <strong className="text-white">Filters_Materials-Shaders-Range-Engine</strong> repository.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 003: LIGHTING & VOLUMETRIC SHADOWS        */}
        {/* ---------------------------------------------------- */}
        {activeExp === '003' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#040404] border border-[#222] corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-[#858585]">
                <span className="text-[#FF1A1A] font-bold">LIGHTING RIG:</span> VOLUMETRIC_SHADOW_CALC
              </div>
              <Canvas
                camera={{ position: [0, 2, 5], fov: 45 }}
                shadows
                dpr={dpr as [number, number]}
              >
                <LabLightingScene />
              </Canvas>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666]">
                ANGLE: {labSettings.lightAngle}° // INTENSITY: {labSettings.lightIntensity.toFixed(2)}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#080808] border border-[#222] p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white font-bold pb-3 border-b border-[#1c1c1c] mb-4">
                  <Sun className="w-4 h-4 text-[#FF1A1A]" />
                  <span>EXPERIMENT 003 // LIGHTING</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>LIGHT ANGLE / ORBIT</span>
                      <span className="text-[#FF1A1A]">{labSettings.lightAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={labSettings.lightAngle}
                      onChange={(e) => updateLabSettings({ lightAngle: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>LIGHT INTENSITY</span>
                      <span className="text-[#FF1A1A]">{labSettings.lightIntensity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={labSettings.lightIntensity}
                      onChange={(e) => updateLabSettings({ lightIntensity: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF1A1A] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#666] pt-4 border-t border-[#1c1c1c]">
                Demonstrates dynamic directional light projection and real-time shadow buffer rendering.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 004: TOPOLOGY MODES                       */}
        {/* ---------------------------------------------------- */}
        {activeExp === '004' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#040404] border border-[#222] corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-[#858585]">
                <span className="text-[#FF1A1A] font-bold">TOPOLOGY:</span> {labSettings.topology}
              </div>
              <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={dpr as [number, number]}>
                <LabTopologyScene />
              </Canvas>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#080808] border border-[#222] p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white font-bold pb-3 border-b border-[#1c1c1c] mb-4">
                  <Box className="w-4 h-4 text-[#FF1A1A]" />
                  <span>EXPERIMENT 004 // TOPOLOGY</span>
                </div>

                <div className="space-y-2">
                  {(['SOLID', 'WIREFRAME', 'POINTS', 'NORMALS'] as const).map((mode) => {
                    const isSelected = labSettings.topology === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => updateLabSettings({ topology: mode })}
                        className={`w-full text-left p-3 border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                            : 'border-[#1a1a1a] bg-[#0c0c0c] text-[#858585] hover:border-[#333]'
                        }`}
                      >
                        <span>{mode}</span>
                        {isSelected && <span className="text-[10px] text-[#FF1A1A]">ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] text-[#666] pt-4 border-t border-[#1c1c1c]">
                Switches GPU rasterization between filled triangles, line primitives, point clouds, and normal vectors.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* RUNTIME VGPU / WEBGPU TAB                            */}
        {/* ---------------------------------------------------- */}
        {activeExp === 'VGPU' && (
          <div className="space-y-4">
            <WebGPUInspector />
          </div>
        )}

      </div>
    </section>
  );
};
