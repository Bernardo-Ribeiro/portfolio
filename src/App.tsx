import React from 'react';
import { GraphicsProvider, useGraphics } from './context/GraphicsContext';
import { SystemHeader } from './components/system/SystemHeader';
import { SystemSettingsModal } from './components/system/SystemSettingsModal';
import { HeroSection } from './components/sections/HeroSection';
import { BuildGraphicsSection } from './components/sections/BuildGraphicsSection';
import { RangeEngineSection } from './components/sections/RangeEngineSection';
import { GraphicsLabSection } from './components/sections/GraphicsLabSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { BuildingForRangeSection } from './components/sections/BuildingForRangeSection';
import { TheCubeSection } from './components/sections/TheCubeSection';
import { AboutSection } from './components/sections/AboutSection';
import { OpenSourceSection } from './components/sections/OpenSourceSection';
import { ContactSection } from './components/sections/ContactSection';

const MainPortfolio: React.FC = () => {
  const { postFx } = useGraphics();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F2F2F2] selection:bg-[#FF1A1A] selection:text-white overflow-x-hidden">
      {/* Global subtle CRT Scanlines overlay when Post FX is enabled */}
      {postFx && (
        <div className="fixed inset-0 scanlines-overlay pointer-events-none z-30 opacity-40" />
      )}

      {/* Navigation Header */}
      <SystemHeader />

      {/* Settings Modal */}
      <SystemSettingsModal />

      {/* Main Content Sections */}
      <main className="w-full">
        <HeroSection />
        <BuildGraphicsSection />
        <RangeEngineSection />
        <GraphicsLabSection />
        <SelectedWorkSection />
        <BuildingForRangeSection />
        <TheCubeSection />
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
