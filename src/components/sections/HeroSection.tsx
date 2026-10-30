import { useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsap';
import { useGraphics } from '../../context/GraphicsContext';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { reduceMotion } = useGraphics();

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const fitTitle = () => {
      title.style.removeProperty('font-size');
      const baseSize = parseFloat(getComputedStyle(title).fontSize);
      const availableWidth = title.clientWidth;
      const textWidth = Math.max(...Array.from(title.querySelectorAll<HTMLElement>('.hero-title-line'), line => line.scrollWidth));
      if (textWidth > availableWidth && availableWidth > 0) {
        title.style.fontSize = `${baseSize * (availableWidth / textWidth) * 0.98}px`;
      }
    };

    fitTitle();
    void document.fonts.ready.then(fitTitle);
    window.addEventListener('resize', fitTitle);
    return () => window.removeEventListener('resize', fitTitle);
  }, []);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (reduceMotion) return;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      intro.from('.hero-eyebrow', { y: 16, opacity: 0 }, 0)
        .from('.hero-title-line', { yPercent: 105, rotation: 3, stagger: 0.12 }, 0.1)
        .from('.hero-copy, .hero-actions', { y: 24, opacity: 0, stagger: 0.1 }, 0.45)
        .from('.hero-bottom', { opacity: 0 }, 0.8);
      gsap.to('.hero-type', { y: -65, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 } });
      gsap.from('.hero-orbit', { rotation: -30, scale: 0.8, opacity: 0, duration: 1.6, ease: 'power3.out' });
      return () => intro.kill();
    });
    return () => media.revert();
  }, { scope: containerRef, dependencies: [reduceMotion], revertOnUpdate: true });

  return <section ref={containerRef} id="hero" className="portfolio-hero tech-grid">
    <div className="hero-orbit" aria-hidden="true"><span /><span /></div>
    <div className="mobile-hero-art" aria-hidden="true">
      <svg viewBox="0 0 400 400" focusable="false">
        <path d="M200 40 360 120 200 200 40 120Z" fill="#d50019" />
        <path d="M40 120 200 200 200 360 40 280Z" fill="#790008" />
        <path d="M200 200 360 120 360 280 200 360Z" fill="#ad0010" />
        <path d="M200 40 360 120 360 280 200 360 40 280 40 120 200 40 200 200 360 120M200 200 40 120M200 200 200 360" fill="none" stroke="#ff4141" strokeOpacity=".35" />
      </svg>
    </div>
    <div className="section-shell hero-shell">
      <div className="hero-eyebrow"><span className="availability-dot" /> AVAILABLE FOR PROJECTS <span className="ml-auto hidden sm:block text-slate-500">CREATIVE DEVELOPER / BRAZIL</span></div>
      <div className="hero-type">
        <p className="eyebrow mb-6">SOFTWARE × REAL-TIME GRAPHICS</p>
        <h1 ref={titleRef}><span className="hero-line-mask"><span className="hero-title-line">BERNARDO</span></span><span className="hero-line-mask"><span className="hero-title-line hero-outline">RIBEIRO<span className="text-[#ff2b2b]">.</span></span></span></h1>
        <p className="hero-copy">I turn code into things<br />you can see, feel and explore.</p>
        <div className="hero-actions flex flex-wrap gap-3 mt-8">
          <BenchoMagneticButton href="#work" className="hero-primary">Selected work <ArrowUpRight size={18} /></BenchoMagneticButton>
          <BenchoMagneticButton href="#lab" className="hero-secondary">Enter the studio <span className="text-[#ff2b2b]">↗</span></BenchoMagneticButton>
        </div>
      </div>
      <div className="hero-bottom"><span>GRAPHICS / TOOLS / INTERACTIVE SYSTEMS</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={15} /></a></div>
    </div>
  </section>;
}
