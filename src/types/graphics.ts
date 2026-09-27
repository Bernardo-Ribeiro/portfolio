export type ShaderRenderMode = 
  | 'DEFAULT'
  | 'WIREFRAME'
  | 'TOON'
  | 'FRESNEL'
  | 'GLASS'
  | 'METALLIC'
  | 'GLITCH'
  | 'DISSOLVE'
  | 'CUSTOM'
  | 'ISO_LATTICE'
  | 'INTERFERENCE';

export type QualityLevel = 'HIGH' | 'MED' | 'LOW';

export interface RangeEngineSettings {
  shaderMode: ShaderRenderMode;
  ambient: number;
  exposure: number;
  roughness: number;
  metallic: number;
  rotationSpeed: number;
  bloom: number;
  wireframe: boolean;
  lightColor: string;
}

export interface LabSettings {
  distortion: number;
  noiseSpeed: number;
  noiseScale: number;
  intensity: number;
  scanlines: boolean;
  chromaticAberration: number;
  vignette: number;
  lightIntensity: number;
  lightAngle: number;
  topology: 'SOLID' | 'WIREFRAME' | 'POINTS' | 'NORMALS';
}

export type CompanionShapeType = 
  | 'cube'
  | 'octahedron'
  | 'icosahedron'
  | 'torusKnot'
  | 'dodecahedron'
  | 'wireSphere';

export interface CompanionState {
  shape: CompanionShapeType;
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
  mode: ShaderRenderMode;
  wireframe: boolean;
}

export interface GraphicsContextState {
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  particles: boolean;
  setParticles: (v: boolean) => void;
  postFx: boolean;
  setPostFx: (v: boolean) => void;
  quality: QualityLevel;
  setQuality: (q: QualityLevel) => void;
  fps: number;
  triangles: number;
  drawCalls: number;
  currentSection: string;
  setCurrentSection: (s: string) => void;
  scrollProgress: number;
  setScrollProgress: (p: number) => void;
  
  // 3D Shape Companion State
  companionState: CompanionState;
  updateCompanionState: (partial: Partial<CompanionState>) => void;
  
  // Range Engine Scene Settings
  rangeSettings: RangeEngineSettings;
  updateRangeSettings: (partial: Partial<RangeEngineSettings>) => void;
  resetRangeSettings: () => void;
  
  // Lab Settings
  labSettings: LabSettings;
  updateLabSettings: (partial: Partial<LabSettings>) => void;
  
  // Settings modal
  isSettingsOpen: boolean;
  setIsSettingsOpen: (v: boolean) => void;
}
