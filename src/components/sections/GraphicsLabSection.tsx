import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { LabProceduralMesh, LabLightingScene, LabTopologyScene } from '../3d/LabCanvas';
import { WebGPUInspector } from '../3d/WebGPUInspector';
import { useGraphics } from '../../context/GraphicsContext';
import { useGSAP, gsap } from '../../lib/gsap';
import { FlaskConical, Sliders, Box, Sun, Tv } from 'lucide-react';
import { InterferenceMeshPattern } from '../textures/BookOfShapesTextures';

export const GraphicsLabSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<'001' | '002' | '003' | '004' | 'VGPU'>('001');
  const { labSettings, updateLabSettings, quality } = useGraphics();
  const sectionRef = useRef<HTMLElement>(null);

  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  useGSAP(() => {
    gsap.fromTo(
      '.lab-header',
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

    gsap.fromTo(
      '.lab-viewport',
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="lab"
      className="w-full py-28 bg-transparent border-t border-slate-800/80 relative overflow-hidden"
    >
      <InterferenceMeshPattern opacity={0.03} strokeColor="#FF2B2B" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        
        {/* Section Header */}
        <div className="lab-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800/80 pb-8">
          <div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="text-slate-200 font-semibold">[ 04 ]</span>
              <span className="w-6 h-[1px] bg-slate-700" />
              <span>GRAPHICS LAB // SHADER BENCHMARK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F1F5F9] uppercase leading-[0.92]">
              REAL-TIME LAB
            </h2>
            <div className="font-mono text-xs text-slate-400 mt-2 tracking-widest">
              HARDWARE COMPUTE &bull; PROCEDURAL KERNELS &bull; WEBGPU
            </div>
          </div>
          
          <div className="font-mono text-xs text-slate-400 max-w-md font-sans leading-relaxed">
            Interactive GLSL shaders, vertex noise displacement, shadow buffers, and WebGPU pipeline reflection.
            No mockups: every pixel is evaluated live on the GPU.
          </div>
        </div>

        {/* Experiment Selector Bar - 5 Tactile Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8 font-mono text-xs">
          {[
            { id: '001', label: 'EXP 01: GLSL NOISE' },
            { id: '002', label: 'EXP 02: POST-FX' },
            { id: '003', label: 'EXP 03: LIGHTING' },
            { id: '004', label: 'EXP 04: TOPOLOGY' },
            { id: 'VGPU', label: 'RUNTIME: WEBGPU' },
          ].map((tab) => {
            const isActive = activeExp === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveExp(tab.id as any)}
                type="button"
                aria-label={`Select experiment ${tab.label}`}
                className={`p-3 border rounded-sm text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#FF2B2B] bg-[#FF2B2B]/15 text-white font-semibold shadow-[0_0_15px_rgba(255,43,43,0.15)]'
                    : 'border-slate-800 bg-[#11141D] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{tab.id === 'VGPU' ? 'CORE' : 'PASS'}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] animate-pulse" />}
                </div>
                <div className="mt-1 font-semibold truncate">{tab.label}</div>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 001: GLSL PROCEDURAL                      */}
        {/* ---------------------------------------------------- */}
        {activeExp === '001' && (
          <div className="lab-viewport grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#0E1118] border border-slate-800 rounded-sm corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-slate-400">
                <span className="text-[#FF2B2B] font-semibold">SHADER:</span> SIMPLEX_3D_DISPLACEMENT.VERT
              </div>
              <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={dpr as [number, number]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 5, 4]} intensity={1.6} />
                <LabProceduralMesh />
              </Canvas>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400">
                UNIFORMS: uDistortion={labSettings.distortion} | uNoiseScale={labSettings.noiseScale}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-200 font-semibold pb-3 border-b border-slate-800 mb-4">
                  <Sliders className="w-4 h-4 text-[#FF2B2B]" />
                  <span>EXPERIMENT 001 // CONTROLS</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">DISTORTION</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.distortion.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Noise Distortion Amount"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={labSettings.distortion}
                      onChange={(e) => updateLabSettings({ distortion: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">NOISE SCALE</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.noiseScale.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Noise Spatial Frequency Scale"
                      min="0.5"
                      max="6.0"
                      step="0.2"
                      value={labSettings.noiseScale}
                      onChange={(e) => updateLabSettings({ noiseScale: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">SPEED</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.noiseSpeed.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Noise Time Evolution Speed"
                      min="0"
                      max="2.0"
                      step="0.1"
                      value={labSettings.noiseSpeed}
                      onChange={(e) => updateLabSettings({ noiseSpeed: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">INTENSITY</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.intensity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Displacement Intensity"
                      min="0.2"
                      max="2.5"
                      step="0.1"
                      value={labSettings.intensity}
                      onChange={(e) => updateLabSettings({ intensity: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-800 font-sans">
                GLSL vertex shader samples analytical 3D noise directly on GPU memory buffers.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 002: POST-PROCESSING FILTERS              */}
        {/* ---------------------------------------------------- */}
        {activeExp === '002' && (
          <div className="lab-viewport grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Simulation Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#0E1118] border border-slate-800 rounded-sm corner-bracket relative overflow-hidden flex items-center justify-center">
              {/* Local Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${labSettings.vignette}) 95%)`,
                }}
              />

              {/* Chromatic aberration split */}
              <div
                className="relative z-0 w-full h-full flex items-center justify-center"
                style={{
                  filter: `drop-shadow(${labSettings.chromaticAberration * 5}px 0 0 rgba(255, 43, 43, 0.6)) drop-shadow(-${labSettings.chromaticAberration * 5}px 0 0 rgba(0, 255, 255, 0.6))`,
                }}
              >
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={dpr as [number, number]}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[4, 5, 4]} intensity={1.8} />
                  <LabProceduralMesh />
                </Canvas>
              </div>

              <div className="absolute top-3 left-3 z-30 font-mono text-xs text-slate-400">
                <span className="text-[#FF2B2B] font-semibold">FILTERS:</span> RANGE_POSTPROCESS_PIPELINE
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-200 font-semibold pb-3 border-b border-slate-800 mb-4">
                  <Tv className="w-4 h-4 text-[#FF2B2B]" />
                  <span>EXPERIMENT 002 // POST-FX</span>
                </div>

                <div className="space-y-4">
                  {/* Chromatic Aberration */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">CHROMATIC ABERRATION</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.chromaticAberration.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.0"
                      step="0.05"
                      value={labSettings.chromaticAberration}
                      onChange={(e) => updateLabSettings({ chromaticAberration: parseFloat(e.target.value) })}
                      aria-label="Chromatic Aberration Intensity"
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* Vignette */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">VIGNETTE INTENSITY</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.vignette.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.95"
                      step="0.05"
                      value={labSettings.vignette}
                      onChange={(e) => updateLabSettings({ vignette: parseFloat(e.target.value) })}
                      aria-label="Vignette Falloff Intensity"
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-800 font-sans">
                Derived from Bernardo&apos;s <strong className="text-slate-200">Filters_Materials-Shaders-Range-Engine</strong> repository.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 003: LIGHTING & VOLUMETRIC SHADOWS        */}
        {/* ---------------------------------------------------- */}
        {activeExp === '003' && (
          <div className="lab-viewport grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#0E1118] border border-slate-800 rounded-sm corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-slate-400">
                <span className="text-[#FF2B2B] font-semibold">LIGHTING RIG:</span> VOLUMETRIC_SHADOW_CALC
              </div>
              <Canvas
                camera={{ position: [0, 2, 5], fov: 45 }}
                shadows
                dpr={dpr as [number, number]}
              >
                <LabLightingScene />
              </Canvas>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400">
                ANGLE: {labSettings.lightAngle}° // INTENSITY: {labSettings.lightIntensity.toFixed(2)}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-200 font-semibold pb-3 border-b border-slate-800 mb-4">
                  <Sun className="w-4 h-4 text-[#FF2B2B]" />
                  <span>EXPERIMENT 003 // LIGHTING</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">LIGHT ANGLE / ORBIT</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.lightAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={labSettings.lightAngle}
                      onChange={(e) => updateLabSettings({ lightAngle: parseFloat(e.target.value) })}
                      aria-label="Light Orbit Angle in Degrees"
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">LIGHT INTENSITY</span>
                      <span className="text-[#FF2B2B] font-semibold">{labSettings.lightIntensity.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={labSettings.lightIntensity}
                      onChange={(e) => updateLabSettings({ lightIntensity: parseFloat(e.target.value) })}
                      aria-label="Directional Light Intensity"
                      className="w-full accent-[#FF2B2B] bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-800 font-sans">
                Demonstrates dynamic directional light projection and real-time shadow buffer rendering.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXPERIMENT 004: TOPOLOGY MODES                       */}
        {/* ---------------------------------------------------- */}
        {activeExp === '004' && (
          <div className="lab-viewport grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Viewport */}
            <div className="lg:col-span-8 h-[480px] lg:h-[560px] bg-[#0E1118] border border-slate-800 rounded-sm corner-bracket relative overflow-hidden">
              <div className="absolute top-3 left-3 z-10 font-mono text-xs text-slate-400">
                <span className="text-[#FF2B2B] font-semibold">TOPOLOGY:</span> {labSettings.topology}
              </div>
              <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={dpr as [number, number]}>
                <LabTopologyScene />
              </Canvas>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-5 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-200 font-semibold pb-3 border-b border-slate-800 mb-4">
                  <Box className="w-4 h-4 text-[#FF2B2B]" />
                  <span>EXPERIMENT 004 // TOPOLOGY</span>
                </div>

                <div className="space-y-2">
                  {(['SOLID', 'WIREFRAME', 'POINTS', 'NORMALS'] as const).map((mode) => {
                    const isSelected = labSettings.topology === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => updateLabSettings({ topology: mode })}
                        type="button"
                        aria-label={`Select topology raster mode ${mode}`}
                        className={`w-full text-left p-3 border rounded-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#FF2B2B] bg-[#FF2B2B]/15 text-white font-semibold'
                            : 'border-slate-800 bg-[#161A26] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FF2B2B]' : 'bg-slate-700'}`} />
                          {mode}
                        </span>
                        {isSelected && <span className="text-[10px] text-[#FF2B2B] font-semibold">ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-800 font-sans">
                Switches GPU rasterization between filled triangles, line primitives, point clouds, and normal vectors.
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* RUNTIME VGPU / WEBGPU TAB                            */}
        {/* ---------------------------------------------------- */}
        {activeExp === 'VGPU' && (
          <div className="lab-viewport space-y-4">
            <WebGPUInspector />
          </div>
        )}

      </div>
    </section>
  );
};
