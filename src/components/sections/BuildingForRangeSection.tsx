import React from 'react';
import { Canvas } from '@react-three/fiber';
import { TheRedCube } from '../3d/TheRedCube';
import { useGraphics } from '../../context/GraphicsContext';

export const BuildingForRangeSection: React.FC = () => {
  const { quality } = useGraphics();
  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  const BLOCKS = [
    {
      num: '01',
      title: 'SHADERS',
      subtitle: 'GLSL / MATERIALS / POST-PROCESSING',
      desc: 'Writing low-level GLSL vertex and fragment stages for real-time graphics pipelines. Implementing screen-space depth buffers, chromatic dispersion, volumetric light scattering, and custom multi-pass post-processing filters.',
      items: ['GLSL 120 / 330 Kernels', 'Multi-Pass Render Buffers', 'PBR & Custom Lighting Models', 'Screen-Space Filter Pipelines']
    },
    {
      num: '02',
      title: 'TOOLS',
      subtitle: 'BGUI / EDITOR TOOLS / WORKFLOW',
      desc: 'Developing developer-first UI frameworks and workflow productivity extensions for Range Engine. Bridging Python game state with interactive immediate-mode GUI components and runtime diagnostics.',
      items: ['Modular BGUI Architecture', 'Event-Driven Hit Testing', 'In-Engine Debug Panels', 'Asset Pipeline Optimizations']
    },
    {
      num: '03',
      title: 'GRAPHICS',
      subtitle: 'OPENGL / 3D / REAL-TIME RENDERING',
      desc: 'Deep exploration into hardware rendering constraints, frame budget optimization, rasterization primitives, and spatial physics controllers. Bringing modern rendering techniques to community-driven game engines.',
      items: ['Hardware Acceleration', 'Shadow Map Cascades', 'Spatial Partitioning & Physics', 'Memory & Draw Call Minimization']
    }
  ];

  return (
    <section id="engine" className="w-full py-28 bg-[#050505] border-t border-[#181818] relative overflow-hidden">
      {/* Background 3D Cube Canvas */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={dpr as [number, number]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 3]} intensity={1.5} />
          <pointLight position={[-2, -2, -2]} intensity={1.2} color="#FF1A1A" />
          <TheRedCube size={3.2} interactive={false} rotationSpeed={0.3} mode="WIREFRAME" />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Manifesto Header */}
        <div className="max-w-3xl mb-20 border-b border-[#1c1c1c] pb-8">
          <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-3 flex items-center gap-2">
            <span>[ SECTION 06 ]</span>
            <span className="w-8 h-[1px] bg-[#FF1A1A]" />
            <span>ENGINE MANIFESTO</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F2F2F2] uppercase leading-[0.92]">
            BUILDING FOR<br />RANGE ENGINE.
          </h2>
          <p className="font-mono text-sm text-[#858585] mt-4 leading-relaxed">
            A focused commitment to low-level creative engineering: mastering real-time shaders, custom user interface systems, and rendering pipelines from the ground up.
          </p>
        </div>

        {/* 3 Large Typographic Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {BLOCKS.map((block) => (
            <div
              key={block.num}
              className="bg-[#080808]/85 backdrop-blur-sm border border-[#1f1f1f] hover:border-[#FF1A1A]/70 transition-all duration-300 p-8 flex flex-col justify-between corner-bracket group"
            >
              <div>
                {/* Block Number */}
                <div className="text-4xl sm:text-5xl font-black font-display text-[#222222] group-hover:text-[#FF1A1A] transition-colors mb-4">
                  {block.num}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2F2F2] tracking-tight">
                  {block.title}
                </h3>
                <div className="font-mono text-[11px] text-[#FF1A1A] tracking-wider mt-1 mb-4">
                  {block.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-[#999999] leading-relaxed mb-6 font-sans">
                  {block.desc}
                </p>
              </div>

              {/* Items List */}
              <div className="pt-4 border-t border-[#181818] font-mono text-xs text-[#777] space-y-1.5">
                {block.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#FF1A1A] text-[10px]">■</span>
                    <span className="text-[#aaa]">{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
