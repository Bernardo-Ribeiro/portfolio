import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TheRedCube } from './TheRedCube';
import { useGraphics } from '../../context/GraphicsContext';

// Procedural grid floor with Range Engine coordinate markings
const RangeFloor: React.FC = () => {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Floor receiver */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#080808"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Primary Grid */}
      <gridHelper
        args={[20, 20, '#FF1A1A', '#222222']}
        position={[0, 0.01, 0]}
      />

      {/* Axis markers */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[4, 0.02, 0.02]} />
        <meshBasicMaterial color="#FF1A1A" opacity={0.7} transparent />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.02, 0.02, 4]} />
        <meshBasicMaterial color="#444444" opacity={0.7} transparent />
      </mesh>
    </group>
  );
};

// Floating Range Cube with shadow and gentle hover
const InteractiveRangeObject: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { reduceMotion, rangeSettings } = useGraphics();

  useFrame((state) => {
    if (!groupRef.current) return;
    if (!reduceMotion) {
      const t = state.clock.getElapsedTime();
      // Gentle levitation float
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <TheRedCube
        mode={rangeSettings.shaderMode}
        roughness={rangeSettings.roughness}
        metallic={rangeSettings.metallic}
        rotationSpeed={rangeSettings.rotationSpeed}
        size={2.0}
        wireframeOverlay={rangeSettings.wireframe}
      />
    </group>
  );
};

export const RangeScene: React.FC = () => {
  const { rangeSettings, quality } = useGraphics();
  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  return (
    <div className="w-full h-full min-h-[460px] relative bg-[#040404] border border-[#222222] overflow-hidden">
      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-[#858585] z-10 select-none">
        VIEWPORT: PERSPECTIVE // CAMERA: (0, 1.2, 5.2)
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-2 text-[10px] font-mono text-[#858585] z-10 select-none">
        <span className="inline-block w-2 h-2 rounded-full bg-[#FF1A1A] animate-pulse"></span>
        RENDERER: RANGE_PBR_V2
      </div>

      <Canvas
        camera={{ position: [2.5, 1.4, 4.8], fov: 42 }}
        dpr={dpr as [number, number]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows={quality !== 'LOW'}
      >
        {/* Dynamic lights controlled by Range Engine panel */}
        <ambientLight intensity={rangeSettings.ambient} />
        
        <directionalLight
          position={[4, 6, 4]}
          intensity={rangeSettings.exposure * 1.5}
          castShadow={quality !== 'LOW'}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Technical Rim/Fill Light */}
        <pointLight
          position={[-3, 2, -2]}
          intensity={rangeSettings.exposure * 0.7}
          color="#FF3333"
        />

        {/* Emissive bloom fill simulation */}
        <spotLight
          position={[0, 4, 2]}
          intensity={rangeSettings.bloom * 2.0}
          angle={0.6}
          penumbra={1}
          color="#FF6666"
        />

        <InteractiveRangeObject />
        <RangeFloor />
      </Canvas>

      {/* Bottom status readout */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-[#555] border-t border-[#161616] pt-1 px-1 pointer-events-none">
        <div>ACTIVE PASS: {rangeSettings.shaderMode}</div>
        <div>ROUGH: {rangeSettings.roughness.toFixed(2)} | MET: {rangeSettings.metallic.toFixed(2)}</div>
        <div>SHADOW MAP: 1024x1024 PCF</div>
      </div>
    </div>
  );
};
