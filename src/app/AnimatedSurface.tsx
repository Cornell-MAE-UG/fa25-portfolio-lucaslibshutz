'use client';
import React, { useEffect, useState } from 'react';

const GRID_SIZE = 32;
const WIDTH = 1200;
const HEIGHT = 300;

export default function AnimatedSurface() {
  const [t, setT] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame: number;
    const animate = () => {
      setT(t => t + 0.007);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) return null;

  // Generate grid lines (rows)
  const lines = [];
  for (let j = 0; j < GRID_SIZE; j++) {
    let path = '';
    let sumZ = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      const x = (i / (GRID_SIZE - 1)) * WIDTH;
      const y = (j / (GRID_SIZE - 1)) * HEIGHT;
      const z = 24 * Math.sin((i / 8) + t) * Math.cos((j / 8) + t);
      sumZ += Math.max(0, z);
      const ptY = y + z;
      path += i === 0 ? `M${x},${ptY}` : ` L${x},${ptY}`;
    }
    // Average highlight for this line (0.3 to 1.0)
    const avgHighlight = Math.max(0.7, sumZ / (GRID_SIZE * 24));
    lines.push({ d: path, opacity: avgHighlight });
  }

  return (
    <div style={{ width: '100%', height: '100%', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <svg className="w-full h-full" style={{ transform: 'scaleY(1.25)' }} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="surfaceLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {lines.map((line, idx) => (
          <path
            key={idx}
            d={line.d}
            stroke="url(#surfaceLineGradient)"
            strokeWidth={3}
            fill="none"
            opacity={line.opacity}
          />
        ))}
      </svg>
    </div>
  );
} 
