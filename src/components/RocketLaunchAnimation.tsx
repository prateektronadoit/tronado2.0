import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rocketImg from '../assets/LogoU.gif';

export const RocketLaunchAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const [showRocket, setShowRocket] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const rocketHideTimer = setTimeout(() => {
      setShowRocket(false);

      // Show text right after rocket is hidden
      setTimeout(() => {
        setShowText(true);

        // Show content after text appears
        setTimeout(() => {
          setShowContent(true);

          // Complete animation
          setTimeout(() => {
            onAnimationComplete();
          }, 1200);
        }, 1500);
      }, 300);
    }, 2500);

    return () => clearTimeout(rocketHideTimer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black overflow-visible">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <motion.div
            className="absolute inset-0 w-screen h-screen overflow-visible"
            initial={{ y: 100, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 2.5,
              ease: "easeOut"
            }}
          >
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
              }}>
              <img
                src={rocketImg}
                alt="TRDO Logo"
                style={{
                  height: '100%',
                  width: '100%',
                  maxHeight: '100vh',
                  objectFit: 'contain'
                }}
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>



      {/* Text Animation */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center text-center z-50"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl px-4"
              animate={{
                scale: [0.95, 1.05, 0.95],
                textShadow: [
                  "0 0 10px rgba(157, 78, 221, 0.7)",
                  "0 0 30px rgba(157, 78, 221, 0.9)",
                  "0 0 10px rgba(157, 78, 221, 0.7)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              TRDO GOES GLOBAL
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Content Reveal */}
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
