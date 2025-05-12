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
    }, 4000); // Time for rocket to reach top and hide
    
    return () => clearTimeout(rocketHideTimer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-black">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <>
            {/* Fire and Smoke Base Effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute inset-x-0 bottom-0 w-full"
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 4, ease: "easeInOut" }}
                style={{
                  background: 'radial-gradient(circle at 50% 100%, rgba(255, 69, 0, 0.4) 0%, rgba(255, 140, 0, 0.2) 30%, rgba(128, 0, 128, 0.1) 60%, transparent 80%)',
                  filter: 'blur(60px)',
                }}
              />
            </motion.div>

            {/* Rocket */}
            <motion.div
              className="absolute w-full h-full"
              initial={{ bottom: "-20%" }}
              animate={{ bottom: "120%" }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut"
              }}
            >
              {/* Fire Trail Effects */}
              <motion.div 
                className="absolute left-1/2 bottom-0 w-[800px] h-[2000px] -translate-x-1/2"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(255, 69, 0, 0.2) 10%, rgba(255, 140, 0, 0.3) 20%, rgba(255, 165, 0, 0.2) 40%, rgba(128, 0, 128, 0.1) 60%, transparent)',
                  filter: 'blur(40px)',
                  transform: 'translateX(-50%) rotateX(60deg)',
                  transformOrigin: 'bottom',
                }}
              />
              
              {/* Secondary Fire Effects */}
              <motion.div 
                className="absolute left-1/2 bottom-0 w-[400px] h-[1500px] -translate-x-1/2"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(255, 69, 0, 0.4) 10%, rgba(255, 140, 0, 0.5) 25%, rgba(255, 69, 0, 0.3) 50%, transparent)',
                  filter: 'blur(25px)',
                  transform: 'translateX(-50%) rotateX(45deg)',
                  transformOrigin: 'bottom',
                }}
              />
              
              {/* Rocket image */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2"
                style={{ 
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <motion.img
                  src={rocketImg}
                  alt="TRDO Logo"
                  className="w-[80vw] max-w-[1200px] h-auto"
                  animate={{
                    rotate: [0, -0.5, 0.5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </>
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
