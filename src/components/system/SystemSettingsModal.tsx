import React from 'react';
import { useGraphics } from '../../context/GraphicsContext';
import { X, Sliders } from 'lucide-react';
import type { QualityLevel } from '../../types/graphics';

export const SystemSettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    reduceMotion,
    setReduceMotion,
    particles,
    setParticles,
    postFx,
    setPostFx,
    quality,
    setQuality,
    fps,
  } = useGraphics();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div 
        className="w-full max-w-md bg-[#080808] border border-[#2a2a2a] corner-bracket shadow-2xl p-6 font-mono text-sm relative"
        role="dialog"
        aria-label="System Settings"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF1A1A]" />
            <span className="font-bold tracking-wider text-white">SYSTEM // GRAPHICS CONFIG</span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-[#888] hover:text-white transition-colors p-1"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
            <div>
              <div className="text-white text-xs font-bold">REDUCE MOTION</div>
              <div className="text-[#666] text-[10px]">Minimizes camera shifts and rotation speed</div>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`px-3 py-1 text-xs border transition-all ${
                reduceMotion
                  ? 'border-[#FF1A1A] bg-[#FF1A1A] text-black font-bold'
                  : 'border-[#333] text-[#888] hover:border-[#555]'
              }`}
            >
              {reduceMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Particles */}
          <div className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
            <div>
              <div className="text-white text-xs font-bold">PARTICLES</div>
              <div className="text-[#666] text-[10px]">Ambient background 3D dust &amp; emitters</div>
            </div>
            <button
              onClick={() => setParticles(!particles)}
              className={`px-3 py-1 text-xs border transition-all ${
                particles
                  ? 'border-[#FF1A1A] bg-[#FF1A1A] text-black font-bold'
                  : 'border-[#333] text-[#888] hover:border-[#555]'
              }`}
            >
              {particles ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Post FX */}
          <div className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
            <div>
              <div className="text-white text-xs font-bold">POST FX &amp; SCANLINES</div>
              <div className="text-[#666] text-[10px]">Technical CRT scanlines and chromatic dispersion</div>
            </div>
            <button
              onClick={() => setPostFx(!postFx)}
              className={`px-3 py-1 text-xs border transition-all ${
                postFx
                  ? 'border-[#FF1A1A] bg-[#FF1A1A] text-black font-bold'
                  : 'border-[#333] text-[#888] hover:border-[#555]'
              }`}
            >
              {postFx ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* 3D Quality */}
          <div className="p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white text-xs font-bold">3D QUALITY</div>
              <div className="text-[#888] text-[10px]">
                {quality === 'HIGH' ? 'DPR 2.0 // PCF SHADOWS' : quality === 'MED' ? 'DPR 1.5' : 'DPR 1.0 // LOW IMPACT'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MED', 'HIGH'] as QualityLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setQuality(lvl)}
                  className={`py-1.5 text-xs border text-center transition-all ${
                    quality === lvl
                      ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                      : 'border-[#222] text-[#666] hover:text-[#bbb] hover:border-[#444]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Runtime stats */}
          <div className="p-3 bg-[#050505] border border-[#161616] text-[11px] text-[#666] flex justify-between">
            <span>LIVE FPS: <strong className="text-white">{fps}</strong></span>
            <span>BACKEND: <strong className="text-[#FF1A1A]">WEBGL2 / VGPU</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="w-full py-2 bg-[#FF1A1A] hover:bg-[#ff3838] text-white font-bold text-xs tracking-wider transition-colors"
          >
            [ CLOSE SETTINGS ]
          </button>
        </div>
      </div>
    </div>
  );
};
