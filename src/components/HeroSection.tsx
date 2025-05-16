import { cn } from '../lib/utils';
import onlyBgGif from '../assets/onlybg.gif';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {

  return (
    <section id="hero" className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden",
      className
    )}>
      {/* Main background GIF */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{
        background: `url(${onlyBgGif}) no-repeat center center`,
        backgroundSize: 'cover',
        opacity: 1
      }}></div>
      
      {/* Content container for any future content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        {/* Hero content can be added here if needed */}
      </div>


    </section>
  );
}

export default HeroSection;