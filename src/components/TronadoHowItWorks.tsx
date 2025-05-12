import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRocket } from "react-icons/fa";
import { GiTechnoHeart, GiGalaxy, GiPlanetConquest, GiRingedPlanet } from "react-icons/gi";
import { BsLightningCharge, BsStars } from "react-icons/bs";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "../lib/utils";
import spaceshipImage from "../assets/spaceships.png";


interface TronadoHowItWorksProps {
  className?: string;
}

const TronadoHowItWorks: React.FC<TronadoHowItWorksProps> = ({ className }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const spaceshipControls = useAnimation();
  const leftBoxControls = useAnimation();
  const rightBoxControls = useAnimation();

  useEffect(() => {
    if (isInView && !animationComplete) {
      // Start spaceship animation
      spaceshipControls.start({
        scale: [1, 1.5, 0.8, 2],
        rotate: [0, 180, 360, 720],
        x: [0, 100, -100, 0],
        y: [0, -50, 50, 0],
        transition: {
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 1]
        }
      }).then(() => {
        setAnimationComplete(true);
        // Split animation to reveal boxes
        spaceshipControls.start({
          opacity: [1, 0.7, 0.4, 0],
          scale: [2, 3],
          transition: { duration: 0.8 }
        });
        
        // Animate in the left box
        leftBoxControls.start({
          x: 0,
          opacity: 1,
          transition: { 
            duration: 0.8, 
            type: "spring",
            stiffness: 100,
            delay: 0.4
          }
        });
        
        // Animate in the right box
        rightBoxControls.start({
          x: 0,
          opacity: 1,
          transition: { 
            duration: 0.8, 
            type: "spring",
            stiffness: 100,
            delay: 0.6
          }
        });
      });
    }
  }, [isInView, animationComplete, spaceshipControls, leftBoxControls, rightBoxControls]);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "text-white py-16 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative min-h-screen flex flex-col items-center justify-center",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #170a23 100%)',
        position: 'relative'
      }}
    >
      {/* Background without floating crypto icons */}
      
      {/* Stars background (matching app bg) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-30"></div>
        </div>
      </div>
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(150, 120, 255, 0.2) 0%, rgba(90, 50, 150, 0.1) 50%, transparent 70%)',
        }}
      ></div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute z-10 opacity-20" 
        style={{ right: '10%', top: '15%' }}
        animate={{ y: ["-10px", "10px", "-10px"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#token-gradient)"/>
          <path d="M12 6v2m0 8v2M6 12h2m8 0h2" stroke="url(#token-gradient)" strokeWidth="2" strokeLinecap="round"/>
          <defs>
            <linearGradient id="token-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute z-10 opacity-10" 
        style={{ left: '15%', bottom: '20%' }}
        animate={{ y: ["0px", "15px", "0px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="url(#token-gradient2)" strokeWidth="0.5" fill="none"/>
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" fill="url(#token-gradient2)"/>
          <defs>
            <linearGradient id="token-gradient2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d946ef"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-20 w-full">
        {/* Section title */}
        <div className="text-center mb-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            <h3 className="uppercase text-xs tracking-[0.3em] text-blue-400 font-medium">HOW IT WORKS</h3>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          </div>
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Tronado Ecosystem</span>
          </h2>
        </div>

        {/* Spaceship Animation Container - positioned absolute to not take additional space */}
        <div className="relative w-full">
          <motion.div
            className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10 w-48 h-48"
            animate={spaceshipControls}
          >
            <motion.img 
              src={spaceshipImage}
              alt="Spaceship"
              className="w-full h-full object-contain"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute -inset-4 rounded-full blur-xl"
              animate={{
                background: ['rgba(138, 75, 255, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(138, 75, 255, 0.4)'],
                boxShadow: [
                  '0 0 30px 10px rgba(138, 75, 255, 0.3)',
                  '0 0 50px 15px rgba(59, 130, 246, 0.3)',
                  '0 0 30px 10px rgba(138, 75, 255, 0.3)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>

          {/* Portal effect after animation */}
          {animationComplete && (
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5], opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 blur-3xl"></div>
            </motion.div>
          )}
        </div>

        {/* Middle strip with animated planets */}
        <div className="relative w-full py-8 overflow-hidden mb-8 mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-800/30 to-purple-900/20 backdrop-blur-sm rounded-lg"></div>
          
          <div className="relative z-10 flex justify-between items-center max-w-5xl mx-auto px-4">
            {/* Planet 1 */}
            <motion.div 
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="text-5xl text-purple-400 mb-3"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <GiRingedPlanet />
              </motion.div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                10M+
              </div>
              <div className="text-blue-300 text-sm mt-1">Total Supply</div>
            </motion.div>

            {/* Planet 2 */}
            <motion.div 
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="text-5xl text-blue-400 mb-3"
                animate={{ 
                  rotate: 360,
                  y: [0, -5, 0]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <BsStars />
              </motion.div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                5%
              </div>
              <div className="text-blue-300 text-sm mt-1">Staking Rewards</div>
            </motion.div>

            {/* Planet 3 */}
            <motion.div 
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div 
                className="text-5xl text-indigo-400 mb-3"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <GiGalaxy />
              </motion.div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                2%
              </div>
              <div className="text-blue-300 text-sm mt-1">Burn Rate</div>
            </motion.div>

            {/* Planet 4 */}
            <motion.div 
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div 
                className="text-5xl text-fuchsia-400 mb-3"
                animate={{ 
                  rotate: 360,
                  x: [0, 5, 0]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <GiPlanetConquest />
              </motion.div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
                3+
              </div>
              <div className="text-blue-300 text-sm mt-1">Blockchain Networks</div>
            </motion.div>

            {/* Planet 5 */}
            <motion.div 
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.div 
                className="text-5xl text-purple-500 mb-3"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: 360
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" }
                }}
              >
                <FaRocket />
              </motion.div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                24/7
              </div>
              <div className="text-blue-300 text-sm mt-1">Support</div>
            </motion.div>
          </div>
          
          {/* Animated background effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400 opacity-70"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content boxes - positioned below the planet strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-0">
          {/* Left Side */}
          <motion.div 
            className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] backdrop-blur-[2px]"
            initial={{ x: -100, opacity: 0 }}
            animate={leftBoxControls}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 20px rgba(138, 75, 255, 0.3)',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              y: -5
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 20 
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(138, 75, 255, 0.5)'
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
                className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center relative group"
              >
                {/* Thumb icon that appears on hover */}
                <motion.div 
                  className="absolute -top-1 -right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2"
                  transition={{ duration: 0.2 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#6E41FF">
                    <path d="M2,21V8H6V21H2M20,8H13L16.4,4.6L15,3L9,9L15,15L16.4,13.4L13,10H20V21H8V23H22V8H20Z" />
                  </svg>
                </motion.div>
                <GiTechnoHeart className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">TRDO TOKEN</h3>
            </div>

            {[
              {
                title: "Utility Token",
                desc: [
                  "TRDO is a utility token used within a decentralized financial (DeFi) ecosystem, offering seamless payment solutions for services like mobile recharges, utility bill payments, and travel bookings.",
                  "It operates on the Polygon (Matic) blockchain, which provides scalability and low transaction fees, ensuring efficiency and security."
                ]
              },
              {
                title: "Fixed Supply and Token Allocation",
                desc: [
                  "TRDO has a capped supply of 250 million tokens, with 200 million locked for long-term sustainability and only 50 million in circulation.",
                  "The token allocation includes development funds, community rewards, and future funding, ensuring a well-distributed flow of tokens to support different aspects of the ecosystem."
                ]
              },
              {
                title: "Burn and Buyback Mechanisms",
                desc: [
                  "TRDO implements transaction fee burns and periodic buybacks to reduce supply and support price stability. This creates scarcity, which increases token value.",
                  "Additionally, vesting schedules prevent large token dumps, ensuring long-term commitment and avoiding sudden price drops."
                ]
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="mb-6"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <motion.div 
                    whileHover={{ scale: 1.2, color: '#a855f7' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <FaCheckCircle className="text-purple-400 mt-1" />
                  </motion.div>
                  <h4 className="font-semibold text-white text-md">{item.title}</h4>
                </div>
                {item.desc.map((p, i) => (
                  <p key={i} className="text-sm text-gray-300 ml-6 mb-2 leading-relaxed">{p}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side */}
          <motion.div 
            className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] backdrop-blur-[2px]"
            initial={{ x: 100, opacity: 0 }}
            animate={rightBoxControls}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 20px rgba(138, 75, 255, 0.3)',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              y: -5
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 20 
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(138, 75, 255, 0.5)'
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
                className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative group"
              >
                {/* Thumb icon that appears on hover */}
                <motion.div 
                  className="absolute -top-1 -right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2"
                  transition={{ duration: 0.2 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#6E41FF">
                    <path d="M2,21V8H6V21H2M20,8H13L16.4,4.6L15,3L9,9L15,15L16.4,13.4L13,10H20V21H8V23H22V8H20Z" />
                  </svg>
                </motion.div>
                <BsLightningCharge className="text-white text-xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Factors Driving Price</h3>
            </div>

            {[
              {
                title: "Futuristic Products and Expanded Use Cases",
                desc: [
                  "E-Commerce Integration: TRDO enables secure, fast, low-cost cross-border payments within e-commerce platforms, expanding its utility and market demand.",
                  "International Payments: TRDO can capture a larger share of the global remittance market, driving token adoption."
                ]
              },
              {
                title: "Evolving DeFi Landscape",
                desc: [
                  "As DeFi expands, TRDO's role in staking, lending, and governance voting increases its utility and drives demand."
                ]
              },
              {
                title: "Governance and CSR Initiatives",
                desc: [
                  "TRDO holders engage in decentralized governance and CSR initiatives, increasing community value and long-term engagement."
                ]
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="mb-6"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <motion.div 
                    whileHover={{ scale: 1.2, color: '#a855f7' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <FaCheckCircle className="text-purple-400 mt-1" />
                  </motion.div>
                  <h4 className="font-semibold text-white text-md">{item.title}</h4>
                </div>
                {item.desc.map((p, i) => (
                  <p key={i} className="text-sm text-gray-300 ml-6 mb-2 leading-relaxed">{p}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default TronadoHowItWorks;
