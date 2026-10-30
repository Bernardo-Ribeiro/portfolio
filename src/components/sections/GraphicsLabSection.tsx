import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { RangeScene } from '../3d/RangeScene';
import { LabProceduralMesh, LabLightingScene, LabTopologyScene } from '../3d/LabCanvas';
import { WebGPUInspector } from '../3d/WebGPUInspector';
import { useGraphics } from '../../context/GraphicsContext';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { useSectionMotion } from '../../hooks/useSectionMotion';
import type { ShaderRenderMode } from '../../types/graphics';

const TABS = [
  { id: 'materials', label: 'Materials', note: 'One cube. Eleven treatments.' },
  { id: 'noise', label: 'Procedural', note: 'Shape a surface with noise.' },
  { id: 'light', label: 'Lighting', note: 'Move the light. Watch the shadows.' },
  { id: 'topology', label: 'Geometry', note: 'Explore the structure beneath the surface.' },
  { id: 'webgpu', label: 'WebGPU', note: 'Explore the browser’s GPU capabilities.' },
] as const;
type StudioTab = typeof TABS[number]['id'];
const MATERIALS: { id: ShaderRenderMode; label: string }[] = [
  { id: 'DEFAULT', label: 'PBR' }, { id: 'WIREFRAME', label: 'Wireframe' },
  { id: 'TOON', label: 'Toon' }, { id: 'FRESNEL', label: 'Fresnel' },
  { id: 'GLASS', label: 'Glass' }, { id: 'METALLIC', label: 'Metal' },
  { id: 'GLITCH', label: 'Glitch' }, { id: 'DISSOLVE', label: 'Particles' },
  { id: 'CUSTOM', label: 'Noise' }, { id: 'ISO_LATTICE', label: 'Lattice' },
  { id: 'INTERFERENCE', label: 'Moiré' },
];

function Slider({ label, value, min = 0, max = 1, step = 0.05, onChange }: {
  label: string; value: number; min?: number; max?: number; step?: number; onChange: (value: number) => void;
}) {
  return <label className="studio-slider">
    <span>{label}<output>{Number.isInteger(step) ? value : value.toFixed(2)}</output></span>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={event => onChange(Number(event.target.value))} />
  </label>;
}

