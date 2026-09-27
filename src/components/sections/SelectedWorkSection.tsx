import React, { useState, useRef } from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { ExternalLink, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import { BenchoTiltCard } from '../bencho/BenchoTiltCard';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';

export const SelectedWorkSection: React.FC = () => {
  const [activeCodeSnippets, setActiveCodeSnippets] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const toggleCode = (id: string) => {
    setActiveCodeSnippets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useGSAP(() => {
    const articles = gsap.utils.toArray<HTMLElement>('.project-article');
    articles.forEach((art) => {
      gsap.fromTo(
        art,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: art,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full py-28 bg-transparent border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-slate-800/80 pb-8">
          <div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="text-slate-200 font-semibold">[ 02 ]</span>
              <span className="w-6 h-[1px] bg-slate-700" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F1F5F9] uppercase">
              FEATURED PROJECTS
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-md font-sans leading-relaxed">
            Verified production repositories and creative experiments in computer graphics, game engine architecture, and low-level shaders.
          </div>
        </div>

        {/* Editorial Chapters List */}
        <div className="space-y-16">
          {PROJECTS.map((proj: Project) => {
            const isCodeVisible = !!activeCodeSnippets[proj.id];

            return (
              <article
                key={proj.id}
                className="project-article border-t border-slate-800/80 pt-10"
              >
                <BenchoTiltCard
                  maxTilt={5}
                  spotlightColor="rgba(255, 43, 43, 0.08)"
                  className="bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm p-6 sm:p-8 hover:border-slate-600 transition-colors shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Chapter Number + Category */}
                    <div className="lg:col-span-3 flex lg:flex-col justify-between items-start">
                      <span
                        aria-hidden="true"
                        className="text-6xl sm:text-7xl font-black font-display text-slate-500 select-none group-hover:text-slate-300 transition-colors"
                      >
                        {proj.chapter}
                      </span>
                      <div className="mt-2 font-mono text-[11px] text-slate-300 px-2.5 py-1 border border-slate-700 bg-white/[0.03] rounded-sm">
                        {proj.category}
                      </div>
                    </div>

                    {/* Center: Title, Description, Stats & Highlights */}
                    <div className="lg:col-span-6 space-y-5">
                      <div>
                        <div className="font-mono text-xs text-slate-400 tracking-wider mb-1">
                          {proj.subtitle}
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-[#F1F5F9]">
                          {proj.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Highlights bullet points */}
                      <div className="space-y-2 font-mono text-xs text-slate-400">
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="text-[#FF2B2B] mt-0.5">►</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[11px] tracking-wider px-2.5 py-1 bg-white/[0.03] border border-slate-800 text-slate-300 rounded-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Actions: Bencho Magnetic Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                        <BenchoMagneticButton
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          strength={0.25}
                          className="px-4 py-2 bg-[#DC2626] hover:bg-[#ef4444] text-white font-semibold rounded-sm shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                        >
                          <span>VIEW ON GITHUB</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </BenchoMagneticButton>

                        {proj.codeSnippet && (
                          <BenchoMagneticButton
                            onClick={() => toggleCode(proj.id)}
                            strength={0.25}
                            className="px-4 py-2 bg-[#161A26] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 rounded-sm"
                          >
                            <Code2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{isCodeVisible ? 'HIDE SOURCE' : 'INSPECT CODE'}</span>
                          </BenchoMagneticButton>
                        )}
                      </div>
                    </div>

                    {/* Right: Technical Metadata Card */}
                    <div className="lg:col-span-3 bg-[#0C0E14] border border-slate-800 rounded-sm p-4 font-mono text-xs space-y-3.5">
                      <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 flex justify-between items-center">
                        <span>PROJECT STATS</span>
                        <span className="text-[#00FF88] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      </div>

                      {proj.stats.map((s) => (
                        <div key={s.label} className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">{s.label}:</span>
                          <span className="text-slate-200 font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collapsible Source Code Snippet */}
                  {isCodeVisible && proj.codeSnippet && (
                    <div className="mt-6 font-mono text-xs bg-[#0C0E14] border border-slate-700 p-5 rounded-sm overflow-x-auto">
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-3 pb-2 border-b border-slate-800">
                        <span className="text-[#FF2B2B] font-bold">SOURCE INSPECTOR:</span>
                        <span>{proj.tech[0]} RUNTIME</span>
                      </div>
                      <pre className="text-slate-300 text-[12px] leading-relaxed overflow-x-auto font-mono">
                        {proj.codeSnippet}
                      </pre>
                    </div>
                  )}
                </BenchoTiltCard>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
