import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Import images
import stakingImg from '../assets/about/Staking.png';
import gamesImg from '../assets/about/crypto-games.png';
import ecommerceImg from '../assets/about/ecommerce.png';
import exchangeImg from '../assets/about/crypto-exchange.png';
import lotteryImg from '../assets/about/crypto-lottery.png';
import qrPosImg from '../assets/about/qr-pos.png';

type Feature = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: 'STAKING',
    description: `Staking unlike its staking counterparts which works with purchasing and then staking proof-of-stake tokens to earn a return denominated in the same assets, allows TRDO holders to earn reserved currencies (BNB, TRDO, PANCAKE and other stipulated currencies for holding TRDO). This reward and consensus mechanism provides a more direct way for holders to earn other cryptocurrencies as well as TRDO.`,
    imageSrc: stakingImg,
    imageAlt: 'Staking Illustration',
  },
  {
    title: 'TRONADO GAMES',
    description: `The introduction of the Tronado Games allows users to hatch and earn more Tronado every few days. This tends to keep the community active and also encourages hodlers to participate in the developments proposed by the development team. The top hodlers are incentivised with the opportunity to earn more Tronado by claiming extra rewards every few days.`,
    imageSrc: gamesImg,
    imageAlt: 'Game Controller Illustration',
    reverse: true,
  },
  {
    title: 'MARKET PLACE / ECOMMERCE',
    description: `Non-Fungible Token (NFT) is a phenomenon that has gained attention in the crypto world over the past few years with increasing acceptance and use cases. The Tronado NFT marketplace will allow users and community to display their artwork which can be bid on and purchased as NFTs are singularly owned by the buyer and have a unique identity code as metadata.`,
    imageSrc: ecommerceImg,
    imageAlt: 'Ecommerce Illustration',
  },
  {
    title: 'CRYPTO EXCHANGE',
    description: `Your gateway to digital asset trading. Our platform empowers users to securely buy, sell, and trade a wide variety of cryptocurrencies, from Bitcoin and Ethereum to emerging altcoins. Designed for all experience levels, we offer intuitive tools, real-time market data, and seamless transactions to make trading accessible and efficient.`,
    imageSrc: exchangeImg,
    imageAlt: 'Crypto Exchange Illustration',
    reverse: true,
  },
  {
    title: 'TRONADO LOTTERY – COMING SOON',
    description: `Our lottery is another fun game that enables participants to earn a considerable amount of Tronado. Users can participate by depositing a small amount of TRDO that enables them to purchase the lottery ticket thereby contributing to the lottery pool. The user can get more tickets to increase their chances of winning and if the user is lucky to win the jackpot, a huge amount of TRDO goes to them.`,
    imageSrc: lotteryImg,
    imageAlt: 'Lottery Illustration',
  },
  {
    title: 'QR CODE CRYPTO POS PAYMENT SOLUTION – COMING IN 2025',
    description: `Point-of-Sale services and QR code scanning would be employed in payment processing. This will be similar to the QR code use in cryptocurrency wallets but would contain all necessary payment details for easy, reliable, efficient and secure transaction processes to pay.`,
    imageSrc: qrPosImg,
    imageAlt: 'POS & QR Code Illustration',
    reverse: true,
  },
];

// Different planet components for each feature
const PlanetIcons = [
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-800 to-purple-500 border border-purple-300/30"></div>
      <div className="absolute -top-2 -right-1 h-6 w-10 rounded-full bg-yellow-500/60 blur-sm rotate-45"></div>
    </div>
  ),
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-600 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-orange-700 to-orange-400 border border-orange-300/30"></div>
      <div className="absolute h-full w-full rounded-full overflow-hidden">
        <div className="absolute top-3 h-3 w-full bg-orange-300/30"></div>
        <div className="absolute top-10 h-2 w-full bg-orange-300/20"></div>
      </div>
    </div>
  ),
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 border border-blue-300/30"></div>
      <div className="absolute h-20 w-24 -left-2 rotate-45 overflow-hidden">
        <div className="absolute h-3 w-full bg-blue-300/30 rotate-[30deg] top-5 left-2"></div>
        <div className="absolute h-2 w-full bg-blue-300/20 rotate-[30deg] top-10 left-5"></div>
      </div>
    </div>
  ),
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-700 to-green-400 border border-green-300/30"></div>
      <div className="absolute top-0 right-0 h-8 w-8 rounded-full bg-emerald-300/40 blur-sm"></div>
      <div className="absolute bottom-1 left-1 h-5 w-5 rounded-full bg-emerald-300/40 blur-sm"></div>
    </div>
  ),
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-pink-700 to-rose-400 border border-pink-300/30"></div>
      <div className="absolute inset-4 rounded-full border-2 border-dashed border-pink-300/40 animate-spin-slow"></div>
    </div>
  ),
  () => (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 opacity-70"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-700 to-yellow-400 border border-yellow-300/30"></div>
      <div className="absolute h-20 w-20 animate-pulse">
        <div className="absolute top-2 left-7 h-3 w-3 rounded-full bg-yellow-300/60"></div>
        <div className="absolute top-12 left-4 h-2 w-2 rounded-full bg-yellow-300/60"></div>
        <div className="absolute bottom-3 right-5 h-4 w-4 rounded-full bg-yellow-300/60"></div>
      </div>
    </div>
  ),
];