export function GraphicsLabSection({ onReady }: { onReady?: () => void }) {
  useLayoutEffect(() => onReady?.(), [onReady]);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: '120px' });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const [activeTab, setActiveTab] = useState<StudioTab>('materials');
  const { rangeSettings: material, updateRangeSettings, resetRangeSettings, labSettings: lab, updateLabSettings, quality, reduceMotion } = useGraphics();
  useSectionMotion(sectionRef);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (reduceMotion) return;
      gsap.from(panelRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity' });
    });
    ScrollTrigger.refresh();
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [activeTab, reduceMotion], revertOnUpdate: true });
  const dpr: [number, number] = [1, quality === 'HIGH' ? 2 : quality === 'MED' ? 1.5 : 1];
  const active = TABS.find(tab => tab.id === activeTab)!;

  return <section id="lab" ref={sectionRef} className="portfolio-section studio-section">
    <div className="section-shell">
      <div className="section-kicker" data-reveal><span>02 / PLAYGROUND</span><span>INTERACTIVE · IN YOUR BROWSER</span></div>
      <div className="section-heading" data-reveal>
        <h2>Less theory.<br /><span className="text-slate-500">More play.</span></h2>
        <p>Materials, shaders and light.<br />A small studio to try them all.</p>
      </div>
      <div className="section-rule" data-draw />
      {/* Preserve incoming links to the former standalone experiments. */}
      <span id="build" className="studio-anchor" /><span id="cube" className="studio-anchor" /><span id="range" className="studio-anchor" />
      <div data-reveal className="studio-workspace">
        <div className="studio-tabs" role="tablist" aria-label="Graphics experiments">
          {TABS.map((tab, index) => <button type="button" role="tab" key={tab.id} id={`tab-${tab.id}`} aria-selected={tab.id === activeTab} aria-controls="studio-panel" tabIndex={tab.id === activeTab ? 0 : -1}
            onClick={() => setActiveTab(tab.id)} onKeyDown={event => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % TABS.length;
              else if (event.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = TABS.length - 1;
              else return;
              event.preventDefault(); setActiveTab(TABS[next].id);
              document.getElementById(`tab-${TABS[next].id}`)?.focus();
            }}><span className="studio-tab-number">0{index + 1}</span>{tab.label}<span className="studio-tab-dot" /></button>)}
        </div>
        <div ref={panelRef} id="studio-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
          {activeTab === 'webgpu' ? <div className="p-4 sm:p-6"><WebGPUInspector /></div> : <div className="studio-grid">
            <div className="studio-preview">
              {activeTab === 'materials' ? (isVisible ? <RangeScene /> : <div className="w-full h-full bg-[#040404] border border-[#222222]" />) : <>
                <div className="studio-preview-label">{active.label} <span>LIVE RENDER</span></div>
                {isVisible && <Canvas key={activeTab} camera={{ position: activeTab === 'light' ? [0, 2, 5] : [0, 0, 4.5], fov: 45 }} dpr={dpr} shadows={activeTab === 'light' && quality !== 'LOW'}>
                  {activeTab === 'noise' && <LabProceduralMesh />}
                  {activeTab === 'light' && <LabLightingScene />}
                  {activeTab === 'topology' && <LabTopologyScene />}
                </Canvas>}
              </>}
              {activeTab === 'noise' && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle, transparent 35%, rgba(0,0,0,${lab.vignette}) 100%)` }} />}
            </div>
            <aside className="studio-controls">
              <div className="flex justify-between gap-4 items-start mb-7"><div><span className="eyebrow">TWEAK & EXPLORE</span><h3>{active.label}</h3></div>
                {activeTab === 'materials' && <button type="button" onClick={resetRangeSettings} aria-label="Reset material settings" className="studio-reset"><RotateCcw size={16} /></button>}
              </div>
              {activeTab === 'materials' && <>
                <div className="material-options">{MATERIALS.map(option => <button type="button" key={option.id} aria-pressed={material.shaderMode === option.id} onClick={() => updateRangeSettings({ shaderMode: option.id })}>{option.label}</button>)}</div>
                {(material.shaderMode === 'DEFAULT') && <>
                  <Slider label="Roughness" value={material.roughness} onChange={roughness => updateRangeSettings({ roughness })} />
                  <Slider label="Metalness" value={material.metallic} onChange={metallic => updateRangeSettings({ metallic })} />
                </>}
                <Slider label="Ambient light" value={material.ambient} onChange={ambient => updateRangeSettings({ ambient })} />
                <Slider label="Light intensity" value={material.exposure} min={0.2} max={2.5} step={0.1} onChange={exposure => updateRangeSettings({ exposure })} />
                <Slider label="Rotation" value={material.rotationSpeed} max={2} step={0.1} onChange={rotationSpeed => updateRangeSettings({ rotationSpeed })} />
              </>}
              {activeTab === 'noise' && <>
                <Slider label="Distortion" value={lab.distortion} max={1.5} onChange={distortion => updateLabSettings({ distortion })} />
                <Slider label="Frequency" value={lab.noiseScale} min={0.5} max={6} step={0.1} onChange={noiseScale => updateLabSettings({ noiseScale })} />
                <Slider label="Speed" value={lab.noiseSpeed} max={2} step={0.1} onChange={noiseSpeed => updateLabSettings({ noiseSpeed })} />
                <Slider label="Intensity" value={lab.intensity} min={0.1} max={2} step={0.1} onChange={intensity => updateLabSettings({ intensity })} />
                <Slider label="Vignette" value={lab.vignette} max={0.95} onChange={vignette => updateLabSettings({ vignette })} />
              </>}
              {activeTab === 'light' && <>
                <Slider label="Light angle" value={lab.lightAngle} max={360} step={5} onChange={lightAngle => updateLabSettings({ lightAngle })} />
                <Slider label="Light intensity" value={lab.lightIntensity} min={0.2} max={3} step={0.1} onChange={lightIntensity => updateLabSettings({ lightIntensity })} />
              </>}
              {activeTab === 'topology' && <div className="material-options">{(['SOLID', 'WIREFRAME', 'POINTS', 'NORMALS'] as const).map(topology => <button type="button" key={topology} aria-pressed={lab.topology === topology} onClick={() => updateLabSettings({ topology })}>{topology.toLowerCase()}</button>)}</div>}
              <p className="studio-hint">{active.note}</p>
            </aside>
          </div>}
        </div>
        <div className="studio-footer"><span>THREE.JS / GLSL / WEBGPU</span><a href="https://github.com/Bernardo-Ribeiro/Filters_Materials-Shaders-Range-Engine" target="_blank" rel="noreferrer">Explore the shader collection <ArrowUpRight size={14} /></a></div>
      </div>
    </div>
  </section>;
}
