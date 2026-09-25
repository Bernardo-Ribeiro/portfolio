import React from 'react';
import { Canvas } from '@react-three/fiber';
import { TheRedCube } from '../3d/TheRedCube';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useGraphics } from '../../context/GraphicsContext';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { quality } = useGraphics();
  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  const LINKS = [
    {
      label: 'GITHUB',
      href: 'https://github.com/Bernardo-Ribeiro',
      desc: 'Explore source code, shaders & tools',
      icon: <GithubIcon />
    },
    {
      label: 'LINKEDIN',
      href: 'https://www.linkedin.com/in/bernardo-ribeiro-dev/',
      desc: 'Connect professionally',
      icon: <LinkedinIcon />
    },
    {
      label: 'EMAIL',
      href: 'mailto:bernardoribeiro.dev@gmail.com',
      desc: 'Direct communication line',
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <section id="contact" className="w-full pt-28 pb-12 bg-[#030303] border-t border-[#181818] relative flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Top Header Label */}
        <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-4 flex items-center gap-2">
          <span>[ SECTION 10 ]</span>
          <span className="w-8 h-[1px] bg-[#FF1A1A]" />
          <span>TERMINATION STAGE</span>
        </div>

        {/* Main Grid: Huge Typography + Small Returning Red Cube */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Huge Brutalist Typography */}
          <div className="lg:col-span-8 select-none">
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black font-display tracking-tighter text-[#F2F2F2] uppercase leading-[0.84]">
              LET&apos;S<br />
              <span className="text-[#FF1A1A]">BUILD</span><br />
              SOMETHING.
            </h2>
          </div>

          {/* Small 3D Red Cube Closing Scene */}
          <div className="lg:col-span-4 h-64 sm:h-80 relative bg-[#070707] border border-[#222] corner-bracket flex flex-col items-center justify-center">
            <div className="absolute top-2 left-3 font-mono text-[10px] text-[#666]">
              STATUS: CUBE_REST_POSITION
            </div>
            
            <div className="w-full h-full">
              <Canvas camera={{ position: [0, 0, 3.8], fov: 40 }} dpr={dpr as [number, number]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 4, 3]} intensity={1.6} />
                <pointLight position={[-2, -2, -2]} intensity={0.8} color="#FF1A1A" />
                <TheRedCube size={1.4} rotationSpeed={0.5} mode="DEFAULT" />
              </Canvas>
            </div>

            <div className="absolute bottom-2 text-center font-mono text-[10px] text-[#555]">
              DEFAULT_OBJECT // PERSISTENT RUNTIME
            </div>
          </div>

        </div>

        {/* Interactive Channel Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="p-6 bg-[#080808] border border-[#1e1e1e] hover:border-[#FF1A1A] group transition-all duration-300 flex flex-col justify-between corner-bracket"
            >
              <div>
                <div className="flex items-center justify-between text-[#858585] group-hover:text-[#FF1A1A] transition-colors mb-3">
                  <div className="flex items-center gap-2">
                    {link.icon}
                    <span className="font-mono text-xs tracking-wider">{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#FF1A1A] transition-colors">
                  {link.label} →
                </div>
              </div>
              <div className="font-mono text-xs text-[#666] mt-4">
                {link.desc}
              </div>
            </a>
          ))}
        </div>

        {/* Technical Footer */}
        <footer className="pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-[#F2F2F2] font-bold">BERNARDO RIBEIRO</span>
            <span className="hidden sm:inline text-[#333]">|</span>
            <span>GRAPHICS / 3D / SOFTWARE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>© 2026 // ALL SYSTEMS NOMINAL</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#00FF66]" />
          </div>
        </footer>

      </div>
    </section>
  );
};
