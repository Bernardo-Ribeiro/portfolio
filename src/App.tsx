import React, { useState } from 'react';
import { GraphicsProvider } from './context/GraphicsContext';
import { SystemHeader } from './components/system/SystemHeader';
import { SystemSettingsModal } from './components/system/SystemSettingsModal';
import { GlobalShapeCompanion } from './components/3d/GlobalShapeCompanion';
import { BenchoCommandBar } from './components/bencho/BenchoCommandBar';
import { BenchoFloatingDock } from './components/bencho/BenchoFloatingDock';
import { HeroSection } from './components/sections/HeroSection';
import { BuildGraphicsSection } from './components/sections/BuildGraphicsSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { TheCubeSection } from './components/sections/TheCubeSection';
import { RangeEngineSection } from './components/sections/RangeEngineSection';
import { GraphicsLabSection } from './components/sections/GraphicsLabSection';
import { AboutSection } from './components/sections/AboutSection';
import { OpenSourceSection } from './components/sections/OpenSourceSection';
import { ContactSection } from './components/sections/ContactSection';

const MainPortfolio: React.FC = () => {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

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

      {/* Bencho Interactive Floating Dock */}
      <BenchoFloatingDock
        onOpenCommandBar={() => setIsCommandBarOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="w-full relative z-20">
        <HeroSection onOpenCommandBar={() => setIsCommandBarOpen(true)} />
        <BuildGraphicsSection />
        <SelectedWorkSection />
        <TheCubeSection />
        <RangeEngineSection />
        <GraphicsLabSection />
        <AboutSection />
        <OpenSourceSection />
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
