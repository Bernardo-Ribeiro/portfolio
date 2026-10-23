import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useGraphics } from '../../context/GraphicsContext';

interface BenchoMagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number; // Distance pull strength (0 to 1)
  textParallax?: boolean;
  'aria-label'?: string;
  ariaLabel?: string;
}

export const BenchoMagneticButton: React.FC<BenchoMagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  strength = 0.35,
  textParallax = true,
  'aria-label': ariaLabelProp,
  ariaLabel,
}) => {
  const { reduceMotion } = useGraphics();
  const effectiveAriaLabel = ariaLabel || ariaLabelProp;
  const containerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const content = contentRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    let contentXTo: ((v: number) => void) | null = null;
    let contentYTo: ((v: number) => void) | null = null;
    if (textParallax && content) {
      contentXTo = gsap.quickTo(content, 'x', { duration: 0.3, ease: 'power2.out' });
      contentYTo = gsap.quickTo(content, 'y', { duration: 0.3, ease: 'power2.out' });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);

      if (contentXTo && contentYTo) {
        contentXTo(distanceX * 0.45);
        contentYTo(distanceY * 0.45);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      contentXTo?.(0);
      contentYTo?.(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
      if (content) gsap.killTweensOf(content);
      gsap.set(el, { clearProps: 'transform' });
      if (content) gsap.set(content, { clearProps: 'transform' });
    };
  }, [strength, textParallax, reduceMotion]);

  const contentElement = (
    <span ref={contentRef} className="inline-flex items-center gap-2 pointer-events-none relative z-10">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={containerRef}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={effectiveAriaLabel}
        className={`inline-flex items-center justify-center cursor-pointer select-none transition-shadow will-change-transform ${className}`}
      >
        {contentElement}
      </a>
    );
  }

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={onClick}
      aria-label={effectiveAriaLabel}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-shadow will-change-transform ${className}`}
    >
      {contentElement}
    </button>
  );
};
