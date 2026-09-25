import React from 'react';
import { CubeScrubber } from '../3d/CubeScrubber';
import { Box } from 'lucide-react';

export const TheCubeSection: React.FC = () => {
  return (
    <section id="cube" className="w-full py-28 bg-[#030303] border-t border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c1c] pb-8">
          <div>
            <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-3 flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>[ SECTION 07 ] // SIGNATURE PIPELINE</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F2F2F2] uppercase leading-[0.88]">
              ONE CUBE.<br />
              <span className="text-[#858585]">MANY WAYS TO RENDER IT.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#858585] max-w-sm">
            The Range Engine default cube decomposed across 8 distinct rendering techniques: from basic PBR rasterization to procedural Simplex vertex displacement.
          </div>
        </div>

        {/* Real-time 3D Scrubber Component */}
        <CubeScrubber />

      </div>
    </section>
  );
};
