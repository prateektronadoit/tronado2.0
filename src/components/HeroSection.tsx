import { cn } from '../lib/utils';
import astroGif from '../assets/astronaut.png';
import onlyBgGif from '../assets/onlybg.gif';
import { useState } from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="hero" className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden",
      className
    )}>
      {/* Main background GIF */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{
        background: `url(${onlyBgGif}) no-repeat center center`,
        backgroundSize: 'cover'
      }}></div>
      {/* Astronaut content with enhanced hovering */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            height: '100vh'
          }}
        >
          <div 
            className={`astronaut-float ${isHovering ? 'astronaut-hover' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              transition: 'all 0.3s ease',
              transform: isHovering ? 'scale(1.05)' : 'scale(1)',
              position: 'relative'
            }}
          >
            <img
              src={astroGif}
              alt="Astronaut"
              className="astronaut-image"
              style={{
                objectFit: 'contain',
                maxHeight: '90vh',
                width: 'auto',
                filter: isHovering ? 'drop-shadow(0 0 15px rgba(132, 90, 223, 0.8))' : 'none',
                transition: 'filter 0.5s ease-in-out'
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .astronaut-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .astronaut-hover {
            filter: drop-shadow(0 0 20px rgba(132, 90, 223, 0.7));
          }
          
          .astronaut-image {
            max-width: 100%;
            margin-bottom: 0;
            position: relative;
            bottom: 0;
          }
        `}
      </style>


    </section>
  );
}

export default HeroSection;