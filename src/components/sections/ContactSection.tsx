import React, { useRef } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import { BenchoTiltCard } from '../bencho/BenchoTiltCard';
import { BenchoMagneticButton } from '../bencho/BenchoMagneticButton';
import { BenchoCopyButton } from '../bencho/BenchoCopyButton';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const LINKS = [
    {
      label: 'GITHUB',
      href: 'https://github.com/Bernardo-Ribeiro',
      desc: 'Explore source code, shaders & tools',
      icon: <GithubIcon />
    },
    {
      label: 'LINKEDIN',
      href: 'https://www.linkedin.com/in/bernardo-ribeiro-dev/',
      desc: 'Connect professionally',
      icon: <LinkedinIcon />
    },
    {
      label: 'EMAIL',
      href: 'mailto:bernardoribeiro.dev@gmail.com',
      desc: 'Direct communication line',
      icon: <Mail className="w-4 h-4" />
    }
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.contact-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.contact-link-card',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full pt-28 pb-20 bg-transparent border-t border-slate-800/80 relative flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-20">
        {/* Top Header Label */}
        <div className="font-mono text-xs text-slate-400 tracking-widest mb-6 flex items-center gap-2">
          <span className="text-slate-200 font-semibold">[ 07 ]</span>
          <span className="w-6 h-[1px] bg-slate-700" />
          <span>CONTACT &amp; CHANNELS</span>
        </div>

        {/* Big Typography Callout */}
        <div className="contact-title mb-16 select-none flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-[#F1F5F9] uppercase leading-[0.88]">
              LET&apos;S <span className="text-[#FF2B2B]">BUILD</span><br />
              SOMETHING.
            </h2>
            <p className="mt-6 text-slate-400 font-mono text-sm max-w-xl font-sans">
              Open to creative technology projects, graphics development, and engineering roles.
            </p>
          </div>

          {/* Bencho Direct Email Quick-Copy Card */}
          <div className="p-4 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm font-mono text-xs space-y-2.5 max-w-md">
            <div className="text-slate-400 text-[11px] flex justify-between">
              <span>DIRECT INBOX</span>
              <span className="text-[#00FF88]">ONLINE</span>
            </div>
            <div className="text-slate-200 font-bold select-all">
              bernardoribeiro.dev@gmail.com
            </div>
            <div className="pt-1 flex items-center gap-2">
              <BenchoCopyButton
                textToCopy="bernardoribeiro.dev@gmail.com"
                label="COPY EMAIL"
                copiedLabel="COPIED TO CLIPBOARD!"
              />
              <BenchoMagneticButton
                href="mailto:bernardoribeiro.dev@gmail.com"
                strength={0.2}
                className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#ef4444] text-white font-semibold rounded-sm text-xs"
              >
                <span>SEND EMAIL</span>
              </BenchoMagneticButton>
            </div>
          </div>
        </div>

        {/* Interactive Channel Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {LINKS.map((link) => (
            <BenchoTiltCard
              key={link.label}
              maxTilt={6}
              className="h-full"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-link-card p-6 bg-[#11141D]/90 backdrop-blur-md border border-slate-800 rounded-sm hover:border-slate-600 group transition-all duration-300 flex flex-col justify-between h-full corner-bracket cursor-pointer shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 group-hover:text-white transition-colors mb-4">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <span className="font-mono text-xs tracking-wider">{link.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-slate-200 group-hover:text-[#FF2B2B] transition-colors">
                    {link.label} →
                  </div>
                </div>
                <div className="font-mono text-xs text-slate-400 mt-6">
                  {link.desc}
                </div>
              </a>
            </BenchoTiltCard>
          ))}
        </div>

        {/* Technical Footer */}
        <footer className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-slate-200 font-semibold">BERNARDO RIBEIRO</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>COMPUTER GRAPHICS &amp; SOFTWARE</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>&copy; 2026 // ALL SYSTEMS NOMINAL</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#00FF88]" />
          </div>
        </footer>
      </div>
    </section>
  );
};
