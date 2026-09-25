import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGraphics } from '../../context/GraphicsContext';
import {
  ProceduralShaderMaterial,
  ToonShaderMaterial,
  FresnelShaderMaterial,
  GlitchShaderMaterial
} from '../../shaders/shaders';
import type { ShaderRenderMode } from '../../types/graphics';

interface TheRedCubeProps {
  mode?: ShaderRenderMode;
  size?: number;
  interactive?: boolean;
  wireframeOverlay?: boolean;
  roughness?: number;
  metallic?: number;
  rotationSpeed?: number;
}

export const TheRedCube: React.FC<TheRedCubeProps> = ({
  mode,
  size = 2.2,
  interactive = true,
  wireframeOverlay = false,
  roughness,
  metallic,
  rotationSpeed,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireMeshRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { rangeSettings, reduceMotion } = useGraphics();

  const currentMode = mode || rangeSettings.shaderMode;
  const currentRoughness = roughness ?? rangeSettings.roughness;
  const currentMetallic = metallic ?? rangeSettings.metallic;
  const currentSpeed = rotationSpeed ?? rangeSettings.rotationSpeed;

  // Custom Shader Material Uniforms
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

  // Standard PBR Material (Range Engine Default)
  const standardMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF1A1A'),
    roughness: currentRoughness,
    metalness: currentMetallic,
    emissive: new THREE.Color('#330000'),
    emissiveIntensity: 0.2,
  }), [currentRoughness, currentMetallic]);

  // Glass Material
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FF2222'),
    roughness: 0.1,
    transmission: 0.9,
    thickness: 1.2,
    ior: 1.5,
    metalness: 0.05,
    transparent: true,
    opacity: 0.85,
  }), []);

  // Metallic Material
  const metallicMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#CC1010'),
    roughness: 0.08,
    metalness: 0.95,
  }), []);

  // Wireframe Material
  const wireOnlyMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#FF1A1A'),
    wireframe: true,
  }), []);

  // Generate particle cloud for DISSOLVE / PARTICLES mode
  const particlesGeometry = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const half = size / 2;

    for (let i = 0; i < count; i++) {
      // Pick a random face of the cube
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * size;
      const v = (Math.random() - 0.5) * size;

      let x = 0, y = 0, z = 0;
      switch (face) {
        case 0: x = half; y = u; z = v; break;
        case 1: x = -half; y = u; z = v; break;
        case 2: x = u; y = half; z = v; break;
        case 3: x = u; y = -half; z = v; break;
        case 4: x = u; y = v; z = half; break;
        case 5: x = u; y = v; z = -half; break;
      }
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [size]);

  // Edges geometry for subtle brutalist wireframe contour
  const edgesGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(size, size, size);
    return new THREE.EdgesGeometry(box);
  }, [size]);

  // Active Material selection
  const activeMaterial = useMemo(() => {
    switch (currentMode) {
      case 'WIREFRAME':
        return wireOnlyMat;
      case 'TOON':
        return toonMat;
      case 'FRESNEL':
        return fresnelMat;
      case 'GLASS':
        return glassMat;
      case 'METALLIC':
        return metallicMat;
      case 'GLITCH':
        return glitchMat;
      case 'CUSTOM':
        return proceduralMat;
      case 'DEFAULT':
      default:
        return standardMat;
    }
  }, [currentMode, wireOnlyMat, toonMat, fresnelMat, glassMat, metallicMat, glitchMat, proceduralMat, standardMat]);

  // Animation frame loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Update shader uniforms
    if (proceduralMat.uniforms.uTime) proceduralMat.uniforms.uTime.value = time;
    if (fresnelMat.uniforms.uTime) fresnelMat.uniforms.uTime.value = time;
    if (glitchMat.uniforms.uTime) glitchMat.uniforms.uTime.value = time;

    const rotDelta = reduceMotion ? 0.05 * delta : currentSpeed * delta;

    if (meshRef.current) {
      meshRef.current.rotation.x += rotDelta * 0.7;
      meshRef.current.rotation.y += rotDelta;

      // Mouse interactivity parallax
      if (interactive && !reduceMotion) {
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;
        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y * 0.1) * 0.02;
        meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x * 0.1) * 0.02;
      }
    }

    if (wireMeshRef.current && meshRef.current) {
      wireMeshRef.current.rotation.copy(meshRef.current.rotation);
      wireMeshRef.current.position.copy(meshRef.current.position);
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.x += rotDelta * 0.7;
      pointsRef.current.rotation.y += rotDelta;

      // Pulse particle positions when in particles mode
      const posAttr = particlesGeometry.attributes.position;
      if (currentMode === 'DISSOLVE') {
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const factor = Math.sin(time * 2.0 + i) * 0.003;
          positions[i] += factor;
          positions[i + 1] += factor;
          positions[i + 2] += factor;
        }
        posAttr.needsUpdate = true;
      }
    }
  });

  if (currentMode === 'DISSOLVE') {
    return (
      <points ref={pointsRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.06}
          color="#FF1A1A"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        material={activeMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[size, size, size, 8, 8, 8]} />
      </mesh>

      {/* Brutalist edges wireframe accent */}
      {(wireframeOverlay || rangeSettings.wireframe || currentMode === 'DEFAULT') && (
        <lineSegments ref={wireMeshRef} geometry={edgesGeometry}>
          <lineBasicMaterial color="#FF4D4D" opacity={0.65} transparent />
        </lineSegments>
      )}
    </group>
  );
};
