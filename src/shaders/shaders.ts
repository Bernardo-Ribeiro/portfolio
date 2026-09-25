import * as THREE from 'three';

// 1. Procedural 3D Simplex Noise Shader
export const ProceduralShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uDistortion: { value: 0.4 },
    uNoiseScale: { value: 2.5 },
    uColorA: { value: new THREE.Color('#FF1A1A') },
    uColorB: { value: new THREE.Color('#050505') },
    uWireframe: { value: 0.0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uDistortion;
    uniform float uNoiseScale;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex 3D noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
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
      i = mod(i, 289.0 );
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
      vNormal = normalize(normalMatrix * normal);
      float displacement = snoise(position * uNoiseScale + vec3(uTime * 0.8)) * uDistortion;
      vec3 newPosition = position + normal * displacement;
      vPosition = newPosition;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Technical wireframe bands
      float grid = step(0.96, fract(vUv.x * 12.0)) + step(0.96, fract(vUv.y * 12.0));
      
      vec3 base = mix(uColorB, uColorA, diff * 0.8 + 0.2);
      vec3 finalColor = mix(base, vec3(1.0, 0.4, 0.4), grid * 0.7);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

// 2. Toon / Cel-Shaded Material
export const ToonShaderMaterial = {
  uniforms: {
    uColor: { value: new THREE.Color('#FF1A1A') },
    uLightDir: { value: new THREE.Vector3(1, 1, 1).normalize() },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uLightDir;
    varying vec3 vNormal;

    void main() {
      float intensity = dot(normalize(vNormal), uLightDir);
      float factor = 0.2;
      if (intensity > 0.85) factor = 1.0;
      else if (intensity > 0.5) factor = 0.7;
      else if (intensity > 0.2) factor = 0.4;
      
      gl_FragColor = vec4(uColor * factor, 1.0);
    }
  `
};

// 3. Fresnel Rim Glow Material
export const FresnelShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#FF1A1A') },
    uRimColor: { value: new THREE.Color('#FFFFFF') },
    uPower: { value: 2.2 }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uRimColor;
    uniform float uPower;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
      fresnel = pow(fresnel, uPower);

      // Pulse
      float pulse = 0.85 + 0.15 * sin(uTime * 3.0);
      vec3 col = mix(uColor * 0.4, uRimColor, fresnel * pulse);
      gl_FragColor = vec4(col, 1.0);
    }
  `
};

// 4. Glitch / Digital Artifact Shader
export const GlitchShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#FF1A1A') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vNormal = normal;
      vUv = uv;
      vec3 pos = position;
      
      float glitchTrigger = step(0.85, sin(uTime * 8.0));
      if (glitchTrigger > 0.5) {
        float r = random(pos.xy + floor(uTime * 12.0));
        pos.x += (r - 0.5) * 0.25;
        pos.y += step(0.9, r) * 0.15;
      }
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
      float scanline = sin(vUv.y * 80.0 + uTime * 15.0) * 0.15;
      float glitchStripe = step(0.95, sin(vUv.y * 30.0 + uTime * 20.0));
      
      vec3 col = uColor - scanline;
      if (glitchStripe > 0.5) {
        col = vec3(1.0, 1.0, 1.0);
      }
      gl_FragColor = vec4(col, 1.0);
    }
  `
};
