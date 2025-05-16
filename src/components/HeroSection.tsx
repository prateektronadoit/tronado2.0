import { cn } from '../lib/utils';
import monlyBgVideo from '../assets/monlybg.mp4';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down more than a threshold (e.g., 100px)
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden bg-black transition-all duration-500",
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none transform -translate-y-20',
      className
    )}>
      {/* Main background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full"
          style={{ 
            opacity: 1,
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            objectPosition: 'center center'
          }}
        >
          <source src={monlyBgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content container for any future content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        {/* Hero content can be added here if needed */}
      </div>


    </section>
  );
}

export default HeroSection;