import React from 'react';
import { motion } from 'framer-motion';

interface BlackHoleAnimationProps {
  className?: string;
}

export const BlackHoleAnimation: React.FC<BlackHoleAnimationProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Outer rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`outer-ring-${i}`}
          className="absolute rounded-full border border-purple-500/30"
          style={{
            width: `${400 + i * 100}px`,
            height: `${400 + i * 100}px`,
            boxShadow: `0 0 ${20 + i * 10}px ${5 + i * 2}px rgba(157, 78, 221, 0.${3 - i})`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Inner spinning rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`inner-ring-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${150 + i * 40}px`,
            height: `${150 + i * 40}px`,
            border: `2px solid rgba(157, 78, 221, ${0.8 - i * 0.15})`,
            boxShadow: `0 0 ${10 + i * 3}px rgba(157, 78, 221, ${0.7 - i * 0.1})`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 15 - i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Center glow */}
      <motion.div
        className="absolute rounded-full bg-black"
        style={{
          width: "100px",
          height: "100px",
          boxShadow: "0 0 60px 30px rgba(157, 78, 221, 0.7)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Particles */}
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const distance = Math.random() * 180 + 50;
        const duration = Math.random() * 5 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-purple-300 rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: `0 0 ${size * 2}px ${size}px rgba(157, 78, 221, ${opacity})`,
            }}
            initial={{
              x: Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
              y: Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
            }}
            animate={{
              x: [
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
              ],
              y: [
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
                Math.random() * distance * (Math.random() > 0.5 ? 1 : -1),
              ],
              opacity: [opacity, opacity * 1.5, opacity],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              times: [0, 0.5, 1],
            }}
          />
        );
      })}
    </div>
  );
};
