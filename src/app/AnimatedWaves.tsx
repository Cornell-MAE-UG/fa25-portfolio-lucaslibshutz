'use client';
import React, { useEffect, useState } from 'react';

function getWavePath({ amplitude, frequency, phase, height, width, offset = 0 }: {
  amplitude: number;
  frequency: number;
  phase: number;
  height: number;
  width: number;
  offset?: number;
}) {
  let path = '';
  for (let x = 0; x <= width; x += 1) {
    const y = amplitude * Math.sin((frequency * (x + offset) + phase)) + height / 2;
    path += x === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }
  path += ` L${width},${height} L0,${height} Z`;
  return path;
}

export default function AnimatedWaves() {
  const [t, setT] = useState(0);
  const width = 1200;
  const height = 300;

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setT(t => t + 0.02);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.10" />
          <stop offset="50%" stopColor="var(--foreground)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      {/* Wave 1 */}
      <path
        d={getWavePath({ amplitude: 24, frequency: 0.012, phase: t, height, width })}
        fill="url(#waveGradient)"
      />
      {/* Wave 2 */}
      <path
        d={getWavePath({ amplitude: 32, frequency: 0.009, phase: t + 1, height, width, offset: 60 })}
        fill="url(#waveGradient)"
        opacity={0.7}
      />
      {/* Wave 3 */}
      <path
        d={getWavePath({ amplitude: 18, frequency: 0.015, phase: t + 2, height, width, offset: 120 })}
        fill="url(#waveGradient)"
        opacity={0.5}
      />
    </svg>
  );
} 