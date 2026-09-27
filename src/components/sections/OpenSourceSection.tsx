import React, { useState, useRef, useEffect } from 'react';
import { TERMINAL_REPOS } from '../../data/projects';
import { Terminal, ExternalLink, CornerDownLeft } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';

interface CommandOutput {
  id: number;
  command: string;
  output: React.ReactNode;
}

export const OpenSourceSection: React.FC = () => {
  const [hoveredRepo, setHoveredRepo] = useState<typeof TERMINAL_REPOS[0] | null>(TERMINAL_REPOS[0]);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 1,
      command: 'ls projects/',
      output: (
        <div className="text-slate-400 text-xs">
          Loaded 8 active repositories from github.com/Bernardo-Ribeiro. Hover or click to inspect.
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.terminal-window', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode = null;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      res = (
        <div className="text-xs text-[#aaa] space-y-1">
          <div>AVAILABLE COMMANDS:</div>
          <div><span className="text-[#FF1A1A]">ls</span> - List all repositories</div>
          <div><span className="text-[#FF1A1A]">whoami</span> - Display developer identity</div>
          <div><span className="text-[#FF1A1A]">vgpu</span> - Run WebGPU doctor &amp; adapter diagnostics</div>
          <div><span className="text-[#FF1A1A]">contact</span> - Display communications channels</div>
          <div><span className="text-[#FF1A1A]">clear</span> - Clear terminal screen</div>
        </div>
      );
    } else if (cmd === 'whoami') {
      res = (
        <div className="text-xs text-[#00FF66]">
          bernardo@range-lab // Bernardo Ribeiro // Graphics Programmer &amp; Creative Developer
        </div>
      );
    } else if (cmd === 'vgpu') {
      res = (
        <div className="text-xs text-[#aaa]">
          <span className="text-[#00FF66]">[VERDICT: HEALTHY]</span> Adapter: radv: Mesa 26.2.2-arch3.2 (Vulkan 1.3)
        </div>
      );
    } else if (cmd === 'contact') {
      res = (
        <div className="text-xs text-[#FF1A1A]">
          GitHub: https://github.com/Bernardo-Ribeiro
        </div>
      );
    } else if (cmd === 'ls' || cmd === 'ls projects/' || cmd === 'ls -la') {
      res = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
          {TERMINAL_REPOS.map((r) => (
            <span key={r.name} className="text-[#F2F2F2] hover:text-[#FF1A1A]">
              ► {r.name}/
            </span>
          ))}
        </div>
      );
    } else {
      res = (
        <div className="text-xs text-[#FF3333]">
          Command not found: &quot;{cmd}&quot;. Type &quot;help&quot; for recognized instructions.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now(), command: inputVal, output: res }
    ]);
    setInputVal('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section
      ref={sectionRef}
      id="terminal"
      className="w-full py-28 bg-transparent border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-800/80 pb-8">
          <div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="text-slate-200 font-semibold">[ 07 ]</span>
              <span className="w-6 h-[1px] bg-slate-700" />
              <span>CLI WORKSPACE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F1F5F9] uppercase">
              OPEN SOURCE
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm">
            Terminal interface into public repositories. Hover over files to inspect details or run bash commands.
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="terminal-window w-full bg-[#0D1017]/95 backdrop-blur-md border border-slate-800 rounded-sm corner-bracket shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="px-4 py-2.5 bg-[#131620] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2B2B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="ml-2 text-slate-400 text-[11px]">bernardo@range-lab: ~/projects</span>
            </div>
            <div className="text-[10px] text-slate-500">
              BASH 5.2 // VT100
            </div>
          </div>

          {/* Interactive Split Body: File Tree (Left) + Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Left Column: Interactive File List */}
            <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-[#1c1c1c] space-y-4">
              <div className="flex items-center gap-2 text-[#888]">
                <span className="text-[#FF1A1A] font-bold">$</span>
                <span className="text-white">ls projects/</span>
              </div>

              {/* Repos list */}
              <div className="space-y-1.5 pt-2">
                {TERMINAL_REPOS.map((repo) => {
                  const isHovered = hoveredRepo?.name === repo.name;
                  return (
                    <div
                      key={repo.name}
                      onMouseEnter={() => setHoveredRepo(repo)}
                      onClick={() => setHoveredRepo(repo)}
                      className={`p-2 transition-all flex items-center justify-between cursor-pointer border ${
                        isHovered
                          ? 'border-[#FF1A1A] bg-[#FF1A1A]/10 text-white font-bold'
                          : 'border-transparent text-[#888] hover:text-[#ddd]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={isHovered ? 'text-[#FF1A1A]' : 'text-[#444]'}>►</span>
                        <span className="tracking-wide">{repo.name}/</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#555]">{repo.lang}</span>
                        <span className="text-[9px] px-1 bg-[#161616] text-[#888] border border-[#222]">
                          {repo.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Command history & active prompt */}
              <div className="pt-6 border-t border-[#181818] space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#888]">
                      <span className="text-[#FF1A1A]">$</span>
                      <span className="text-white">{h.command}</span>
                    </div>
                    {h.output}
                  </div>
                ))}

                {/* Prompt input */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                  <span className="text-[#FF1A1A] font-bold">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type 'help', 'whoami', 'vgpu' or 'clear'..."
                    aria-label="Interactive terminal command input"
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-[#444]"
                  />
                  <button
                    type="submit"
                    aria-label="Submit terminal command"
                    className="text-[#666] hover:text-[#FF1A1A] cursor-pointer"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Right Column: Active Repository Inspector */}
            <div className="lg:col-span-5 p-6 bg-[#060606] flex flex-col justify-between">
              {hoveredRepo ? (
                <div className="space-y-4">
                  <div className="text-[11px] text-[#FF1A1A] flex items-center justify-between pb-2 border-b border-[#181818]">
                    <span>REPOSITORY METADATA</span>
                    <span>TAG: {hoveredRepo.tag}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {hoveredRepo.name}
                    </h3>
                    <div className="text-[11px] text-[#888] mt-1">
                      PRIMARY STACK: <span className="text-[#FF1A1A]">{hoveredRepo.lang}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#aaa] font-sans leading-relaxed">
                    {hoveredRepo.desc}
                  </p>

                  <div className="p-3 bg-[#0a0a0a] border border-[#1a1a1a] space-y-1.5 text-[11px] text-[#777]">
                    <div>AUTHOR: Bernardo Ribeiro</div>
                    <div>STATUS: PUBLIC REPOSITORY</div>
                    <div>LICENSE: OPEN SOURCE</div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={hoveredRepo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF1A1A] hover:bg-[#ff3838] text-white font-bold text-xs tracking-wider transition-colors cursor-pointer"
                    >
                      <span>CLONE // VIEW REPO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-[#555] my-auto text-center">
                  SELECT A REPOSITORY TO INSPECT DETAILS
                </div>
              )}

              <div className="pt-4 border-t border-[#181818] text-[10px] text-[#444] flex justify-between">
                <span>GIT TREE // VERIFIED</span>
                <span>GITHUB API v3</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
