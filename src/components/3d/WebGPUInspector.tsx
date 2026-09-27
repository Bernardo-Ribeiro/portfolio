import React, { useState } from 'react';
import { Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WebGPUInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doctor' | 'wgsl' | 'pipeline'>('doctor');

  return (
    <div className="w-full bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm corner-bracket p-5 font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-slate-100 font-bold tracking-wider">VGPU // WEBGPU ADAPTER RUNTIME</span>
          <span className="text-[10px] px-2 py-0.5 bg-white/[0.04] text-slate-300 border border-slate-700 rounded-sm">
            v0.5.0
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-3 py-1 text-[11px] rounded-sm transition-all cursor-pointer ${
              activeTab === 'doctor'
                ? 'border border-[#FF2B2B] bg-[#FF2B2B]/15 text-white font-semibold'
                : 'border border-slate-800 bg-[#161A26] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            ADAPTER PROBE
          </button>
          <button
            onClick={() => setActiveTab('wgsl')}
            className={`px-3 py-1 text-[11px] rounded-sm transition-all cursor-pointer ${
              activeTab === 'wgsl'
                ? 'border border-[#FF2B2B] bg-[#FF2B2B]/15 text-white font-semibold'
                : 'border border-slate-800 bg-[#161A26] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            WGSL PIPELINE
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 text-[11px] rounded-sm transition-all cursor-pointer ${
              activeTab === 'pipeline'
                ? 'border border-[#FF2B2B] bg-[#FF2B2B]/15 text-white font-semibold'
                : 'border border-slate-800 bg-[#161A26] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            CLI TOOLING
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'doctor' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#161A26] border border-slate-800 rounded-sm">
                <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#FF2B2B]" />
                  <span>ADAPTER</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1 text-[11px] truncate">
                  radv: Mesa 26.2.2-arch3.2
                </div>
              </div>
              <div className="p-3 bg-[#161A26] border border-slate-800 rounded-sm">
                <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>VULKAN ICD</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1 text-[11px] truncate">
                  libvulkan.so.1 (Active)
                </div>
              </div>
              <div className="p-3 bg-[#161A26] border border-slate-800 rounded-sm">
                <div className="text-slate-400 text-[10px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>STATUS</span>
                </div>
                <div className="text-[#00FF88] font-semibold mt-1 text-[11px]">
                  HEALTHY // VERIFIED
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#0C0E14] border border-slate-800 rounded-sm text-slate-300 text-[11px] space-y-1.5">
              <div className="text-[#FF2B2B] font-semibold flex items-center gap-1.5">
                <span>► REAL-TIME RUNTIME LOG:</span>
              </div>
              <div className="text-slate-400">[probe:linux-mesa] Mesa 26.2 detected (&gt;=23) - OK</div>
              <div className="text-slate-400">[probe:vulkan-loader] Vulkan loader found at /usr/lib/libvulkan.so.1 - OK</div>
              <div className="text-slate-400">[probe:display] State DISPLAY=:0, WAYLAND_DISPLAY=wayland-1 - OK</div>
              <div className="text-slate-400">[probe:render] Offscreen target 16x16 render test passed - OK</div>
            </div>
          </div>
        )}

        {activeTab === 'wgsl' && (
          <div className="space-y-3">
            <div className="text-slate-400 text-[11px]">
              Next-generation typed WebGPU shading language (WGSL) integrated alongside GLSL:
            </div>
            <pre className="p-4 bg-[#0C0E14] border border-slate-800 rounded-sm text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
              <span className="text-[#FF2B2B]">struct</span> Uniforms &#123;{'\n'}
              {'  '}time: <span className="text-[#00FF88]">f32</span>,{'\n'}
              {'  '}distortion: <span className="text-[#00FF88]">f32</span>,{'\n'}
              &#125;;{'\n'}
              <span className="text-[#FF2B2B]">@group</span>(0) <span className="text-[#FF2B2B]">@binding</span>(0) <span className="text-[#FF2B2B]">var</span>&lt;uniform&gt; u: Uniforms;{'\n\n'}
              <span className="text-[#FF2B2B]">@fragment</span> <span className="text-[#FF2B2B]">fn</span> fs_main(@location(0) uv: vec2f) -&gt; <span className="text-[#FF2B2B]">@location</span>(0) vec4f &#123;{'\n'}
              {'  '}let pulse = sin(u.time * 2.0) * 0.5 + 0.5;{'\n'}
              {'  '}return vec4f(1.0, 0.1, 0.1, 1.0) * pulse;{'\n'}
              &#125;
            </pre>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-3">
            <div className="text-slate-400 text-[11px]">
              VGPU CLI commands configured on this portfolio:
            </div>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#0C0E14] border border-slate-800 rounded-sm flex items-center justify-between">
                <code className="text-[#FF2B2B]">npx vgpu doctor</code>
                <span className="text-slate-400 text-[10px]">Probe system WebGPU / Vulkan device</span>
              </div>
              <div className="p-2.5 bg-[#0C0E14] border border-slate-800 rounded-sm flex items-center justify-between">
                <code className="text-[#FF2B2B]">npx vgpu check src/shaders/*.wgsl</code>
                <span className="text-slate-400 text-[10px]">Validate &amp; reflect WGSL shader code</span>
              </div>
              <div className="p-2.5 bg-[#0C0E14] border border-slate-800 rounded-sm flex items-center justify-between">
                <code className="text-[#FF2B2B]">npx vgpu docs cat getting-started.md</code>
                <span className="text-slate-400 text-[10px]">View official vgpu documentation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
