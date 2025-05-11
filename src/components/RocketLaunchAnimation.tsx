import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rocketImg from '../assets/Logo3.png';

export const RocketLaunchAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const [showRocket, setShowRocket] = useState(true);
  const [showCrack, setShowCrack] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show rocket with smoke immediately
    
    // After rocket is visible for a while, hide it and show the crack
    const rocketHideTimer = setTimeout(() => {
      setShowRocket(false);
      
      // After rocket is hidden, show the crack
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
      }, 500); // Shorter time after rocket is hidden
      
      return () => clearTimeout(crackTimer);
    }, 2500); // Time for rocket to reach top and hide
    
    return () => clearTimeout(rocketHideTimer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-white">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <motion.div
            className="absolute"
            initial={{ bottom: "-10%", left: "50%", opacity: 0, x: "-50%" }}
            animate={{ bottom: "120%", left: "50%", opacity: 1, x: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              ease: "easeOut" 
            }}
          >
            {/* Rocket image */}
            <motion.div className="relative">
              {/* Logo image without smoke effects */}
              <motion.img
                src={rocketImg}
                alt="TRDO Logo"
                className="w-72 h-auto relative z-10"
                style={{ 
                  filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.7))"
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
              className="text-4xl font-bold text-purple-800"
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
