import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { GraphicsProvider } from './context/GraphicsContext';
import { SystemHeader } from './components/system/SystemHeader';
import { SystemSettingsModal } from './components/system/SystemSettingsModal';
import { BenchoCommandBar } from './components/bencho/BenchoCommandBar';
import { BenchoFloatingDock } from './components/bencho/BenchoFloatingDock';
import { HeroSection } from './components/sections/HeroSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { useGraphics } from './context/GraphicsContext';

const GlobalShapeCompanion = lazy(() => import('./components/3d/GlobalShapeCompanion').then(module => ({ default: module.GlobalShapeCompanion })));
const GraphicsLabSection = lazy(() => import('./components/sections/GraphicsLabSection').then(module => ({ default: module.GraphicsLabSection })));
const STUDIO_HASHES = new Set(['#lab', '#build', '#cube', '#range']);

function StudioLoading() {
  return <section id="lab" className="portfolio-section studio-section min-h-[800px]">
    <div className="section-shell">
      <div className="section-kicker"><span>02 / PLAYGROUND</span><span>INTERACTIVE · IN YOUR BROWSER</span></div>
      <div className="section-heading"><h2>Less theory.<br /><span className="text-slate-500">More play.</span></h2></div>
      <span id="build" className="studio-anchor" /><span id="cube" className="studio-anchor" /><span id="range" className="studio-anchor" />
      <div className="studio-workspace min-h-[400px] flex items-center justify-center text-sm text-slate-400" role="status">Loading interactive studio…</div>
    </div>
  </section>;
}

function DeferredGraphicsLab() {
  const pendingHash = useRef(STUDIO_HASHES.has(window.location.hash) ? window.location.hash : null);
  const [nearViewport, setNearViewport] = useState(() => STUDIO_HASHES.has(window.location.hash));

  const scrollToPendingHash = useCallback(() => {
    const hash = pendingHash.current;
    pendingHash.current = null;
    if (hash && window.location.hash === hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      if (STUDIO_HASHES.has(window.location.hash)) {
        pendingHash.current = window.location.hash;
        setNearViewport(true);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    const anchor = document.getElementById('lab');
    if (!anchor) return () => window.removeEventListener('hashchange', onHashChange);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    observer.observe(anchor);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return <Suspense fallback={<StudioLoading />}>
    {nearViewport ? <GraphicsLabSection onReady={scrollToPendingHash} /> : <StudioLoading />}
  </Suspense>;
}

const MainPortfolio: React.FC = () => {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const { compactViewport } = useGraphics();

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsCommandBarOpen(open => !open);
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-[#F1F5F9] selection:bg-[#FF2B2B] selection:text-white overflow-x-hidden">
      {/* 3D Shape Companion that follows the scroll and morphs across sections */}
      {!compactViewport && <Suspense fallback={null}><GlobalShapeCompanion /></Suspense>}

      {/* Navigation Header */}
      <SystemHeader onOpenCommandBar={() => setIsCommandBarOpen(true)} />

      {/* Settings Modal */}
      <SystemSettingsModal />

      {/* Bencho Command Bar (⌘K Spotlight) */}
      <BenchoCommandBar
        isOpen={isCommandBarOpen}
        onClose={() => setIsCommandBarOpen(false)}
      />

      {/* Quick navigation */}
      <BenchoFloatingDock
        onOpenCommandBar={() => setIsCommandBarOpen(true)}
      />

      {/* Portfolio */}
      <main className="w-full relative z-20">
        <HeroSection />
        <SelectedWorkSection />
        <DeferredGraphicsLab />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <GraphicsProvider>
      <MainPortfolio />
    </GraphicsProvider>
  );
}