// Custom wave path component
const WavePath: React.FC<{progress: number}> = ({ progress }) => (
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-4 z-0">
    <svg 
      className="absolute h-full w-24 overflow-visible" 
      viewBox="0 0 100 1000" 
      preserveAspectRatio="none"
      style={{ left: '-40px' }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
      <path
        d="M50,0 Q65,125 35,250 Q5,375 65,500 Q95,625 35,750 Q5,875 50,1000"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset={1000 - (progress * 1000)}
        opacity="0.6"
      />
    </svg>
    
    {/* Glow effect */}
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 w-2 rounded-full blur-sm" 
      style={{ 
        height: `${progress * 100}%`,
        background: 'linear-gradient(to bottom, #8b5cf6, #7c3aed, #db2777)',
        opacity: 0.4,
      }}
    ></div>
  </div>
);

const IcoAboutSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Track scroll progress through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate progress through the section (0 to 1)
      const scrollPercentage = Math.min(
        Math.max(
          (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight),
          0
        ),
        1
      );
      
      setScrollProgress(scrollPercentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, type: "spring", stiffness: 50 }
      });
    }
  }, [isInView, controls]);

  return (
    <section
      id="ico-about-section"
      className="relative text-white py-24 px-6 md:px-12 overflow-hidden min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #170a23 100%)',
        position: 'relative'
      }}
      ref={sectionRef}
    >
      {/* Floating crypto icons in background - similar to above section */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
            style={{
              width: Math.random() * 80 + 40 + 'px',
              height: Math.random() * 80 + 40 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: 'blur(8px)'
            }}
            animate={{
              y: ['-20px', '20px'],
              x: ['-10px', '10px'],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Stars background */}
      {[...Array(80)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.2,
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 0
          }}
        />
      ))}
      
      
      {/* Background glow effects - similar to above section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse opacity-20"></div>
        </div>
      </div>
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(150, 120, 255, 0.2) 0%, rgba(90, 50, 150, 0.1) 50%, transparent 70%)',
        }}
      ></div>
      
      {/* Floating decorative elements */}
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
      
      {/* Wave timeline - this is the vertical wave */}
      <WavePath progress={scrollProgress} />
      
      {/* Features */}
      {/* Section title with scroll animation */}
      <motion.div 
        className="text-center mb-16 relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={controls}
      >
        <h2 className="text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2 font-bold text-[#d1caff]">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          Tronado Ecosystem
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explore Our Platform Features
          </span>
        </h3>
      </motion.div>

      {/* Update active feature based on scroll progress */}
      <div className="relative py-4 max-w-7xl mx-auto">
        {FEATURES.map((feature, index) => {
          // Calculate if this feature should be visible based on scroll progress
          const shouldBeVisible = scrollProgress > (index / (FEATURES.length + 1));
          const isEven = index % 2 === 0;
          const PlanetIcon = PlanetIcons[index];
          
          // When scrolling, activate the feature when it comes into view
          if (shouldBeVisible && activeFeature < index) {
            setActiveFeature(index);
          }
          
          return (
            <div 
              key={index} 
              className={`relative ${index !== 0 ? 'mt-32 md:mt-40' : 'mt-16'}`}
            >
              {/* Planet marker on the wave */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={shouldBeVisible ? { 
                  scale: (activeFeature === index || hoveredFeature === index) ? 1.1 : 1, 
                  opacity: 1 
                } : { scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20 
                }}
              >
                <motion.div 
                  className={`rounded-full p-2 ${(activeFeature === index || hoveredFeature === index) ? 'ring-2 ring-purple-400 shadow-lg shadow-purple-500/20' : ''}`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <PlanetIcon />
                </motion.div>
              </motion.div>
              
              {/* Feature content */}
              <motion.div
                className={`flex flex-col md:flex-row items-center max-w-6xl mx-auto ${isEven ? '' : 'md:flex-row-reverse'} gap-8 pt-28`}
                initial={{ opacity: 0, y: 50 }}
                animate={shouldBeVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onFocus={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Content side */}
                <motion.div 
                  className="w-full md:w-1/2 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] backdrop-blur-[2px]"
                  initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                  animate={shouldBeVisible ? { x: 0, opacity: 1 } : { x: isEven ? -50 : 50, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.03, 
                    borderColor: 'rgba(168, 85, 247, 0.4)', 
                    boxShadow: '0 4px 30px rgba(110, 65, 255, 0.2)' 
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: shouldBeVisible ? 0.3 : 0, 
                    type: 'spring', 
                    stiffness: 100, 
                    damping: 25 
                  }}
                >
                  <motion.h3 
                    className="text-2xl md:text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>

                {/* Image side with enhanced animations */}
                <motion.div 
                  className="w-full md:w-1/2 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={shouldBeVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: shouldBeVisible ? 0.5 : 0,
                    type: "spring", 
                    stiffness: 100 
                  }}
                >
                  <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                    {/* Animating background glow */}
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6E41FF] to-[#FF2D95] opacity-20 blur-xl"
                      whileHover={{
                        scale: 1.15, 
                        opacity: 0.3
                      }}
                      transition={{ 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                    />
                    
                    {/* Animated image with floating effect */}
                    <motion.div
                      whileHover={{
                        y: [0, -8, 0],
                        transition: {
                          y: {
                            repeat: Infinity,
                            duration: 2,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }
                      }}
                      className="w-full h-full relative flex items-center justify-center"
                      animate={{
                        y: [0, -10, 0],
                        transition: {
                          y: {
                            repeat: Infinity,
                            duration: 4,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }
                      }}
                    >
                      <motion.img
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        className="relative z-10 w-full h-full object-contain"
                        initial={{ scale: 0.9, opacity: 0.8 }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: isEven ? 5 : -5,
                          opacity: 1,
                          filter: "drop-shadow(0 0 12px rgba(110, 65, 255, 0.5))"
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IcoAboutSection;
