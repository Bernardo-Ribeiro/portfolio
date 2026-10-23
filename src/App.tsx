import React, { useState, useEffect } from 'react';
import { GraphicsProvider } from './context/GraphicsContext';
import { SystemHeader } from './components/system/SystemHeader';
import { SystemSettingsModal } from './components/system/SystemSettingsModal';
import { GlobalShapeCompanion } from './components/3d/GlobalShapeCompanion';
import { BenchoCommandBar } from './components/bencho/BenchoCommandBar';
import { BenchoFloatingDock } from './components/bencho/BenchoFloatingDock';
import { HeroSection } from './components/sections/HeroSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { GraphicsLabSection } from './components/sections/GraphicsLabSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';

const MainPortfolio: React.FC = () => {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

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
      <GlobalShapeCompanion />

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
        <GraphicsLabSection />
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
