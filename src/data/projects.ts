export interface Project {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  category: 'GRAPHICS' | 'TOOLS' | 'SOFTWARE' | 'GAMES';
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  stats: {
    label: string;
    value: string;
  }[];
  codeSnippet?: string;
  shaderPreviewType?: 'glsl' | 'wireframe' | 'postprocess' | 'ui';
}

export const PROJECTS: Project[] = [
  {
    id: 'range-shaders',
    chapter: '01',
    title: 'FILTERS & MATERIALS',
    subtitle: 'RANGE ENGINE & UPBGE SHADERS',
    description: 'A comprehensive collection of custom GLSL post-processing shaders, custom screen filters, and real-time PBR material shaders engineered specifically for Range Engine and UPBGE. Features custom depth passes, chromatic aberration, retro scanlines, bloom filters, and normal-space distortion.',
    tech: ['GLSL', 'OPENGL', 'RANGE ENGINE', 'PYTHON', 'POST-PROCESSING'],
    category: 'GRAPHICS',
    githubUrl: 'https://github.com/Bernardo-Ribeiro/Filters_Materials-Shaders-Range-Engine',
    highlights: [
      'Engineered multi-pass post-processing filter pipeline for Range Engine',
      'Implemented screen-space depth and normal buffer reconstruction',
      'Created modular shader presets adaptable to real-time game loops',
      'Optimized fragment shaders for consistent 60+ FPS frame budgets'
    ],
    stats: [
      { label: 'ENGINE', value: 'RANGE / UPBGE' },
      { label: 'LANGUAGE', value: 'GLSL 120/330' },
      { label: 'PASSES', value: 'MULTI-PASS' }
    ],
    codeSnippet: `// Fragment: Vignette & Chromatic Dispersion
uniform sampler2D bgl_RenderedTexture;
uniform vec2 bgl_TextureCoordinateOffset[9];
void main() {
    vec2 uv = gl_TexCoord[0].st;
    float r = texture2D(bgl_RenderedTexture, uv + vec2(0.003, 0.0)).r;
    float g = texture2D(bgl_RenderedTexture, uv).g;
    float b = texture2D(bgl_RenderedTexture, uv - vec2(0.003, 0.0)).b;
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.2, dist);
    gl_FragColor = vec4(vec3(r, g, b) * vignette, 1.0);
}`,
    shaderPreviewType: 'postprocess'
  },
  {
    id: 'bgui-range',
    chapter: '02',
    title: 'BGUI-RANGE',
    subtitle: 'MODULAR GAME UI COMPONENT LIBRARY',
    description: 'A modular and customizable graphical user interface (GUI) component library built specifically for Range Engine games. Provides developers with immediate-mode-like reactive UI widgets, button states, sliders, technical HUDs, and event-driven canvas elements without game performance degradation.',
    tech: ['PYTHON', 'RANGE ENGINE', 'UI ARCHITECTURE', 'BGUI', 'OPENGL'],
    category: 'TOOLS',
    githubUrl: 'https://github.com/Bernardo-Ribeiro/BGUI-Range',
    highlights: [
      'Modular widget system: sliders, panels, text labels, reticles, inputs',
      'Event-driven hit detection decoupled from main physics tick',
      'Custom theme manager supporting Range Red high-contrast technical styles',
      'Zero external binary dependencies, native Python integration'
    ],
    stats: [
      { label: 'TARGET', value: 'RANGE ENGINE' },
      { label: 'TYPE', value: 'TOOLKIT' },
      { label: 'CORE', value: 'PYTHON 3' }
    ],
    codeSnippet: `import bgui
import bgui.bge_utils

class RangeHUD(bgui.bge_utils.System):
    def __init__(self, owner):
        super().__init__(theme='range_dark')
        self.panel = bgui.Frame(self, border=1)
        self.slider = bgui.Slider(self.panel, pos=[0.1, 0.8], size=[0.8, 0.05])
        self.slider.on_click = self.handle_intensity_change
    
    def handle_intensity_change(self, widget):
        owner['emission_level'] = widget.value`,
    shaderPreviewType: 'ui'
  },
  {
    id: 'volumetric-light',
    chapter: '03',
    title: 'VOLUMETRIC LIGHT',
    subtitle: 'RAYMARCHED SHADOWS & SCATTERING',
    description: 'Real-time volumetric lighting and scattering system for 3D environments in Range Engine. Implements raymarching through shadow maps to calculate in-scattering atmospheric fog, god rays, and dynamic light shafts responding to obstacle geometry.',
    tech: ['GLSL', 'PYTHON', 'RAYMARCHING', 'RANGE ENGINE', 'SHADOW MAPS'],
    category: 'GRAPHICS',
    githubUrl: 'https://github.com/Bernardo-Ribeiro/VolumetricLight',
    highlights: [
      'Screen-space light scattering with configurable sample steps',
      'Dynamic raymarching integration with camera frustum and light direction',
      'Dithered noise sampling to eliminate color banding in dense atmospheres',
      'Configurable density falloff, mie-scattering asymmetry, and exposure'
    ],
    stats: [
      { label: 'METHOD', value: 'RAYMARCH' },
      { label: 'SAMPLES', value: '32-64 STEPS' },
      { label: 'TARGET', value: '60 FPS' }
    ],
    codeSnippet: `// Volumetric In-Scattering Accumulator
vec3 marchLight(vec3 rayOrigin, vec3 rayDir, float maxDist, int steps) {
    float stepSize = maxDist / float(steps);
    vec3 accum = vec3(0.0);
    for (int i = 0; i < 32; i++) {
        vec3 p = rayOrigin + rayDir * (float(i) * stepSize);
        float shadow = sampleShadowMap(p);
        accum += lightColor * shadow * stepSize * density;
    }
    return accum;
}`,
    shaderPreviewType: 'glsl'
  },
  {
    id: 'erp-grafica',
    chapter: '04',
    title: 'ERP-GRÁFICA & GESTÃO',
    subtitle: 'ENTERPRISE FULL-STACK SOFTWARE',
    description: 'A comprehensive full-stack business and print production management architecture. Engineered with robust API boundaries, relational database schemas, financial quote calculation engines, and service order tracking designed for high data integrity.',
    tech: ['REACT', 'TYPESCRIPT', 'PYTHON', 'FASTAPI', 'POSTGRESQL', 'JAVA'],
    category: 'SOFTWARE',
    githubUrl: 'https://github.com/Bernardo-Ribeiro/Gerenciador-de-Orcamentos',
    highlights: [
      'Relational schema design for multi-entity service orders and client invoices',
      'Deterministic calculation engine for print dimensions, unit costs, and margins',
      'Clean separation between domain logic, data persistence, and UI presentation',
      'Modern, high-efficiency user experience focused on operational throughput'
    ],
    stats: [
      { label: 'BACKEND', value: 'PYTHON / FASTAPI' },
      { label: 'FRONTEND', value: 'REACT / TS' },
      { label: 'DATABASE', value: 'POSTGRESQL' }
    ],
    codeSnippet: `interface OrderBudget {
  id: string;
  orderNumber: number;
  client: ClientRecord;
  items: BudgetItem[];
  totalMargin: number;
  calculatedCost: number;
  status: 'DRAFT' | 'APPROVED' | 'IN_PRODUCTION' | 'DELIVERED';
  createdAt: string;
}`,
    shaderPreviewType: 'wireframe'
  },
  {
    id: 'maze-galaxy',
    chapter: '05',
    title: 'MAZE GALAXY & METEOR',
    subtitle: 'INTERACTIVE 3D GAME SYSTEMS',
    description: 'Experimental 3D game mechanics, orbital collision systems, and procedural spatial geometry developed in Range Engine and creative web environments. Explores real-time camera tracking, physical responsiveness, and state machines.',
    tech: ['PYTHON', 'JAVASCRIPT', 'GAME MECHANICS', 'PHYSICS', 'RANGE ENGINE'],
    category: 'GAMES',
    githubUrl: 'https://github.com/Bernardo-Ribeiro/MazeGalaxy',
    highlights: [
      'State-machine driven 3D character and vehicle controllers',
      'Dynamic collision response and spatial sector partitioning',
      'Procedural asset instantiation and memory pooling',
      'WebGL frontend integration for real-time web previews'
    ],
    stats: [
      { label: 'SYSTEM', value: 'RANGE LOGIC' },
      { label: 'PHYSICS', value: 'BULLET 3D' },
      { label: 'PLATFORM', value: 'DESKTOP / WEB' }
    ],
    codeSnippet: `class OrbitCameraController:
    def update(self, target_pos, delta):
        desired = target_pos + self.offset
        self.camera.worldPosition = self.camera.worldPosition.lerp(desired, self.smooth * delta)
        self.camera.alignAxisToVect(target_pos - self.camera.worldPosition, 2, 1.0)`,
    shaderPreviewType: 'glsl'
  }
];

