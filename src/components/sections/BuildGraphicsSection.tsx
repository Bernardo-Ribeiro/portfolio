import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TheRedCube } from '../3d/TheRedCube';
import type { ShaderRenderMode } from '../../types/graphics';
import { useGraphics } from '../../context/GraphicsContext';

export const BuildGraphicsSection: React.FC = () => {
  const [activeWordMode, setActiveWordMode] = useState<ShaderRenderMode>('DEFAULT');
  const { quality } = useGraphics();

  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  const WORDS = [
    { label: 'GRAPHICS.', mode: 'DEFAULT' as ShaderRenderMode, desc: 'PBR Standard Lighting & Materials' },
    { label: '3D.', mode: 'WIREFRAME' as ShaderRenderMode, desc: 'Raster Topology & Geometry Strips' },
    { label: 'SHADERS.', mode: 'CUSTOM' as ShaderRenderMode, desc: 'Hardware Procedural Simplex Noise' },
  ];

  return (
    <section id="build" className="w-full min-h-screen py-24 bg-[#050505] border-t border-[#181818] relative flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Typographic statement */}
        <div className="lg:col-span-8 flex flex-col justify-center select-none">
          <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-4 flex items-center gap-2">
            <span>[ SECTION 02 ]</span>
            <span className="w-8 h-[1px] bg-[#FF1A1A]" />
            <span>CORE DISCIPLINE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter text-[#858585] uppercase leading-[0.9]">
            I BUILD<br />
            {WORDS.map((w) => {
              const isSelected = activeWordMode === w.mode;
              return (
                <span
                  key={w.label}
                  onMouseEnter={() => setActiveWordMode(w.mode)}
                  className={`block transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'text-[#F2F2F2] translate-x-2'
                      : 'hover:text-[#F2F2F2] text-[#444444]'
                  }`}
                >
                  <span className={isSelected ? 'text-[#FF1A1A]' : ''}>► </span>
                  {w.label}
                </span>
              );
            })}
          </h2>

          <div className="mt-12 max-w-xl font-mono text-sm text-[#858585] border-l-2 border-[#FF1A1A] pl-4">
            <p className="text-white text-base leading-relaxed">
              &ldquo;I build software at the intersection of code, graphics and interactive experiences.&rdquo;
            </p>
            <div className="text-xs text-[#666] mt-2">
              HOVER OVER WORDS TO MUTATE THE 3D RENDERING PIPELINE IN REAL TIME.
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Responsive Cube */}
        <div className="lg:col-span-4 h-[380px] sm:h-[450px] relative bg-[#080808] border border-[#222222] corner-bracket overflow-hidden flex flex-col">
          {/* Header readout */}
          <div className="p-3 border-b border-[#1c1c1c] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[#FF1A1A]">
              <span className="w-2 h-2 rounded-full bg-[#FF1A1A] animate-ping" />
              <span>PASS: {activeWordMode}</span>
            </div>
            <div className="text-[#666] text-[10px]">
              TRIS: 12 // DYNAMIC
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 45 }}
              dpr={dpr as [number, number]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 5, 4]} intensity={1.6} />
              <pointLight position={[-3, -2, -2]} intensity={0.8} color="#FF1A1A" />
              <TheRedCube
                key={activeWordMode}
                mode={activeWordMode}
                size={2.0}
                interactive={true}
              />
            </Canvas>
          </div>

          {/* Description footer */}
          <div className="p-3 border-t border-[#1c1c1c] bg-[#0c0c0c] font-mono text-[11px] text-[#858585] flex justify-between items-center">
            <span>
              {WORDS.find((w) => w.mode === activeWordMode)?.desc}
            </span>
            <span className="text-[#FF1A1A] font-bold">60 FPS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
