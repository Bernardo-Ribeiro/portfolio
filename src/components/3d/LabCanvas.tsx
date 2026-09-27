import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGraphics } from '../../context/GraphicsContext';

// ----------------------------------------------------
// EXPERIMENT 001: PROCEDURAL NOISE SHADER MESH
// ----------------------------------------------------
export const LabProceduralMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { labSettings, reduceMotion } = useGraphics();

  const customShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDistortion: { value: labSettings.distortion },
        uNoiseScale: { value: labSettings.noiseScale },
        uIntensity: { value: labSettings.intensity },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uDistortion;
        uniform float uNoiseScale;
        varying vec2 vUv;
        varying vec3 vNormal;

        // Classic Perlin 3D noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vNormal = normal;
          float n = snoise(position * uNoiseScale + vec3(uTime * 0.7));
          vec3 displaced = position + normal * (n * uDistortion);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          vec3 light = normalize(vec3(0.8, 1.0, 1.2));
          float diff = max(dot(vNormal, light), 0.1);
          
          vec3 rangeRed = vec3(1.0, 0.1, 0.1);
          vec3 darkCore = vec3(0.04, 0.04, 0.04);
          
          // Technical contour lines
          float stripes = sin(vUv.y * 50.0 + uTime * 4.0) * 0.5 + 0.5;
          stripes = step(0.7, stripes);
          
          vec3 color = mix(darkCore, rangeRed * uIntensity, diff);
          color += stripes * vec3(0.3, 0.0, 0.0);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }, []);

  useFrame((state, delta) => {
    if (typeof document !== 'undefined' && document.hidden) return;
    const safeDelta = Math.min(delta, 0.05);

    const t = state.clock.getElapsedTime();
    customShader.uniforms.uTime.value = t * labSettings.noiseSpeed;
    customShader.uniforms.uDistortion.value = labSettings.distortion;
    customShader.uniforms.uNoiseScale.value = labSettings.noiseScale;
    customShader.uniforms.uIntensity.value = labSettings.intensity;

    if (meshRef.current && !reduceMotion) {
      meshRef.current.rotation.y = (meshRef.current.rotation.y + safeDelta * 0.4) % (Math.PI * 2);
      meshRef.current.rotation.x = (meshRef.current.rotation.x + safeDelta * 0.2) % (Math.PI * 2);
    }
  });

  return (
    <mesh ref={meshRef} material={customShader}>
      <sphereGeometry args={[1.5, 64, 64]} />
    </mesh>
  );
};

// ----------------------------------------------------
// EXPERIMENT 003: DYNAMIC MULTI-LIGHT RIG
// ----------------------------------------------------
export const LabLightingScene: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const { labSettings, reduceMotion } = useGraphics();

  useFrame((_, delta) => {
    if (typeof document !== 'undefined' && document.hidden) return;
    const safeDelta = Math.min(delta, 0.05);

    if (cubeRef.current && !reduceMotion) {
      cubeRef.current.rotation.y = (cubeRef.current.rotation.y + safeDelta * 0.3) % (Math.PI * 2);
      cubeRef.current.rotation.x = (cubeRef.current.rotation.x + safeDelta * 0.2) % (Math.PI * 2);
    }

    if (lightRef.current) {
      const rad = (labSettings.lightAngle * Math.PI) / 180;
      lightRef.current.position.x = Math.cos(rad) * 5;
      lightRef.current.position.z = Math.sin(rad) * 5;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={lightRef}
        position={[4, 5, 4]}
        intensity={labSettings.lightIntensity * 2.0}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#FF1A1A" />

      {/* Main Lit Object */}
      <mesh ref={cubeRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#FF1A1A"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Shadow Catcher Plane */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// EXPERIMENT 004: TOPOLOGY & GEOMETRY
// ----------------------------------------------------
export const LabTopologyScene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { labSettings, reduceMotion } = useGraphics();

  // Custom normal shader
  const normalMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1.0);
      }
    `
  }), []);

  // Solid standard material
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FF1A1A',
    roughness: 0.3,
    metalness: 0.6,
  }), []);

  // Wireframe material
  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FF3333',
    wireframe: true,
  }), []);

  useFrame((_, delta) => {
    if (typeof document !== 'undefined' && document.hidden) return;
    const safeDelta = Math.min(delta, 0.05);

    const rot = reduceMotion ? 0.05 * safeDelta : 0.5 * safeDelta;
    if (meshRef.current) {
      meshRef.current.rotation.y = (meshRef.current.rotation.y + rot) % (Math.PI * 2);
      meshRef.current.rotation.x = (meshRef.current.rotation.x + rot * 0.7) % (Math.PI * 2);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = (pointsRef.current.rotation.y + rot) % (Math.PI * 2);
      pointsRef.current.rotation.x = (pointsRef.current.rotation.x + rot * 0.7) % (Math.PI * 2);
    }
  });

  if (labSettings.topology === 'POINTS') {
    return (
      <points ref={pointsRef}>
        <icosahedronGeometry args={[1.5, 5]} />
        <pointsMaterial size={0.04} color="#FF1A1A" />
      </points>
    );
  }

  const mat = 
    labSettings.topology === 'WIREFRAME' ? wireMat :
    labSettings.topology === 'NORMALS' ? normalMat :
    solidMat;

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} />
      <mesh ref={meshRef} material={mat}>
        <icosahedronGeometry args={[1.5, 2]} />
      </mesh>
    </group>
  );
};
