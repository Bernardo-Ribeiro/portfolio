# Bernardo Ribeiro — Portfolio

React, TypeScript, Vite, Three.js and GSAP.

```sh
pnpm install
pnpm dev
```

`pnpm build` checks TypeScript and builds `dist/`. `pnpm lint` runs Oxlint.

The page has five sections: introduction, selected work, Graphics Studio, about and contact. Project details and code samples expand on demand; additional repositories live below the project grid.

The studio brings materials, procedural shaders, lighting, geometry and the WebGPU inspector into one tabbed workspace. The material preview uses Three.js; it is a browser demonstration, not an embedded Range Engine runtime. Links to the former `#build`, `#cube` and `#range` sections lead to this workspace.

GSAP animations use scoped React contexts and respect reduced motion. The studio pauses continuous rendering outside the visible area. Use the system menu to change motion and rendering quality, or Ctrl/⌘ K to open the command palette.

GitHub Actions builds and publishes `dist/` to GitHub Pages. The custom domain is configured in `public/CNAME`.
