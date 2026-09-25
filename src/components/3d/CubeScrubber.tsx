import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TheRedCube } from './TheRedCube';
import type { ShaderRenderMode } from '../../types/graphics';
import { useGraphics } from '../../context/GraphicsContext';

export interface CubeStage {
  id: ShaderRenderMode;
  name: string;
  material: string;
  pass: string;
  triangles: number;
  vertices: number;
  drawCalls: number;
  memory: string;
  description: string;
}

export const CUBE_STAGES: CubeStage[] = [
  {
    id: 'DEFAULT',
    name: '01 // DEFAULT',
    material: 'RANGE_PBR_STANDARD',
    pass: 'FORWARD_OPAQUE',
    triangles: 12,
    vertices: 24,
    drawCalls: 1,
    memory: '1.2 KB',
    description: 'The canonical starting point in Range Engine. Physically-based microfacet BRDF with roughness and metalness.'
  },
  {
    id: 'WIREFRAME',
    name: '02 // WIREFRAME',
    material: 'TOPOLOGY_ISOLINE',
    pass: 'RASTER_LINE_STRIP',
    triangles: 12,
    vertices: 24,
    drawCalls: 1,
    memory: '0.8 KB',
    description: 'Structural geometry analysis. Direct edge primitive projection rendering the fundamental 12 triangles.'
  },
  {
    id: 'TOON',
    name: '03 // TOON / CEL',
    material: 'DISCRETE_BAND_RAMP',
    pass: 'CEL_QUANTIZATION',
    triangles: 12,
    vertices: 24,
    drawCalls: 1,
    memory: '1.4 KB',
    description: 'Stylized non-photorealistic rendering (NPR) quantizing light dot products into stepped luminance bands.'
  },
  {
    id: 'GLASS',
    name: '04 // GLASS',
    material: 'TRANSMISSION_IOR',
    pass: 'DEPTH_SORTED_REFRACT',
    triangles: 12,
    vertices: 24,
    drawCalls: 2,
    memory: '2.1 KB',
    description: 'Physical transmission with index of refraction (IOR: 1.50) and chromatic dispersion.'
  },
  {
    id: 'METALLIC',
    name: '05 // METALLIC',
    material: 'SPECULAR_CHROME',
    pass: 'SPECULAR_HIGHLIGHT',
    triangles: 12,
    vertices: 24,
    drawCalls: 1,
    memory: '1.5 KB',
    description: 'Ultra-low roughness (0.08) and high metalness (0.95) with sharp Fresnel reflection falloff.'
  },
  {
    id: 'GLITCH',
    name: '06 // GLITCH',
    material: 'DISPLACEMENT_SCAN',
    pass: 'VERTEX_PERTURBATION',
    triangles: 768,
    vertices: 1536,
    drawCalls: 2,
    memory: '4.8 KB',
    description: 'Pseudo-random high frequency vertex displacement driven by time-based noise and chromatic tearing.'
  },
  {
    id: 'DISSOLVE',
    name: '07 // PARTICLES',
    material: 'POINT_CLOUD_EMITTER',
    pass: 'VERTEX_PRIMITIVE_POINTS',
    triangles: 0,
    vertices: 1800,
    drawCalls: 1,
    memory: '14.4 KB',
    description: 'Disintegration of Euclidean cube topology into 1,800 discrete 3D particles with additive blending.'
  },
  {
    id: 'CUSTOM',
    name: '08 // CUSTOM GLSL',
    material: 'SIMPLEX_NOISE_CORE',
    pass: 'PROCEDURAL_DISPLACE',
    triangles: 768,
    vertices: 1536,
    drawCalls: 1,
    memory: '6.2 KB',
    description: 'Hardware accelerated 3D Simplex noise algorithm deforming vertices along normal vectors in real time.'
  }
];

export const CubeScrubber: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { quality } = useGraphics();
  const currentStage = CUBE_STAGES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CUBE_STAGES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CUBE_STAGES.length - 1 ? prev + 1 : 0));
  };

  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Viewport */}
      <div className="w-full h-[480px] md:h-[580px] relative bg-[#040404] border border-[#222222] corner-bracket overflow-hidden flex items-center justify-center">
        {/* HUD Top Readout */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FF1A1A]">
            <span className="w-2 h-2 rounded-full bg-[#FF1A1A] animate-ping" />
            <span className="font-bold tracking-widest">{currentStage.name}</span>
          </div>
          <div className="text-[#858585] text-[11px]">
            MATERIAL: <span className="text-[#F2F2F2]">{currentStage.material}</span>
          </div>
          <div className="text-[#858585] text-[11px]">
            PASS: <span className="text-[#F2F2F2]">{currentStage.pass}</span>
          </div>
        </div>

        {/* HUD Top Right Diagnostics */}
        <div className="absolute top-4 right-4 z-10 font-mono text-[11px] text-right text-[#858585] hidden sm:block">
          <div>GEOMETRY: <span className="text-[#F2F2F2]">{currentStage.triangles} TRIS</span></div>
          <div>VERTICES: <span className="text-[#F2F2F2]">{currentStage.vertices}</span></div>
          <div>BUFFER: <span className="text-[#F2F2F2]">{currentStage.memory}</span></div>
          <div>DRAWCALLS: <span className="text-[#F2F2F2]">{currentStage.drawCalls}</span></div>
        </div>

        {/* Real-Time 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          dpr={dpr as [number, number]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 6, 4]} intensity={1.8} />
          <pointLight position={[-3, -2, -2]} intensity={1.0} color="#FF1A1A" />
          <pointLight position={[3, 2, 2]} intensity={0.8} color="#FFFFFF" />

          <group position={[0, 0, 0]}>
            <TheRedCube
              key={currentStage.id}
              mode={currentStage.id}
              size={2.4}
              interactive={true}
              rotationSpeed={0.9}
            />
          </group>
        </Canvas>

        {/* Viewport Crosshair Center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
          <div className="w-12 h-[1px] bg-[#FF1A1A]" />
          <div className="h-12 w-[1px] bg-[#FF1A1A] absolute" />
        </div>

        {/* Bottom Technical Description */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-[#050505]/80 backdrop-blur-sm p-3 border-t border-[#1a1a1a]">
          <div className="text-xs font-mono text-[#858585] max-w-xl">
            <span className="text-[#FF1A1A] mr-2">► DESC:</span>
            {currentStage.description}
          </div>
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={handlePrev}
              className="px-3 py-1 text-xs font-mono border border-[#333] hover:border-[#FF1A1A] hover:text-[#FF1A1A] bg-[#0c0c0c] transition-colors"
            >
              [◄ PREV]
            </button>
            <span className="text-xs font-mono text-[#FF1A1A]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(CUBE_STAGES.length).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              className="px-3 py-1 text-xs font-mono border border-[#333] hover:border-[#FF1A1A] hover:text-[#FF1A1A] bg-[#0c0c0c] transition-colors"
            >
              [NEXT ►]
            </button>
          </div>
        </div>
      </div>

      {/* Scrubber Pipeline Stage Buttons */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-4">
        {CUBE_STAGES.map((stage, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-2 text-left font-mono text-xs border transition-all cursor-pointer ${
                isActive
                  ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                  : 'border-[#1a1a1a] bg-[#080808] text-[#858585] hover:border-[#444] hover:text-[#bbb]'
              }`}
            >
              <div className="text-[10px] text-[#666] flex justify-between">
                <span>STAGE 0{idx + 1}</span>
                {isActive && <span className="text-[#FF1A1A]">●</span>}
              </div>
              <div className="text-[11px] truncate mt-1">
                {stage.id}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
