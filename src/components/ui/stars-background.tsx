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

interface LightningStrike {
  id: number;
  points: { x: number; y: number }[];
  opacity: number;
  startTime: number;
  duration: number;
}
 
interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
  showLightning?: boolean;
  lightningFrequency?: number;
  lightningColor?: string;
  lightningGlowColor?: string;
}
 
export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.0004, // Increased star density for more stars
  allStarsTwinkle = true,
  twinkleProbability = 0.8, // Increased twinkle probability
  minTwinkleSpeed = 0.4, // Slightly faster minimum twinkle
  maxTwinkleSpeed = 0.9, // Slightly faster maximum twinkle
  className,
  showLightning = true,
  lightningFrequency = 7000, // More frequent lightning
  lightningColor = "#9D4EDD", // Purple color for lightning
  lightningGlowColor = "#C77DFF", // Lighter purple for glow
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const [lightningStrikes, setLightningStrikes] = useState<LightningStrike[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightningTimerRef = useRef<number | null>(null);
 
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
          radius: Math.random() * 0.05 + 0.5,
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

  const generateLightningStrike = useCallback((width: number, height: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = [];
    const startX = Math.random() * width;
    const endX = Math.random() * width * 0.8 + width * 0.1; // Land somewhere near the bottom
    const segments = 15; // Number of segments for the jaggedness
    const variance = 30; // How much segments can deviate

    points.push({ x: startX, y: 0 }); // Start at the top

    for (let i = 1; i <= segments; i++) {
      const targetY = (i / segments) * height;
      const targetX = startX + (endX - startX) * (i / segments);
      const deviateX = (Math.random() - 0.5) * variance * (1 - i/segments); // Reduce variance towards the end

      points.push({ x: targetX + deviateX, y: targetY });
    }

    return points;
  }, []);

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

  // Lightning generation
  useEffect(() => {
    if (!showLightning) return;

    const triggerLightning = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        const newStrike: LightningStrike = {
          id: Date.now(),
          points: generateLightningStrike(width, height),
          opacity: 0, // Starts transparent
          startTime: Date.now(),
          duration: 800, // Visible for 800ms
        };
        setLightningStrikes(prevStrikes => [...prevStrikes, newStrike]);
      }

      // Schedule the next strike
      const randomDelay = lightningFrequency / 2 + Math.random() * lightningFrequency;
      lightningTimerRef.current = window.setTimeout(triggerLightning, randomDelay);
    };

    // Initial trigger
    const initialDelay = Math.random() * lightningFrequency;
    lightningTimerRef.current = window.setTimeout(triggerLightning, initialDelay);

    return () => {
      // Clean up timer on unmount
      if (lightningTimerRef.current) {
        clearTimeout(lightningTimerRef.current);
      }
    };
  }, [showLightning, lightningFrequency, generateLightningStrike]);
 
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

      // Draw and update lightning
      const now = Date.now();
      const updatedStrikes = lightningStrikes
        .map(strike => {
          const elapsed = now - strike.startTime;
          const progress = elapsed / strike.duration;

          if (progress >= 1) {
            return null; // Mark for removal
          }

          // Lightning flash pattern - quick flash in, hold briefly, quick flash out
          let opacity = 0;
          if (progress < 0.1) {
            opacity = progress / 0.1; // Flash in
          } else if (progress < 0.7) {
            opacity = 1; // Hold
          } else {
            opacity = (1 - progress) / 0.3; // Flash out
          }

          // Draw this lightning strike
          if (strike.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(strike.points[0].x, strike.points[0].y);
            
            for (let i = 1; i < strike.points.length; i++) {
              ctx.lineTo(strike.points[i].x, strike.points[i].y);
            }
            
            // Main stroke
            ctx.strokeStyle = `rgba(${parseInt(lightningColor.slice(1, 3), 16)}, ${parseInt(lightningColor.slice(3, 5), 16)}, ${parseInt(lightningColor.slice(5, 7), 16)}, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            
            // Outer glow effect
            ctx.strokeStyle = `rgba(${parseInt(lightningGlowColor.slice(1, 3), 16)}, ${parseInt(lightningGlowColor.slice(3, 5), 16)}, ${parseInt(lightningGlowColor.slice(5, 7), 16)}, ${opacity * 0.7})`;
            ctx.lineWidth = 6;
            ctx.stroke();
          }

          return { ...strike, opacity: opacity };
        })
        .filter(strike => strike !== null) as LightningStrike[];

      setLightningStrikes(updatedStrikes);
 
      animationFrameId = requestAnimationFrame(render);
    };
 
    render();
 
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, lightningStrikes, lightningColor, lightningGlowColor]);
 
  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0", className)}
    />
  );
};
