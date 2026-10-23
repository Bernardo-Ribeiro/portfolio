import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BenchoCopyButton } from '../bencho/BenchoCopyButton';
import { useSectionMotion } from '../../hooks/useSectionMotion';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionMotion(sectionRef);
  return <section id="contact" ref={sectionRef} className="portfolio-section contact-section">
    <div className="section-shell">
      <div className="section-kicker" data-reveal><span>04 / NEXT CHAPTER</span><span>LET’S MAKE IT HAPPEN</span></div>
      <a data-reveal className="contact-invitation" href="mailto:bernardo.ribeiro@outlook.com.br">Have something<br />in <span>mind?</span><ArrowUpRight aria-hidden="true" /></a>
      <div className="contact-channels" data-reveal>
        <div className="contact-email"><a href="mailto:bernardo.ribeiro@outlook.com.br">bernardo.ribeiro@outlook.com.br</a><BenchoCopyButton textToCopy="bernardo.ribeiro@outlook.com.br" label="Copy" copiedLabel="Copied!" /></div>
        <div><a href="https://github.com/Bernardo-Ribeiro" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/bernardo-ribeiro-dev/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="section-rule" data-draw />
      <footer className="portfolio-footer"><span>© 2026 BERNARDO RIBEIRO</span><a href="#hero">BACK TO TOP ↑</a></footer>
    </div>
  </section>;
}
