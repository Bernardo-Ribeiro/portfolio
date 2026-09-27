import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGraphics } from '../../context/GraphicsContext';
import { useGSAP } from '../../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import type { CompanionShapeType, ShaderRenderMode } from '../../types/graphics';
import {
  ProceduralShaderMaterial,
  ToonShaderMaterial,
  FresnelShaderMaterial,
  GlitchShaderMaterial,
  IsoLatticeShaderMaterial,
  InterferenceMeshShaderMaterial,
} from '../../shaders/shaders';

// Subtle floating particle stars
const AmbientDust: React.FC<{ count?: number }> = ({ count = 180 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { reduceMotion, particles } = useGraphics();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      sc[i] = Math.random() * 0.03 + 0.01;
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
    pointsRef.current.rotation.y += safeDelta * 0.015;
  });

  if (!particles) return null;

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.03}
        color="#94a3b8"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Morphable 3D Mesh
const MorphableMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef<{ value: number }>({ value: 1 });

  const { companionState, rangeSettings, reduceMotion } = useGraphics();

  // Geometries for each shape
  const geometries = useMemo(() => {
    return {
      cube: new THREE.BoxGeometry(2.0, 2.0, 2.0, 6, 6, 6),
      octahedron: new THREE.OctahedronGeometry(1.6, 0),
      icosahedron: new THREE.IcosahedronGeometry(1.5, 0),
      torusKnot: new THREE.TorusKnotGeometry(1.0, 0.32, 96, 16),
      dodecahedron: new THREE.DodecahedronGeometry(1.4, 0),
      wireSphere: new THREE.SphereGeometry(1.5, 24, 24),
    };
  }, []);

  // Edges geometries for clean wireframe contour
  const edgeGeometries = useMemo(() => {
    return {
      cube: new THREE.EdgesGeometry(geometries.cube),
      octahedron: new THREE.EdgesGeometry(geometries.octahedron),
      icosahedron: new THREE.EdgesGeometry(geometries.icosahedron),
      torusKnot: null, // Torus knot looks cleaner with surface only or standard wire
      dodecahedron: new THREE.EdgesGeometry(geometries.dodecahedron),
      wireSphere: null,
    };
  }, [geometries]);

  const [activeShape, setActiveShape] = useState<CompanionShapeType>(companionState.shape);
  const prevShapeRef = useRef<CompanionShapeType>(companionState.shape);

  // Smooth pop morph animation on shape change
  useEffect(() => {
    if (companionState.shape !== prevShapeRef.current) {
      prevShapeRef.current = companionState.shape;
      
      // Quick collapse -> change shape -> expand
      gsap.to(scaleRef.current, {
        value: 0.1,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveShape(companionState.shape);
          gsap.to(scaleRef.current, {
            value: 1,
            duration: 0.45,
            ease: 'back.out(1.8)',
          });
        },
      });
    }
  }, [companionState.shape]);

  // Shader Materials
  const proceduralMat = useMemo(() => new THREE.ShaderMaterial({
    ...ProceduralShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(ProceduralShaderMaterial.uniforms)
  }), []);

  const toonMat = useMemo(() => new THREE.ShaderMaterial({
    ...ToonShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(ToonShaderMaterial.uniforms)
  }), []);

  const fresnelMat = useMemo(() => new THREE.ShaderMaterial({
    ...FresnelShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(FresnelShaderMaterial.uniforms)
  }), []);

  const glitchMat = useMemo(() => new THREE.ShaderMaterial({
    ...GlitchShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(GlitchShaderMaterial.uniforms)
  }), []);

  const isoLatticeMat = useMemo(() => new THREE.ShaderMaterial({
    ...IsoLatticeShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(IsoLatticeShaderMaterial.uniforms)
  }), []);

  const interferenceMat = useMemo(() => new THREE.ShaderMaterial({
    ...InterferenceMeshShaderMaterial,
    uniforms: THREE.UniformsUtils.clone(InterferenceMeshShaderMaterial.uniforms)
  }), []);

  // Signature Red PBR material
  const standardMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF2626'),
    roughness: rangeSettings.roughness,
    metalness: rangeSettings.metallic,
    emissive: new THREE.Color('#400505'),
    emissiveIntensity: 0.25,
  }), [rangeSettings.roughness, rangeSettings.metallic]);

  const wireOnlyMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#FF2626'),
    wireframe: true,
  }), []);

  const currentMode: ShaderRenderMode = companionState.mode;

  const activeMaterial = useMemo(() => {
    switch (currentMode) {
      case 'WIREFRAME':
        return wireOnlyMat;
      case 'TOON':
        return toonMat;
      case 'FRESNEL':
        return fresnelMat;
      case 'GLITCH':
        return glitchMat;
      case 'CUSTOM':
        return proceduralMat;
      case 'ISO_LATTICE':
        return isoLatticeMat;
      case 'INTERFERENCE':
        return interferenceMat;
      default:
        return standardMat;
    }
  }, [currentMode, wireOnlyMat, toonMat, fresnelMat, glitchMat, proceduralMat, isoLatticeMat, interferenceMat, standardMat]);

  // Target position and orientation lerp
  const currentPos = useRef(new THREE.Vector3(...companionState.position));
  const targetPos = useRef(new THREE.Vector3(...companionState.position));

  // Independent auto-rotation and mouse parallax refs to prevent acceleration bugs
  const autoRotX = useRef(0);
  const autoRotY = useRef(0);
  const parallaxRotX = useRef(0);
  const parallaxRotY = useRef(0);

  useEffect(() => {
    targetPos.current.set(...companionState.position);
  }, [companionState.position]);

  // Continuous frame loop with safe delta clamping
  useFrame((state, delta) => {
    // Prevent delta spikes and calculations while tab is inactive
    if (typeof document !== 'undefined' && document.hidden) return;
    const safeDelta = Math.min(delta, 0.05);

    const time = state.clock.getElapsedTime();

    // Uniform updates
    if (proceduralMat.uniforms.uTime) proceduralMat.uniforms.uTime.value = time;
    if (fresnelMat.uniforms.uTime) fresnelMat.uniforms.uTime.value = time;
    if (glitchMat.uniforms.uTime) glitchMat.uniforms.uTime.value = time;
    if (isoLatticeMat.uniforms.uTime) isoLatticeMat.uniforms.uTime.value = time;
    if (interferenceMat.uniforms.uTime) interferenceMat.uniforms.uTime.value = time;

    // Smooth position interpolation
    currentPos.current.lerp(targetPos.current, 0.05);

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      const s = scaleRef.current.value * companionState.scale;
      groupRef.current.scale.set(s, s, s);
    }

    if (meshRef.current) {
      const rotSpeed = reduceMotion ? 0.1 : companionState.rotationSpeed;
      // Increment auto-rotation using safe clamped delta and wrap within [0, 2π]
      autoRotX.current = (autoRotX.current + safeDelta * 0.45 * rotSpeed) % (Math.PI * 2);
      autoRotY.current = (autoRotY.current + safeDelta * 0.75 * rotSpeed) % (Math.PI * 2);

      // Smooth mouse parallax interpolation
      if (!reduceMotion) {
        const targetRotY = (state.pointer.x * Math.PI) / 8;
        const targetRotX = (-state.pointer.y * Math.PI) / 8;
        parallaxRotX.current = THREE.MathUtils.lerp(parallaxRotX.current, targetRotX, 0.05);
        parallaxRotY.current = THREE.MathUtils.lerp(parallaxRotY.current, targetRotY, 0.05);
      } else {
        parallaxRotX.current = 0;
        parallaxRotY.current = 0;
      }

      meshRef.current.rotation.x = autoRotX.current + parallaxRotX.current;
      meshRef.current.rotation.y = autoRotY.current + parallaxRotY.current;

      if (wireRef.current) {
        wireRef.current.rotation.copy(meshRef.current.rotation);
      }
    }
  });

  const geo = geometries[activeShape] || geometries.cube;
  const edgeGeo = edgeGeometries[activeShape];

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        geometry={geo}
        material={activeMaterial}
        castShadow
        receiveShadow
      />

      {/* Subtle glowing edge lines */}
      {edgeGeo && currentMode !== 'WIREFRAME' && (
        <lineSegments ref={wireRef} geometry={edgeGeo}>
          <lineBasicMaterial color="#FF5C5C" opacity={0.5} transparent />
        </lineSegments>
      )}
    </group>
  );
};

