import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rocketImg from '../assets/rocket.png';

export const RocketLaunchAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const [showRocket] = useState(true);
  const [showCrack, setShowCrack] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show rocket with smoke immediately
    
    // After rocket is visible, show the crack
    const crackTimer = setTimeout(() => {
      setShowCrack(true);
      
      // After crack appears, show text
      const textTimer = setTimeout(() => {
        setShowText(true);
        
        // After text appears, expand content and complete animation
        const contentTimer = setTimeout(() => {
          setShowContent(true);
          
          // Animation complete callback
          const completeTimer = setTimeout(() => {
            onAnimationComplete();
          }, 1200);
          
          return () => clearTimeout(completeTimer);
        }, 1500);
        
        return () => clearTimeout(contentTimer);
      }, 1200);
      
      return () => clearTimeout(textTimer);
    }, 2000); // Longer time to see rocket with smoke
    
    return () => clearTimeout(crackTimer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <motion.div
            className="absolute"
            initial={{ bottom: "-10%", right: "5%", opacity: 0 }}
            animate={{ bottom: "50%", right: "50%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut" 
            }}
          >
            {/* Rocket image */}
            <motion.div className="relative">
              {/* Main smoke trail behind rocket - from opposite direction */}
              <motion.div 
                className="absolute w-[400px] h-[80px]"
                style={{
                  background: "linear-gradient(to left, transparent, rgba(255,255,255,0.7), rgba(255,165,0,0.5))",
                  left: "40%",
                  top: "35%",
                  borderRadius: "50%",
                  transformOrigin: "center",
                  zIndex: -1,
                  filter: "blur(12px)"
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  width: ["350px", "400px", "350px"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  repeatType: "mirror"
                }}
              />
              
              {/* Secondary smoke particles - from opposite direction */}
              <motion.div 
                className="absolute w-[300px] h-[50px]"
                style={{
                  background: "linear-gradient(to left, transparent, rgba(255,255,255,0.5), rgba(255,165,0,0.3))",
                  left: "45%",
                  top: "38%",
                  borderRadius: "50%",
                  transformOrigin: "center",
                  zIndex: -1,
                  filter: "blur(8px)"
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: ["250px", "320px", "250px"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  repeatType: "mirror",
                  delay: 0.4
                }}
              />

              {/* Rocket image on top of smoke */}
              <motion.img
                src={rocketImg}
                alt="Rocket"
                className="w-40 h-auto relative z-10"
                style={{ 
                  filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.7))",
                  transform: "rotate(-45deg)"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Vertical Opening Split Line Animation */}
      <AnimatePresence>
        {showCrack && (
          <motion.div
            className="absolute flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Top half of the line */}
            <motion.div
              className="w-[80vw] h-[8px] rounded-t-full mb-[1px]"
              initial={{ y: 0 }}
              animate={{ 
                y: showContent ? "-50vh" : 0,
                transition: { 
                  duration: 1.2, 
                  ease: "easeInOut",
                  delay: 0.7
                }
              }}
              style={{
                background: "linear-gradient(90deg, rgba(106,13,173,0.1) 0%, rgba(157,78,221,0.9) 50%, rgba(106,13,173,0.1) 100%)",
                boxShadow: "0 0 20px rgba(157,78,221,0.8)"
              }}
            />
            
            {/* Bottom half of the line */}
            <motion.div
              className="w-[80vw] h-[8px] rounded-b-full mt-[1px]"
              initial={{ y: 0 }}
              animate={{ 
                y: showContent ? "50vh" : 0,
                transition: { 
                  duration: 1.2, 
                  ease: "easeInOut",
                  delay: 0.7
                }
              }}
              style={{
                background: "linear-gradient(90deg, rgba(106,13,173,0.1) 0%, rgba(157,78,221,0.9) 50%, rgba(106,13,173,0.1) 100%)",
                boxShadow: "0 0 20px rgba(157,78,221,0.8)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Text Animation */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute mt-32 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl font-bold text-white"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 5px rgba(157, 78, 221, 0.5)",
                  "0 0 20px rgba(157, 78, 221, 0.8)",
                  "0 0 5px rgba(157, 78, 221, 0.5)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              TRDO GOES GLOBAL
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content Reveal Animation */}
      {showContent && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />
      )}
    </div>
  );
};
