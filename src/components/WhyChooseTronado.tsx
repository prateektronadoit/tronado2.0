import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

// Import the images
import astroImg from "../assets/astro.png";
import dollarSvg from "../assets/choose/dollar.svg";
import bankBuildingSvg from "../assets/choose/bank_building.svg";
import scanSvg from "../assets/choose/scan.svg";
import pinpointPng from "../assets/choose/pinpoint.png";

const WhyChooseTronado: React.FC = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Floating animation for astro
  const floatingAnimation = {
    y: ["-10px", "10px"],
    x: ["-5px", "5px"],
    rotate: [-2, 2],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <section 
      id="features" 
      className="text-white py-20 px-6 md:px-20 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1230 50%, #170a23 100%)',
        position: 'relative'
      }}
      ref={ref}
    >
      {/* Animated background stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{ opacity: Math.random() * 0.5 + 0.3 }}
          animate={{ 
            opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.7 + 0.3, Math.random() * 0.3 + 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            zIndex: 0
          }}
        />
      ))}

      {/* Astro background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute right-0 bottom-0 w-full h-full"
          initial={{ opacity: 0.6 }}
          animate={floatingAnimation}
        >
          <img 
            src={astroImg} 
            alt="Astronaut" 
            className="absolute right-[-10%] bottom-[-10%] w-[60%] opacity-30"
            style={{ filter: "blur(2px)" }}
          />
        </motion.div>
      </div>

      {/* Glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 200) + 50}, 0.6) 0%, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 20)}, ${Math.floor(Math.random() * 80)}, 0.2) 70%)`,
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            filter: 'blur(40px)',
            opacity: Math.random() * 0.1 + 0.05,
            zIndex: 0
          }}
          animate={{
            x: ['-20px', '20px'],
            y: ['-20px', '20px'],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(150, 120, 255, 0.15) 0%, rgba(90, 50, 150, 0.05) 50%, transparent 70%)',
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2 font-bold text-[#d1caff]">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Our Mission
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Why Choose Tronado?
            </span>
          </h3>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Card 1 */}
          <motion.div 
            className="rounded-2xl border border-[#372d5a] p-6 group bg-gradient-to-b from-[#16122e]/80 to-[#0f0b20]/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/30 flex flex-col items-center text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Cosmic background effect */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-[#6E41FF]/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30 relative z-10"
            >
              <img
                src={dollarSvg}
                alt="Donation Icon"
                className="w-9 h-9 pointer-events-none"
              />
            </motion.div>
            <h3 className="text-[1.1rem] font-semibold text-[#d1caff] mb-2 relative z-10">
              Donation and Charity Drives
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              TRDO tokens will be used to facilitate donations to various
              charitable organisations through transparent smart contracts.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="rounded-2xl border border-[#372d5a] p-6 group bg-gradient-to-b from-[#16122e]/80 to-[#0f0b20]/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/30 flex flex-col items-center text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Cosmic background effect */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-green-400 to-purple-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30 relative z-10"
            >
              <img
                src={bankBuildingSvg}
                alt="Community Icon"
                className="w-9 h-9 pointer-events-none"
              />
            </motion.div>
            <h3 className="text-[1.1rem] font-semibold text-[#d1caff] mb-2 relative z-10">
              Community Development
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              TRDO will partner with local communities to fund development
              projects through direct contributions from token holders.
            </p>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            className="rounded-2xl border border-[#372d5a] p-6 group bg-gradient-to-b from-[#16122e]/80 to-[#0f0b20]/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/30 flex flex-col items-center text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Cosmic background effect */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30 relative z-10"
            >
              <img
                src={scanSvg}
                alt="Education Icon"
                className="w-9 h-9 pointer-events-none"
              />
            </motion.div>
            <h3 className="text-[1.1rem] font-semibold text-[#d1caff] mb-2 relative z-10">
              Educational Investment
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              TRDO will fund workshops, online courses, and scholarships to
              promote financial literacy and blockchain education.
            </p>
          </motion.div>
          
          {/* Card 4 */}
          <motion.div 
            className="rounded-2xl border border-[#372d5a] p-6 group bg-gradient-to-b from-[#16122e]/80 to-[#0f0b20]/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/30 flex flex-col items-center text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Cosmic background effect */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30 relative z-10"
            >
              <img
                src={pinpointPng}
                alt="Sustainability Icon"
                className="w-9 h-9 pointer-events-none"
              />
            </motion.div>
            <h3 className="text-[1.1rem] font-semibold text-[#d1caff] mb-2 relative z-10">
              Environmental Sustainability
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              TRDO supports renewable energy, reforestation, and sustainable
              agriculture projects through blockchain-powered funding.
            </p>
          </motion.div>
        </motion.div>

        {/* Floating space elements */}
        <motion.div 
          className="absolute z-1 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl"
          style={{ top: '20%', left: '15%' }}
          animate={{ 
            y: [0, -20, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute z-1 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl"
          style={{ bottom: '20%', right: '10%' }}
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
};

export default WhyChooseTronado;
