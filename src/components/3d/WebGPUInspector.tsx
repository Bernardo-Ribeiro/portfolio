import React, { useState } from 'react';
import { Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WebGPUInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doctor' | 'wgsl' | 'pipeline'>('doctor');

  return (
    <div className="w-full bg-[#080808] border border-[#222] corner-bracket p-4 font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1c1c1c]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-[#F2F2F2] font-bold tracking-wider">VGPU // WEBGPU ADAPTER RUNTIME</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#FF1A1A]/20 text-[#FF1A1A] border border-[#FF1A1A]/40 rounded">
            v0.5.0
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-2.5 py-1 text-[11px] border transition-colors ${
              activeTab === 'doctor'
                ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white'
                : 'border-[#222] text-[#888] hover:text-white'
            }`}
          >
            ADAPTER PROBE
          </button>
          <button
            onClick={() => setActiveTab('wgsl')}
            className={`px-2.5 py-1 text-[11px] border transition-colors ${
              activeTab === 'wgsl'
                ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white'
                : 'border-[#222] text-[#888] hover:text-white'
            }`}
          >
            WGSL PIPELINE
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-2.5 py-1 text-[11px] border transition-colors ${
              activeTab === 'pipeline'
                ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white'
                : 'border-[#222] text-[#888] hover:text-white'
            }`}
          >
            CLI TOOLING
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-3">
        {activeTab === 'doctor' && (
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 bg-[#0d0d0d] border border-[#1e1e1e]">
                <div className="text-[#666] text-[10px] flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#FF1A1A]" />
                  ADAPTER
                </div>
                <div className="text-[#F2F2F2] font-bold mt-1 text-[11px] truncate">
                  radv: Mesa 26.2.2-arch3.2
                </div>
              </div>
              <div className="p-2.5 bg-[#0d0d0d] border border-[#1e1e1e]">
                <div className="text-[#666] text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
                  VULKAN ICD
                </div>
                <div className="text-[#F2F2F2] font-bold mt-1 text-[11px] truncate">
                  libvulkan.so.1 (Active)
                </div>
              </div>
              <div className="p-2.5 bg-[#0d0d0d] border border-[#1e1e1e]">
                <div className="text-[#666] text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#00FF66]" />
                  STATUS
                </div>
                <div className="text-[#00FF66] font-bold mt-1 text-[11px]">
                  HEALTHY // VERIFIED
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#050505] border border-[#1a1a1a] text-[#858585] text-[11px] space-y-1">
              <div className="text-[#FF1A1A] font-bold">► REAL-TIME RUNTIME LOG:</div>
              <div>[probe:linux-mesa] Mesa 26.2 detected (&gt;=23) - OK</div>
              <div>[probe:vulkan-loader] Vulkan loader found at /usr/lib/libvulkan.so.1 - OK</div>
              <div>[probe:display] State DISPLAY=:0, WAYLAND_DISPLAY=wayland-1 - OK</div>
              <div>[probe:render] Offscreen target 16x16 render test passed - OK</div>
            </div>
          </div>
        )}

        {activeTab === 'wgsl' && (
          <div className="space-y-2">
            <div className="text-[#858585] text-[11px]">
              Next-generation typed WebGPU shading language (WGSL) integrated alongside GLSL:
            </div>
            <pre className="p-3 bg-[#050505] border border-[#1e1e1e] text-[#aaa] text-[11px] overflow-x-auto leading-relaxed">
              <span className="text-[#FF1A1A]">struct</span> Uniforms &#123;{'\n'}
              {'  '}time: <span className="text-[#00FF66]">f32</span>,{'\n'}
              {'  '}distortion: <span className="text-[#00FF66]">f32</span>,{'\n'}
              &#125;;{'\n'}
              <span className="text-[#FF1A1A]">@group</span>(0) <span className="text-[#FF1A1A]">@binding</span>(0) <span className="text-[#FF1A1A]">var</span>&lt;uniform&gt; u: Uniforms;{'\n\n'}
              <span className="text-[#FF1A1A]">@fragment</span> <span className="text-[#FF1A1A]">fn</span> fs_main(@location(0) uv: vec2f) -&gt; <span className="text-[#FF1A1A]">@location</span>(0) vec4f &#123;{'\n'}
              {'  '}let pulse = sin(u.time * 2.0) * 0.5 + 0.5;{'\n'}
              {'  '}return vec4f(1.0, 0.1, 0.1, 1.0) * pulse;{'\n'}
              &#125;
            </pre>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-2">
            <div className="text-[#858585] text-[11px]">
              VGPU CLI commands configured on this portfolio:
            </div>
            <div className="space-y-1.5">
              <div className="p-2 bg-[#050505] border border-[#1a1a1a] flex items-center justify-between">
                <code className="text-[#FF1A1A]">npx vgpu doctor</code>
                <span className="text-[#666] text-[10px]">Probe system WebGPU / Vulkan device</span>
              </div>
              <div className="p-2 bg-[#050505] border border-[#1a1a1a] flex items-center justify-between">
                <code className="text-[#FF1A1A]">npx vgpu check src/shaders/*.wgsl</code>
                <span className="text-[#666] text-[10px]">Validate &amp; reflect WGSL shader code</span>
              </div>
              <div className="p-2 bg-[#050505] border border-[#1a1a1a] flex items-center justify-between">
                <code className="text-[#FF1A1A]">npx vgpu docs cat getting-started.md</code>
                <span className="text-[#666] text-[10px]">View official vgpu documentation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
