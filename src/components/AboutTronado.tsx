import React from "react";
import { motion } from "framer-motion";
import { BlackHoleAnimation } from "./ui/black-hole-animation";
import { cn } from "../lib/utils";
import bitcoinImage from "../assets/bitcoin.png";

interface AboutTronadoProps {
  className?: string;
}

const AboutTronado: React.FC<AboutTronadoProps> = ({ className }) => {
  const aboutItems = [
    {
      number: "01",
      title: "What is Tronado?",
      icon: "/question.svg",
      content: `Tronado (TRDO), a pioneering utility token designed to revolutionise digital transactions through seamless,
      secure, and efficient payment solutions. Founded on September 23, 2020, Tronado aims to redefine the financial
      landscape with its decentralised and fixed supply model.`,
    },
    {
      number: "02",
      title: "Our Vision",
      icon: "/vision.svg",
      content:
        "To emerge as the leading utility token for secure and efficient digital transactions across diverse sectors. We envision a future where Tronado powers frictionless transactions worldwide.",
    },
    {
      number: "03",
      title: "Our Mission",
      icon: "/mission.svg",
      content:
        "To offer a decentralised, transparent, and user friendly platform for payments, recharges, and bookings, thereby streamlining the digital transaction experience.",
    },
  ];

  return (
    <section 
      id="about" 
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[100vh] py-28 overflow-hidden",
        "bg-black px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Stars background (matching the app background) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <BlackHoleAnimation className="opacity-80" />
        </div>
        
        {/* Blue glow matching the HeroSection */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-50"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2 font-bold text-blue-400">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            About Tronado
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          </h2>
          <h3 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Easy Steps to Join Our Ecosystem
            </span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side: NFT-like image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <motion.div
                animate={{
                  y: ["-5%", "5%", "-5%"], 
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="relative z-10"
              >
                <div className="relative">
                  <img 
                    src={bitcoinImage} 
                    alt="Bitcoin" 
                    className="relative w-full h-auto max-w-md mx-auto rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-30 z-0 animate-pulse"></div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right side: Steps */}
          <div className="w-full lg:w-1/2 space-y-8">
            {aboutItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Number */}
                <div className="absolute -right-4 top-4 text-5xl font-bold opacity-20 text-purple-300">
                  {item.number}
                </div>

                <motion.div 
                  className="flex gap-5 relative bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] p-6 rounded-xl border border-[rgba(255,255,255,0.08)] cursor-pointer"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 0 15px rgba(138, 75, 255, 0.4)',
                    borderColor: 'rgba(168, 85, 247, 0.4)', 
                    y: -5,
                    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300,
                    damping: 20 
                  }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5 
                    }}
                  >
                    <img src={item.icon} alt={item.title} className="w-6 h-6" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300/90 text-sm leading-relaxed hover:text-blue-400 transition-colors duration-300">{item.content}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTronado;
