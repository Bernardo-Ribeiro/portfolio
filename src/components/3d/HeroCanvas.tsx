import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TheRedCube } from './TheRedCube';
import { useGraphics } from '../../context/GraphicsContext';

// Background technical particles
const BackgroundDust: React.FC<{ count?: number }> = ({ count = 250 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { reduceMotion, particles } = useGraphics();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
      sc[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sc];
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    return g;
  }, [positions, scales]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reduceMotion || !particles) return;
    if (typeof document !== 'undefined' && document.hidden) return;
    const safeDelta = Math.min(delta, 0.05);
    pointsRef.current.rotation.y = (pointsRef.current.rotation.y + safeDelta * 0.02) % (Math.PI * 2);
    pointsRef.current.rotation.x = (pointsRef.current.rotation.x + safeDelta * 0.01) % (Math.PI * 2);
  });

  if (!particles) return null;

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.035}
        color="#858585"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Smooth Camera Controller with mouse parallax and scroll tracking
const CameraRig: React.FC = () => {
  const { reduceMotion, scrollProgress } = useGraphics();

  useFrame((state) => {
    if (reduceMotion) {
      state.camera.position.set(0, 0, 5.5);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Scroll drives camera dolly and rotation
    const scrollZ = 5.5 - Math.min(scrollProgress * 2.5, 2.0);
    const scrollY = -scrollProgress * 1.5;

    // Mouse parallax
    const targetX = (state.pointer.x * 0.4);
    const targetY = (state.pointer.y * 0.4) + scrollY;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.position.z += (scrollZ - state.camera.position.z) * 0.05;

    state.camera.lookAt(0.3, 0, 0);
  });

  return null;
};

export const HeroCanvas: React.FC = () => {
  const { quality } = useGraphics();
  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  return (
    <div className="absolute inset-0 pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={dpr as [number, number]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows={quality !== 'LOW'}
      >
        <CameraRig />
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#ffffff"
          castShadow={quality !== 'LOW'}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#FF1A1A" />
        <spotLight
          position={[0, 5, 2]}
          intensity={0.6}
          angle={0.6}
          penumbra={0.8}
          color="#ffffff"
        />

        <BackgroundDust count={300} />

        {/* Positioned slightly offset to complement the typography */}
        <group position={[1.4, 0, 0]}>
          <TheRedCube size={2.0} interactive={true} />
        </group>
      </Canvas>
    </div>
  );
};
