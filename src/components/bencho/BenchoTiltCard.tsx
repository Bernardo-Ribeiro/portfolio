import React, { useRef, useState, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

interface BenchoTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default 8)
  spotlightColor?: string; // Radial light color (default rgba(255, 43, 43, 0.12))
}

export const BenchoTiltCard: React.FC<BenchoTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  spotlightColor = 'rgba(255, 43, 43, 0.12)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rotateXTo = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width) * 2 - 1; // -1 to 1
      const normY = (clientY / rect.height) * 2 - 1; // -1 to 1

      rotateXTo(-normY * maxTilt);
      rotateYTo(normX * maxTilt);

      setMousePos({
        x: clientX,
        y: clientY,
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      setMousePos((prev) => ({ ...prev, opacity: 0 }));
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [maxTilt]);

  return (
    <div
      style={{ perspective: '1200px' }}
      className="w-full"
    >
      <div
        ref={cardRef}
        className={`relative transition-shadow duration-300 will-change-transform transform-gpu ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Bencho Interactive Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
