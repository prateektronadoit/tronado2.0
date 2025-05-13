import { cn } from '../lib/utils';
import astroGif from '../assets/astronaut.png';
import onlyBgGif from '../assets/onlybg.gif';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {

  return (
    <section className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] py-32 overflow-hidden",
      className
    )}>
      {/* Main background GIF */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{
        background: `url(${onlyBgGif}) no-repeat center center`,
        backgroundSize: 'cover'
      }}></div>
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


    </section>
  );
}

export default HeroSection;