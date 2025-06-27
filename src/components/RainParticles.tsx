'use client';
import { useRef, useEffect } from 'react';

export default function RainParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const drops = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 2 + 1,
      size: Math.random() * 1.5 + 1,
      emoji: ['✨', '⚙️', '💻', '☁️'][Math.floor(Math.random() * 4)],
    }));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drops.forEach((drop) => {
        ctx.font = `${drop.size * 20}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText(drop.emoji, drop.x, drop.y);
        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-20 inset-0 z-0 pointer-events-none"
    />
  );
}
