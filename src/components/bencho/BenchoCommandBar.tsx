import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, Sparkles, Box, Layers, Mail, ExternalLink, X, Sliders } from 'lucide-react';
import { useGraphics } from '../../context/GraphicsContext';
import type { CompanionShapeType, ShaderRenderMode } from '../../types/graphics';

interface BenchoCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandAction {
  id: string;
  category: 'NAVIGATION' | '3D COMPANION' | 'SHADERS' | 'ACTIONS';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export const BenchoCommandBar: React.FC<BenchoCommandBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateCompanionState, setIsSettingsOpen } = useGraphics();

  const handleNavigate = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMorph = (shape: CompanionShapeType, mode: ShaderRenderMode = 'DEFAULT') => {
    updateCompanionState({ shape, mode, rotationSpeed: 1.4 });
    onClose();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('bernardoribeiro.dev@gmail.com');
    } catch {
      // fallback
    }
    onClose();
  };

  const ACTIONS: CommandAction[] = [
    // Navigation
    {
      id: 'nav-hero',
      category: 'NAVIGATION',
      title: 'Jump to Hero',
      subtitle: 'Overview & online status',
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      onSelect: () => handleNavigate('#hero'),
    },
    {
      id: 'nav-build',
      category: 'NAVIGATION',
      title: 'Jump to Core Discipline',
      subtitle: 'Graphics, 3D & Shaders statement',
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      onSelect: () => handleNavigate('#build'),
    },
    {
      id: 'nav-work',
      category: 'NAVIGATION',
      title: 'Jump to Selected Work',
      subtitle: 'Engine filters, BGUI, and engine tools',
      icon: <Layers className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleNavigate('#work'),
    },
    {
      id: 'nav-cube',
      category: 'NAVIGATION',
      title: 'Jump to Signature 3D Cube',
      subtitle: '8 GPU rendering passes scrubber',
      icon: <Box className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleNavigate('#cube'),
    },
    {
      id: 'nav-range',
      category: 'NAVIGATION',
      title: 'Jump to Range Engine Architecture',
      subtitle: 'Custom lighting, ambient & material pipeline',
      icon: <Layers className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleNavigate('#range'),
    },
    {
      id: 'nav-lab',
      category: 'NAVIGATION',
      title: 'Jump to Graphics Lab',
      subtitle: 'Real-time GLSL benchmarks & WebGPU inspector',
      icon: <Sparkles className="w-4 h-4 text-[#00FF88]" />,
      onSelect: () => handleNavigate('#lab'),
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'Jump to Profile & Trajectory',
      subtitle: 'Bio, education & core domains',
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      onSelect: () => handleNavigate('#about'),
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Jump to Contact & Channels',
      subtitle: 'GitHub, LinkedIn, and direct communication',
      icon: <Mail className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleNavigate('#contact'),
    },

    // 3D Companion Morphing
    {
      id: 'morph-cube',
      category: '3D COMPANION',
      title: 'Morph 3D: The Red Cube',
      subtitle: 'Signature cube with PBR microfacet material',
      icon: <Box className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleMorph('cube', 'DEFAULT'),
    },
    {
      id: 'morph-octahedron',
      category: '3D COMPANION',
      title: 'Morph 3D: Octahedron Strip',
      subtitle: 'Geometric dual with wireframe edges',
      icon: <Box className="w-4 h-4 text-slate-300" />,
      onSelect: () => handleMorph('octahedron', 'WIREFRAME'),
    },
    {
      id: 'morph-torusknot',
      category: '3D COMPANION',
      title: 'Morph 3D: Torus Knot',
      subtitle: 'Parametric knotted cylinder with procedural shader',
      icon: <Sparkles className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => handleMorph('torusKnot', 'CUSTOM'),
    },
    {
      id: 'morph-icosahedron',
      category: '3D COMPANION',
      title: 'Morph 3D: Icosahedron',
      subtitle: '20-sided geodesic mesh with fresnel lighting',
      icon: <Box className="w-4 h-4 text-slate-300" />,
      onSelect: () => handleMorph('icosahedron', 'FRESNEL'),
    },
    {
      id: 'morph-wiresphere',
      category: '3D COMPANION',
      title: 'Morph 3D: Wireframe Sphere',
      subtitle: 'Orbital celestial topology mesh',
      icon: <Box className="w-4 h-4 text-slate-300" />,
      onSelect: () => handleMorph('wireSphere', 'WIREFRAME'),
    },

    // Shaders
    {
      id: 'shader-pbr',
      category: 'SHADERS',
      title: 'Shader: PBR Standard Shading',
      subtitle: 'Physically based microfacet highlights',
      icon: <Sparkles className="w-4 h-4 text-slate-300" />,
      onSelect: () => updateCompanionState({ mode: 'DEFAULT' }),
    },
    {
      id: 'shader-wire',
      category: 'SHADERS',
      title: 'Shader: Raster Wireframe',
      subtitle: 'Pure hardware triangle outlines',
      icon: <Layers className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => updateCompanionState({ mode: 'WIREFRAME' }),
    },
    {
      id: 'shader-noise',
      category: 'SHADERS',
      title: 'Shader: Procedural Simplex Noise',
      subtitle: 'Real-time vertex displacement kernel',
      icon: <Sparkles className="w-4 h-4 text-[#00FF88]" />,
      onSelect: () => updateCompanionState({ mode: 'CUSTOM' }),
    },
    {
      id: 'shader-glitch',
      category: 'SHADERS',
      title: 'Shader: Chromatic Glitch Pass',
      subtitle: 'RGB separation & horizontal slice displacement',
      icon: <Sparkles className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => updateCompanionState({ mode: 'GLITCH' }),
    },
    {
      id: 'shader-iso-lattice',
      category: 'SHADERS',
      title: 'Texture: Book of Shapes Iso Lattice',
      subtitle: 'Isometric cube wireframe raster inspired by bookofshapes.com',
      icon: <Box className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => updateCompanionState({ mode: 'ISO_LATTICE' }),
    },
    {
      id: 'shader-interference',
      category: 'SHADERS',
      title: 'Texture: Book of Shapes Interference Mesh',
      subtitle: 'Harmonic wave moiré fringes inspired by bookofshapes.com',
      icon: <Layers className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => updateCompanionState({ mode: 'INTERFERENCE' }),
    },

    // Actions
    {
      id: 'act-email',
      category: 'ACTIONS',
      title: 'Copy Email to Clipboard',
      subtitle: 'bernardoribeiro.dev@gmail.com',
      icon: <Mail className="w-4 h-4 text-[#00FF88]" />,
      onSelect: handleCopyEmail,
    },
    {
      id: 'act-github',
      category: 'ACTIONS',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/Bernardo-Ribeiro',
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
      onSelect: () => {
        window.open('https://github.com/Bernardo-Ribeiro', '_blank');
        onClose();
      },
    },
    {
      id: 'act-settings',
      category: 'ACTIONS',
      title: 'Open Graphics Config Modal',
      subtitle: 'Reduce motion, DPR quality & FX',
      icon: <Sliders className="w-4 h-4 text-[#FF2B2B]" />,
      onSelect: () => {
        onClose();
        setIsSettingsOpen(true);
      },
    },
  ];

  const filteredActions = ACTIONS.filter(
    (act) =>
      act.title.toLowerCase().includes(query.toLowerCase()) ||
      act.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onSelect();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0E1118]/95 border border-slate-800 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-[#131620]">
          <Search className="w-4 h-4 text-[#FF2B2B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, section or shader mode (e.g. 'work', 'torus', 'glitch')..."
            className="flex-1 bg-transparent border-none outline-none text-[#F1F5F9] placeholder:text-slate-500 font-mono text-xs"
          />
          <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-slate-700">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Close command bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
          {filteredActions.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No matching commands or actions found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={action.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#FF2B2B]/15 text-white border border-[#FF2B2B]/40'
                      : 'text-slate-300 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-1.5 rounded bg-white/[0.03] border border-slate-800">
                      {action.icon}
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-slate-100 flex items-center gap-2">
                        <span>{action.title}</span>
                      </div>
                      {action.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {action.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] border border-slate-800 text-slate-400">
                      {action.category}
                    </span>
                    {isSelected && (
                      <span className="text-[#FF2B2B] text-xs">↵</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#0A0C12] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-slate-800 rounded text-slate-300">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-slate-800 rounded text-slate-300">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-slate-800 rounded text-slate-300">ESC</kbd> Close
            </span>
          </div>
          <div className="text-slate-400 flex items-center gap-1 text-[10px]">
            <Command className="w-3 h-3 text-[#FF2B2B]" />
            <span>BENCHO COMMAND BAR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
