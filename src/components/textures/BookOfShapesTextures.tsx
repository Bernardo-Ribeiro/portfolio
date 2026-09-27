import React from 'react';

/**
 * Isometric Cube Wireframe Lattice Pattern
 * Inspired by Book of Shapes (iso-cube-wireframe & isometric-cube-grid)
 */
export const IsoWireframePattern: React.FC<{
  className?: string;
  opacity?: number;
  strokeColor?: string;
}> = ({
  className = '',
  opacity = 0.08,
  strokeColor = '#FF2B2B',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="book-of-shapes-iso-cubes"
            width="60"
            height="103.923"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            {/* Isometric cube wireframe primitives (30/60/90 deg) */}
            <path
              d="M30 0 L60 17.32 L60 51.96 L30 34.64 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeOpacity="0.7"
            />
            <path
              d="M30 0 L0 17.32 L0 51.96 L30 34.64 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            <path
              d="M30 34.64 L60 51.96 L30 69.28 L0 51.96 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeOpacity="0.8"
            />
            <path
              d="M30 69.28 L60 86.6 L60 103.92 L30 86.6 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeOpacity="0.3"
            />
            <path
              d="M30 69.28 L0 86.6 L0 103.92 L30 86.6 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
            <circle cx="30" cy="34.64" r="1.5" fill={strokeColor} fillOpacity="0.9" />
            <circle cx="60" cy="51.96" r="1" fill={strokeColor} fillOpacity="0.5" />
            <circle cx="0" cy="51.96" r="1" fill={strokeColor} fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#book-of-shapes-iso-cubes)" />
      </svg>
    </div>
  );
};

/**
 * Interference Wave Mesh Pattern
 * Inspired by Book of Shapes (interference-mesh & resonance_field)
 */
export const InterferenceMeshPattern: React.FC<{
  className?: string;
  opacity?: number;
  strokeColor?: string;
}> = ({
  className = '',
  opacity = 0.07,
  strokeColor = '#94A3B8',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="book-of-shapes-interference"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Concentric wave harmonic arcs */}
            <circle cx="0" cy="0" r="20" fill="none" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 3" />
            <circle cx="0" cy="0" r="40" fill="none" stroke={strokeColor} strokeWidth="0.6" />
            <circle cx="0" cy="0" r="60" fill="none" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="3 4" />
            <circle cx="80" cy="80" r="20" fill="none" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 3" />
            <circle cx="80" cy="80" r="40" fill="none" stroke={strokeColor} strokeWidth="0.6" />
            <circle cx="80" cy="80" r="60" fill="none" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="3 4" />
            <circle cx="40" cy="40" r="1" fill="#FF2B2B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#book-of-shapes-interference)" />
      </svg>
    </div>
  );
};

/**
 * Algorithmic Flow Dots Matrix
 * Inspired by Book of Shapes (flow_dots & halftone_sphere)
 */
export const FlowDotsPattern: React.FC<{
  className?: string;
  opacity?: number;
  dotColor?: string;
}> = ({
  className = '',
  opacity = 0.1,
  dotColor = '#64748B',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="book-of-shapes-flow-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="1" fill={dotColor} />
            <circle cx="0" cy="0" r="0.75" fill={dotColor} fillOpacity="0.5" />
            <circle cx="32" cy="0" r="0.75" fill={dotColor} fillOpacity="0.5" />
            <circle cx="0" cy="32" r="0.75" fill={dotColor} fillOpacity="0.5" />
            <circle cx="32" cy="32" r="0.75" fill={dotColor} fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#book-of-shapes-flow-dots)" />
      </svg>
    </div>
  );
};
