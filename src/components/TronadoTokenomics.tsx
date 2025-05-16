import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import trdoChartImg from "../assets/trdochart.png";

const data = [
  { label: "Team & Founders", percentage: "15%" },
  { label: "Development Fund", percentage: "20%" },
  { label: "Liquidity Reserve", percentage: "10%" },
  { label: "Future Strategic Funding", percentage: "15%" },
  { label: "Token Sale", percentage: "10%" },
  { label: "Community & Staking", percentage: "25%" },
];

const TronadoTokenomics: React.FC = () => {
  return (
    <section 
      className="relative text-white py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #170a23 0%, #190f28 100%)',
        position: 'relative'
      }}
    >
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(150, 120, 255, 0.2) 0%, rgba(90, 50, 150, 0.1) 50%, transparent 70%)',
        }}
      ></div>
      
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
            repeatType: "mirror",
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
      
      {/* Animated background orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 200) + 50}, 0.3) 0%, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 20)}, ${Math.floor(Math.random() * 80)}, 0.1) 70%)`,
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2 font-bold text-[#d1caff]">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Allocation
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          </h2>
          <h3 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Tronado Tokenomics
            </span>
          </h3>
        </div>

        {/* Main content with distribution and chart */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left side - Tokenomics Items */}
          <div className="lg:w-1/2 space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center border-b border-purple-900/30 pb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-14 h-14 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-900/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/80 to-purple-900/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.percentage}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-[#d1caff]">{item.label}</h4>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side - Chart Image with Animation - Circular rotation animation */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center">
            <div className="relative">
              {/* Circular glow effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer glow ring */}
                <div className="absolute w-[110%] h-[110%] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-md animate-pulse"></div>
                {/* Middle glow ring */}
                <div className="absolute w-[105%] h-[105%] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-700/20 blur-md animate-pulse" 
                  style={{animationDelay: '0.7s'}}></div>
                {/* Inner glow ring */}
                <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-purple-800/30 to-pink-700/30 blur-sm animate-pulse"
                  style={{animationDelay: '1.4s'}}></div>
              </div>
              
              {/* Chart container */}
              <motion.div 
                className="w-[440px] h-[440px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] relative" /* Increased size */
              >
                {/* Shadow effect behind the chart */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-transparent z-0"></div>
                
                {/* Rotating chart with outward expansion */}
                <motion.div 
                  className="w-full h-full flex items-center justify-center relative z-10"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.95, 1]
                  }}
                  transition={{ 
                    rotate: {
                      duration: 60,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop"
                    },
                    scale: {
                      duration: 1,
                      ease: "easeOut"
                    }
                  }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    {/* Background for better readability */}
                    <div className="absolute inset-0 bg-[#0f0f1a]/90 rounded-full"></div>
                    
                    {/* Chart image with outward expansion */}
                    <motion.div
                      className="w-full h-full relative"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <img 
                        src={trdoChartImg}
                        alt="Tokenomics Distribution" 
                        className="w-full h-full object-contain p-2"
                        style={{
                          filter: 'brightness(1.2) contrast(1.15)'
                        }}
                      />
                    </motion.div>
                    
                    {/* Subtle overlay to enhance the chart */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Static TRDO Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="text-5xl md:text-4xl font-black text-center">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">TRDO</span>
                </div>
              </div>
            </div>
            
            {/* Buy Now Button */}
            <motion.button 
              className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now <FaArrowRight />
            </motion.button>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default TronadoTokenomics;
