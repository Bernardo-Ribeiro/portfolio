import React from 'react';
import { useGraphics } from '../../context/GraphicsContext';
import { X, Sliders } from 'lucide-react';
import type { QualityLevel } from '../../types/graphics';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-[#0E1118]/95 border border-slate-800 rounded-sm shadow-2xl p-6 font-mono text-xs relative"
        role="dialog"
        aria-label="System Settings"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF2B2B]" />
            <span className="font-bold tracking-wider text-slate-100">SYSTEM // GRAPHICS CONFIG</span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List */}
        <div className="space-y-3.5">
          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-3.5 bg-[#161A26] border border-slate-800 rounded-sm">
            <div>
              <div className="text-slate-200 text-xs font-semibold">REDUCE MOTION</div>
              <div className="text-slate-400 text-[11px]">Minimizes camera shifts and rotation speed</div>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              type="button"
              aria-label={`Toggle reduce motion. Currently ${reduceMotion ? 'ON' : 'OFF'}`}
              className={`px-3 py-1 text-xs rounded-sm transition-all cursor-pointer ${
                reduceMotion
                  ? 'border border-[#FF2B2B] bg-[#FF2B2B] text-white font-bold'
                  : 'border border-slate-700 bg-[#11141D] text-slate-400 hover:text-white'
              }`}
            >
              {reduceMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Particles */}
          <div className="flex items-center justify-between p-3.5 bg-[#161A26] border border-slate-800 rounded-sm">
            <div>
              <div className="text-slate-200 text-xs font-semibold">PARTICLES &amp; STARFIELD</div>
              <div className="text-slate-400 text-[11px]">Ambient background 3D dust &amp; emitters</div>
            </div>
            <button
              onClick={() => setParticles(!particles)}
              type="button"
              aria-label={`Toggle 3D particles. Currently ${particles ? 'ON' : 'OFF'}`}
              className={`px-3 py-1 text-xs rounded-sm transition-all cursor-pointer ${
                particles
                  ? 'border border-[#FF2B2B] bg-[#FF2B2B] text-white font-bold'
                  : 'border border-slate-700 bg-[#11141D] text-slate-400 hover:text-white'
              }`}
            >
              {particles ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Post FX */}
          <div className="flex items-center justify-between p-3.5 bg-[#161A26] border border-slate-800 rounded-sm">
            <div>
              <div className="text-slate-200 text-xs font-semibold">POST FX &amp; BLOOM</div>
              <div className="text-slate-400 text-[11px]">Hardware post-processing passes</div>
            </div>
            <button
              onClick={() => setPostFx(!postFx)}
              type="button"
              aria-label={`Toggle post processing effects. Currently ${postFx ? 'ON' : 'OFF'}`}
              className={`px-3 py-1 text-xs rounded-sm transition-all cursor-pointer ${
                postFx
                  ? 'border border-[#FF2B2B] bg-[#FF2B2B] text-white font-bold'
                  : 'border border-slate-700 bg-[#11141D] text-slate-400 hover:text-white'
              }`}
            >
              {postFx ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* 3D Quality */}
          <div className="p-3.5 bg-[#161A26] border border-slate-800 rounded-sm">
            <div className="flex justify-between items-center mb-2.5">
              <div className="text-slate-200 text-xs font-semibold">3D QUALITY &amp; RESOLUTION</div>
              <div className="text-slate-400 text-[11px]">
                {quality === 'HIGH' ? 'DPR 2.0 // HIGH PERFORMANCE' : quality === 'MED' ? 'DPR 1.5' : 'DPR 1.0 // LOW IMPACT'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MED', 'HIGH'] as QualityLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setQuality(lvl)}
                  type="button"
                  aria-label={`Set 3D graphics quality to ${lvl}`}
                  className={`py-1.5 text-xs rounded-sm border text-center transition-all cursor-pointer ${
                    quality === lvl
                      ? 'border-[#FF2B2B] bg-[#FF2B2B]/20 text-white font-semibold'
                      : 'border-slate-800 bg-[#11141D] text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Runtime stats */}
          <div className="p-3 bg-[#0C0E14] border border-slate-800 rounded-sm text-[11px] text-slate-400 flex justify-between">
            <span>LIVE FPS: <strong className="text-slate-200">{fps}</strong></span>
            <span>BACKEND: <strong className="text-[#FF2B2B]">WEBGL2 / VGPU</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <BenchoMagneticButton
            onClick={() => setIsSettingsOpen(false)}
            strength={0.2}
            className="w-full py-2.5 bg-[#FF2B2B] hover:bg-[#ff4d4d] text-white font-semibold text-xs tracking-wider rounded-sm shadow-[0_0_15px_rgba(255,43,43,0.3)]"
          >
            [ CLOSE SETTINGS ]
          </BenchoMagneticButton>
        </div>
      </div>
    </div>
  );
};