export const GlobalShapeCompanion: React.FC = () => {
  const { quality, updateCompanionState } = useGraphics();
  const dpr = quality === 'HIGH' ? [1, 2] : quality === 'MED' ? [1, 1.5] : [1, 1];

  // GSAP ScrollTrigger to orchestrate shape transformations across sections
  useGSAP(() => {
    // Media query: check if screen is desktop or mobile
    const isMobile = window.innerWidth < 768;

    const chapters: {
      id: string;
      shape: CompanionShapeType;
      pos: [number, number, number];
      scale: number;
      mode: ShaderRenderMode;
    }[] = [
      {
        id: '#hero',
        shape: 'cube',
        pos: isMobile ? [0, 0.4, 0] : [1.4, 0, 0],
        scale: isMobile ? 0.75 : 1.05,
        mode: 'DEFAULT',
      },
      {
        id: '#build',
        shape: 'octahedron',
        pos: isMobile ? [0, 0.3, 0] : [1.4, -0.05, 0.1],
        scale: isMobile ? 0.8 : 1.05,
        mode: 'WIREFRAME',
      },
      {
        id: '#range',
        shape: 'torusKnot',
        pos: isMobile ? [0, 0.2, 0] : [0.9, 0, 0.3],
        scale: isMobile ? 0.7 : 0.95,
        mode: 'CUSTOM',
      },
      {
        id: '#lab',
        shape: 'dodecahedron',
        pos: isMobile ? [0, 0.2, 0] : [1.7, 0.1, 0],
        scale: isMobile ? 0.75 : 1.0,
        mode: 'FRESNEL',
      },
      {
        id: '#work',
        shape: 'icosahedron',
        pos: isMobile ? [0, 0.4, -0.5] : [2.0, 0.2, -0.5],
        scale: isMobile ? 0.65 : 0.9,
        mode: 'DEFAULT',
      },
      {
        id: '#cube',
        shape: 'cube',
        pos: [0, 0, 0.5],
        scale: isMobile ? 0.9 : 1.3,
        mode: 'DEFAULT',
      },
      {
        id: '#about',
        shape: 'dodecahedron',
        pos: isMobile ? [0, 0.3, 0] : [1.5, -0.2, 0],
        scale: isMobile ? 0.75 : 1.0,
        mode: 'TOON',
      },
      {
        id: '#contact',
        shape: 'wireSphere',
        pos: isMobile ? [0, 0.3, 0] : [1.2, 0.1, 0],
        scale: isMobile ? 0.8 : 1.05,
        mode: 'WIREFRAME',
      },
    ];

    chapters.forEach((ch) => {
      const el = document.querySelector(ch.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: ch.id,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () => {
          updateCompanionState({
            shape: ch.shape,
            position: ch.pos,
            scale: ch.scale,
            mode: ch.mode,
          });
        },
        onEnterBack: () => {
          updateCompanionState({
            shape: ch.shape,
            position: ch.pos,
            scale: ch.scale,
            mode: ch.mode,
          });
        },
      });
    });

    // Refresh ScrollTrigger after DOM load
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={dpr as [number, number]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 7, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={0.9} color="#FF2626" />
        <spotLight
          position={[0, 6, 2]}
          intensity={0.7}
          angle={0.6}
          penumbra={0.8}
          color="#ffffff"
        />

        <AmbientDust count={200} />
        <MorphableMesh />
      </Canvas>
    </div>
  );
};
