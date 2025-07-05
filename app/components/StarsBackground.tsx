'use client';
import React, { useEffect, useRef } from 'react';

const STAR_COUNT = 60;
const STAR_MIN_SIZE = 1;
const STAR_MAX_SIZE = 2.5;
const STAR_MIN_OPACITY = 0.08;
const STAR_MAX_OPACITY = 0.18;
const STAR_ANIMATION_DURATION = 18; // seconds

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const stars = starsRef.current.querySelectorAll('.star');
    stars.forEach((star, i) => {
      const delay = randomBetween(0, STAR_ANIMATION_DURATION);
      (star as HTMLElement).style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      ref={starsRef}
    >
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const size = randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE);
        const opacity = randomBetween(STAR_MIN_OPACITY, STAR_MAX_OPACITY);
        const left = randomBetween(0, 100);
        const top = randomBetween(0, 100);
        const duration = randomBetween(STAR_ANIMATION_DURATION * 0.8, STAR_ANIMATION_DURATION * 1.2);
        return (
          <span
            key={i}
            className="star"
            style={{
              position: 'absolute',
              left: `${left}vw`,
              top: `${top}vh`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'white',
              opacity,
              filter: 'blur(0.5px)',
              animation: `star-twinkle ${duration}s linear infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes star-twinkle {
          0% { opacity: 0.12; transform: translateY(0px) scale(1); }
          10% { opacity: 0.18; }
          50% { opacity: 0.08; transform: translateY(8px) scale(1.1); }
          90% { opacity: 0.18; }
          100% { opacity: 0.12; transform: translateY(0px) scale(1); }
        }
      `}</style>
    </div>
  );
} 