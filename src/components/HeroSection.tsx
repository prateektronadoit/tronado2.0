import { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import polygonImage from '../assets/polygon.png';
import astroGif from '../assets/astrobg.gif';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {
  const polygonRef = useRef<HTMLImageElement>(null);

  // Add pulsating glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (polygonRef.current) {
        polygonRef.current.classList.toggle('pulse-intense');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] py-32 overflow-hidden",
      className
    )}>
      {/* GIF content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <div className="relative rounded-xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto hover:scale-105 transition-all duration-300">
          <img
            src={astroGif}
            alt="Space Animation"
            className="w-full"
          />
        </div>
      </div>

      {/* Glowing Polygon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute -inset-20 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-70 animation-delay-1000"></div>
          <img 
            ref={polygonRef}
            src={polygonImage} 
            alt="Polygon" 
            className="relative w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] object-contain z-10 transition-all duration-1000 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;