"use client";

import { useState } from "react";

const TILT_THRESHOLD = 12;

/**
 * Wraps its children in a perspective-tilt container that reacts to mouse
 * movement. Extracted as a tiny client leaf so AppCard can be a Server Component.
 */
export const TiltWrapper = ({ children }: { children: React.ReactNode }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -TILT_THRESHOLD, y: x * TILT_THRESHOLD });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const isResting = tilt.x === 0 && tilt.y === 0;

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isResting ? "transform 0.4s ease-out" : "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
