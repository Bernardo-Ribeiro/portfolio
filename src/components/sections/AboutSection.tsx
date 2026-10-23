import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSectionMotion } from '../../hooks/useSectionMotion';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionMotion(sectionRef);
  return <section ref={sectionRef} id="about" className="portfolio-section about-section">
    <div className="section-shell">
      <div className="section-kicker" data-reveal><span>03 / THE PERSON BEHIND THE PIXELS</span><span>BRAZIL · RS</span></div>
      <div className="section-rule" data-draw />
      <div className="about-layout">
        <h2 data-reveal>Curious by nature.<br /><span className="text-slate-500">Developer by practice.</span></h2>
        <div data-reveal className="about-copy"><p>I’m Bernardo, a software developer in Santana do Livramento, Brazil. I build rendering experiments, game tools and applications, with a particular interest in how things work beneath the surface.</p>
          <dl><div><dt>Education</dt><dd>Systems Analysis & Development<br />IFSul · 2024–2026</dd></div><div><dt>Working with</dt><dd>GLSL, Python, TypeScript<br />Range Engine, React & Three.js</dd></div></dl>
          <a href="https://github.com/Bernardo-Ribeiro" target="_blank" rel="noreferrer">Follow what I’m building <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </div>
  </section>;
}
