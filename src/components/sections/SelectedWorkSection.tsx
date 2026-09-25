import React, { useState } from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { ExternalLink, Code2, Layers } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [activeCodeSnippets, setActiveCodeSnippets] = useState<Record<string, boolean>>({});

  const toggleCode = (id: string) => {
    setActiveCodeSnippets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="work" className="w-full py-24 bg-[#050505] border-t border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#1c1c1c] pb-8">
          <div>
            <div className="font-mono text-xs text-[#FF1A1A] tracking-widest mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>[ SECTION 05 ] // REPOSITORY INDEX</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black font-display tracking-tight text-[#F2F2F2] uppercase">
              SELECTED WORK
            </h2>
          </div>
          <div className="font-mono text-xs text-[#858585] max-w-md">
            Editorial chapters across graphics pipelines, game engine tooling, full-stack software, and real-time shaders.
            All projects pulled from verified repositories.
          </div>
        </div>

        {/* Editorial Chapters List */}
        <div className="space-y-24">
          {PROJECTS.map((proj: Project) => {
            const isCodeVisible = !!activeCodeSnippets[proj.id];
            const isGraphics = proj.category === 'GRAPHICS' || proj.category === 'GAMES';

            return (
              <article
                key={proj.id}
                className={`border-t border-[#222222] pt-12 transition-all ${
                  isGraphics ? 'relative' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Huge Chapter Number + Category */}
                  <div className="lg:col-span-3 flex lg:flex-col justify-between items-start">
                    <span className="text-6xl sm:text-8xl font-black font-display text-[#1c1c1c] select-none hover:text-[#FF1A1A] transition-colors">
                      {proj.chapter}
                    </span>
                    <div className="mt-2 font-mono text-[11px] text-[#FF1A1A] px-2 py-0.5 border border-[#FF1A1A]/30 bg-[#FF1A1A]/5">
                      {proj.category}
                    </div>
                  </div>

                  {/* Center: Title, Description, Stats & Highlights */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <div className="font-mono text-xs text-[#858585] tracking-wider mb-1">
                        {proj.subtitle}
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#F2F2F2]">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#aaaaaa] font-sans leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-1.5 font-mono text-xs text-[#858585]">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#FF1A1A] mt-0.5">►</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-wider px-2 py-1 bg-[#0c0c0c] border border-[#222] text-[#888]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions: Code toggle + GitHub button */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#FF1A1A] hover:bg-[#ff3838] text-white font-bold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>VIEW ON GITHUB</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {proj.codeSnippet && (
                        <button
                          onClick={() => toggleCode(proj.id)}
                          className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] text-[#F2F2F2] border border-[#333] hover:border-[#FF1A1A] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Code2 className="w-3.5 h-3.5 text-[#FF1A1A]" />
                          <span>{isCodeVisible ? 'HIDE SOURCE' : 'INSPECT CODE'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: Technical Metadata Card */}
                  <div className="lg:col-span-3 bg-[#080808] border border-[#1f1f1f] corner-bracket p-4 font-mono text-xs space-y-3">
                    <div className="text-[11px] text-[#666] border-b border-[#181818] pb-2 flex justify-between">
                      <span>PROJECT STATS</span>
                      <span className="text-[#FF1A1A]">VERIFIED</span>
                    </div>

                    {proj.stats.map((s) => (
                      <div key={s.label} className="flex justify-between items-center text-[11px]">
                        <span className="text-[#666]">{s.label}:</span>
                        <span className="text-[#F2F2F2] font-bold">{s.value}</span>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-[#181818] text-[10px] text-[#555]">
                      REPOSITÓRIO PÚBLICO // AUTOR: BERNARDO RIBEIRO
                    </div>
                  </div>

                </div>

                {/* Collapsible Source Code Snippet */}
                {isCodeVisible && proj.codeSnippet && (
                  <div className="mt-6 font-mono text-xs bg-[#030303] border border-[#FF1A1A]/40 p-4 relative overflow-x-auto">
                    <div className="flex items-center justify-between text-[#858585] text-[11px] mb-2 pb-2 border-b border-[#1a1a1a]">
                      <span className="text-[#FF1A1A] font-bold">SOURCE INSPECTOR:</span>
                      <span>{proj.tech[0]} ENGINE RUNTIME</span>
                    </div>
                    <pre className="text-[#ccc] text-[11px] leading-relaxed overflow-x-auto">
                      {proj.codeSnippet}
                    </pre>
                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
