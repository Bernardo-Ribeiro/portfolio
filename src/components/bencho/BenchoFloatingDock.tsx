import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Layers,
  Box,
  Cpu,
  FlaskConical,
  Mail,
  Command,
  Activity,
  RotateCw,
} from 'lucide-react';
import { useGraphics } from '../../context/GraphicsContext';
import type { CompanionShapeType, ShaderRenderMode } from '../../types/graphics';

interface BenchoFloatingDockProps {
  onOpenCommandBar: () => void;
}

const DOCK_LINKS = [
  { label: 'Hero', href: '#hero', icon: Compass },
  { label: 'Discipline', href: '#build', icon: Sparkles },
  { label: 'Projects', href: '#work', icon: Layers },
  { label: 'Cube', href: '#cube', icon: Box },
  { label: 'Range', href: '#range', icon: Cpu },
  { label: 'Lab', href: '#lab', icon: FlaskConical },
  { label: 'About', href: '#about', icon: Activity },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const SHAPE_SEQUENCE: CompanionShapeType[] = [
  'cube',
  'octahedron',
  'torusKnot',
  'icosahedron',
  'wireSphere',
  'dodecahedron',
];

const SHADER_SEQUENCE: ShaderRenderMode[] = [
  'DEFAULT',
  'WIREFRAME',
  'CUSTOM',
  'ISO_LATTICE',
  'INTERFERENCE',
  'GLITCH',
  'FRESNEL',
];

export const BenchoFloatingDock: React.FC<BenchoFloatingDockProps> = ({ onOpenCommandBar }) => {
  const { companionState, updateCompanionState } = useGraphics();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cycleShape = () => {
    const currentIdx = SHAPE_SEQUENCE.indexOf(companionState.shape);
    const nextIdx = (currentIdx + 1) % SHAPE_SEQUENCE.length;
    updateCompanionState({
      shape: SHAPE_SEQUENCE[nextIdx],
      rotationSpeed: 1.5,
    });
  };

  const cycleShader = () => {
    const currentIdx = SHADER_SEQUENCE.indexOf(companionState.mode);
    const nextIdx = (currentIdx + 1) % SHADER_SEQUENCE.length;
    updateCompanionState({
      mode: SHADER_SEQUENCE[nextIdx],
    });
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw]">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-[#0E1118]/85 backdrop-blur-xl border border-slate-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.65)] rounded-full font-mono text-xs">
        
        {/* Navigation Icons */}
        <div className="flex items-center gap-1">
          {DOCK_LINKS.map((link, idx) => {
            const Icon = link.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isHovered
                    ? 'bg-white/[0.12] text-white scale-125 -translate-y-1'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={link.label}
              >
                <Icon className="w-4 h-4 transition-transform" />
                
                {/* Micro Tooltip */}
                {isHovered && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#131620] border border-slate-700 text-slate-200 text-[10px] rounded pointer-events-none whitespace-nowrap shadow-lg">
                    {link.label}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Separator */}
        <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

        {/* Interactive 3D Shape Morph Cycler */}
        <button
          onClick={cycleShape}
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 text-[11px] cursor-pointer group"
          title={`Click to cycle 3D Shape (Current: ${companionState.shape})`}
        >
          <Box className="w-3.5 h-3.5 text-[#FF2B2B] group-hover:rotate-45 transition-transform" />
          <span className="hidden md:inline uppercase text-[10px] tracking-wider">
            {companionState.shape}
          </span>
          <RotateCw className="w-2.5 h-2.5 text-slate-400 group-hover:rotate-180 transition-transform" />
        </button>

        {/* Interactive Shader Cycler */}
        <button
          onClick={cycleShader}
          type="button"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 text-[11px] cursor-pointer group"
          title={`Click to cycle Shader (Current: ${companionState.mode})`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF88] group-hover:animate-ping" />
          <span className="uppercase text-[10px] tracking-wider">
            {companionState.mode === 'DEFAULT' ? 'PBR' : companionState.mode}
          </span>
        </button>

        {/* Bencho Command Palette Trigger */}
        <button
          onClick={onOpenCommandBar}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 bg-[#FF2B2B] hover:bg-[#ff4d4d] text-white font-semibold rounded-full transition-all duration-200 text-[11px] cursor-pointer shadow-[0_0_12px_rgba(255,43,43,0.4)]"
          title="Open Bencho Command Bar (⌘K)"
        >
          <Command className="w-3 h-3" />
          <span className="hidden sm:inline font-bold">⌘K</span>
        </button>
      </div>
    </div>
  );
};
