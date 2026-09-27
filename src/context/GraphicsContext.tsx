import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { GraphicsContextState, RangeEngineSettings, LabSettings, QualityLevel, CompanionState } from '../types/graphics';

const DEFAULT_RANGE_SETTINGS: RangeEngineSettings = {
  shaderMode: 'DEFAULT',
  ambient: 0.45,
  exposure: 1.2,
  roughness: 0.25,
  metallic: 0.15,
  rotationSpeed: 0.8,
  bloom: 0.35,
  wireframe: false,
  lightColor: '#ffffff',
};

const DEFAULT_LAB_SETTINGS: LabSettings = {
  distortion: 0.4,
  noiseSpeed: 0.6,
  noiseScale: 2.5,
  intensity: 1.0,
  scanlines: false,
  chromaticAberration: 0.35,
  vignette: 0.4,
  lightIntensity: 1.2,
  lightAngle: 45,
  topology: 'SOLID',
};

const DEFAULT_COMPANION_STATE: CompanionState = {
  shape: 'cube',
  position: [1.3, 0, 0],
  scale: 1,
  rotationSpeed: 0.8,
  mode: 'DEFAULT',
  wireframe: false,
};

const GraphicsContext = createContext<GraphicsContextState | undefined>(undefined);

export const GraphicsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [particles, setParticles] = useState<boolean>(true);
  const [postFx, setPostFx] = useState<boolean>(false);
  const [quality, setQuality] = useState<QualityLevel>('HIGH');
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [companionState, setCompanionState] = useState(DEFAULT_COMPANION_STATE);
  const [rangeSettings, setRangeSettings] = useState<RangeEngineSettings>(DEFAULT_RANGE_SETTINGS);
  const [labSettings, setLabSettings] = useState<LabSettings>(DEFAULT_LAB_SETTINGS);

  // Live performance stats
  const [fps, setFps] = useState<number>(60);
  const [triangles] = useState<number>(12); // Default Range Cube is 12 tris (6 faces * 2 tris)
  const [drawCalls] = useState<number>(1);

  // FPS calculation loop
  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let animId: number;
    const calculateFps = (time: number) => {
      frameCountRef.current++;
      const delta = time - lastTimeRef.current;
      if (delta >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / delta));
        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Window scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateRangeSettings = (partial: Partial<RangeEngineSettings>) => {
    setRangeSettings((prev) => ({ ...prev, ...partial }));
  };

  const resetRangeSettings = () => {
    setRangeSettings(DEFAULT_RANGE_SETTINGS);
  };

  const updateLabSettings = (partial: Partial<LabSettings>) => {
    setLabSettings((prev) => ({ ...prev, ...partial }));
  };

  const updateCompanionState = (partial: Partial<CompanionState>) => {
    setCompanionState((prev) => ({ ...prev, ...partial }));
  };

  return (
    <GraphicsContext.Provider
      value={{
        reduceMotion,
        setReduceMotion,
        particles,
        setParticles,
        postFx,
        setPostFx,
        quality,
        setQuality,
        fps,
        triangles,
        drawCalls,
        currentSection,
        setCurrentSection,
        scrollProgress,
        setScrollProgress,
        companionState,
        updateCompanionState,
        rangeSettings,
        updateRangeSettings,
        resetRangeSettings,
        labSettings,
        updateLabSettings,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </GraphicsContext.Provider>
  );
};

export const useGraphics = (): GraphicsContextState => {
  const context = useContext(GraphicsContext);
  if (!context) {
    throw new Error('useGraphics must be used within a GraphicsProvider');
  }
  return context;
};
