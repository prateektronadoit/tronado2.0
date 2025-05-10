"use client";
import { cn } from "../../lib/utils";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
 
interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

// Lightning interface removed
 
interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}
 
export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.0012, // Significantly increased star density for many more stars
  allStarsTwinkle = true,
  twinkleProbability = 0.8, // Increased twinkle probability
  minTwinkleSpeed = 0.4, // Slightly faster minimum twinkle
  maxTwinkleSpeed = 0.9, // Slightly faster maximum twinkle
  className
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.3 + 0.7, // Increased size range for wider stars
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

    // Lightning generation function removed

  // Initialize stars on resize
  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
 
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setStars(generateStars(width, height));
      }
    };
 
    updateStars();
 
    const resizeObserver = new ResizeObserver(updateStars);
    const currentCanvas = canvasRef.current;
    
    if (currentCanvas) {
      resizeObserver.observe(currentCanvas);
    }
 
    return () => {
      if (currentCanvas) {
        resizeObserver.unobserve(currentCanvas);
      }
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
  ]);

  // Lightning generation effect removed
 
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    let animationFrameId: number;
 
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
 
        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.5 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });

      // Lightning drawing code removed
 
      animationFrameId = requestAnimationFrame(render);
    };
 
    render();
 
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);
 
  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0", className)}
    />
  );
};