export const TERMINAL_REPOS = [
  {
    name: 'Filters_Materials-Shaders-Range-Engine',
    lang: 'GLSL',
    desc: 'Custom GLSL post-processing shaders, screen filters, and materials for Range Engine & UPBGE.',
    url: 'https://github.com/Bernardo-Ribeiro/Filters_Materials-Shaders-Range-Engine',
    tag: 'GRAPHICS'
  },
  {
    name: 'BGUI-Range',
    lang: 'Python',
    desc: 'Modular and customizable graphical user interface (GUI) component library for Range Engine.',
    url: 'https://github.com/Bernardo-Ribeiro/BGUI-Range',
    tag: 'TOOLS'
  },
  {
    name: 'VolumetricLight',
    lang: 'GLSL / Python',
    desc: 'Volumetric light shafts and raymarched atmospheric scattering implementation.',
    url: 'https://github.com/Bernardo-Ribeiro/VolumetricLight',
    tag: 'GRAPHICS'
  },
  {
    name: 'Gerenciador-de-Orcamentos',
    lang: 'Java / SQL',
    desc: 'Desktop budget management system for service orders, customer quotes, and financial records.',
    url: 'https://github.com/Bernardo-Ribeiro/Gerenciador-de-Orcamentos',
    tag: 'SOFTWARE'
  },
  {
    name: 'MazeGalaxy',
    lang: 'Python',
    desc: '3D game mechanics, spatial exploration, and physics controllers in Range Engine.',
    url: 'https://github.com/Bernardo-Ribeiro/MazeGalaxy',
    tag: 'GAMES'
  },
  {
    name: 'Naut-Store',
    lang: 'CSS / JS',
    desc: 'Platform designed to showcase and distribute digital 3D assets and game engine projects.',
    url: 'https://github.com/Bernardo-Ribeiro/Naut-Store',
    tag: 'WEB'
  },
  {
    name: 'rangeengine.github.io',
    lang: 'HTML / JS',
    desc: 'Official website and documentation hub for the Range Engine community.',
    url: 'https://github.com/Bernardo-Ribeiro/rangeengine.github.io',
    tag: 'ECOSYSTEM'
  },
  {
    name: 'frontend-meteor-madness',
    lang: 'JavaScript',
    desc: 'Interactive frontend interface for Meteor Madness game experiment.',
    url: 'https://github.com/Bernardo-Ribeiro/frontend-meteor-madness',
    tag: 'GAMES'
  }
];
