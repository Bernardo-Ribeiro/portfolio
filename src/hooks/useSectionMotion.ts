import type { RefObject } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useGraphics } from '../context/GraphicsContext';

export function useSectionMotion(scope: RefObject<HTMLElement | null>) {
  const { reduceMotion } = useGraphics();
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (reduceMotion) return;
      const root = scope.current;
      if (!root) return;
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => {
        gsap.from(item, {
          y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
          clearProps: 'transform,opacity',
        });
      });
      root.querySelectorAll<HTMLElement>('[data-draw]').forEach((line) => {
        gsap.from(line, {
          scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: line, start: 'top 92%', once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope, dependencies: [reduceMotion], revertOnUpdate: true });
}
