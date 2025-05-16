import { cn } from '../lib/utils';
import monlyBgVideo from '../assets/monlybg.mp4';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps = {}) => {

  return (
    <section id="hero" className={cn(
      "relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden",
      className
    )}>
      {/* Main background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ opacity: 1 }}
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