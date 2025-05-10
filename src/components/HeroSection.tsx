import { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import polygonImage from '../assets/polygon.png';
import LightningEffect from './ui/lightning-effect';

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
      "relative flex flex-col items-center justify-center min-h-[70vh] py-20 overflow-hidden",
      className
    )}>
      {/* Text content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-500 text-transparent bg-clip-text mb-6">
          2.0 Flash
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Experience the next generation of decentralized technology with our powerful and innovative blockchain solution.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>

      {/* Lightning Effect */}
      <LightningEffect />
      
      {/* Glowing Polygon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute -inset-10 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute -inset-16 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-70 animation-delay-1000"></div>
          <img 
            ref={polygonRef}
            src={polygonImage} 
            alt="Polygon" 
            className="relative w-60 h-60 md:w-80 md:h-80 object-contain z-10 polygon-glow transition-all duration-1000 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;