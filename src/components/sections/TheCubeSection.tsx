import React, { useRef } from 'react';
import { CubeScrubber } from '../3d/CubeScrubber';
import { Box } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';

export const TheCubeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.cube-heading', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="cube"
      className="w-full py-28 bg-transparent border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Section Heading */}
        <div className="cube-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-800/80 pb-8">
          <div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="text-slate-200 font-semibold">[ 03 ]</span>
              <span className="w-6 h-[1px] bg-slate-700" />
              <span>SIGNATURE PIPELINE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F1F5F9] uppercase leading-[0.92]">
              ONE CUBE.<br />
              <span className="text-slate-500">MANY WAYS TO RENDER IT.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm font-sans leading-relaxed">
            The Range Engine signature cube decomposed across 8 distinct GPU passes: from PBR microfacet shading to procedural vertex displacement.
          </div>
        </div>

        {/* Real-time 3D Scrubber Component */}
        <CubeScrubber />
      </div>
    </section>
  );
};
